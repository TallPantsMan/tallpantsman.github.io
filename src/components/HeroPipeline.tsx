import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  RefreshCw, 
  Workflow, 
  LineChart,
  Megaphone,
  Search,
  Mail,
  Sparkles,
  Info
} from 'lucide-react';

export default function HeroPipeline() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1); // -1: default, 0: campaign pulse, 1: node1, 2: node2, 3: node3/complete
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);

    // Timeline sequence
    setTimeout(() => setActiveStep(1), 600);   // Node 1: Resource Planning
    setTimeout(() => setActiveStep(2), 1600);  // Node 2: Process Automation
    setTimeout(() => setActiveStep(3), 2600);  // Node 3: Measurement & Sync

    // Reset sequence after 4.5s
    setTimeout(() => {
      setIsSimulating(false);
      setActiveStep(-1);
    }, 4500);
  };

  return (
    <div className="w-full max-w-full font-sans select-none">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-md relative overflow-hidden flex flex-col gap-6">
        
        {/* Background Subtle Tech Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#0F172A 1px, transparent 1px)', backgroundSize: '16px 16px' }} 
        />

        {/* ================= MODULE A: DEMAND ENGINE / CAMPAIGN LAYER ================= */}
        <motion.div 
          animate={{
            borderColor: activeStep === 0 ? '#4F46E5' : '#E2E8F0',
            boxShadow: activeStep === 0 ? '0 0 0 2px rgba(79, 70, 229, 0.2), 0 4px 6px -1px rgba(0,0,0,0.05)' : '0 1px 3px 0 rgba(0,0,0,0.05)'
          }}
          transition={{ duration: 0.3 }}
          className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 md:p-5 relative transition-all"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-indigo-600" />
                CAMPAIGN LAYER
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Ingesting Live
            </div>
          </div>

          {/* Inbound Channels Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
              <Megaphone className="w-3 h-3 text-indigo-500" />
              Paid Ads
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
              <Search className="w-3 h-3 text-indigo-500" />
              Content / SEO
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
              <Mail className="w-3 h-3 text-indigo-500" />
              Lifecycle
            </div>
          </div>

          {/* Metrics Grid & Action Trigger */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1 border-t border-slate-200/60">
            {/* Dashboard Mini Card */}
            <div className="sm:col-span-7 grid grid-cols-3 gap-2 bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
              <div className="text-center sm:text-left border-r border-slate-100 pr-1">
                <span className="text-[9px] font-mono uppercase text-slate-400 block font-semibold">Conv. Rate</span>
                <span className="text-xs font-bold text-emerald-600">+34%</span>
              </div>
              <div className="text-center sm:text-left border-r border-slate-100 px-1">
                <span class="text-[9px] font-mono uppercase text-slate-400 block font-semibold">ROAS</span>
                <span className="text-xs font-bold text-slate-900">4.2x</span>
              </div>
              <div className="text-center sm:text-left pl-1">
                <span className="text-[9px] font-mono uppercase text-slate-400 block font-semibold">Pipeline</span>
                <span className="text-xs font-bold text-indigo-600">$185k</span>
              </div>
            </div>

            {/* Interactive CTA Trigger */}
            <div className="sm:col-span-5 flex justify-end">
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className={`w-full py-2 px-3 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer ${
                  isSimulating 
                    ? 'bg-indigo-100 text-indigo-700 cursor-not-allowed border border-indigo-200' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                }`}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                    <span>Ingesting...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span>Simulate Lead Ingestion</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ================= MODULE B: CONNECTIVE PIPELINE / BRIDGE ================= */}
        <div className="relative py-1 flex flex-col items-center justify-center">
          {/* Vertical Connecting Line */}
          <div className="w-0.5 h-8 bg-slate-200 relative overflow-hidden rounded-full">
            {/* Ambient Pulse Effect */}
            <motion.div
              animate={{
                y: ['-100%', '300%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="w-full h-4 bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
            />

            {/* Trigger Particle Animation */}
            {isSimulating && (
              <motion.div
                initial={{ top: '-20%', opacity: 1 }}
                animate={{ top: '120%', opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-600 shadow-[0_0_8px_#4F46E5]"
              />
            )}
          </div>

          {/* Trigger Tag Label */}
          <div className="my-1 bg-white border border-indigo-200 text-indigo-700 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase shadow-2xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-indigo-500" />
            Auto-Provisioning Trigger
          </div>

          <div className="w-0.5 h-2 bg-slate-200" />
        </div>

        {/* ================= MODULE C: OPERATIONAL ENGINE LAYER ================= */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 md:p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-700 font-bold bg-slate-200/80 px-2 py-0.5 rounded flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-slate-700" />
                OPERATIONAL SYSTEMS
              </span>
            </div>

            <div className="flex items-center gap-1 bg-slate-200/60 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono font-medium">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              System Healthy
            </div>
          </div>

          {/* 3-Node Graph Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
            
            {/* NODE 1: Resource Planning */}
            <div 
              className="relative"
              onMouseEnter={() => setHoveredNode(1)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <motion.div
                animate={{
                  borderColor: activeStep >= 1 ? '#4F46E5' : '#E2E8F0',
                  boxShadow: activeStep === 1 ? '0 0 0 2px rgba(79, 70, 229, 0.2)' : '0 1px 2px rgba(0,0,0,0.03)'
                }}
                className="bg-white border rounded-xl p-3 flex flex-col justify-between h-full transition-all cursor-pointer relative z-10"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className={`p-1.5 rounded-lg ${activeStep >= 1 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                      <Workflow className="w-4 h-4" />
                    </div>
                    
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                      activeStep === 1 ? 'bg-indigo-600 text-white animate-pulse' :
                      activeStep > 1 ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {activeStep === 1 ? 'Active' : activeStep > 1 ? 'Complete' : 'Idle'}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">1. Resource Planning</h4>
                  <p className="text-[10px] text-slate-500 leading-tight">Capacity balancing &amp; auto-scoping</p>
                </div>
              </motion.div>

              {/* Hover Tooltip */}
              <AnimatePresence>
                {hoveredNode === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-[10px] rounded-lg p-2.5 shadow-xl z-30 pointer-events-none"
                  >
                    <div className="font-mono font-bold text-indigo-300 mb-1 flex items-center gap-1">
                      <Info className="w-3 h-3" /> Underlying Toolchain
                    </div>
                    Automated via Webhooks &amp; Apps Script resource engine.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* NODE 2: Process Automation */}
            <div 
              className="relative"
              onMouseEnter={() => setHoveredNode(2)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <motion.div
                animate={{
                  borderColor: activeStep >= 2 ? '#4F46E5' : '#E2E8F0',
                  boxShadow: activeStep === 2 ? '0 0 0 2px rgba(79, 70, 229, 0.2)' : '0 1px 2px rgba(0,0,0,0.03)'
                }}
                className="bg-white border rounded-xl p-3 flex flex-col justify-between h-full transition-all cursor-pointer relative z-10"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className={`p-1.5 rounded-lg ${activeStep >= 2 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                      <Cpu className="w-4 h-4" />
                    </div>
                    
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                      activeStep === 2 ? 'bg-indigo-600 text-white animate-pulse' :
                      activeStep > 2 ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {activeStep === 2 ? 'Active' : activeStep > 2 ? 'Complete' : 'Idle'}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">2. Process Automation</h4>
                  <p className="text-[10px] text-slate-500 leading-tight">Task handoff &amp; workspace setup</p>
                </div>
              </motion.div>

              {/* Hover Tooltip */}
              <AnimatePresence>
                {hoveredNode === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-[10px] rounded-lg p-2.5 shadow-xl z-30 pointer-events-none"
                  >
                    <div className="font-mono font-bold text-indigo-300 mb-1 flex items-center gap-1">
                      <Info className="w-3 h-3" /> Underlying Toolchain
                    </div>
                    Automated Slack notifications &amp; team task creation.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* NODE 3: Measurement & Sync */}
            <div 
              className="relative"
              onMouseEnter={() => setHoveredNode(3)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <motion.div
                animate={{
                  borderColor: activeStep === 3 ? '#10B981' : activeStep > 3 ? '#10B981' : '#E2E8F0',
                  boxShadow: activeStep === 3 ? '0 0 0 2px rgba(16, 185, 129, 0.2)' : '0 1px 2px rgba(0,0,0,0.03)'
                }}
                className="bg-white border rounded-xl p-3 flex flex-col justify-between h-full transition-all cursor-pointer relative z-10"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className={`p-1.5 rounded-lg ${activeStep === 3 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                      <LineChart className="w-4 h-4" />
                    </div>
                    
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                      activeStep === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {activeStep === 3 ? 'Synced' : 'Idle'}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">3. Measurement &amp; Sync</h4>
                  <p className="text-[10px] text-slate-500 leading-tight">Bi-directional CRM &amp; reporting</p>
                </div>
              </motion.div>

              {/* Hover Tooltip */}
              <AnimatePresence>
                {hoveredNode === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-[10px] rounded-lg p-2.5 shadow-xl z-30 pointer-events-none"
                  >
                    <div className="font-mono font-bold text-emerald-400 mb-1 flex items-center gap-1">
                      <Info className="w-3 h-3" /> Underlying Toolchain
                    </div>
                    Bi-directional sync with HubSpot, Salesforce &amp; GA4.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Module Footer Label */}
        <div className="pt-2 border-t border-slate-200/60 text-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Visualizing: How a System Replaces Manual Work
          </span>
        </div>

      </div>
    </div>
  );
}
