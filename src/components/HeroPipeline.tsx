import React from 'react';
import {
  Briefcase,
  FileSpreadsheet,
  FolderKanban,
  MessageSquare,
  CheckCircle2,
  Zap,
  ArrowRight,
  Cpu,
  Clock,
  DollarSign
} from 'lucide-react';

export default function HeroPipeline() {
  const TOOLS = [
    { name: 'Sales CRM', sub: 'HubSpot · Salesforce', icon: Briefcase, color: '#B44C27' },
    { name: 'Google Sheets', sub: 'Staffing · Capacity', icon: FileSpreadsheet, color: '#2D6A4F' },
    { name: 'Project Boards', sub: 'Asana · Jira · ClickUp', icon: FolderKanban, color: '#B44C27' },
    { name: 'Slack & Billing', sub: 'Updates · QuickBooks', icon: MessageSquare, color: '#2D6A4F' }
  ];

  const STAFF_BARS = [
    { name: 'Design Team', before: '118% Overloaded', after: '88% Optimal', pct: 88 },
    { name: 'Engineering', before: '52% Idle', after: '84% Optimal', pct: 84 },
    { name: 'Strategy & PM', before: '110% Overloaded', after: '82% Optimal', pct: 82 }
  ];

  return (
    <div className="w-full font-sans select-none">
      <div
        className="rounded-3xl border-2 border-[#D5CEC2] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFFEFA 0%, #F2ECE1 100%)' }}
      >
        {/* Top Bar: Client Tag + Always-On Before -> After Legend */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#D5CEC2]">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-[#1C1917] text-[#F5CBA7] text-xs font-bold uppercase tracking-wider">
              For 20–150 Person Agencies &amp; Consultancies
            </span>
          </div>

          <div className="inline-flex flex-wrap items-center gap-2 rounded-xl bg-[#EAE4D9] px-3.5 py-2 border border-[#D5CEC2] text-xs font-bold">
            <span className="px-2 py-0.5 rounded bg-red-900/10 text-[#9A3B1B] line-through">
              Before: Manual Silos
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#57534E]" />
            <span className="px-2.5 py-0.5 rounded bg-[#2D6A4F] text-white flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> With CaulHaus: Automated
            </span>
          </div>
        </div>

        {/* ================= MAIN VISUAL DIAGRAM (TOOLS -> SVG LINES -> ENGINE -> BEFORE/AFTER RESULTS) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* 1. LEFT: CLIENT'S EXISTING TOOLS (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#57534E] text-center lg:text-left mb-2">
              1. Your Existing Stack
            </div>
            {TOOLS.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.name}
                  className="bg-[#FFFEFA] border-2 border-[#D5CEC2] rounded-2xl p-3.5 flex items-center gap-3 shadow-xs"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-bold text-[#1C1917] truncate">{t.name}</span>
                      <span className="text-[11px] font-bold text-[#2D6A4F] bg-[#E8F2EC] px-2 py-0.5 rounded-full shrink-0">
                        Synced
                      </span>
                    </div>
                    <div className="text-xs text-[#57534E] truncate">{t.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2. SVG CONNECTOR PIPES (1 Col on Desktop) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center h-full">
            <svg className="w-full h-64 overflow-visible" viewBox="0 0 80 240">
              {[30, 90, 150, 210].map((y, i) => (
                <g key={i}>
                  <path
                    d={`M 0 ${y} C 40 ${y}, 40 120, 80 120`}
                    fill="none"
                    stroke="#2D6A4F"
                    strokeWidth="3"
                    opacity={0.85}
                  />
                  <circle r="4.5" fill="#B44C27">
                    <animateMotion
                      dur={`${1.6 + i * 0.25}s`}
                      repeatCount="indefinite"
                      path={`M 0 ${y} C 40 ${y}, 40 120, 80 120`}
                    />
                  </circle>
                </g>
              ))}
            </svg>
          </div>

          {/* 3. CENTER: CAULHAUS VISUAL ENGINE HUB (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#9A3B1B] text-center mb-2">
              2. Where CaulHaus Plugs In
            </div>
            <div
              className="rounded-3xl p-6 text-white border-2 border-[#B44C27] shadow-xl"
              style={{
                background: 'linear-gradient(145deg, #1C1917 0%, #26201B 55%, #1A2821 100%)'
              }}
            >
              {/* Hub Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#B44C27] flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">CaulHaus Automation Engine</div>
                    <div className="text-xs text-[#F5CBA7]">Custom Apps Script + Webhooks</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#2D6A4F]/50 text-[#84C5A2] border border-[#84C5A2]/40">
                  Live Sync
                </span>
              </div>

              {/* Before vs After Capacity Graphic */}
              <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#D5CEC2]">
                  <span>Team Capacity</span>
                  <span className="text-[#84C5A2]">Before → With CaulHaus</span>
                </div>

                {STAFF_BARS.map((bar) => (
                  <div key={bar.name} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{bar.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-red-300/80 line-through text-[11px]">{bar.before}</span>
                        <ArrowRight className="w-3 h-3 text-[#F5CBA7]" />
                        <span className="font-bold text-[#84C5A2]">{bar.after}</span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#2D6A4F] to-[#84C5A2]"
                        style={{ width: `${bar.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* 3 Visual Automation Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/15 text-center">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-[#F5CBA7]">Auto-Folders</div>
                  <div className="text-[11px] text-[#84C5A2] font-semibold mt-0.5">✓ Automated</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-[#F5CBA7]">8-Wk Staffing</div>
                  <div className="text-[11px] text-[#84C5A2] font-semibold mt-0.5">✓ Live Sync</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-[#F5CBA7]">Mon. Digest</div>
                  <div className="text-[11px] text-[#84C5A2] font-semibold mt-0.5">✓ Slack Alert</div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. SVG CONNECTOR PIPES TO OUTCOMES (1 Col on Desktop) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center h-full">
            <svg className="w-full h-64 overflow-visible" viewBox="0 0 80 240">
              {[40, 120, 200].map((y, i) => (
                <g key={i}>
                  <path
                    d={`M 0 120 C 40 120, 40 ${y}, 80 ${y}`}
                    fill="none"
                    stroke="#B44C27"
                    strokeWidth="3"
                    opacity={0.85}
                  />
                  <circle r="4.5" fill="#2D6A4F">
                    <animateMotion
                      dur={`${1.5 + i * 0.3}s`}
                      repeatCount="indefinite"
                      path={`M 0 120 C 40 120, 40 ${y}, 80 ${y}`}
                    />
                  </circle>
                </g>
              ))}
            </svg>
          </div>

          {/* 5. RIGHT: BEFORE vs AFTER CLIENT BENEFIT CARDS (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#2D6A4F] text-center lg:text-left mb-2">
              3. Before vs. After Impact
            </div>

            {/* KPI Card 1 */}
            <div className="bg-[#FFFEFA] border-2 border-[#D5CEC2] rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase text-[#57534E] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#B44C27]" /> Admin Time
                </span>
                <span className="text-xs font-bold text-[#2D6A4F] bg-[#E8F2EC] px-2 py-0.5 rounded-full">
                  17-Team Proof
                </span>
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-xs font-semibold text-[#9A3B1B] line-through bg-red-900/10 px-2 py-0.5 rounded">
                  16 hrs/person lost
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#57534E] inline" />
                <span className="text-xl font-black text-[#1C1917]">~590 hrs/mo Saved</span>
              </div>
              <div className="text-xs text-[#57534E] mt-1">
                ~16 hrs/person/mo reclaimed across teams
              </div>
            </div>

            {/* KPI Card 2 */}
            <div className="bg-[#FFFEFA] border-2 border-[#D5CEC2] rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase text-[#57534E] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#B44C27]" /> Deal Kickoff
                </span>
                <span className="text-xs font-bold text-[#9A3B1B] bg-[#F2E7DF] px-2 py-0.5 rounded-full">
                  Instant Handoff
                </span>
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-xs font-semibold text-[#9A3B1B] line-through bg-red-900/10 px-2 py-0.5 rounded">
                  2–3 Days Manual
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#57534E] inline" />
                <span className="text-xl font-black text-[#1C1917]">10 Seconds</span>
              </div>
              <div className="text-xs text-[#57534E] mt-1">
                Auto-creates Drive folders &amp; PM boards
              </div>
            </div>

            {/* KPI Card 3 */}
            <div className="bg-[#FFFEFA] border-2 border-[#D5CEC2] rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase text-[#57534E] flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-[#2D6A4F]" /> New SaaS Fees
                </span>
                <span className="text-xs font-bold text-[#2D6A4F] bg-[#E8F2EC] px-2 py-0.5 rounded-full">
                  You Own It
                </span>
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-xs font-semibold text-[#9A3B1B] line-through bg-red-900/10 px-2 py-0.5 rounded">
                  $50/Seat PSA
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#57534E] inline" />
                <span className="text-xl font-black text-[#2D6A4F]">$0 / Seat</span>
              </div>
              <div className="text-xs text-[#57534E] mt-1">
                Runs inside your existing Google Workspace
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM: SIMPLE 3-STEP ENGAGEMENT BAR ================= */}
        <div className="mt-8 pt-6 border-t border-[#D5CEC2] flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-[#1C1917]">
            <span className="text-[#57534E] uppercase tracking-wider text-xs">How We Work:</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#FFFEFA] border border-[#D5CEC2]">
              1. 2-Week Audit &amp; Prototype
            </span>
            <ArrowRight className="w-4 h-4 text-[#B44C27]" />
            <span className="px-3 py-1.5 rounded-lg bg-[#F2E7DF] text-[#9A3B1B] border border-[#B44C27]/30">
              2. 4–6 Week Build (100% Audit Credited)
            </span>
            <ArrowRight className="w-4 h-4 text-[#B44C27]" />
            <span className="px-3 py-1.5 rounded-lg bg-[#E8F2EC] text-[#2D6A4F] border border-[#2D6A4F]/30">
              3. Monthly Calibration
            </span>
          </div>

          <a
            href="/contact/?area=Audit"
            className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm shadow-md hover:opacity-95 transition-all shrink-0"
            style={{ background: 'linear-gradient(135deg, #B85028 0%, #8E3717 100%)' }}
          >
            <span>Request a 2-Week Audit</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
