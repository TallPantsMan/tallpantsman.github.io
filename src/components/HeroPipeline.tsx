import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  FolderPlus, 
  Table, 
  BellRing,
  Clock,
  AlertTriangle,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface PipelineStep {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  tools: string;
  icon: React.ComponentType<{ className?: string }>;
  manualPain: string;
  automatedResult: string;
  timeSaved: string;
  liveActions: {
    label: string;
    detail: string;
    status: string;
  }[];
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 0,
    badge: 'STEP 01 · TRIGGER',
    title: 'Deal Marked "Closed-Won" in CRM',
    subtitle: 'Sales signs a new $15,000/mo client retainer in HubSpot or Salesforce.',
    tools: 'HubSpot / Salesforce / Pipedrive → Apps Script Webhook',
    icon: Briefcase,
    manualPain: 'Account rep pings Slack, emails a PDF SOW, and waits 2–3 days for ops to manually set up the client.',
    automatedResult: 'The instant the deal stage hits Closed-Won, a webhook captures the SOW hours, roles, and start date automatically.',
    timeSaved: 'Saves ~2.5 hrs per new client kickoff',
    liveActions: [
      { label: 'Deal Captured', detail: 'Acme Corp — Q3 Retainer ($15,000/mo · 120 billable hrs/mo)', status: 'Verified' },
      { label: 'Scope Extracted', detail: 'Strategist (30h), Senior Designer (50h), Full-Stack Dev (40h)', status: 'Parsed' },
      { label: 'Kickoff Target', detail: 'Start date & billing schedule synced to master ledger', status: 'Synced' }
    ]
  },
  {
    id: 1,
    badge: 'STEP 02 · PROVISIONING',
    title: 'Workspaces & Project Boards Spin Up',
    subtitle: 'Client folders, templates, and task boards are created in seconds.',
    tools: 'Google Drive API + Asana / Jira / ClickUp + Slack API',
    icon: FolderPlus,
    manualPain: 'PMs spend an hour duplicating old Drive folders, renaming files, and building project boards by hand.',
    automatedResult: 'Standardized Google Drive folders, SOW trackers, and templated project boards are generated and linked back to the CRM.',
    timeSaved: 'Zero manual folder or board setup',
    liveActions: [
      { label: 'Google Drive', detail: 'Created /Clients/Acme Corp/ with 6 standardized deliverable folders', status: 'Created' },
      { label: 'Project Board', detail: 'Generated Asana project from "Retainer Template" with 18 milestones', status: 'Provisioned' },
      { label: 'Team Channel', detail: 'Created #client-acme-corp in Slack & posted SOW summary', status: 'Active' }
    ]
  },
  {
    id: 2,
    badge: 'STEP 03 · CAPACITY ENGINE',
    title: 'Live Staffing & Utilization Allocation',
    subtitle: 'Our Google Workspace capacity planner matches available staff to the project.',
    tools: 'Google Sheets + Custom Google Apps Script Capacity Engine',
    icon: Table,
    manualPain: 'Ops leads open 5 disconnected staffing spreadsheets to guess who has bandwidth next month.',
    automatedResult: 'The capacity engine checks 8-week utilization across all 17 teams, assigns the best-fit staff, and flags any overload.',
    timeSaved: 'Saves ~16 hrs/person/mo in scheduling',
    liveActions: [
      { label: 'Strategist (30h/mo)', detail: 'Assigned M. Vance (Utilization: 68% → 86% · Healthy)', status: 'Allocated' },
      { label: 'Sr. Designer (50h/mo)', detail: 'Assigned K. Lin (Utilization: 62% → 93% · Optimal)', status: 'Allocated' },
      { label: 'Capacity Forecast', detail: 'Updated 8-week department bandwidth rollup automatically', status: 'Calibrated' }
    ]
  },
  {
    id: 3,
    badge: 'STEP 04 · ROLLUPS & BILLING',
    title: 'Automated Monday Digest & Billing Triggers',
    subtitle: 'No more Friday Slack chases—leadership gets automatic status & margin rollups.',
    tools: 'Google Workspace + Slack Bot + Stripe / QuickBooks',
    icon: BellRing,
    manualPain: 'PMs spend every Friday afternoon chasing team updates and manually reconciling billable hours for finance.',
    automatedResult: 'Every Monday at 8:00 AM, leadership receives an automated utilization & budget digest, and completed milestones trigger draft invoices.',
    timeSaved: 'Eliminates the Friday afternoon status chase',
    liveActions: [
      { label: 'Monday 8:00 AM Digest', detail: 'Sent executive utilization & burn-rate summary to #leadership-ops', status: 'Delivered' },
      { label: 'Budget vs. Actuals', detail: '94% on-budget across active retainers · 0 unstaffed roles', status: 'On Track' },
      { label: 'Finance Trigger', detail: 'Drafted Milestone 1 invoice in QuickBooks / Stripe upon sign-off', status: 'Ready' }
    ]
  }
];

export default function HeroPipeline() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const handleRunSimulation = () => {
    clearTimers();
    setIsPlaying(true);
    setActiveStep(0);
    setCompletedSteps([0]);

    const t1 = window.setTimeout(() => {
      setActiveStep(1);
      setCompletedSteps([0, 1]);
    }, 1800);

    const t2 = window.setTimeout(() => {
      setActiveStep(2);
      setCompletedSteps([0, 1, 2]);
    }, 3600);

    const t3 = window.setTimeout(() => {
      setActiveStep(3);
      setCompletedSteps([0, 1, 2, 3]);
      setIsPlaying(false);
    }, 5400);

    timersRef.current = [t1, t2, t3];
  };

  const handleSelectStep = (index: number) => {
    clearTimers();
    setIsPlaying(false);
    setActiveStep(index);
    const completed = Array.from({ length: index + 1 }, (_, i) => i);
    setCompletedSteps(completed);
  };

  const current = PIPELINE_STEPS[activeStep];

  return (
    <div className="w-full font-sans select-none">
      <div 
        className="rounded-3xl border-2 border-[#D5CEC2] p-6 md:p-10 shadow-xl relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFFEFA 0%, #F3EDE2 100%)' }}
      >
        {/* Top Bar: Clear Context & Action Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#D5CEC2]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E7DF] border border-[#E5C5B3] text-[#9A3B1B] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B44C27]" />
              Interactive System Walkthrough
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#1C1917]">
              Scenario: New $15k/mo Agency Retainer Closes in CRM
            </h3>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleRunSimulation}
              style={{ background: 'linear-gradient(135deg, #B85028 0%, #8E3717 100%)' }}
              className="px-5 py-3 rounded-xl text-white font-semibold text-sm flex items-center gap-2 shadow-md hover:opacity-95 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>Running Step {activeStep + 1} of 4...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Auto-Play All 4 Steps</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main 2-Column Layout: Left = 4 Clear Steps, Right = High-Contrast Live Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: 4 Interactive Step Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3.5">
            {PIPELINE_STEPS.map((step, idx) => {
              const IconComponent = step.icon;
              const isSelected = activeStep === idx;
              const isDone = completedSteps.includes(idx);

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleSelectStep(idx)}
                  className={`w-full text-left p-4 md:p-5 rounded-2xl transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-[#FFFEFA] border-2 border-[#B44C27] shadow-md'
                      : 'bg-[#FAF7F2]/90 border border-[#D5CEC2] hover:border-[#B44C27]/50 hover:bg-[#FFFEFA]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? 'bg-[#B44C27] text-white'
                        : isDone
                        ? 'bg-[#E8F2EC] text-[#2D6A4F]'
                        : 'bg-[#EFECE5] text-[#57534E]'
                    }`}
                  >
                    {isDone && !isSelected ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          isSelected ? 'text-[#B44C27]' : 'text-[#57534E]'
                        }`}
                      >
                        {step.badge}
                      </span>
                      {isSelected && (
                        <span className="text-xs font-bold text-[#B44C27] flex items-center gap-1">
                          Viewing <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-[#1C1917] leading-snug mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-[#57534E] leading-relaxed font-normal">
                      {step.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: High-Contrast Step Detail & Live Output Panel (7 cols) */}
          <div 
            className="lg:col-span-7 rounded-2xl p-6 md:p-8 text-white flex flex-col justify-between border border-[#3A332C] shadow-lg"
            style={{ background: 'linear-gradient(145deg, #1C1917 0%, #26201B 55%, #1A2821 100%)' }}
          >
            <div className="space-y-6">
              {/* Panel Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/15">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#F5CBA7] block mb-1">
                    {current.badge} · UNDER THE HOOD
                  </span>
                  <h4 className="text-xl md:text-2xl font-bold text-white">
                    {current.title}
                  </h4>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-[#2D6A4F]/40 border border-[#84C5A2]/40 text-[#84C5A2] text-xs font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {current.timeSaved}
                </span>
              </div>

              {/* Before vs After Comparison Boxes (Super Easy to Read) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-red-950/35 border border-red-400/25">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-300 mb-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    Without CaulHaus (Manual)
                  </div>
                  <p className="text-sm text-stone-200 leading-relaxed">
                    {current.manualPain}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#2D6A4F]/25 border border-[#84C5A2]/30">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#84C5A2] mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#84C5A2] shrink-0" />
                    With CaulHaus (Automated)
                  </div>
                  <p className="text-sm text-stone-100 leading-relaxed">
                    {current.automatedResult}
                  </p>
                </div>
              </div>

              {/* Automated Actions Executed in This Step */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D5CEC2]">
                    Automated Actions Executed in Step 0{activeStep + 1}:
                  </span>
                  <span className="text-xs text-[#F5CBA7] font-medium">
                    {current.tools}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {current.liveActions.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-white/[0.06] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-start sm:items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#84C5A2] shrink-0 mt-0.5 sm:mt-0" />
                        <div>
                          <span className="text-sm font-bold text-white mr-2">
                            {item.label}:
                          </span>
                          <span className="text-sm text-stone-200">
                            {item.detail}
                          </span>
                        </div>
                      </div>
                      <span className="self-start sm:self-center px-2.5 py-0.5 rounded bg-white/10 text-[#F5CBA7] text-xs font-bold uppercase tracking-wider shrink-0">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Step Navigation Bar inside the Inspector */}
            <div className="pt-6 mt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#D5CEC2]">
                Proven across <strong className="text-white">17 teams (37 staff)</strong> · <strong className="text-[#84C5A2]">~590 hrs/mo saved</strong>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => handleSelectStep(activeStep > 0 ? activeStep - 1 : 3)}
                  className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  ← Prev Step
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectStep(activeStep < 3 ? activeStep + 1 : 0)}
                  className="px-4 py-2 rounded-lg bg-[#B44C27] hover:bg-[#9A3B1B] text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{activeStep < 3 ? `Next: Step 0${activeStep + 2}` : 'Restart Step 01'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
