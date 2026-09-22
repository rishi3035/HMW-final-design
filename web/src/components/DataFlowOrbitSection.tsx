import React, { useState } from "react";
import { OrbitingCirclesGlobe, securityPipelineOrbits } from "@/components/ui/orbiting-circles-02";
import {
  Shield,
  Layers,
  Search,
  Activity,
  Bug,
  Code2,
  GitMerge,
  GitPullRequest,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

export const DataFlowOrbitSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      stage: "STAGE 01",
      name: "Surface Mapping & Ingestion",
      orbit: "Inner Orbit",
      desc: "Discovers and maps accessible web applications, dynamic single-page apps, and REST/GraphQL APIs before security testing begins.",
      techs: ["Web Apps & SPAs", "GraphQL / REST APIs", "Playwright DOM Crawler"],
      color: "emerald",
    },
    {
      stage: "STAGE 02",
      name: "Multi-Engine Deep Testing",
      orbit: "Middle Orbit",
      desc: "Simultaneously activates complementary security engines—runtime DAST probing, 5,000+ CVE vulnerability matching, and static SAST code analysis.",
      techs: ["OWASP ZAP 2.15 (DAST)", "Nuclei v3.3 (CVE Detection)", "Semgrep Hybrid (SAST)"],
      color: "cyan",
    },
    {
      stage: "STAGE 03",
      name: "DevSecOps & Verified Remediation",
      orbit: "Outer Orbit",
      desc: "Normalizes findings, calculates the 0–100 posture score, blocks high-risk PR merges via GitHub Gate, and verifies fixes with closed-loop retesting.",
      techs: ["Finding Normalization", "GitHub Security Gate", "1-Click Cursor Fixes", "Closed-Loop Retest"],
      color: "amber",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#06080F] border-t border-slate-800/80 overflow-hidden text-left">
      {/* Background Radial Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06),transparent_70%)]" />
      <div className="pointer-events-none absolute top-10 left-10 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.04),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider backdrop-blur-md shadow-sm">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>DATA FLOW ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.15]">
            Ascending Pipeline Data Flow
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-3xl mx-auto">
            Experience how HackMyWebsite routes target application assets through concentric security layers—from surface discovery to multi-engine testing, normalized risk scoring, and verified developer remediation.
          </p>
        </div>

        {/* The Animated Orbiting Circles Globe Visual */}
        <div className="relative rounded-3xl bg-[#080C14]/90 border border-slate-800 p-4 sm:p-8 shadow-2xl overflow-hidden">
          {/* Top Orbit Controls & Stage Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-white">LIVE SPHERICAL DATA FLOW</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Hover any node to inspect telemetry</span>
            </div>

            {/* Ascending Order Badges */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
              {stages.map((st, i) => (
                <button
                  key={st.stage}
                  type="button"
                  onClick={() => setActiveStage(i)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeStage === i
                      ? "bg-emerald-500 text-neutral-950 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {st.stage}
                </button>
              ))}
            </div>
          </div>

          {/* Orbiting Animation Canvas + Rings */}
          <div className="py-6">
            <OrbitingCirclesGlobe />
          </div>

          {/* Bottom Stage Details Drawer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
            {stages.map((st, i) => {
              const isSelected = activeStage === i;
              return (
                <div
                  key={st.stage}
                  onClick={() => setActiveStage(i)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? "bg-slate-900/95 border-emerald-500/50 shadow-lg shadow-emerald-500/5"
                      : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {st.stage}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {st.orbit}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {st.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                    {st.techs.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataFlowOrbitSection;
