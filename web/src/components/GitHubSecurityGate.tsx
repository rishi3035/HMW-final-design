import React from "react";
import {
  GitPullRequest,
  ShieldCheck,
  Terminal,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  GitBranch,
  FileCode,
  CheckCircle2,
  XCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export const GitHubSecurityGate: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#06080F] border-t border-slate-800/80 overflow-hidden text-left">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.04),transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.04),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Two-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT SIDE (5 Columns): Text & Capability Items */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-semibold text-emerald-400  uppercase tracking-wider backdrop-blur-md shadow-sm">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>SECURITY IN THE DEVELOPMENT WORKFLOW</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.15]">
                Make Security Part of Every Pull Request.
              </h2>

              <div className="space-y-2 pt-2 text-slate-300">
                <p className="text-base sm:text-lg leading-relaxed text-slate-200">
                  Catch security issues before they become production incidents.
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Integrate HackMyWebsite into the GitHub workflow to evaluate code changes and enforce security policies before changes are merged.
                </p>
              </div>
            </div>

            {/* Four Small Capability Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Card 1 */}
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800/90 hover:border-emerald-500/40 transition-colors space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <GitPullRequest className="size-4 shrink-0" />
                  <h4 className="text-xs font-bold text-white">
                    Pull Request Scanning
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Analyze code changes before merge.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800/90 hover:border-emerald-500/40 transition-colors space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck className="size-4 shrink-0" />
                  <h4 className="text-xs font-bold text-white">
                    Security Gates
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enforce defined security policies.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800/90 hover:border-emerald-500/40 transition-colors space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Terminal className="size-4 shrink-0" />
                  <h4 className="text-xs font-bold text-white">
                    Developer Findings
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Surface security issues in the workflow where engineers already work.
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800/90 hover:border-emerald-500/40 transition-colors space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldAlert className="size-4 shrink-0" />
                  <h4 className="text-xs font-bold text-white">
                    Pre-Production Prevention
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Identify security issues before release.
                </p>
              </div>
            </div>

            {/* Visual Story Ribbon */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs  text-slate-400 space-y-2">
              <div className="text-emerald-400 font-bold uppercase tracking-wider text-xs">
                PRE-MERGE CI/CD LIFECYCLE
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-slate-300">
                <span>Developer creates PR</span>
                <span className="text-slate-600">→</span>
                <span className="text-emerald-400 font-semibold">HMW analyzes changes</span>
                <span className="text-slate-600">→</span>
                <span>Security finding detected</span>
                <span className="text-slate-600">→</span>
                <span className="text-amber-400 font-semibold">Security gate evaluates</span>
                <span className="text-slate-600">→</span>
                <span>Developer fixes issue</span>
                <span className="text-slate-600">→</span>
                <span className="text-cyan-400 font-semibold">PR re-evaluated</span>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <a
                href="#github-integration"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-700 hover:border-slate-600 transition-all shadow-sm group"
              >
                <span>View GitHub Integration</span>
                <ArrowRight className="size-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE (7 Columns): Large Realistic GitHub PR / Security Gate Mockup */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0B0F19] border border-slate-800 shadow-2xl overflow-hidden">
              {/* Browser / Repo Chrome Header */}
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-500/70" />
                  <div className="size-3 rounded-full bg-amber-500/70" />
                  <div className="size-3 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 text-xs  text-slate-400 flex items-center gap-1.5">
                    <GitBranch className="size-3.5 text-slate-500" />
                    github.com/enterprise/web-app/pull/482
                  </span>
                </div>
                <span className="text-xs  text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                  GitHub App Connected
                </span>
              </div>

              {/* PR Header Meta */}
              <div className="p-5 sm:p-6 border-b border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      <GitPullRequest className="size-3.5" />
                      Open
                    </span>
                    <span className="text-xs  text-slate-400">
                      Pull Request #482
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 ">
                    Updated 2m ago by <span className="text-slate-300">@alex-dev</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  feat: update authentication flow
                </h3>

                <div className="flex items-center gap-2 text-xs  text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    feat/auth-v2
                  </span>
                  <span>into</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    main
                  </span>
                </div>
              </div>

              {/* HACKMYWEBSITE SECURITY CHECK Container */}
              <div className="p-5 sm:p-6 space-y-5 bg-[#090D15]">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="size-6 rounded bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="size-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider ">
                      HACKMYWEBSITE SECURITY CHECK
                    </span>
                  </div>
                  <span className="text-xs  text-slate-400">
                    Workflow #1,492 • Run in 38s
                  </span>
                </div>

                {/* Checklist Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs ">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="size-3.5 shrink-0" />
                    <span>Static Analysis</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="size-3.5 shrink-0" />
                    <span>Security Rules</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="size-3.5 shrink-0" />
                    <span>Vulnerability Checks</span>
                  </div>
                </div>

                {/* 1 HIGH SEVERITY FINDING CARD */}
                <div className="p-4 rounded-xl bg-slate-950 border border-red-500/40 space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs  font-bold bg-red-500/15 border border-red-500/40 text-red-400">
                      <AlertTriangle className="size-3" />
                      1 HIGH SEVERITY FINDING
                    </span>
                    <span className="text-xs  text-slate-400">
                      CWE-287 • CVSS 7.8
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Broken Authentication Control
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs  text-slate-400">
                      <FileCode className="size-3.5 text-slate-500" />
                      <span className="text-slate-300">src/auth/middleware.ts</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-red-400 font-semibold">Line 147</span>
                    </div>
                  </div>

                  {/* Code Context Preview */}
                  <div className="p-3 rounded-lg bg-[#06080F] border border-slate-800  text-xs text-slate-300 space-y-1 overflow-x-auto">
                    <div className="text-slate-500">// Insecure JWT payload decoding without signature verification</div>
                    <div className="text-red-400 bg-red-950/20 px-1 py-0.5 rounded border-l-2 border-red-500">
                      <span className="text-slate-500 select-none mr-2">147:</span>
                      const decoded = jwt.decode(token); // Vulnerable: missing jwt.verify
                    </div>
                    <div>
                      <span className="text-slate-500 select-none mr-2">148:</span>
                      req.user = decoded;
                    </div>
                  </div>
                </div>

                {/* SECURITY GATE FAILED BLOCK */}
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                      <XCircle className="size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs  font-bold text-red-400 uppercase tracking-wide">
                          SECURITY GATE
                        </span>
                        <span className="px-2 py-0.2 rounded bg-red-500 text-white  text-xs font-black">
                          FAILED
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Policy Rule #12: Merging blocked until High & Critical findings are resolved.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      View Finding
                    </button>
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <Sparkles className="size-3.5" />
                      Fix Guidance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
