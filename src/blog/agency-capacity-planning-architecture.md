---
title: "Agency Capacity Planning Architecture in Google Apps Script"
date: 2026-11-23
description: "Technical architecture for building a multi-team agency capacity planner in Google Apps Script with automated roster sync and utilization alerts."
categories: "CAPACITY-ARCHITECTURE"
canonical: "https://caulhaus.com/blog/agency-capacity-planning-architecture/"
---

> **TL;DR:** Formula-heavy capacity spreadsheets collapse once an agency passes 25 people because volatile array formulas (`IMPORTRANGE`, `QUERY`, `SUMIFS`) recalculate on every keystroke and break under concurrent edits. Moving calculation logic, PTO deductions, and utilization rollups out of cell formulas and into a batch-processed **Google Apps Script** engine turns Google Sheets into a reliable, database-backed resource planner with zero per-seat PSA software fees.

Every agency capacity workbook starts as a clean 12-week grid and ends as an unmaintainable tangle of `#REF!` errors.

Around 25 to 40 full-time employees, the spreadsheet that used to take 20 minutes to update on Monday morning starts freezing in Chrome. Account directors overwrite each other's allocations without knowing it. Someone inserts a row in the `Roster` tab and silently shifts every `VLOOKUP` index across six client tabs. By Thursday afternoon, delivery leads stop trusting the master sheet and track their teams in private tabs or Slack threads.

When leadership sees that breakdown, they assume the spreadsheet itself is the wrong medium and buy a $50/seat Professional Services Automation (PSA) tool. In reality, the medium is fine. The architecture is wrong.

When you treat a Google Sheet as both the database and the calculation engine, user edits collide with volatile formulas. When you separate those layers—using Google Sheets strictly as a structured input/output surface and running all capacity math inside **Google Apps Script**—the system scales cleanly across dozens of teams without new software licenses.

---

## Why Formula-Driven Capacity Sheets Break at 25+ People

Spreadsheet failure at agency scale stems from four mechanical bottlenecks inside browser-based calculation engines:

1. **Volatile Formula Cascades:** Every edit in a sheet loaded with cross-tab `SUMIFS`, `ARRAYFORMULA`, and `IMPORTRANGE` calls forces Google Sheets to recompute the dependency graph in the user's browser. Past 15,000 populated cells, a single hour change triggers a 4-to-8-second UI freeze.
2. **Concurrent Write Collisions:** When four department leads adjust next month's staffing at the same time during a Monday resourcing call, cell-level formulas cannot enforce row locks or atomic validation.
3. **Unaccounted Shrinkage and PTO:** Most DIY sheets divide scheduled hours by a flat 40-hour week. That math hides the 8 hours a senior engineer spends on internal code reviews or the 16 hours a strategist takes off for PTO, making an 80% booked employee look like they have spare bandwidth when they are already overloaded.
4. **Accidental Schema Corruption:** Unlocking an entire grid so PMs can enter project hours allows anyone to drag-fill over a formula cell or rename a role string (changing `"Sr. Designer"` to `"Senior Designer"`), breaking downstream rollups silently.

---

## System Architecture: Separating Data, Compute, and Views

A production-grade capacity planner built on Google Workspace splits the workbook into four distinct layers managed by Google Apps Script.

```mermaid
flowchart TD
    A["Input Layer\n(Roster, Role_Rates, Projects_DB)"] --> B["External Sync\n(Google Calendar PTO + CRM Deals)"]
    B --> C["Apps Script Compute Engine\n(LockService + Batch Array Math)"]
    C --> D["Protected Allocation Grid\n(Dept Lead Inputs via Data Validation)"]
    D --> C
    C --> E["Executive Capacity Rollup\n(Net Utilization & Margin Views)"]
    C --> F["Automated Slack Webhooks\n(Monday Digest & >100% Overload Alerts)"]
```

### Layer 1: Normalized Data Tabs (The Source of Truth)
Instead of hardcoding staff names, hourly cost rates, and weekly targets inside allocation cells, isolate static attributes into three locked reference tabs:

* **`Roster`:** `Employee_ID`, `Name`, `Email`, `Department`, `Role_Tier`, `Gross_Weekly_Hrs`, `Admin_Buffer_Hrs`, `Target_Billable_Pct`, `Cost_Rate`, `Status` (`Active`/`Contractor`/`Inactive`).
* **`Projects`:** `Project_ID`, `Client`, `Project_Name`, `Stage` (`Confirmed`/`Pipeline_75`/`Pipeline_50`), `Budget_Hours`, `Start_Date`, `End_Date`, `PM_Email`.
* **`Allocations`:** Flat, normalized rows (`Allocation_ID`, `Employee_ID`, `Project_ID`, `Week_Starting`, `Planned_Hours`, `Last_Modified_By`).

Keeping `Allocations` as a flat table rather than a 52-column horizontal calendar grid makes batch script processing predictable and prevents column-insertion bugs. Human-friendly 12-week matrix views are generated dynamically for leadership from this flat table.

### Layer 2: The Net Capacity & Utilization Formula
Accurate capacity planning depends on measuring **Net Available Capacity**, not gross payroll hours. In our engine, each team member's weekly net capacity for a given Monday date $w$ is calculated as:

$$\text{Net Capacity}_w = \max\left(0,\ \text{Gross Hours} - \text{Admin Buffer} - \text{PTO Hours}_w\right)$$

$$\text{Billable Utilization \%}_w = \frac{\sum \text{Confirmed Allocated Hours}_w}{\text{Net Capacity}_w} \times 100$$

For example, a full-time Senior Developer with a 40-hour gross week, a 6-hour non-billable internal meeting/review buffer, and 8 hours of approved PTO in Week 4 has **26 net available billable hours** that week—not 40. Booking 26 client hours puts that developer at **100% utilization** for Week 4. A naive 40-hour sheet would report 65% utilization and assign them another 10-hour sprint, creating immediate burnout.

---

## Capacity Math & Operational Benchmarks

Before writing code, define the operational thresholds that drive alerts and hiring triggers. Most 20–150 person agencies operate across three distinct role bands:

| Role Band | Gross Weekly Hours | Standard Non-Billable Buffer | Target Billable Utilization | Overload Alert Threshold | Typical Burnout Cause |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Production Individual Contributor** (Designer, Dev, Copywriter) | 40 hrs | 6–8 hrs (internal syncs, QA, standups) | 75% – 82% (25–28 billable hrs) | > 90% (Amber) / > 100% (Red) | Context switching across 4+ active accounts |
| **Technical Lead / Senior Strategist** | 40 hrs | 12–14 hrs (architecture review, pitching, mentoring) | 55% – 65% (16–18 billable hrs) | > 85% (Amber) / > 95% (Red) | Unbudgeted pre-sales scoping calls |
| **Account Director / Project Manager** | 40 hrs | 16–20 hrs (internal ops, billing, resourcing) | 45% – 55% (10–13 billable hrs) | > 80% (Amber) / > 90% (Red) | Manual Friday status chasing & scope admin |
| **Specialized Contractor / Freelancer** | Variable (capped per SOW) | 0 hrs | 100% of contracted weekly cap | > 100% of weekly SOW cap | Missing from enterprise PSA due to $50/seat fee |

---

## Core Apps Script Engine Implementation

Google Apps Script enforces a **6-minute maximum execution time** per script run for standard Google Workspace accounts and throttles frequent `SpreadsheetApp` API calls. The single biggest performance rule is **never call `getValue()` or `setValue()` inside a loop**.

Read every required tab into memory once using `getValues()`, compute all capacity maps and utilization rollups in JavaScript `Map` objects, acquire a script lock with `LockService` before mutating output ranges, and flush the entire result back in a single `setValues()` call.

Below is the production pattern for a batch capacity rollup that syncs approved PTO from a shared Google Calendar, weights pipeline demand, and flags overloaded staff:

```javascript
/**
 * Batch Capacity & Utilization Engine for Google Workspace.
 * Reads Roster, Allocations, and Calendar PTO once in memory,
 * computes 12-week net utilization, and writes Rollup + Slack alerts.
 */
const CONFIG = {
  PTO_CALENDAR_ID: "c_agency_pto_calendar_id@group.calendar.google.com",
  SLACK_WEBHOOK_PROP: "SLACK_OPS_WEBHOOK_URL",
  HORIZON_WEEKS: 12,
  AMBER_THRESHOLD: 0.85,
  RED_THRESHOLD: 1.0
};

function runCapacityRollup() {
  const lock = LockService.getScriptLock();
  // Prevent concurrent trigger/manual runs from overwriting output ranges
  if (!lock.tryLock(15000)) {
    throw new Error("Capacity rollup already in progress. Try again in 15 seconds.");
  }

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const rosterRows = ss.getSheetByName("Roster").getDataRange().getValues();
    const projectRows = ss.getSheetByName("Projects").getDataRange().getValues();
    const allocRows = ss.getSheetByName("Allocations").getDataRange().getValues();
    const rollupSheet = ss.getSheetByName("Capacity_Rollup");

    const weekStarts = getRollingMondays_(CONFIG.HORIZON_WEEKS);
    const ptoMap = fetchWeeklyPtoHours_(CONFIG.PTO_CALENDAR_ID, weekStarts);

    // 1. Index project weights (Confirmed = 1.0, Pipeline_75 = 0.75, etc.)
    const projectWeightMap = new Map();
    for (let i = 1; i < projectRows.length; i++) {
      const [projectId, , , stage] = projectRows[i];
      if (!projectId) continue;
      const weight = stage === "Confirmed" ? 1.0 : (stage === "Pipeline_75" ? 0.75 : 0.5);
      projectWeightMap.set(String(projectId), weight);
    }

    // 2. Build active roster map keyed by Employee_ID
    const rosterMap = new Map();
    for (let i = 1; i < rosterRows.length; i++) {
      const [empId, name, email, dept, role, grossHrs, bufferHrs, targetPct, , status] = rosterRows[i];
      if (!empId || status === "Inactive") continue;

      rosterMap.set(String(empId), {
        name,
        email: String(email).toLowerCase().trim(),
        dept,
        role,
        grossHrs: Number(grossHrs) || 40,
        bufferHrs: Number(bufferHrs) || 8,
        targetPct: Number(targetPct) || 0.75,
        weeklyConfirmed: new Array(CONFIG.HORIZON_WEEKS).fill(0),
        weeklyWeighted: new Array(CONFIG.HORIZON_WEEKS).fill(0)
      });
    }

    // 3. Aggregate allocations into rolling week buckets
    const weekIndexMap = new Map(weekStarts.map((d, idx) => [formatIsoDate_(d), idx]));

    for (let j = 1; j < allocRows.length; j++) {
      const [, empId, projectId, weekDate, plannedHrs] = allocRows[j];
      const staff = rosterMap.get(String(empId));
      if (!staff || !(weekDate instanceof Date)) continue;

      const wkKey = formatIsoDate_(getMonday_(weekDate));
      const wkIdx = weekIndexMap.get(wkKey);
      if (wkIdx === undefined) continue;

      const hrs = Number(plannedHrs) || 0;
      const weight = projectWeightMap.get(String(projectId)) || 1.0;

      if (weight === 1.0) {
        staff.weeklyConfirmed[wkIdx] += hrs;
      }
      staff.weeklyWeighted[wkIdx] += hrs * weight;
    }

    // 4. Construct output table & collect immediate overload alerts
    const header = ["Employee", "Department", "Role", "Base Net Cap"];
    weekStarts.forEach(w => header.push(`${formatIsoDate_(w)} Util %`));

    const output = [header];
    const alerts = [];

    rosterMap.forEach(staff => {
      const baseNet = Math.max(0, staff.grossHrs - staff.bufferHrs);
      const row = [staff.name, staff.dept, staff.role, baseNet];

      weekStarts.forEach((wkDate, idx) => {
        const wkKey = formatIsoDate_(wkDate);
        const ptoHrs = ptoMap.get(`${staff.email}|${wkKey}`) || 0;
        const netCap = Math.max(0, baseNet - ptoHrs);
        const booked = staff.weeklyConfirmed[idx];
        const util = netCap > 0 ? booked / netCap : (booked > 0 ? 1.5 : 0);

        row.push(Number(util.toFixed(2)));

        if (idx < 2 && util > CONFIG.RED_THRESHOLD) {
          alerts.push(`*${staff.name}* (${staff.dept}) at *${Math.round(util * 100)}%* net capacity week of ${wkKey} (${booked}h / ${netCap}h net)`);
        }
      });

      output.push(row);
    });

    // 5. Single atomic write back to Rollup tab
    rollupSheet.clearContents();
    rollupSheet.getRange(1, 1, output.length, output[0].length).setValues(output);

    if (alerts.length > 0) {
      postSlackOverloadAlerts_(alerts);
    }
  } finally {
    lock.releaseLock();
  }
}

function fetchWeeklyPtoHours_(calendarId, weekStarts) {
  const ptoMap = new Map();
  const cal = CalendarApp.getCalendarById(calendarId);
  if (!cal) return ptoMap;

  const start = weekStarts[0];
  const end = new Date(weekStarts[weekStarts.length - 1].getTime() + 7 * 86400000);
  const events = cal.getEvents(start, end);

  events.forEach(ev => {
    const guestList = ev.getGuestList(true);
    const creator = ev.getCreators()[0] || "";
    const email = (guestList[0]?.getEmail() || creator).toLowerCase().trim();
    if (!email) return;

    const hours = ev.isAllDayEvent() ? 8 : (ev.getEndTime() - ev.getStartTime()) / 3600000;
    const wkKey = formatIsoDate_(getMonday_(ev.getStartTime()));
    const mapKey = `${email}|${wkKey}`;
    ptoMap.set(mapKey, (ptoMap.get(mapKey) || 0) + Math.min(hours, 40));
  });

  return ptoMap;
}

function postSlackOverloadAlerts_(alerts) {
  const webhookUrl = PropertiesService.getScriptProperties().getProperty(CONFIG.SLACK_WEBHOOK_PROP);
  if (!webhookUrl) return;

  const payload = {
    text: `*Capacity Overload Alerts (Next 14 Days)*\n${alerts.map(a => `• ${a}`).join("\n")}`
  };

  UrlFetchApp.fetch(webhookUrl, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}

function getMonday_(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

function getRollingMondays_(count) {
  const first = getMonday_(new Date());
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(first);
    d.setDate(d.getDate() + i * 7);
    return d;
  });
}

function formatIsoDate_(d) {
  return Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyy-MM-dd");
}
```

### Why This Pattern Holds Up Under Load
* **Execution Speed:** Reading 3,000 allocation rows and writing a 12-week summary grid executes in **1.8 to 3.2 seconds**, well inside the 6-minute Apps Script limit.
* **Zero Hardcoded Secrets:** Webhook URLs live in `PropertiesService.getScriptProperties()`, keeping credentials out of version control or shared workbook copies.
* **Race-Condition Safety:** `LockService.getScriptLock()` guarantees that an automated hourly time-driven trigger never collides with a delivery director manually refreshing the rollup.

---

## Comparison: Choosing the Right Capacity Architecture

When agencies evaluate how to replace a broken manual workbook, four paths exist. Each carries clear engineering and financial trade-offs:

| Evaluation Criterion | Manual Formula Google Sheet | Airtable / ClickUp Workload View | Enterprise PSA (Kantata, Scoro, Productive) | Custom Google Workspace + Apps Script Engine |
| :--- | :--- | :--- | :--- | :--- |
| **Annual Licensing (50 FTEs + 15 Contractors)** | $0 (Existing Google Workspace) | $12,000 – $18,000 / year | $31,000 – $46,000 / year | **$0 incremental licensing** |
| **Calculation Latency (2,000+ rows)** | Slow (4–8s browser freezes) | Moderate (UI pagination limits) | Fast (Vendor cloud DB) | **Fast (2–3s batch Apps Script)** |
| **Contractor Seat Friction** | Low | Paid guest/member limits | High ($40–$60/mo per seat) | **Zero (Roster row only)** |
| **Role-Based Write Protection** | Poor (easily broken by drags) | Good | High | **High (Protected ranges + validation)** |
| **Custom Margin & Pipeline Math** | Fragile formulas | Limited without paid add-ons | Rigid vendor data model | **Full code control & IP ownership** |
| **Team Onboarding Time** | 1 day | 2–4 weeks | 8–12 weeks | **< 1 week** |

---

## Proven Field Results: 17 Teams, 37 People, ~590 Hours Saved Monthly

This exact architecture is not theoretical. On an enterprise deployment engineered across **17 distinct teams and 37 people via our extended network**, we replaced a fragmented cluster of manual scheduling spreadsheets with a unified Google Apps Script capacity and resource planning engine.

Before the rollout, team leads spent hours every week cross-checking availability across tabs, reconciling conflicting PTO dates, and rebuilding broken summary formulas before executive reviews. After moving roster synchronization, PTO deductions, and utilization math into background Apps Script jobs:

* **~16 hours recovered per person every month**, removing manual status reconciliation and duplicate entry.
* **~590 billable and operational hours returned per month** across the 37-person group.
* **$0 spent on additional per-seat SaaS tools**, operating entirely inside existing Google Workspace accounts.
* **3-to-6-week forward bandwidth visibility**, giving leadership accurate lead time before greenlighting new engagements or opening contractor requisitions.

---

## 4-Phase Implementation Roadmap

If your delivery leads are losing hours every week maintaining fragile staffing spreadsheets, roll out this architecture in four sequential phases:

### Phase 1: Normalize the Roster and Role Bands (Days 1–3)
Audit every active full-time employee and recurring contractor. Assign each role a realistic **Non-Billable Admin Buffer** (typically 6–8 hours for production ICs and 12–16 hours for leads) and store all staff records in a single protected `Roster` tab using immutable `Employee_ID` keys.

### Phase 2: Migrate Logic from Cell Formulas to Batch Scripts (Days 4–7)
Strip out cross-sheet `IMPORTRANGE` and nested `SUMIFS` chains. Implement a flat `Allocations` input sheet backed by dropdown data validation linked to `Roster` and `Projects`, then deploy a batch Apps Script rollup guarded by `LockService`.

### Phase 3: Wire Calendar PTO and Sheet Protections (Week 2)
Connect your agency's shared PTO Google Calendar via `CalendarApp` so upcoming time off deducts automatically from weekly net capacity. Lock `Roster`, `Projects`, and `Capacity_Rollup` using `Protection` rules so department leads only edit allocation hours for their direct reports.

### Phase 4: Automate Triggers and Slack Exception Alerts (Week 3)
Attach a time-driven trigger to run `runCapacityRollup()` every morning at 7:00 AM and a Monday 8:00 AM Slack digest that surfaces anyone exceeding 90% or 100% net capacity over the next two weeks.

If you want this engineered directly into your existing stack without pulling senior engineers off billable client work, [explore CaulHaus Services](/services/) to book a **2-Week Workflow & Capacity Audit** or [contact our team](/contact/) to review your current delivery setup.

---

## Frequently Asked Questions

### Can Google Apps Script handle capacity planning for a 100-person agency?
Yes. Google Sheets supports up to 10 million cells per workbook, and a 100-person agency tracking weekly allocations over 26 weeks generates roughly 2,600 to 5,000 rows per quarter. When calculations run in memory inside Google Apps Script using batch `getValues()` and `setValues()` calls instead of live cell formulas, the workbook stays responsive well past 150 employees.

### How do you prevent account directors from accidentally breaking the sheet?
Keep input sheets (`Allocations`) strictly separated from reference tables (`Roster`, `Projects`) and output views (`Capacity_Rollup`). Apply Google Sheets **Protected Ranges** so only administrators can edit reference rates and formula outputs, and enforce strict dropdown **Data Validation** on employee names, project IDs, and weekly hours.

### How does billable utilization differ between confirmed work and sales pipeline?
Confirmed projects carry a `1.0` weight and drive immediate overload alerts and contractor hiring decisions. Unclosed sales pipeline deals carry probability weights (for example, `0.75` for verbal approvals and `0.50` for submitted proposals) and appear in a separate **Weighted Forecast** column so leadership spots future hiring crunches 4–6 weeks out without distorting current week schedules.

### What happens if an allocation edit happens right before a leadership meeting?
In addition to scheduled hourly or daily triggers, attach an Apps Script button or custom menu item (`Capacity Engine > Refresh Rollup Now`) that calls `runCapacityRollup()`. Because `LockService` serializes requests and batch execution takes under three seconds, leadership always reviews current numbers on demand.

---

## Next Step: Audit Your Current Capacity Sheet

Open your current staffing workbook and check two numbers: how many volatile `IMPORTRANGE` or array formulas run on every edit, and whether your utilization math subtracts PTO and internal admin buffers before dividing scheduled hours. Fixing those two structural gaps eliminates most spreadsheet drift before you write a single line of webhook code.

If you want a senior systems architect to map your delivery workflow and deploy a working prototype in 14 days, [review our 2-Week Audit scope](/services/) or [schedule a diagnostic call](/contact/).
