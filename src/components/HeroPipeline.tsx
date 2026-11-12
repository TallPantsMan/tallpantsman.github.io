import React, { useState } from 'react';
import {
  Briefcase,
  FileSpreadsheet,
  FolderKanban,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  Cpu,
  Clock,
  DollarSign
} from 'lucide-react';

export default function HeroPipeline() {
  const [connected, setConnected] = useState<boolean>(true);

  const TOOLS = [
    { name: 'Sales CRM', sub: 'HubSpot · Salesforce', icon: Briefcase, color: '#B44C27' },
    { name: 'Google Sheets', sub: 'Staffing · Capacity', icon: FileSpreadsheet, color: '#2D6A4F' },
    { name: 'Project Boards', sub: 'Asana · Jira · ClickUp', icon: FolderKanban, color: '#B44C27' },
    { name: 'Slack & Billing', sub: 'Updates · QuickBooks', icon: MessageSquare, color: '#2D6A4F' }
  ];

  const STAFF_BARS = [
    { name: 'Design Team', pct: connected ? 88 : 118, status: connected ? '88% Optimal' : '118% Overloaded' },
    { name: 'Engineering', pct: connected ? 84 : 52, status: connected ? '84% Optimal' : '52% Underbooked' },
    { name: 'Strategy & PM', pct: connected ? 82 : 110, status: connected ? '82% Optimal' : '110% Overloaded' }
  ];

  return (
    <div className="w-full font-sans select-none">
      <div
        className="rounded-3xl border-2 border-[#D5CEC2] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFFEFA 0%, #F2ECE1 100%)' }}
      >
        {/* Top Bar: Client Tag + 1-Click Visual Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#D5CEC2]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#1C1917] text-[#F5CBA7] text-xs font-bold uppercase tracking-wider">
              For 20–150 Person Agencies &amp; Consultancies
            </span>
          </div>

          <div className="inline-flex rounded-xl bg-[#E4DFD5] p-1 border border-[#D5CEC2]">
            <button
              type="button"
              onClick={() => setConnected(false)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                !connected
                  ? 'bg-[#9A3B1B] text-white shadow-sm'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <XCircle className="w-4 h-4" />
              <span>Before (Manual Spreadsheets)</span>
            </button>
            <button
              type="button"
              onClick={() => setConnected(true)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                connected
                  ? 'bg-[#2D6A4F] text-white shadow-sm'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>With CaulHaus (Automated)</span>
            </button>
          </div>
        </div>

        {/* ================= MAIN VISUAL DIAGRAM (TOOLS -> SVG LINES -> ENGINE -> RESULTS) ================= */}
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
                    <div className="text-sm font-bold text-[#1C1917] truncate">{t.name}</div>
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
                    stroke={connected ? '#2D6A4F' : '#DC2626'}
                    strokeWidth="3"
                    strokeDasharray={connected ? 'none' : '6 6'}
                    opacity={connected ? 0.85 : 0.5}
                  />
                  {connected && (
                    <circle r="4.5" fill="#B44C27">
                      <animateMotion
                        dur={`${1.6 + i * 0.25}s`}
                        repeatCount="indefinite"
                        path={`M 0 ${y} C 40 ${y}, 40 120, 80 120`}
                      />
                    </circle>
                  )}
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
              className="rounded-3xl p-6 text-white border-2 shadow-xl transition-all duration-300"
              style={{
                background: connected
                  ? 'linear-gradient(145deg, #1C1917 0%, #26201B 55%, #1A2821 100%)'
                  : 'linear-gradient(145deg, #3B1812 0%, #241310 100%)',
                borderColor: connected ? '#B44C27' : '#EF4444'
              }}
            >
              {/* Hub Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      connected ? 'bg-[#B44C27]' : 'bg-red-600'
                    }`}
                  >
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      {connected ? 'CaulHaus Workspace Engine' : 'No Automation Layer'}
                    </div>
                    <div className="text-xs text-[#F5CBA7]">
                      {connected ? 'Custom Apps Script + Webhooks' : 'PMs Copy-Paste by Hand'}
                    </div>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    connected
                      ? 'bg-[#2D6A4F]/50 text-[#84C5A2] border border-[#84C5A2]/40'
                      : 'bg-red-500/30 text-red-200'
                  }`}
                >
                  {connected ? 'Live Sync' : 'Manual'}
                </span>
              </div>

              {/* Visual Live Utilization Meter Graphic */}
              <div className="space-y-3.5 mb-5">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#D5CEC2]">
                  <span>Live Team Capacity</span>
                  <span className={connected ? 'text-[#84C5A2]' : 'text-red-300'}>
                    {connected ? 'Balanced' : 'Unbalanced'}
                  </span>
                </div>

                {STAFF_BARS.map((bar) => (
                  <div key={bar.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-white">{bar.name}</span>
                      <span className={connected ? 'text-[#84C5A2]' : 'text-red-300'}>
                        {bar.status}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          connected
                            ? 'bg-gradient-to-r from-[#2D6A4F] to-[#84C5A2]'
                            : bar.pct > 100
                            ? 'bg-red-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min(bar.pct, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* 3 Visual Automation Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/15 text-center">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-[#F5CBA7]">Auto-Folders</div>
                  <div className="text-[11px] text-stone-300 mt-0.5">
                    {connected ? '✓ Active' : '✗ Manual'}
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-[#F5CBA7]">8-Wk Staffing</div>
                  <div className="text-[11px] text-stone-300 mt-0.5">
                    {connected ? '✓ Active' : '✗ Guesswork'}
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-[#F5CBA7]">Mon. Digest</div>
                  <div className="text-[11px] text-stone-300 mt-0.5">
                    {connected ? '✓ Active' : '✗ Fri. Chase'}
                  </div>
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
                    stroke={connected ? '#B44C27' : '#DC2626'}
                    strokeWidth="3"
                    strokeDasharray={connected ? 'none' : '6 6'}
                    opacity={connected ? 0.85 : 0.5}
                  />
                  {connected && (
                    <circle r="4.5" fill="#2D6A4F">
                      <animateMotion
                        dur={`${1.5 + i * 0.3}s`}
                        repeatCount="indefinite"
                        path={`M 0 120 C 40 120, 40 ${y}, 80 ${y}`}
                      />
                    </circle>
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* 5. RIGHT: VISUAL OUTCOME GAUGES (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#2D6A4F] text-center lg:text-left mb-2">
              3. Your Client Benefit
            </div>

            {/* KPI Card 1 */}
            <div className="bg-[#FFFEFA] border-2 border-[#D5CEC2] rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase text-[#57534E] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#B44C27]" /> Time Saved
                </span>
                <span className="text-xs font-bold text-[#2D6A4F] bg-[#E8F2EC] px-2 py-0.5 rounded-full">
                  17-Team Proof
                </span>
              </div>
              <div className="text-2xl font-black text-[#1C1917]">
                {connected ? '~590 hrs/mo' : '0 hrs saved'}
              </div>
              <div className="text-xs text-[#57534E] mt-0.5">
                {connected ? '~16 hrs/person/mo reclaimed' : '16 hrs/person lost in sheets'}
              </div>
            </div>

            {/* KPI Card 2 */}
            <div className="bg-[#FFFEFA] border-2 border-[#D5CEC2] rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase text-[#57534E] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#B44C27]" /> Deal Kickoff
                </span>
                <span className="text-xs font-bold text-[#9A3B1B] bg-[#F2E7DF] px-2 py-0.5 rounded-full">
                  Speed
                </span>
              </div>
              <div className="text-2xl font-black text-[#1C1917]">
                {connected ? '10 Seconds' : '2–3 Days'}
              </div>
              <div className="text-xs text-[#57534E] mt-0.5">
                {connected ? 'Auto-creates Drive & PM boards' : 'Manual folder & board setup'}
              </div>
            </div>

            {/* KPI Card 3 */}
            <div className="bg-[#FFFEFA] border-2 border-[#D5CEC2] rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase text-[#57534E] flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-[#2D6A4F]" /> New SaaS Fees
                </span>
                <span className="text-xs font-bold text-[#2D6A4F] bg-[#E8F2EC] px-2 py-0.5 rounded-full">
                  You Own It
                </span>
              </div>
              <div className="text-2xl font-black text-[#2D6A4F]">
                {connected ? '$0 / Seat' : '$50 / Seat'}
              </div>
              <div className="text-xs text-[#57534E] mt-0.5">
                {connected ? 'Runs inside Google Workspace' : 'Bloated PSA software tax'}
              </div>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM: COMPACT 3-PILL ENGAGEMENT TIMELINE ================= */}
        <div className="mt-8 pt-6 border-t border-[#D5CEC2] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#57534E] mr-1">
              How We Work:
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#FFFEFA] border border-[#D5CEC2] text-xs font-bold text-[#1C1917]">
              1. 2-Week Audit &amp; Prototype
            </span>
            <ArrowRight className="w-4 h-4 text-[#B44C27] hidden sm:inline" />
            <span className="px-3.5 py-1.5 rounded-full bg-[#F2E7DF] border border-[#E5C5B3] text-xs font-bold text-[#9A3B1B]">
              2. 4–6 Week Build (100% Audit Credited)
            </span>
            <ArrowRight className="w-4 h-4 text-[#B44C27] hidden sm:inline" />
            <span className="px-3.5 py-1.5 rounded-full bg-[#E8F2EC] border border-[#B7D7C6] text-xs font-bold text-[#2D6A4F]">
              3. Monthly Calibration
            </span>
          </div>

          <a
            href="/contact/?area=Audit"
            style={{ background: 'linear-gradient(135deg, #B85028 0%, #8E3717 100%)' }}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:opacity-95 transition-all shrink-0"
          >
            <span>Request a 2-Week Audit</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
