import React from "react";
import {
  Code2,
  Shield,
  Building2,
  ArrowRight,
  Terminal,
  Activity,
  Layers,
  CheckCircle2,
  Sparkles,
  GitPullRequest,
} from "lucide-react";

export const SolutionsWhoItsFor: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#06080F] border-t border-slate-800/80 overflow-hidden text-left">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-semibold text-emerald-400  uppercase tracking-wider backdrop-blur-md shadow-sm">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>WHO IT'S FOR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.15]">
            Security Infrastructure for Every Team That Ships Software
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-3xl mx-auto">
            Bring security testing, prioritization, remediation, and verification into the workflows your teams already use.
          </p>
        </div>

        {/* Three Distinct Platform Use Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* CARD 01: ENGINEERING TEAMS */}
          <div className="rounded-3xl bg-[#0B0F19] border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between group shadow-xl relative overflow-hidden">
            {/* Top Accent Light */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-6">
              {/* Card Tag & Icon */}
              <div className="flex items-center justify-between">
                <span className="text-xs  font-bold px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  ENGINEERING TEAMS
                </span>
                <div className="size-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Code2 className="size-5" />
                </div>
              </div>

              {/* Headline & Description */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  Ship Faster Without Shipping Security Debt
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Automate security checks throughout development and release workflows, identify vulnerabilities earlier, and give developers actionable remediation guidance.
                </p>
              </div>

              {/* Micro UI: CLI & PR Check Simulation */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90  text-xs space-y-2 text-slate-300 shadow-inner">
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-800/80 pb-1.5">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Terminal className="size-3" /> git push origin feat/auth
                  </span>
                  <span>42s check</span>
                </div>
                <div className="space-y-1 text-slate-400">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <CheckCircle2 className="size-3 shrink-0" />
                    <span>Semgrep AST: 0 secrets leaked</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <CheckCircle2 className="size-3 shrink-0" />
                    <span>ZAP Dynamic Crawl: routes clean</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 font-bold">
                    <GitPullRequest className="size-3 shrink-0 text-emerald-400" />
                    <span>Security Gate: PASSED (Mergeable)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8 mt-6 border-t border-slate-800/80">
              <a
                href="#for-engineering"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors"
              >
                <span>For Engineering Teams</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* CARD 02: SECURITY TEAMS */}
          <div className="rounded-3xl bg-[#0B0F19] border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between group shadow-xl relative overflow-hidden">
            {/* Top Accent Light */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-6">
              {/* Card Tag & Icon */}
              <div className="flex items-center justify-between">
                <span className="text-xs  font-bold px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
                  SECURITY TEAMS
                </span>
                <div className="size-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <Shield className="size-5" />
                </div>
              </div>

              {/* Headline & Description */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  Centralize Application Risk
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Aggregate application security findings, prioritize remediation, and track security posture across your applications.
                </p>
              </div>

              {/* Micro UI: AppSec Posture Meter */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90  text-xs space-y-2 text-slate-300 shadow-inner">
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-800/80 pb-1.5">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <Activity className="size-3" /> TRI-ENGINE AUDIT ROLLUP
                  </span>
                  <span className="text-emerald-400 font-bold">94/100 Posture</span>
                </div>
                <div className="space-y-1 text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Monitored Assets</span>
                    <span className="text-white font-bold">3 Domains • 48 Endpoints</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Critical / High Backlog</span>
                    <span className="text-emerald-400 font-bold">0 Pending CVEs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mean Time to Retest</span>
                    <span className="text-cyan-400 font-bold">&lt; 4 Minutes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8 mt-6 border-t border-slate-800/80">
              <a
                href="#for-security"
                className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors"
              >
                <span>For Security Teams</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* CARD 03: AGENCIES & DEVELOPMENT PARTNERS */}
          <div className="rounded-3xl bg-[#0B0F19] border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between group shadow-xl relative overflow-hidden">
            {/* Top Accent Light */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-6">
              {/* Card Tag & Icon */}
              <div className="flex items-center justify-between">
                <span className="text-xs  font-bold px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  AGENCIES & PARTNERS
                </span>
                <div className="size-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Building2 className="size-5" />
                </div>
              </div>

              {/* Headline & Description */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  Extend Security to Every Client
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Assess client applications and deliver professional, branded security reports through a repeatable security workflow.
                </p>
              </div>

              {/* Micro UI: Multi-Tenant Client Switcher */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90  text-xs space-y-2 text-slate-300 shadow-inner">
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-800/80 pb-1.5">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Layers className="size-3" /> CLIENT WORKSPACE HUB
                  </span>
                  <span className="text-slate-400">12 Clients</span>
                </div>
                <div className="space-y-1.5 text-slate-400">
                  <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-white font-semibold">Acme Tech Portal</span>
                    <span className="text-emerald-400 font-bold">Score 82 • PDF Ready</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/50 border border-slate-800/60">
                    <span className="text-slate-300">Stark SaaS API</span>
                    <span className="text-cyan-400 font-bold">Score 96 • Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8 mt-6 border-t border-slate-800/80">
              <a
                href="#for-agencies"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors"
              >
                <span>For Agencies</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
