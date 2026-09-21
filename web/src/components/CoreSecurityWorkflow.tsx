import React from "react";
import { Radar, ShieldAlert, Code2, ShieldCheck, ArrowRight } from "lucide-react";

interface WorkflowStep {
  step: string;
  title: string;
  subheading: string;
  description: string;
  icon: React.ElementType;
  tag: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    step: "01",
    title: "Discover",
    subheading: "Map Your Application Attack Surface",
    description:
      "Discover accessible routes, APIs, pages, and application surfaces before security testing begins.",
    icon: Radar,
    tag: "SURFACE MAPPING",
  },
  {
    step: "02",
    title: "Detect",
    subheading: "Multi-Engine Security Testing",
    description:
      "Combine dynamic testing, static analysis, and vulnerability detection to identify weaknesses across your application.",
    icon: ShieldAlert,
    tag: "TRI-ENGINE AUDIT",
  },
  {
    step: "03",
    title: "Remediate",
    subheading: "Developer-Ready Remediation",
    description:
      "Give engineers contextual findings and actionable remediation guidance they can use to address security issues.",
    icon: Code2,
    tag: "DEV-READY FIXES",
  },
  {
    step: "04",
    title: "Verify",
    subheading: "Retest Every Fix",
    description:
      "Run targeted retesting to verify that vulnerabilities have actually been resolved.",
    icon: ShieldCheck,
    tag: "CLOSED-LOOP RETEST",
  },
];

export const CoreSecurityWorkflow: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#06080F] border-t border-slate-800/80 overflow-hidden">
      {/* Subtle Background Radial Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_15%,rgba(16,185,129,0.07),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.04),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider backdrop-blur-md shadow-sm">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SECURITY WORKFLOW</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.15]">
            From Vulnerability Detection to Verified Remediation
          </h2>

          <div className="space-y-2 pt-2 text-slate-300 max-w-3xl mx-auto">
            <p className="text-base sm:text-lg leading-relaxed">
              Security teams don't need another list of vulnerabilities. They need to know what matters, what to fix, whether it was fixed, and whether the risk is actually reduced.
            </p>
            <p className="text-sm sm:text-base text-emerald-400 font-semibold pt-1">
              HackMyWebsite brings the complete workflow into one platform.
            </p>
          </div>
        </div>

        {/* Lifecycle Ribbon Bar (Visualizing One Connected Sequence) */}
        <div className="hidden lg:flex items-center justify-between p-3 px-6 rounded-2xl bg-[#090D16] border border-slate-800/90 shadow-lg text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            <span>CONTINUOUS SECURITY LIFECYCLE</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-slate-200 font-semibold">
              <span className="text-emerald-400">01</span> Discover
            </span>
            <ArrowRight className="size-3.5 text-slate-600" />
            <span className="flex items-center gap-2 text-slate-200 font-semibold">
              <span className="text-emerald-400">02</span> Detect
            </span>
            <ArrowRight className="size-3.5 text-slate-600" />
            <span className="flex items-center gap-2 text-slate-200 font-semibold">
              <span className="text-emerald-400">03</span> Remediate
            </span>
            <ArrowRight className="size-3.5 text-slate-600" />
            <span className="flex items-center gap-2 text-slate-200 font-semibold">
              <span className="text-emerald-400">04</span> Verify
            </span>
          </div>

          <div className="text-slate-500 font-medium">
            Zero Disconnected Spreadsheets
          </div>
        </div>

        {/* Four Connected Horizontal Cards on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {workflowSteps.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === workflowSteps.length - 1;

            return (
              <div key={item.step} className="relative flex">
                <div className="w-full flex flex-col justify-between rounded-2xl bg-[#0B0F19]/90 border border-slate-800 hover:border-emerald-500/50 p-6 sm:p-7 transition-all duration-300 group hover:shadow-[0_12px_35px_rgba(16,185,129,0.09)] relative overflow-hidden backdrop-blur-sm">
                  {/* Top Glowing Accent Line on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Card Content Top */}
                  <div className="space-y-4">
                    {/* Header Row: Number Badge + Category Tag */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 tracking-wider">
                        {item.step}
                      </span>
                      <span className="text-[10px] font-mono font-medium text-slate-500 tracking-wider uppercase">
                        {item.tag}
                      </span>
                    </div>

                    {/* Icon + Short Title */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="size-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:border-emerald-500/40 group-hover:bg-emerald-950/20 transition-all duration-300 shadow-sm shrink-0">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                    </div>

                    {/* Strong Subheading */}
                    <h4 className="text-sm font-semibold text-slate-200 leading-snug pt-1">
                      {item.subheading}
                    </h4>

                    {/* 2–3 Line Description */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom Progress Cue */}
                  <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="text-slate-400">Step {item.step} of 04</span>
                    <span className="text-emerald-400/80 group-hover:text-emerald-300 transition-colors flex items-center gap-1 font-semibold">
                      Phase {idx + 1}
                      <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Desktop Inter-Card Flow Arrow */}
                {!isLast && (
                  <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 size-7 rounded-full bg-slate-900 border border-slate-700 items-center justify-center text-emerald-400 shadow-md pointer-events-none">
                    <ArrowRight className="size-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
