import React from "react";
import {
  Globe,
  ArrowDown,
  ArrowRight,
  GitMerge,
  Cpu,
  Activity,
  Terminal,
  Shield,
  Search,
  Code2,
  Bug,
  CheckCircle2,
} from "lucide-react";

export const MultiEngineSecurityArchitecture: React.FC = () => {
  return (
    <section
      aria-label="Multi-Engine Security Architecture"
      className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-center overflow-hidden text-left pt-24 sm:pt-28 pb-12 sm:pb-16"
    >
      {/* Ambient glowing atmosphere matching reference */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full bg-[#1daf7e]/25 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -left-32 -translate-y-1/2 w-[700px] h-[550px] rounded-full bg-[#168863]/30 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[350px] rounded-full bg-[#044430]/40 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-center space-y-4 sm:space-y-6 my-auto">
        {/* Header Block — Clean without removed badge */}
        <div className="space-y-1.5 max-w-3xl mx-auto text-center shrink-0">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight drop-shadow-sm">
            Multiple Security Engines. One Unified Risk View.
          </h2>

          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed max-w-2xl mx-auto">
            HackMyWebsite combines complementary security technologies, normalizes their findings, and turns technical output into one prioritized security workflow.
          </p>
        </div>

        {/* Technical Architecture Diagram — Horizontal Execution Pipeline */}
        <div className="w-full max-w-7xl mx-auto rounded-3xl bg-[#030806]/85 backdrop-blur-xl border border-emerald-500/25 p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(22,136,99,0.15)] space-y-3 sm:space-y-4 relative overflow-hidden shrink-0">
          {/* Diagram Header Banner */}
          <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span className="text-white font-semibold">DATA FLOW DIAGRAM</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/70 border border-emerald-700/60 px-2.5 py-0.5 rounded">
              Horizontal Execution Pipeline • Target to Verified Remediation →
            </span>
          </div>

          {/* HORIZONTAL FLOW CONTAINER */}
          <div className="overflow-x-auto pb-2 pt-1 -mx-2 px-2 scrollbar-thin">
            <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-2.5 xl:gap-2 min-w-full xl:min-w-[1300px]">
              {/* STAGE 1: YOUR APPLICATION */}
              <div className="w-full xl:w-[155px] shrink-0 p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-md flex flex-col justify-between text-left h-[225px]">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="size-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200">
                      <Globe className="size-4 text-emerald-400" />
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                      01 • INPUT
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Target
                    </span>
                    <span className="text-xs font-bold text-white tracking-wide block">
                      YOUR APPLICATION
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-slate-300 border border-slate-800 px-2 py-0.5 rounded bg-slate-950 block text-center truncate">
                    Web • APIs • Endpoints
                  </span>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Live application endpoints & attack surface
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center text-emerald-400/80 py-1 xl:py-0 xl:px-0.5 shrink-0">
                <ArrowRight className="hidden xl:block size-4" />
                <ArrowDown className="xl:hidden size-4" />
              </div>

              {/* STAGE 2: HACKMYWEBSITE SECURITY PLATFORM */}
              <div className="w-full xl:w-[165px] shrink-0 p-3 rounded-xl bg-gradient-to-b from-emerald-950/60 via-slate-900 to-emerald-950/40 border border-emerald-500/50 shadow-lg flex flex-col justify-between text-left h-[225px]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="size-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Shield className="size-3.5" />
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                      02 • CORE
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold block">
                      Orchestration
                    </span>
                    <span className="text-xs font-bold text-white tracking-tight block leading-tight">
                      HACKMYWEBSITE PLATFORM
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-emerald-300 bg-emerald-900/40 border border-emerald-700/50 px-2 py-0.5 rounded block text-center truncate">
                    Dispatcher Engine
                  </span>
                  <p className="text-[9.5px] text-slate-400 leading-tight">
                    Fan-out router dispatching parallel probe tasks
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center text-emerald-400/80 py-1 xl:py-0 xl:px-0.5 shrink-0">
                <ArrowRight className="hidden xl:block size-4" />
                <ArrowDown className="xl:hidden size-4" />
              </div>

              {/* STAGE 3: FOUR SPECIALIZED ENGINES (2x2 GRID) */}
              <div className="w-full xl:w-[270px] shrink-0 p-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/40 shadow-lg flex flex-col justify-between text-left h-[225px]">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span className="text-[10px] font-mono font-bold text-emerald-400">
                    03 • 4 ENGINES
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">
                    Parallel Probes
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 py-0.5">
                  {/* Engine 1: ZAP */}
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 flex flex-col justify-between space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white flex items-center gap-1">
                        <Search className="size-3 text-emerald-400" />
                        ZAP
                      </span>
                      <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        DAST
                      </span>
                    </div>
                    <span className="text-[8.5px] text-slate-400 leading-tight">
                      Runtime HTTP probes
                    </span>
                  </div>

                  {/* Engine 2: Nuclei */}
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 flex flex-col justify-between space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white flex items-center gap-1">
                        <Bug className="size-3 text-cyan-400" />
                        Nuclei
                      </span>
                      <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        CVE
                      </span>
                    </div>
                    <span className="text-[8.5px] text-slate-400 leading-tight">
                      5k+ known exploits
                    </span>
                  </div>

                  {/* Engine 3: Semgrep */}
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white flex items-center gap-1">
                        <Code2 className="size-3 text-amber-400" />
                        Semgrep
                      </span>
                      <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        SAST
                      </span>
                    </div>
                    <span className="text-[8.5px] text-slate-400 leading-tight">
                      AST code analysis
                    </span>
                  </div>

                  {/* Engine 4: Playwright */}
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-purple-500/30 flex flex-col justify-between space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white flex items-center gap-1">
                        <Globe className="size-3 text-purple-400" />
                        Playwright
                      </span>
                      <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                        Surface
                      </span>
                    </div>
                    <span className="text-[8.5px] text-slate-400 leading-tight">
                      Headless crawler
                    </span>
                  </div>
                </div>
                <span className="text-[8.5px] font-mono text-slate-500 text-center block pt-0.5">
                  Inputs converge into normalization →
                </span>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center text-emerald-400/80 py-1 xl:py-0 xl:px-0.5 shrink-0">
                <ArrowRight className="hidden xl:block size-4" />
                <ArrowDown className="xl:hidden size-4" />
              </div>

              {/* STAGE 4: FINDING NORMALIZATION */}
              <div className="w-full xl:w-[155px] shrink-0 p-3 rounded-xl bg-slate-900/95 border border-slate-700 flex flex-col justify-between text-left h-[225px]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="size-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <GitMerge className="size-3.5" />
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                      04 • STAGE 1
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                      Deduplication
                    </span>
                    <span className="text-xs font-bold text-white block leading-tight">
                      FINDING NORMALIZATION
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-800/50 px-2 py-0.5 rounded block text-center truncate">
                    Unified Schema
                  </span>
                  <p className="text-[9.5px] text-slate-400 leading-tight">
                    De-duplication, severity correlation & CWE taxonomies
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center text-emerald-400/80 py-1 xl:py-0 xl:px-0.5 shrink-0">
                <ArrowRight className="hidden xl:block size-4" />
                <ArrowDown className="xl:hidden size-4" />
              </div>

              {/* STAGE 5: AI RISK ENGINE */}
              <div className="w-full xl:w-[155px] shrink-0 p-3 rounded-xl bg-slate-900/95 border border-slate-700 flex flex-col justify-between text-left h-[225px]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="size-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Cpu className="size-3.5" />
                    </div>
                    <span className="text-[9px] font-mono text-cyan-400 font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                      05 • STAGE 2
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                      Context Weighting
                    </span>
                    <span className="text-xs font-bold text-white block leading-tight">
                      AI RISK ENGINE
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-cyan-400 font-bold bg-cyan-950/70 border border-cyan-800/50 px-2 py-0.5 rounded block text-center truncate">
                    Exploitability AI
                  </span>
                  <p className="text-[9.5px] text-slate-400 leading-tight">
                    Contextual exploitability & asset criticality weighting
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center text-emerald-400/80 py-1 xl:py-0 xl:px-0.5 shrink-0">
                <ArrowRight className="hidden xl:block size-4" />
                <ArrowDown className="xl:hidden size-4" />
              </div>

              {/* STAGE 6: APPLICATION SECURITY SCORE */}
              <div className="w-full xl:w-[150px] shrink-0 p-3 rounded-xl bg-gradient-to-b from-emerald-950/50 to-slate-900 border border-emerald-500/60 shadow-md flex flex-col justify-between text-left h-[225px]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="size-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Activity className="size-3.5" />
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                      06 • METRIC
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                      Benchmark
                    </span>
                    <span className="text-xs font-bold text-white block leading-tight">
                      SECURITY SCORE
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5 text-center">
                  <div className="text-xl font-mono font-black text-emerald-400 bg-emerald-950 border border-emerald-700/80 py-1 rounded-lg shadow-inner">
                    0–100
                  </div>
                  <p className="text-[9.5px] text-emerald-300 leading-tight">
                    Unified Launch Health Posture Metric
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center text-emerald-400/80 py-1 xl:py-0 xl:px-0.5 shrink-0">
                <ArrowRight className="hidden xl:block size-4" />
                <ArrowDown className="xl:hidden size-4" />
              </div>

              {/* STAGE 7: REMEDIATION */}
              <div className="w-full xl:w-[155px] shrink-0 p-3 rounded-xl bg-slate-900/95 border border-slate-700 flex flex-col justify-between text-left h-[225px]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="size-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Terminal className="size-3.5" />
                    </div>
                    <span className="text-[9px] font-mono text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                      07 • ACTION
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                      IDE Fixes
                    </span>
                    <span className="text-xs font-bold text-white block leading-tight">
                      REMEDIATION
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-amber-400 font-bold bg-amber-950/70 border border-amber-800/50 px-2 py-0.5 rounded block text-center truncate">
                    1-Click Prompts
                  </span>
                  <p className="text-[9.5px] text-slate-400 leading-tight">
                    Contextual code patches & Cursor IDE prompts
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center text-emerald-400/80 py-1 xl:py-0 xl:px-0.5 shrink-0">
                <ArrowRight className="hidden xl:block size-4" />
                <ArrowDown className="xl:hidden size-4" />
              </div>

              {/* STAGE 8: RETEST / VERIFY */}
              <div className="w-full xl:w-[160px] shrink-0 p-3 rounded-xl bg-slate-950 border border-emerald-500/80 shadow-lg flex flex-col justify-between text-left h-[225px]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="size-7 rounded-lg bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="size-3.5" />
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                      08 • VERIFY
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                      Closed-Loop
                    </span>
                    <span className="text-xs font-bold text-white block leading-tight">
                      RETEST / VERIFY
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950 border border-emerald-700 px-2 py-0.5 rounded block text-center font-bold truncate">
                    Risk Eliminated
                  </span>
                  <p className="text-[9.5px] text-slate-300 leading-tight">
                    Targeted re-probe confirms vulnerability is eliminated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
