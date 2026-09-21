import React from "react";
import {
  Globe,
  ArrowDown,
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
    <section className="relative py-24 sm:py-32 bg-[#04060A] border-t border-slate-800/80 overflow-hidden text-left">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06),transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.04),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        {/* Header Block */}
        <div className="space-y-4 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider backdrop-blur-md shadow-sm">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>MULTI-ENGINE SECURITY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.15]">
            Multiple Security Engines. One Unified Risk View.
          </h2>

          <div className="space-y-2 pt-2 text-slate-300 max-w-2xl mx-auto">
            <p className="text-base sm:text-lg leading-relaxed text-slate-200">
              No single scanner provides complete application visibility.
            </p>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              HackMyWebsite combines complementary security technologies, normalizes their findings, and turns technical output into one prioritized security workflow.
            </p>
          </div>
        </div>

        {/* Technical Architecture Diagram */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#080C14] border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Diagram Header Banner */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="size-2 rounded-full bg-emerald-400" />
                <span className="text-slate-200 font-semibold">DATA FLOW DIAGRAM</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 px-2 py-0.5 rounded">
                Inputs → Platform → Unified View
              </span>
            </div>

            {/* FLOW CONTAINER */}
            <div className="flex flex-col items-center space-y-3 relative py-2">
              {/* STAGE 1: YOUR APPLICATION */}
              <div className="w-full max-w-md p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200">
                    <Globe className="size-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Target Environment
                    </span>
                    <span className="text-xs font-bold text-white tracking-wide">
                      YOUR APPLICATION
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 border border-slate-800 px-2 py-0.5 rounded bg-slate-950">
                  Web • APIs • Endpoints
                </span>
              </div>

              {/* Arrow Down */}
              <div className="flex items-center justify-center text-emerald-400/80 py-0.5">
                <ArrowDown className="size-4 animate-bounce" />
              </div>

              {/* STAGE 2: HACKMYWEBSITE SECURITY PLATFORM */}
              <div className="w-full max-w-lg p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-500/50 shadow-lg flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Shield className="size-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold block">
                      Core Orchestration
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                      HACKMYWEBSITE SECURITY PLATFORM
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-900/40 border border-emerald-700/50 px-2 py-0.5 rounded shrink-0">
                  Dispatcher Engine
                </span>
              </div>

              {/* Branching Indicator */}
              <div className="flex items-center justify-center text-slate-500 py-0.5">
                <ArrowDown className="size-4 text-emerald-400/80" />
              </div>

              {/* STAGE 3: FOUR SPECIALIZED ENGINES (GRID 2x2) */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl">
                {/* Engine 1: OWASP ZAP (DAST) */}
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 flex flex-col justify-between space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Search className="size-3.5 text-emerald-400" />
                      OWASP ZAP
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      DAST
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 leading-tight">
                    Runtime HTTP/Form spidering & active injection probes
                  </span>
                </div>

                {/* Engine 2: Nuclei (Vulnerability Detection) */}
                <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 flex flex-col justify-between space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Bug className="size-3.5 text-cyan-400" />
                      Nuclei
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      Vulnerability Detection
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 leading-tight">
                    Template-driven scan for 5,000+ known CVEs & configs
                  </span>
                </div>

                {/* Engine 3: Semgrep (SAST) */}
                <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 flex flex-col justify-between space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Code2 className="size-3.5 text-amber-400" />
                      Semgrep
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      SAST
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 leading-tight">
                    Static source analysis & AST pattern rule validation
                  </span>
                </div>

                {/* Engine 4: Playwright (Surface Discovery) */}
                <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30 flex flex-col justify-between space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Globe className="size-3.5 text-purple-400" />
                      Playwright
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                      Surface Discovery
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 leading-tight">
                    Headless browser crawler & dynamic DOM route mapper
                  </span>
                </div>
              </div>

              {/* Converging Arrow Down */}
              <div className="flex flex-col items-center justify-center py-1">
                <span className="text-[10px] font-mono text-slate-500 pb-0.5">
                  All 4 inputs converge ↓
                </span>
                <ArrowDown className="size-4 text-emerald-400" />
              </div>

              {/* STAGE 4: FINDING NORMALIZATION */}
              <div className="w-full max-w-md p-3 rounded-xl bg-slate-900/95 border border-slate-700 flex items-center justify-between text-left">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <GitMerge className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      FINDING NORMALIZATION
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      De-duplication • Severity correlation • CWE taxonomies
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  Stage 1
                </span>
              </div>

              {/* Arrow */}
              <div className="text-slate-600">
                <ArrowDown className="size-3.5 text-emerald-400/70" />
              </div>

              {/* STAGE 5: AI RISK ENGINE */}
              <div className="w-full max-w-md p-3 rounded-xl bg-slate-900/95 border border-slate-700 flex items-center justify-between text-left">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Cpu className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      AI RISK ENGINE
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Contextual exploitability & asset criticality weighting
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">
                  Stage 2
                </span>
              </div>

              {/* Arrow */}
              <div className="text-slate-600">
                <ArrowDown className="size-3.5 text-emerald-400/70" />
              </div>

              {/* STAGE 6: APPLICATION SECURITY SCORE */}
              <div className="w-full max-w-md p-3 rounded-xl bg-gradient-to-r from-emerald-950/50 to-slate-900 border border-emerald-500/60 flex items-center justify-between text-left shadow-md">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Activity className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      APPLICATION SECURITY SCORE
                    </span>
                    <span className="text-[10px] text-emerald-300 block">
                      0–100 Unified Launch Health Posture Metric
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 border border-emerald-700 px-2 py-0.5 rounded">
                  0–100
                </span>
              </div>

              {/* Arrow */}
              <div className="text-slate-600">
                <ArrowDown className="size-3.5 text-emerald-400/70" />
              </div>

              {/* STAGE 7: REMEDIATION */}
              <div className="w-full max-w-md p-3 rounded-xl bg-slate-900/95 border border-slate-700 flex items-center justify-between text-left">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Terminal className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      REMEDIATION
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Contextual code patches & 1-click Cursor IDE prompts
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold">
                  Action
                </span>
              </div>

              {/* Arrow */}
              <div className="text-slate-600">
                <ArrowDown className="size-3.5 text-emerald-400/70" />
              </div>

              {/* STAGE 8: RETEST / VERIFY */}
              <div className="w-full max-w-md p-3.5 rounded-xl bg-slate-950 border border-emerald-500/80 shadow-lg flex items-center justify-between text-left">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      RETEST / VERIFY
                    </span>
                    <span className="text-[10px] text-slate-300 block">
                      Targeted re-probe confirms vulnerability is eliminated
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-700 px-2 py-0.5 rounded font-bold">
                  Closed-Loop
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
