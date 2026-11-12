import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Folder,
  FileSpreadsheet,
  Briefcase,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Users,
  TrendingUp,
  Layers,
  Receipt
} from 'lucide-react';

export default function HeroPipeline() {
  const [activeStep, setActiveStep] = useState<number>(2); // Default to the flagship Capacity Heatmap graphic!
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
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

    const t1 = window.setTimeout(() => setActiveStep(1), 2200);
    const t2 = window.setTimeout(() => setActiveStep(2), 4400);
    const t3 = window.setTimeout(() => {
      setActiveStep(3);
      setIsPlaying(false);
    }, 6600);

    timersRef.current = [t1, t2, t3];
  };

  const handleSelectStep = (idx: number) => {
    clearTimers();
    setIsPlaying(false);
    setActiveStep(idx);
  };

  const NODES = [
    {
      id: 0,
      step: '01',
      title: 'CRM Deal Closes',
      sub: 'HubSpot / Salesforce',
      icon: Briefcase,
      metric: '$15k/mo Won'
    },
    {
      id: 1,
      step: '02',
      title: 'Project Spin-Up',
      sub: 'Drive + Asana / Jira',
      icon: Folder,
      metric: 'Auto-Created'
    },
    {
      id: 2,
      step: '03',
      title: 'Capacity Engine',
      sub: 'Google Sheets + Script',
      icon: FileSpreadsheet,
      metric: '8-Wk Heatmap'
    },
    {
      id: 3,
      step: '04',
      title: 'Monday Rollup',
      sub: 'Slack + QuickBooks',
      icon: MessageSquare,
      metric: '8:00 AM Digest'
    }
  ];

  return (
    <div className="w-full font-sans select-none">
      <div
        className="rounded-3xl border-2 border-[#D5CEC2] p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFFEFA 0%, #F2ECE1 100%)' }}
      >
        {/* Subtle Architectural Grid SVG Background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="arch-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1C1917" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />
        </svg>

        {/* ================= TOP BAR: TITLE & SIMULATE BUTTON ================= */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#D5CEC2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F2E7DF] border border-[#E5C5B3] flex items-center justify-center text-[#B44C27] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A3B1B] block">
                Interactive Architecture Graphic
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#1C1917]">
                Click Any Node to Inspect the Live System Screen
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRunSimulation}
            style={{ background: 'linear-gradient(135deg, #B85028 0%, #8E3717 100%)' }}
            className="px-5 py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            {isPlaying ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Animating Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Simulate Deal-to-Delivery Flow</span>
              </>
            )}
          </button>
        </div>

        {/* ================= GRAPHIC PIPELINE DIAGRAM (4 VISUAL NODES + SVG CONNECTORS) ================= */}
        <div className="relative z-10 mb-8">
          {/* Desktop Animated SVG Connector Track Behind Nodes */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] -translate-y-1/2 h-3 pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 12" preserveAspectRatio="none">
              {/* Base Track */}
              <line
                x1="0"
                y1="6"
                x2="800"
                y2="6"
                stroke="#D5CEC2"
                strokeWidth="4"
                strokeDasharray="8 6"
                strokeLinecap="round"
              />
              {/* Active Progress Fill */}
              <line
                x1="0"
                y1="6"
                x2={(activeStep / 3) * 800}
                y2="6"
                stroke="#B44C27"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ transition: 'all 0.5s ease-out' }}
              />
              {/* Glowing Data Pulse Dot */}
              <circle
                cx={(activeStep / 3) * 800}
                cy="6"
                r="7"
                fill="#B44C27"
                style={{ transition: 'all 0.5s ease-out' }}
              >
                <animate attributeName="r" values="6;9;6" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {/* 4 Visual Node Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 relative z-10">
            {NODES.map((node, idx) => {
              const Icon = node.icon;
              const isSelected = activeStep === idx;
              const isPassed = idx <= activeStep;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => handleSelectStep(idx)}
                  className={`group text-left p-4 rounded-2xl transition-all duration-300 cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#1C1917] text-white border-2 border-[#B44C27] shadow-xl -translate-y-1'
                      : 'bg-[#FFFEFA] text-[#1C1917] border-2 border-[#D5CEC2] hover:border-[#B44C27]/60 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#B44C27] text-white'
                          : isPassed
                          ? 'bg-[#E8F2EC] text-[#2D6A4F]'
                          : 'bg-[#EFECE5] text-[#57534E]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${
                        isSelected
                          ? 'bg-[#B44C27]/30 text-[#F5CBA7] border border-[#F5CBA7]/30'
                          : isPassed
                          ? 'bg-[#E8F2EC] text-[#2D6A4F]'
                          : 'bg-[#EFECE5] text-[#57534E]'
                      }`}
                    >
                      {node.metric}
                    </span>
                  </div>

                  <div>
                    <div
                      className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${
                        isSelected ? 'text-[#F5CBA7]' : 'text-[#9A3B1B]'
                      }`}
                    >
                      STEP {node.step}
                    </div>
                    <div className="text-base font-bold leading-snug">{node.title}</div>
                    <div
                      className={`text-xs mt-0.5 ${
                        isSelected ? 'text-stone-300' : 'text-[#57534E]'
                      }`}
                    >
                      {node.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= VISUAL STAGE: MOCKUP GRAPHICS FOR EACH STEP ================= */}
        <div
          className="relative z-10 rounded-2xl border-2 border-[#3A332C] p-5 sm:p-8 text-white shadow-2xl overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #1C1917 0%, #26201B 52%, #1A2821 100%)' }}
        >
          {/* Browser / App Window Chrome Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/15">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#B44C27]" />
              <span className="w-3 h-3 rounded-full bg-[#D97706]" />
              <span className="w-3 h-3 rounded-full bg-[#2D6A4F]" />
              <span className="ml-2 text-xs font-semibold uppercase tracking-widest text-[#D5CEC2]">
                {activeStep === 0 && 'LIVE VIEW · CRM DEAL WEBHOOK PAYLOAD'}
                {activeStep === 1 && 'LIVE VIEW · AUTO-PROVISIONED DRIVE & KANBAN BOARD'}
                {activeStep === 2 && 'LIVE VIEW · GOOGLE WORKSPACE CAPACITY & UTILIZATION HEATMAP'}
                {activeStep === 3 && 'LIVE VIEW · MONDAY 8:00 AM SLACK DIGEST & INVOICE TRIGGER'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#2D6A4F]/40 border border-[#84C5A2]/40 text-[#84C5A2]">
                <span className="w-2 h-2 rounded-full bg-[#84C5A2] animate-pulse" />
                Zero New Per-Seat Licenses
              </span>
            </div>
          </div>

          {/* ---------------- GRAPHIC 01: CRM DEAL CARD -> EXTRACTED ROLES ---------------- */}
          {activeStep === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-fade-in">
              {/* Left: Visual CRM Deal Card */}
              <div className="lg:col-span-5 bg-[#FFFEFA] text-[#1C1917] rounded-2xl p-5 border-2 border-[#D5CEC2] shadow-lg">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E4DFD5]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#B44C27] text-white flex items-center justify-center font-bold text-sm">
                      HS
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase text-[#57534E]">CRM Opportunity</div>
                      <div className="text-base font-bold text-[#1C1917]">Acme Corp — Q3 Retainer</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#E8F2EC] text-[#2D6A4F] text-xs font-bold uppercase">
                    Closed-Won ✓
                  </span>
                </div>

                {/* Deal Pipeline Stage Graphic */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-bold text-[#57534E] mb-1.5">
                    <span>Pipeline Stage</span>
                    <span className="text-[#2D6A4F]">100% Signed</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 h-2.5">
                    <div className="rounded-l-full bg-[#2D6A4F]" />
                    <div className="bg-[#2D6A4F]" />
                    <div className="bg-[#2D6A4F]" />
                    <div className="rounded-r-full bg-[#2D6A4F]" />
                  </div>
                </div>

                {/* Deal Key Metrics Graphic */}
                <div className="grid grid-cols-2 gap-3 bg-[#F7F4EE] p-3.5 rounded-xl border border-[#E4DFD5]">
                  <div>
                    <div className="text-xs text-[#57534E] font-semibold">Monthly Retainer</div>
                    <div className="text-xl font-black text-[#1C1917]">$15,000/mo</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#57534E] font-semibold">Contracted Hours</div>
                    <div className="text-xl font-black text-[#B44C27]">120 hrs/mo</div>
                  </div>
                </div>
              </div>

              {/* Center: Visual SVG Webhook Bridge */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center py-2">
                <div className="px-3 py-1.5 rounded-full bg-[#B44C27] text-white text-xs font-bold uppercase tracking-wider shadow-md mb-2">
                  Webhook
                </div>
                <svg className="w-24 h-8 hidden lg:block" viewBox="0 0 100 24">
                  <line x1="0" y1="12" x2="88" y2="12" stroke="#F5CBA7" strokeWidth="3" strokeDasharray="6 4" />
                  <polygon points="88,6 100,12 88,18" fill="#F5CBA7" />
                </svg>
                <span className="text-xs text-[#F5CBA7] font-semibold mt-1">0.4s Trigger</span>
              </div>

              {/* Right: Visual Extracted SOW Staffing Requirements Graphic */}
              <div className="lg:col-span-5 bg-white/10 rounded-2xl p-5 border border-white/15 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F5CBA7]">
                    Auto-Extracted SOW Role Breakdown
                  </span>
                  <span className="text-xs font-bold text-[#84C5A2]">120 Hrs Total</span>
                </div>

                {/* Visual Role Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-1">
                      <span>Senior Designer</span>
                      <span className="text-[#F5CBA7]">50 hrs/mo (42%)</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#B44C27] rounded-full" style={{ width: '42%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-1">
                      <span>Full-Stack Engineer</span>
                      <span className="text-[#84C5A2]">40 hrs/mo (33%)</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2D6A4F] rounded-full" style={{ width: '33%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-1">
                      <span>Lead Strategist</span>
                      <span className="text-[#D5CEC2]">30 hrs/mo (25%)</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D97706] rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- GRAPHIC 02: DRIVE FOLDER TREE & KANBAN BOARD ---------------- */}
          {activeStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-fade-in">
              {/* Left: Visual Google Drive Folder Tree Graphic */}
              <div className="lg:col-span-5 bg-[#FFFEFA] text-[#1C1917] rounded-2xl p-5 border-2 border-[#D5CEC2] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E4DFD5]">
                    <div className="flex items-center gap-2">
                      <Folder className="w-5 h-5 text-[#B44C27] fill-[#B44C27]" />
                      <span className="text-sm font-bold">Google Drive Auto-Structure</span>
                    </div>
                    <span className="text-xs font-bold text-[#2D6A4F] bg-[#E8F2EC] px-2.5 py-0.5 rounded-full">
                      6 Folders Created
                    </span>
                  </div>

                  {/* Visual Folder Hierarchy */}
                  <div className="space-y-2 text-sm font-medium pl-1">
                    <div className="flex items-center gap-2 font-bold text-[#1C1917]">
                      <Folder className="w-4 h-4 text-[#B44C27] fill-[#B44C27]" />
                      <span>/Clients/Acme_Corp_2026/</span>
                    </div>
                    <div className="pl-5 space-y-2 border-l-2 border-[#D5CEC2] ml-2">
                      <div className="flex items-center justify-between bg-[#F7F4EE] px-3 py-1.5 rounded-lg border border-[#E4DFD5]">
                        <span className="flex items-center gap-2 text-xs font-semibold">
                          <Folder className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
                          01_SOW_&_Signed_Contracts
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                      </div>
                      <div className="flex items-center justify-between bg-[#F7F4EE] px-3 py-1.5 rounded-lg border border-[#E4DFD5]">
                        <span className="flex items-center gap-2 text-xs font-semibold">
                          <Folder className="w-3.5 h-3.5 text-[#2D6A4F] fill-[#2D6A4F]" />
                          02_Capacity_&_Staffing_Plan
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                      </div>
                      <div className="flex items-center justify-between bg-[#F7F4EE] px-3 py-1.5 rounded-lg border border-[#E4DFD5]">
                        <span className="flex items-center gap-2 text-xs font-semibold">
                          <Folder className="w-3.5 h-3.5 text-[#B44C27] fill-[#B44C27]" />
                          03_Client_Deliverables
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E4DFD5] flex items-center justify-between text-xs text-[#57534E]">
                  <span>Permissions synced by role</span>
                  <span className="font-bold text-[#1C1917]">1.2s execution</span>
                </div>
              </div>

              {/* Right: Visual Kanban Project Board Mockup */}
              <div className="lg:col-span-7 bg-white/10 rounded-2xl p-5 border border-white/15">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/15">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#F5CBA7]" />
                    <span className="text-sm font-bold text-white">
                      Asana / Jira / ClickUp Board Auto-Populated
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#84C5A2]">18 Tasks Templated</span>
                </div>

                {/* 3 Visual Kanban Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Col 1 */}
                  <div className="bg-black/25 rounded-xl p-3 border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase text-[#F5CBA7]">
                      <span>Week 1 Kickoff</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/10">3</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-xs space-y-1.5">
                      <div className="font-bold text-white">Technical Discovery</div>
                      <div className="flex items-center justify-between text-stone-300">
                        <span>M. Vance</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#2D6A4F]/50 text-[#84C5A2] font-bold">8h</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-xs space-y-1.5">
                      <div className="font-bold text-white">Architecture Audit</div>
                      <div className="flex items-center justify-between text-stone-300">
                        <span>R. Patel</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#2D6A4F]/50 text-[#84C5A2] font-bold">12h</span>
                      </div>
                    </div>
                  </div>

                  {/* Col 2 */}
                  <div className="bg-black/25 rounded-xl p-3 border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase text-[#84C5A2]">
                      <span>Sprint 1 Build</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/10">8</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-xs space-y-1.5">
                      <div className="font-bold text-white">Design System Setup</div>
                      <div className="flex items-center justify-between text-stone-300">
                        <span>K. Lin</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#B44C27]/50 text-[#F5CBA7] font-bold">24h</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-xs space-y-1.5">
                      <div className="font-bold text-white">API Webhook Sync</div>
                      <div className="flex items-center justify-between text-stone-300">
                        <span>R. Patel</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#B44C27]/50 text-[#F5CBA7] font-bold">16h</span>
                      </div>
                    </div>
                  </div>

                  {/* Col 3 */}
                  <div className="bg-black/25 rounded-xl p-3 border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase text-stone-300">
                      <span>Executive QA</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/10">7</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-xs space-y-1.5">
                      <div className="font-bold text-white">Client UAT Sign-off</div>
                      <div className="flex items-center justify-between text-stone-300">
                        <span>Milestone 1</span>
                        <span className="text-[#84C5A2] font-bold">Auto-Bill</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- GRAPHIC 03: FLAGSHIP GOOGLE WORKSPACE CAPACITY HEATMAP ---------------- */}
          {activeStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-fade-in">
              {/* Left: Visual Team Utilization Heatmap Bars (7 cols) */}
              <div className="lg:col-span-7 bg-[#FFFEFA] text-[#1C1917] rounded-2xl p-5 border-2 border-[#D5CEC2] flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#E4DFD5]">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#B44C27]" />
                      <span className="text-base font-bold text-[#1C1917]">
                        Live Google Workspace Staffing &amp; Utilization Grid
                      </span>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E8F2EC] text-[#2D6A4F]">
                      17 Teams Synced
                    </span>
                  </div>

                  {/* Visual Staff Rows with Utilization Bars */}
                  <div className="space-y-3.5">
                    {/* Person 1 */}
                    <div className="p-3 rounded-xl bg-[#F7F4EE] border border-[#E4DFD5]">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#2D6A4F] text-white text-xs font-bold flex items-center justify-center">
                            MV
                          </div>
                          <div>
                            <span className="text-sm font-bold text-[#1C1917] mr-2">Maya Vance</span>
                            <span className="text-xs text-[#57534E]">Lead Strategist</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#2D6A4F] bg-[#E8F2EC] px-2.5 py-0.5 rounded-full">
                          68% → 86% (Optimal)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-[#E4DFD5] rounded-full overflow-hidden flex">
                        <div className="h-full bg-[#2D6A4F]" style={{ width: '68%' }} />
                        <div className="h-full bg-[#B44C27]" style={{ width: '18%' }} />
                      </div>
                    </div>

                    {/* Person 2 */}
                    <div className="p-3 rounded-xl bg-[#F7F4EE] border border-[#E4DFD5]">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#B44C27] text-white text-xs font-bold flex items-center justify-center">
                            KL
                          </div>
                          <div>
                            <span className="text-sm font-bold text-[#1C1917] mr-2">Kenji Lin</span>
                            <span className="text-xs text-[#57534E]">Senior Designer</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#2D6A4F] bg-[#E8F2EC] px-2.5 py-0.5 rounded-full">
                          62% → 93% (Optimal)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-[#E4DFD5] rounded-full overflow-hidden flex">
                        <div className="h-full bg-[#2D6A4F]" style={{ width: '62%' }} />
                        <div className="h-full bg-[#B44C27]" style={{ width: '31%' }} />
                      </div>
                    </div>

                    {/* Person 3 (Overload Prevented Graphic) */}
                    <div className="p-3 rounded-xl bg-[#F2E7DF]/60 border border-[#E5C5B3]">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#8E3717] text-white text-xs font-bold flex items-center justify-center">
                            RP
                          </div>
                          <div>
                            <span className="text-sm font-bold text-[#1C1917] mr-2">Elena Rostova</span>
                            <span className="text-xs text-[#57534E]">Full-Stack Lead</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#9A3B1B] bg-[#F2E7DF] px-2.5 py-0.5 rounded-full">
                          95% Cap · Auto-Rerouted to R. Patel (78%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-[#E4DFD5] rounded-full overflow-hidden flex">
                        <div className="h-full bg-[#D97706]" style={{ width: '95%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-4 pt-3 border-t border-[#E4DFD5] flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-xs bg-[#2D6A4F] inline-block" /> Existing Load
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-xs bg-[#B44C27] inline-block" /> New Deal Allocation
                    </span>
                  </div>
                  <span className="font-bold text-[#1C1917]">~16 hrs/person/mo saved</span>
                </div>
              </div>

              {/* Right: Visual 8-Week Bandwidth Forecast Bar Chart (5 cols) */}
              <div className="lg:col-span-5 bg-white/10 rounded-2xl p-5 border border-white/15 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/15">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#84C5A2]" />
                      <span className="text-sm font-bold text-white">8-Week Agency Utilization Forecast</span>
                    </div>
                    <span className="text-xs font-bold text-[#F5CBA7]">Target: 85%</span>
                  </div>

                  {/* Visual Vertical Bar Chart */}
                  <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-white/15 relative">
                    {/* 85% Target Dashed Line */}
                    <div
                      className="absolute left-0 right-0 border-t-2 border-dashed border-[#F5CBA7]/60 pointer-events-none flex justify-end pr-1"
                      style={{ bottom: '82%' }}
                    >
                      <span className="text-[10px] font-bold text-[#F5CBA7] -mt-4 bg-[#1C1917] px-1.5 rounded">
                        85% Target
                      </span>
                    </div>

                    {[
                      { wk: 'W1', pct: 76, color: 'bg-[#2D6A4F]' },
                      { wk: 'W2', pct: 82, color: 'bg-[#2D6A4F]' },
                      { wk: 'W3', pct: 86, color: 'bg-[#84C5A2]' },
                      { wk: 'W4', pct: 88, color: 'bg-[#84C5A2]' },
                      { wk: 'W5', pct: 84, color: 'bg-[#2D6A4F]' },
                      { wk: 'W6', pct: 79, color: 'bg-[#2D6A4F]' },
                      { wk: 'W7', pct: 72, color: 'bg-[#B44C27]' },
                      { wk: 'W8', pct: 68, color: 'bg-[#B44C27]' }
                    ].map((bar) => (
                      <div key={bar.wk} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <span className="text-[11px] font-bold text-stone-200">{bar.pct}%</span>
                        <div
                          className={`w-full rounded-t-md transition-all duration-500 ${bar.color}`}
                          style={{ height: `${bar.pct}%` }}
                        />
                        <span className="text-xs font-bold text-stone-300">{bar.wk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-black/25 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#D5CEC2]">Flagship Case Study Result</div>
                    <div className="text-sm font-bold text-white">~590 Hrs/Mo Saved Across 37 Staff</div>
                  </div>
                  <a
                    href="/projects/"
                    className="px-3 py-1.5 rounded-lg bg-[#B44C27] hover:bg-[#9A3B1B] text-white text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- GRAPHIC 04: MONDAY SLACK DIGEST & INVOICE TRIGGER ---------------- */}
          {activeStep === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-fade-in">
              {/* Left: Visual Slack Executive Digest UI Card (7 cols) */}
              <div className="lg:col-span-7 bg-[#FFFEFA] text-[#1C1917] rounded-2xl p-5 border-2 border-[#D5CEC2]">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E4DFD5]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1C1917] text-white flex items-center justify-center font-bold text-xs">
                      #
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1C1917]">#leadership-ops</div>
                      <div className="text-xs text-[#57534E]">Automated every Monday at 8:00 AM</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#E8F2EC] text-[#2D6A4F] text-xs font-bold">
                    Zero Friday Chasing
                  </span>
                </div>

                {/* Visual Slack Bot Message */}
                <div className="p-4 rounded-xl bg-[#F7F4EE] border-l-4 border-[#B44C27] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1C1917]">
                      CaulHaus Capacity &amp; Margin Bot
                    </span>
                    <span className="text-xs text-[#57534E]">Monday · 8:00 AM</span>
                  </div>

                  {/* 3 Visual Mini KPIs inside Slack */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="bg-[#FFFEFA] p-2.5 rounded-lg border border-[#E4DFD5] text-center">
                      <div className="text-xs text-[#57534E]">Billable Util.</div>
                      <div className="text-lg font-black text-[#2D6A4F]">84.2%</div>
                    </div>
                    <div className="bg-[#FFFEFA] p-2.5 rounded-lg border border-[#E4DFD5] text-center">
                      <div className="text-xs text-[#57534E]">Active Retainers</div>
                      <div className="text-lg font-black text-[#1C1917]">94% On-Track</div>
                    </div>
                    <div className="bg-[#FFFEFA] p-2.5 rounded-lg border border-[#E4DFD5] text-center">
                      <div className="text-xs text-[#57534E]">Overloaded Roles</div>
                      <div className="text-lg font-black text-[#B44C27]">0 Staff</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Visual Finance & Invoice Trigger Graphic (5 cols) */}
              <div className="lg:col-span-5 bg-white/10 rounded-2xl p-5 border border-white/15 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/15">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-5 h-5 text-[#F5CBA7]" />
                      <span className="text-sm font-bold text-white">Delivery-to-Finance Trigger</span>
                    </div>
                    <span className="text-xs font-bold text-[#84C5A2]">Stripe / QuickBooks</span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/25 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold text-[#D5CEC2]">Draft Invoice #INV-2048</span>
                      <span className="px-2 py-0.5 rounded bg-[#2D6A4F]/50 text-[#84C5A2] text-xs font-bold">
                        Auto-Generated
                      </span>
                    </div>
                    <div className="text-2xl font-black text-white">$15,000.00</div>
                    <div className="text-xs text-stone-300">
                      Triggered automatically upon Asana/Jira Milestone 01 completion &amp; time-sheet reconciliation.
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/15 flex items-center justify-between text-xs">
                  <span className="text-[#D5CEC2]">Billing leakage prevented</span>
                  <span className="font-bold text-[#84C5A2]">100% Reconciled ✓</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
