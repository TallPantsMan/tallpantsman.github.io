import React, { useState } from 'react';
import {
  Building2,
  Briefcase,
  FileSpreadsheet,
  FolderKanban,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Wrench,
  TrendingUp,
  Clock,
  DollarSign,
  Zap,
  ShieldCheck
} from 'lucide-react';

export default function HeroPipeline() {
  const [mode, setMode] = useState<'after' | 'before'>('after');

  return (
    <div className="w-full font-sans select-none">
      <div
        className="rounded-3xl border-2 border-[#D5CEC2] p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden space-y-8"
        style={{ background: 'linear-gradient(160deg, #FFFEFA 0%, #F2ECE1 100%)' }}
      >
        {/* ================= 1. TOP BANNER: WHO THE CLIENT IS + BEFORE/AFTER TOGGLE ================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b-2 border-[#D5CEC2]">
          {/* Client Profile Graphic Card */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1C1917] text-[#F5CBA7] flex items-center justify-center shrink-0 shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9A3B1B] mb-0.5">
                <span>THE CLIENT PROFILE</span>
                <span className="text-[#D5CEC2]">•</span>
                <span>WHO HIRES CAULHAUS</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1C1917]">
                20–150 Person Agencies, Consultancies &amp; Professional Services Firms
              </h3>
              <p className="text-sm text-[#57534E]">
                Firms running on Google Workspace where client handoffs, staffing, and weekly status reports are stuck in manual spreadsheets.
              </p>
            </div>
          </div>

          {/* Interactive Before vs. After Visual Toggle */}
          <div className="inline-flex rounded-2xl bg-[#E4DFD5] p-1.5 border border-[#D5CEC2] shrink-0 self-start lg:self-center">
            <button
              type="button"
              onClick={() => setMode('before')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                mode === 'before'
                  ? 'bg-[#9A3B1B] text-white shadow-md'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>1. Before CaulHaus (Manual Chaos)</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('after')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                mode === 'after'
                  ? 'bg-[#2D6A4F] text-white shadow-md'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>2. With CaulHaus (Connected Stack)</span>
            </button>
          </div>
        </div>

        {/* ================= 2. THREE-COLUMN VISUAL ARCHITECTURE DIAGRAM ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
          
          {/* ---------- COLUMN 1: THE CLIENT'S EXISTING TOOLS (4 Cols) ---------- */}
          <div className="lg:col-span-4 bg-[#FFFEFA] rounded-2xl p-5 border-2 border-[#D5CEC2] flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E4DFD5]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9A3B1B] block">
                    STEP 1 · CLIENT&apos;S EXISTING STACK
                  </span>
                  <h4 className="text-base font-bold text-[#1C1917]">
                    Tools Your Team Already Uses
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#F2ECE1] text-[#57534E] text-xs font-bold">
                  Keep Your Tools
                </span>
              </div>

              {/* 4 Visual Tool Nodes */}
              <div className="space-y-3">
                {/* Tool 1: CRM */}
                <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-[#E4DFD5] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F2E7DF] text-[#B44C27] flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-[#1C1917]">Sales CRM</div>
                    <div className="text-xs text-[#57534E]">HubSpot · Salesforce · Pipedrive</div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      mode === 'after'
                        ? 'bg-[#E8F2EC] text-[#2D6A4F]'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {mode === 'after' ? 'Auto-Synced' : 'Siloed'}
                  </span>
                </div>

                {/* Tool 2: Google Workspace */}
                <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-[#E4DFD5] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F2EC] text-[#2D6A4F] flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-[#1C1917]">Google Workspace</div>
                    <div className="text-xs text-[#57534E]">Staffing Sheets · Drive Folders</div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      mode === 'after'
                        ? 'bg-[#E8F2EC] text-[#2D6A4F]'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {mode === 'after' ? 'Live Engine' : 'Fragile Sheets'}
                  </span>
                </div>

                {/* Tool 3: PM Boards */}
                <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-[#E4DFD5] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F2E7DF] text-[#B44C27] flex items-center justify-center shrink-0">
                    <FolderKanban className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-[#1C1917]">Project Boards</div>
                    <div className="text-xs text-[#57534E]">Asana · Jira · ClickUp · Monday</div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      mode === 'after'
                        ? 'bg-[#E8F2EC] text-[#2D6A4F]'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {mode === 'after' ? 'Auto-Built' : 'Manual Setup'}
                  </span>
                </div>

                {/* Tool 4: Slack & Billing */}
                <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-[#E4DFD5] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F2EC] text-[#2D6A4F] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-[#1C1917]">Slack &amp; Finance</div>
                    <div className="text-xs text-[#57534E]">Team Channels · QuickBooks / Stripe</div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      mode === 'after'
                        ? 'bg-[#E8F2EC] text-[#2D6A4F]'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {mode === 'after' ? 'Automated' : 'Friday Chases'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E4DFD5] text-xs text-[#57534E] flex items-center justify-between">
              <span>New SaaS software to buy:</span>
              <strong className="text-[#1C1917]">$0 / Seat (None)</strong>
            </div>
          </div>

          {/* ---------- COLUMN 2: WHERE & HOW CAULHAUS ENGAGES (4 Cols) ---------- */}
          <div
            className="lg:col-span-4 rounded-2xl p-5 text-white flex flex-col justify-between shadow-xl border-2"
            style={{
              background:
                mode === 'after'
                  ? 'linear-gradient(145deg, #1C1917 0%, #28221D 52%, #1B2B23 100%)'
                  : 'linear-gradient(145deg, #3B1812 0%, #261512 100%)',
              borderColor: mode === 'after' ? '#B44C27' : '#EF4444'
            }}
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/15">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F5CBA7] block">
                    {mode === 'after' ? 'STEP 2 · WHERE CAULHAUS PLUGS IN' : 'STEP 2 · WITHOUT CAULHAUS'}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {mode === 'after'
                      ? 'Custom Automation Layer We Build'
                      : 'Your Team Is the "Human Glue"'}
                  </h4>
                </div>
                <Wrench className="w-5 h-5 text-[#F5CBA7]" />
              </div>

              {mode === 'after' ? (
                <div className="space-y-3">
                  {/* Engagement Step A */}
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#F5CBA7]">
                        1. Closed-Won Handoff Bridge
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#2D6A4F]/60 text-[#84C5A2]">
                        Webhook + API
                      </span>
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      When a deal closes in your CRM, our script auto-creates Google Drive folders, project boards, and staffing requests in 10 seconds.
                    </p>
                  </div>

                  {/* Engagement Step B */}
                  <div className="p-3.5 rounded-xl bg-[#B44C27]/25 border border-[#F5CBA7]/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#F5CBA7]">
                        2. Google Workspace Capacity Engine
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#B44C27] text-white">
                        Flagship Build
                      </span>
                    </div>
                    <p className="text-xs text-stone-100 leading-relaxed">
                      We turn your disconnected staffing sheets into a live Google Apps Script capacity planner with 8-week utilization forecasting.
                    </p>
                    {/* Mini Visual Capacity Bar inside the Engine Card */}
                    <div className="bg-black/30 p-2 rounded-lg space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className="text-stone-300">Live Agency Bandwidth</span>
                        <span className="text-[#84C5A2]">84% Optimal Load</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden flex">
                        <div className="bg-[#2D6A4F] h-full" style={{ width: '65%' }} />
                        <div className="bg-[#B44C27] h-full" style={{ width: '19%' }} />
                      </div>
                    </div>
                  </div>

                  {/* Engagement Step C */}
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#F5CBA7]">
                        3. Automated Monday Digest Bot
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#2D6A4F]/60 text-[#84C5A2]">
                        Slack + Billing
                      </span>
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      Pulls weekly progress from Asana/Jira into an 8:00 AM Monday Slack summary for leadership and triggers draft invoices.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-400/30 space-y-1">
                    <div className="text-xs font-bold uppercase text-red-300">
                      ✗ Manual Deal Handoffs (2–3 Days Delay)
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      Sales closes a deal, emails a PDF SOW, and PMs manually build folders, boards, and staffing rows by hand.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-400/30 space-y-1">
                    <div className="text-xs font-bold uppercase text-red-300">
                      ✗ 5+ Conflicting Staffing Spreadsheets
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      Nobody knows who is actually available 4 weeks out. Senior staff get double-booked at 120% while others sit idle.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-400/30 space-y-1">
                    <div className="text-xs font-bold uppercase text-red-300">
                      ✗ The Friday Afternoon Slack Chase
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      PMs and Ops leads lose 4+ hours every Friday pinging teammates just to compile a Monday status report for leadership.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* How We Engage Timeline Pill */}
            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
              <span className="text-[#D5CEC2]">How we deliver this:</span>
              <span className="font-bold text-[#F5CBA7]">2-Wk Audit → 4–6 Wk Build</span>
            </div>
          </div>

          {/* ---------- COLUMN 3: THE MEASURABLE CLIENT BENEFIT (4 Cols) ---------- */}
          <div className="lg:col-span-4 bg-[#FFFEFA] rounded-2xl p-5 border-2 border-[#D5CEC2] flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E4DFD5]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block">
                    STEP 3 · THE MEASURABLE BENEFIT
                  </span>
                  <h4 className="text-base font-bold text-[#1C1917]">
                    What Changes for Your Firm
                  </h4>
                </div>
                <TrendingUp className="w-5 h-5 text-[#2D6A4F]" />
              </div>

              {/* 3 Visual Impact Gauges / Bars */}
              <div className="space-y-4">
                {/* Benefit 1: Admin Time Reclaimed */}
                <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-[#E4DFD5] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-[#57534E] flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#B44C27]" />
                      Scheduling &amp; Status Admin Time
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        mode === 'after'
                          ? 'bg-[#E8F2EC] text-[#2D6A4F]'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {mode === 'after' ? '~16 hrs/person/mo saved' : '16+ hrs/mo wasted'}
                    </span>
                  </div>

                  {/* Visual Before vs After Bar */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-14 text-[#57534E] font-medium">Before:</span>
                      <div className="flex-1 h-2.5 bg-[#E4DFD5] rounded-full overflow-hidden">
                        <div className="h-full bg-red-500/80 rounded-full" style={{ width: '92%' }} />
                      </div>
                      <span className="w-16 text-right font-bold text-red-700">16 hrs/mo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-14 text-[#1C1917] font-bold">After:</span>
                      <div className="flex-1 h-2.5 bg-[#E4DFD5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2D6A4F] rounded-full" style={{ width: '12%' }} />
                      </div>
                      <span className="w-16 text-right font-bold text-[#2D6A4F]">~1 hr/mo</span>
                    </div>
                  </div>
                </div>

                {/* Benefit 2: New Client Kickoff Speed */}
                <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-[#E4DFD5] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-[#57534E] flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#B44C27]" />
                      Closed-Won to Project Setup
                    </span>
                    <span className="text-xs font-bold text-[#2D6A4F]">100% Automated</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs text-[#57534E] line-through">2–3 Days Manual Setup</div>
                    <ArrowRight className="w-4 h-4 text-[#B44C27]" />
                    <div className="text-sm font-black text-[#1C1917] bg-[#E8F2EC] text-[#2D6A4F] px-2.5 py-0.5 rounded">
                      Under 10 Seconds
                    </div>
                  </div>
                </div>

                {/* Benefit 3: Software Licensing Savings */}
                <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-[#E4DFD5] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-[#57534E] flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-[#2D6A4F]" />
                      Annual PSA Software Tax Avoided
                    </span>
                    <span className="text-xs font-bold text-[#2D6A4F]">You Own the Code</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs text-[#57534E]">Bloated $50/seat PSA: $30k/yr</div>
                    <ArrowRight className="w-4 h-4 text-[#B44C27]" />
                    <div className="text-sm font-black text-[#2D6A4F]">$0 / Seat Forever</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E4DFD5] flex items-center justify-between text-xs">
              <span className="text-[#57534E]">Proven across 17 teams (37 staff):</span>
              <a href="/projects/" className="font-bold text-[#B44C27] hover:underline flex items-center gap-1">
                <span>~590 hrs/mo saved</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* ================= 3. BOTTOM BAR: HOW WE ENGAGE (3 SIMPLE STEPS) ================= */}
        <div
          className="rounded-2xl p-5 sm:p-6 text-white border border-[#3A332C] grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
          style={{ background: 'linear-gradient(135deg, #1C1917 0%, #28221D 55%, #1B2B23 100%)' }}
        >
          <div className="md:col-span-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CBA7] block mb-1">
              HOW WE ENGAGE
            </span>
            <h4 className="text-lg font-bold text-white leading-snug">
              Low-Risk Start. Fast Production Rollout.
            </h4>
          </div>

          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-white/10 border border-white/10">
              <div className="text-xs font-bold text-[#F5CBA7] uppercase">Phase 01 · 2 Weeks</div>
              <div className="text-sm font-bold text-white mt-0.5">Workflow &amp; Capacity Audit</div>
              <div className="text-xs text-stone-300 mt-0.5">Roadmap + 1st working prototype</div>
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-[#B44C27]">
              <div className="text-xs font-bold text-[#F5CBA7] uppercase">Phase 02 · 4–6 Weeks</div>
              <div className="text-sm font-bold text-white mt-0.5">Full System Build</div>
              <div className="text-xs text-stone-300 mt-0.5">100% of Audit fee credited</div>
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-white/10">
              <div className="text-xs font-bold text-[#84C5A2] uppercase">Phase 03 · Monthly</div>
              <div className="text-sm font-bold text-white mt-0.5">Continuous Ops Partner</div>
              <div className="text-xs text-stone-300 mt-0.5">Calibration + monthly sprints</div>
            </div>
          </div>

          <div className="md:col-span-3 flex md:justify-end">
            <a
              href="/contact/?area=Audit"
              style={{ background: 'linear-gradient(135deg, #B85028 0%, #8E3717 100%)' }}
              className="w-full md:w-auto px-5 py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Start With a 2-Week Audit</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
