import React, { useState, useEffect } from "react";
import {
  Globe,
  Shield,
  Search,
  Bug,
  Code2,
  GitMerge,
  Cpu,
  Activity,
  Terminal,
  CheckCircle2,
  Flame,
  ArrowRight,
  ArrowDown,
  Lock,
  Sparkles,
  Zap,
} from "lucide-react";

export const MultiEngineSecurityArchitecture: React.FC = () => {
  const [pulsePosition, setPulsePosition] = useState(0);

  // Animated pulse wave traveling along the fire thread
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePosition((prev) => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* =========================================================================
          SECTION 1: ATTACK SURFACE INGESTION & DISCOVERY (100vh FULL SCREEN)
          ========================================================================= */}
      <section
        id="data-flow-ingestion"
        style={{ height: "100vh" }}
        className="relative w-full h-screen min-h-[100vh] flex flex-col justify-between bg-black text-white pt-20 sm:pt-24 pb-8 sm:pb-10 overflow-hidden border-t border-slate-900 select-none"
      >
        {/* Ambient subtle cyber-fire glow in background */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06),transparent_70%)]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05),transparent_70%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-between h-full">
          {/* Section Header — Short, Punchy, Enterprise Professional */}
          <div className="space-y-2 max-w-3xl mx-auto text-center shrink-0">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Autonomous Attack Surface Ingestion.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Continuous discovery maps all application endpoints, forms, and routes before security probing begins.
            </p>
          </div>

          {/* ===================================================================
              BOX 1: TARGET INGESTION & SURFACE MAPPING (First Box of Data Flow)
              =================================================================== */}
          <div className="w-full max-w-4xl mx-auto rounded-3xl bg-[#06080D]/95 border border-slate-800 p-5 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.08)] relative overflow-hidden my-auto">
            {/* Top Bar of Box 1 */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Globe className="size-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold block">
                    Data Flow • Stage 01
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                    Target Ingestion & Surface Discovery
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded font-semibold">
                  ACTIVE SPIDER & PARSER
                </span>
              </div>
            </div>

            {/* Split Content Inside Box 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
              {/* Left Sub-Card: Live Application Target */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/90 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                    Target Environment
                  </span>
                  {/* Address bar mockup */}
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs text-slate-300">
                    <Lock className="size-3 text-emerald-400" />
                    <span className="text-slate-400">https://</span>
                    <span className="text-white font-semibold">your-application.com</span>
                    <span className="ml-auto text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">
                      LIVE
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Surface Vectors Ingested
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      REST APIs
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      GraphQL
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      Web Forms
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      OAuth Handshakes
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Discovered Surface:</span>
                  <span className="text-emerald-400 font-bold">148 Routes & Endpoints</span>
                </div>
              </div>

              {/* Right Sub-Card: Dynamic DOM Crawler (Playwright Engine) */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/90 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                      Headless DOM Discovery
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">Playwright Engine</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Crawls dynamic SPAs, client-side renders, parameter trees, and authenticated user flows.
                  </p>
                </div>

                {/* Live stream logs */}
                <div className="space-y-1.5 p-2 rounded-lg bg-black/70 border border-slate-800/80 font-mono text-[10px]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-emerald-400">[200 OK]</span>
                    <span className="truncate">/api/v1/auth/session</span>
                    <span className="text-slate-500">12ms</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-emerald-400">[PARSED]</span>
                    <span className="truncate">/dashboard/billing/invoices</span>
                    <span className="text-slate-500">DOM Form</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-cyan-400">[ROUTER]</span>
                    <span className="truncate">Token injection seeds ready</span>
                    <span className="text-emerald-400 font-bold">Streamed</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Pipeline State:</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Zap className="size-3 text-cyan-400" /> Ingestion Complete
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Energy Port of Box 1 */}
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-[11px] text-slate-500">Origin: User Target Surface</span>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span>Output Port: Ingestion Stream Ready</span>
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>
          </div>

          {/* ===================================================================
              STREAMING CONNECTOR TO SECTION 2 (FIERY THREAD WAVE SHOOTING DOWN)
              =================================================================== */}
          <div className="flex flex-col items-center justify-center shrink-0 pt-1">
            <div className="relative flex flex-col items-center">
              {/* Fiery wave laser thread */}
              <div className="w-[3px] h-12 bg-gradient-to-b from-emerald-400 via-amber-300 to-emerald-500 relative overflow-hidden shadow-[0_0_12px_#10b981,0_0_24px_#059669]">
                <div
                  className="absolute left-0 w-full h-5 bg-white shadow-[0_0_10px_#ffffff]"
                  style={{
                    top: `${pulsePosition}%`,
                    transition: "top 0.04s linear",
                  }}
                />
              </div>
              <a
                href="#data-flow-execution"
                className="text-[10px] font-mono text-emerald-300 hover:text-white transition-colors tracking-wider uppercase mt-1 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-500/30 shadow-md"
              >
                <Flame className="size-3 text-amber-400 animate-pulse" />
                <span>Scroll: Fire Thread Enters Sovereign Core ↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: MULTI-ENGINE SYNTHESIS & VERIFIED REMEDIATION (100vh FULL SCREEN)
          ========================================================================= */}
      <section
        id="data-flow-execution"
        style={{ height: "100vh" }}
        className="relative w-full h-screen min-h-[100vh] flex flex-col justify-between bg-black text-white pt-20 sm:pt-24 pb-8 sm:pb-10 overflow-hidden border-t border-slate-900 select-none"
      >
        {/* Ambient subtle cyber-fire glow in background */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.07),transparent_70%)]" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent_70%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-between h-full">
          {/* Section Header — Short, Punchy, Enterprise Professional */}
          <div className="space-y-2 max-w-3xl mx-auto text-center shrink-0">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Multi-Engine Synthesis & Verified Fix.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Parallel detection engines converge into unified scoring, automated developer code patches, and closed-loop verification.
            </p>
          </div>

          {/* ===================================================================
              BOX 2 & BOX 3 CONNECTED HORIZONTALLY VIA CONTINUOUS FIRE THREAD WAVE
              =================================================================== */}
          <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-5 my-auto relative">
            {/* ---------------------------------------------------------------
                BOX 2: SOVEREIGN MULTI-ENGINE CORE (Parallel Probes)
                --------------------------------------------------------------- */}
            <div className="w-full lg:w-[48%] rounded-3xl bg-[#06080D]/95 border border-slate-800 p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(6,182,212,0.08)] relative overflow-hidden flex flex-col justify-between">
              {/* Header Box 2 */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Shield className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold block">
                      Data Flow • Stage 02
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                      Sovereign Multi-Engine Core
                    </span>
                  </div>
                </div>
                <span className="text-[9.5px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded font-bold">
                  3 PARALLEL ENGINES
                </span>
              </div>

              {/* 3 Engine Tiles Inside Box 2 */}
              <div className="space-y-2.5">
                {/* Engine 1: OWASP ZAP (DAST) */}
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Search className="size-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">OWASP ZAP 2.15</span>
                        <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          DAST RUNTIME
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block pt-0.5">
                        Active fuzzing, parameter replay & live HTTP injection probes
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded shrink-0">
                    240 Probes/s
                  </span>
                </div>

                {/* Engine 2: Nuclei (CVE Scanner) */}
                <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                      <Bug className="size-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">Nuclei Engine v3.3</span>
                        <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                          CVE AUDIT
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block pt-0.5">
                        Template-driven probe across 5,400+ unpatched zero-days
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded shrink-0">
                    5.4k Feeds
                  </span>
                </div>

                {/* Engine 3: Semgrep (SAST Engine) */}
                <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Code2 className="size-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">Semgrep Engine</span>
                        <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          SAST LOGIC
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block pt-0.5">
                        Static source AST rule validation & hardcoded secret leak audit
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded shrink-0">
                    AST Trees
                  </span>
                </div>
              </div>

              {/* Bottom Convergence Indicator */}
              <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Outputs Concurrence:</span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1">
                  Transmitting Stream into Box 3 →
                </span>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                HORIZONTAL FIRE THREAD WAVE CONNECTOR (ANIMATED PLASMA BEAM)
                --------------------------------------------------------------- */}
            <div className="hidden lg:flex flex-col items-center justify-center shrink-0 w-10 xl:w-14 relative my-auto">
              {/* Outer Glow Path */}
              <div className="w-full h-[3px] bg-gradient-to-r from-cyan-400 via-emerald-300 to-emerald-400 relative overflow-hidden shadow-[0_0_12px_#10b981,0_0_20px_#34d399]">
                {/* Fast traveling plasma wave pulse */}
                <div
                  className="absolute top-0 h-full w-4 bg-white shadow-[0_0_8px_#ffffff]"
                  style={{
                    left: `${pulsePosition}%`,
                    transition: "left 0.04s linear",
                  }}
                />
              </div>

              {/* Center Fire Badge */}
              <div className="size-6 rounded-full bg-slate-900 border border-emerald-400 flex items-center justify-center my-1 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                <Flame className="size-3 text-amber-400 animate-pulse" />
              </div>

              <div className="w-full h-[3px] bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 relative overflow-hidden shadow-[0_0_12px_#10b981]">
                <div
                  className="absolute top-0 h-full w-4 bg-white shadow-[0_0_8px_#ffffff]"
                  style={{
                    left: `${(pulsePosition + 50) % 100}%`,
                    transition: "left 0.04s linear",
                  }}
                />
              </div>
            </div>

            {/* Mobile Fallback Arrow */}
            <div className="flex lg:hidden items-center justify-center py-1 text-emerald-400">
              <ArrowDown className="size-4 animate-bounce" />
            </div>

            {/* ---------------------------------------------------------------
                BOX 3: SYNTHESIS, SCORING & VERIFIED REMEDIATION
                --------------------------------------------------------------- */}
            <div className="w-full lg:w-[48%] rounded-3xl bg-[#06080D]/95 border border-slate-800 p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.12)] relative overflow-hidden flex flex-col justify-between">
              {/* Header Box 3 */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold block">
                      Data Flow • Stage 03
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                      Synthesis & Verified Fix
                    </span>
                  </div>
                </div>
                <span className="text-[9.5px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded font-bold">
                  CLOSED-LOOP FIX
                </span>
              </div>

              {/* Sub-components of Box 3 */}
              <div className="space-y-2.5">
                {/* Sub-item 1: Normalization & 0-100 Score */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Activity className="size-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Launch Health Posture Score
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Deduplicated CWE schema & asset exploitability weighting
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 border border-emerald-700 px-2.5 py-1 rounded shadow-inner">
                    0–100
                  </span>
                </div>

                {/* Sub-item 2: Remediation (1-Click Cursor Prompts) */}
                <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Terminal className="size-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        1-Click Cursor IDE Code Diff
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Contextual patch fixes & ready-to-merge developer prompts
                      </span>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-mono text-amber-400 font-bold bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded shrink-0">
                    Fix Code
                  </span>
                </div>

                {/* Sub-item 3: Retest & Verification Loop */}
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/50 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                      <CheckCircle2 className="size-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Closed-Loop Retest Verification
                      </span>
                      <span className="text-[10px] text-slate-300 block">
                        Targeted re-probe confirms vulnerability is eliminated
                      </span>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-mono text-emerald-400 font-bold bg-emerald-950 border border-emerald-700 px-2 py-0.5 rounded shrink-0">
                    Eliminated
                  </span>
                </div>
              </div>

              {/* Bottom Pipeline Certified Indicator */}
              <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Verification Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  ✓ Risk Reduced • Production Safe
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Execution Bar */}
          <div className="flex items-center justify-center text-center text-xs font-mono text-slate-500 pt-1 shrink-0">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-300 font-semibold">Continuous End-to-End Execution</span> •
              <span className="text-slate-400">Ingestion → Parallel Probing → Closed-Loop Verification</span>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
