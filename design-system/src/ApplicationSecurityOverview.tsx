import React, { useState } from "react";

// Self-contained inline SVGs for enterprise crispness and zero dependency issues
const ShieldCheckIcon = ({ className = "size-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const CheckCircleIcon = ({ className = "size-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const GitPullRequestIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <path d="M13 6h3a2 2 0 0 1 2 2v7" />
    <line x1="6" y1="9" x2="6" y2="21" />
  </svg>
);

const RotateCwIcon = ({ className = "size-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <polyline points="21 3 21 8 16 8" />
  </svg>
);

const ArrowUpRightIcon = ({ className = "size-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export interface ApplicationSecurityOverviewProps {
  score?: number;
  domain?: string;
  className?: string;
  onViewFinding?: () => void;
  onRetest?: () => void;
}

export const ApplicationSecurityOverview: React.FC<ApplicationSecurityOverviewProps> = ({
  score = 82,
  domain = "app.enterprise-saas.com",
  className = "",
  onViewFinding,
  onRetest
}) => {
  const [isRetesting, setIsRetesting] = useState(false);
  const [retestSuccess, setRetestSuccess] = useState(false);
  const [activeFindingExpanded, setActiveFindingExpanded] = useState(false);

  const handleRetest = () => {
    setIsRetesting(true);
    setRetestSuccess(false);
    onRetest?.();
    setTimeout(() => {
      setIsRetesting(false);
      setRetestSuccess(true);
      setTimeout(() => setRetestSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl bg-[#090D16]/95 border border-slate-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.06)] backdrop-blur-2xl p-5 sm:p-6 text-left transition-all relative overflow-hidden ${className}`}
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
              <span>APPLICATION SECURITY OVERVIEW</span>
              <span className="hidden sm:inline-block text-slate-600">•</span>
              <span className="text-[10px] text-emerald-400 font-normal font-mono">LIVE POSTURE</span>
            </h3>
            <div className="text-xs font-mono text-slate-300 flex items-center gap-1.5 mt-0.5">
              <span className="text-slate-500">Target:</span>
              <span className="text-white font-semibold">{domain}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Continuous Active
          </span>
          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">v2.5</span>
        </div>
      </div>

      {/* Main Grid: Score Gauge & Severity Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-slate-800/80 items-center">
        {/* Security Score Box (82 / 100) */}
        <div className="md:col-span-5 flex items-center gap-4 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80">
          <div className="relative size-20 shrink-0 flex items-center justify-center">
            {/* SVG Radial Arc */}
            <svg className="size-20 -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="#1E293B"
                strokeWidth="7"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="#10B981"
                strokeWidth="7"
                strokeDasharray={213.6}
                strokeDashoffset={213.6 * (1 - score / 100)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-mono font-black text-white leading-none">{score}</span>
              <span className="text-[9px] font-mono text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Security Score
            </div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheckIcon className="size-3.5" />
              <span>82 / 100</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Action Recommended
            </div>
          </div>
        </div>

        {/* Severity Breakdown: Critical: 0, High: 3, Medium: 8, Low: 11 */}
        <div className="md:col-span-7 grid grid-cols-4 gap-2">
          {/* Critical: 0 */}
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/70 text-center">
            <div className="text-[10px] font-mono uppercase text-slate-400">Critical</div>
            <div className="text-lg font-mono font-bold text-slate-200 mt-0.5">0</div>
            <div className="text-[9px] text-emerald-400 font-mono">0 Blocker</div>
          </div>

          {/* High: 3 */}
          <div className="p-2.5 rounded-xl bg-orange-950/20 border border-orange-500/30 text-center">
            <div className="text-[10px] font-mono uppercase text-orange-300">High</div>
            <div className="text-lg font-mono font-bold text-orange-400 mt-0.5">3</div>
            <div className="text-[9px] text-orange-400/80 font-mono">Needs Fix</div>
          </div>

          {/* Medium: 8 */}
          <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-center">
            <div className="text-[10px] font-mono uppercase text-amber-300">Medium</div>
            <div className="text-lg font-mono font-bold text-amber-400 mt-0.5">8</div>
            <div className="text-[9px] text-amber-400/80 font-mono">Review</div>
          </div>

          {/* Low: 11 */}
          <div className="p-2.5 rounded-xl bg-blue-950/20 border border-blue-500/30 text-center">
            <div className="text-[10px] font-mono uppercase text-blue-300">Low</div>
            <div className="text-lg font-mono font-bold text-blue-400 mt-0.5">11</div>
            <div className="text-[9px] text-blue-400/80 font-mono">Advisory</div>
          </div>
        </div>
      </div>

      {/* Middle Section: Security Engines & Security Gate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-b border-slate-800/80 text-xs">
        {/* Security Engines: DAST - Complete, SAST - Complete, Vulnerability Detection - Complete */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-2">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Security Engines</span>
            <span className="text-[10px] text-emerald-400 font-normal">3 / 3 Complete</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                DAST
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-emerald-400 text-[11px] font-bold">
                <CheckCircleIcon className="size-3" /> Complete
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                SAST
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-emerald-400 text-[11px] font-bold">
                <CheckCircleIcon className="size-3" /> Complete
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Vulnerability Detection
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-emerald-400 text-[11px] font-bold">
                <CheckCircleIcon className="size-3" /> Complete
              </span>
            </div>
          </div>
        </div>

        {/* Security Gate: Passed */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-2 flex flex-col justify-between">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Security Gate</span>
            <span className="text-slate-500 font-mono text-[10px]">CI/CD Pipeline</span>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-md bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <GitPullRequestIcon className="size-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>GitHub Security Gate</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">PR #142 · main branch</div>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono font-bold text-xs flex items-center gap-1">
              <CheckCircleIcon className="size-3.5" />
              Passed
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Finding & Actions */}
      <div className="pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Recent Finding
            </span>
            <span className="text-[10px] font-mono text-slate-500">ID: HMW-SEC-4091</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Logged 2m ago</span>
        </div>

        {/* Finding Card */}
        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-orange-500/30 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded-md bg-orange-500/15 border border-orange-500/40 text-orange-400 font-mono font-bold text-xs">
                High
              </span>
              <span className="text-xs font-bold text-white">Broken Access Control</span>
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">CWE-284</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              /api/v2/workspaces/&#123;id&#125;/admin
            </span>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed">
            Missing authorization check allows authenticated users to mutate admin role bindings without workspace ownership verification.
          </p>

          {activeFindingExpanded && (
            <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800 font-mono text-[10px] text-emerald-300 space-y-1">
              <div className="text-slate-400">// AI Remediation Directive:</div>
              <div>+ if (workspace.ownerId !== session.userId) return res.status(403).json(&#123; error: &apos;Forbidden&apos; &#125;);</div>
            </div>
          )}
        </div>

        {/* Actions Buttons: View Finding & Retest */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setActiveFindingExpanded(!activeFindingExpanded);
                onViewFinding?.();
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{activeFindingExpanded ? "Hide Details" : "View Finding"}</span>
              <ArrowUpRightIcon className="size-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              disabled={isRetesting}
              onClick={handleRetest}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RotateCwIcon className={`size-3.5 ${isRetesting ? "animate-spin text-emerald-400" : ""}`} />
              <span>{isRetesting ? "Auditing Pipeline..." : retestSuccess ? "✓ Retest Passed" : "Retest"}</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500 text-right w-full sm:w-auto">
            Last Audit: <span className="text-slate-300">Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
};
