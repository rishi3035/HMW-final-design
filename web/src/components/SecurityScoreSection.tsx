"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  XCircle,
  Copy,
  Check,
  Terminal,
  Activity,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";

interface SimulationTarget {
  id: string;
  domain: string;
  tag: string;
  score: number;
  status: "safe" | "review" | "risk" | "blocker";
  statusLabel: string;
  vectors: number;
  activeWarnings: number;
  dastScore: number;
  cveScore: number;
  sastScore: number;
  authScore: number;
  fixPrompt: string;
}

const TARGETS: SimulationTarget[] = [
  {
    id: "acme",
    domain: "acme-ecommerce.com",
    tag: "Next.js GenAI",
    score: 92,
    status: "safe",
    statusLabel: "SAFE",
    vectors: 248,
    activeWarnings: 0,
    dastScore: 94,
    cveScore: 98,
    sastScore: 90,
    authScore: 88,
    fixPrompt: `// HackMyWebsite Automated Remediation Diff
// Target: acme-ecommerce.com • Status: Launch Ready (92/100)
// Audit: Zero high/critical blockers detected.

// Security hardening recommendation:
export const securityHeaders = [
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-Frame-Options', value: 'DENY' }
];`,
  },
  {
    id: "cloud-crm",
    domain: "cloud-crm-portal.io",
    tag: "Full-Stack SaaS",
    score: 76,
    status: "review",
    statusLabel: "REVIEW",
    vectors: 214,
    activeWarnings: 2,
    dastScore: 82,
    cveScore: 88,
    sastScore: 74,
    authScore: 68,
    fixPrompt: `// HackMyWebsite Automated Remediation Diff
// Target: cloud-crm-portal.io • Status: Action Recommended (76/100)
// Fix: Add strict Content-Security-Policy & HSTS in next.config.ts

export default {
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
      ]
    }];
  }
};`,
  },
  {
    id: "ai-agent",
    domain: "ai-prompt-generator.ai",
    tag: "AI Agentic App",
    score: 67,
    status: "risk",
    statusLabel: "RISK",
    vectors: 189,
    activeWarnings: 3,
    dastScore: 68,
    cveScore: 72,
    sastScore: 64,
    authScore: 62,
    fixPrompt: `// HackMyWebsite Automated Remediation Diff
// Target: ai-prompt-generator.ai • Status: Elevated Risk (67/100)
// Fix: Enforce Supabase / PostgreSQL Row-Level Security (RLS) policies

ALTER TABLE user_prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only read own prompts"
ON user_prompts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert own prompts"
ON user_prompts FOR INSERT
WITH CHECK (auth.uid() = user_id);`,
  },
  {
    id: "legacy",
    domain: "legacy-portal-core.site",
    tag: "Legacy Core",
    score: 34,
    status: "blocker",
    statusLabel: "BLOCKER",
    vectors: 312,
    activeWarnings: 7,
    dastScore: 32,
    cveScore: 40,
    sastScore: 28,
    authScore: 35,
    fixPrompt: `// HackMyWebsite Automated Remediation Diff
// Target: legacy-portal-core.site • Status: Production Blocker (34/100)
// CRITICAL: Unparameterized SQL Query Vulnerability (CVE-2026-SQLi)

// BEFORE (VULNERABLE):
// const user = await db.query(\`SELECT * FROM users WHERE email = '\${email}'\`);

// FIXED (SECURE PARAMETERIZED BINDING):
const user = await db.query(
  'SELECT id, email, role, status FROM users WHERE email = $1 LIMIT 1',
  [sanitizedEmail]
);`,
  },
];

export const SecurityScoreSection: React.FC = () => {
  const [selectedTargetId, setSelectedTargetId] = useState<string>("cloud-crm");
  const [copied, setCopied] = useState<boolean>(false);

  const currentTarget = TARGETS.find((t) => t.id === selectedTargetId) || TARGETS[1];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTarget.fixPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Status-dependent palette
  const getStatusTheme = (status: SimulationTarget["status"]) => {
    switch (status) {
      case "safe":
        return {
          color: "#10B981",
          bg: "rgba(16, 185, 129, 0.12)",
          border: "rgba(16, 185, 129, 0.4)",
          gaugeColor: "#10B981",
          badgeBg: "bg-emerald-950/80 border-emerald-500/40 text-emerald-400",
        };
      case "review":
        return {
          color: "#FACC15",
          bg: "rgba(250, 204, 21, 0.12)",
          border: "rgba(250, 204, 21, 0.4)",
          gaugeColor: "#FACC15",
          badgeBg: "bg-yellow-950/80 border-yellow-500/40 text-yellow-400",
        };
      case "risk":
        return {
          color: "#FB923C",
          bg: "rgba(251, 146, 60, 0.12)",
          border: "rgba(251, 146, 60, 0.4)",
          gaugeColor: "#FB923C",
          badgeBg: "bg-orange-950/80 border-orange-500/40 text-orange-400",
        };
      case "blocker":
        return {
          color: "#F87171",
          bg: "rgba(248, 113, 113, 0.12)",
          border: "rgba(248, 113, 113, 0.4)",
          gaugeColor: "#F87171",
          badgeBg: "bg-red-950/80 border-red-500/40 text-red-400",
        };
    }
  };

  const currentTheme = getStatusTheme(currentTarget.status);

  // SVG Gauge Calculations (Radius = 75, Circumference = 2 * PI * 75 ~= 471.2)
  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentTarget.score / 100) * circumference;

  return (
    <section
      id="readiness-score"
      aria-label="Enterprise Security & Production Readiness Score"
      className="relative w-full h-screen min-h-[100vh] lg:h-screen lg:max-h-screen flex flex-col justify-between bg-black text-slate-100 py-4 sm:py-6 lg:py-6 border-b border-neutral-800 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-10 w-96 h-96 rounded-full bg-emerald-950/15 blur-[140px] -z-10" />
      <div className="pointer-events-none absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-cyan-950/15 blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-between h-full w-full">
        {/* Section Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 mb-2 sm:mb-3 shrink-0">
          <div className="space-y-1 max-w-2xl text-left">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-emerald-400" />
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
                AI LAUNCH SCORE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              THE AI <span className="text-emerald-400">LAUNCH SCORE</span> (0-100)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans line-clamp-2">
              Know exactly what is lowering your security score. Our proprietary scoring engine translates 200+ technical checks into 4 distinct readiness bands with clear go/no-go guidance.
            </p>
          </div>

          <div className="max-w-md text-left lg:text-right text-[11px] text-slate-400 font-mono hidden lg:block pb-1">
            <span>Deterministic Multi-Engine Synthesis</span> •{" "}
            <span className="text-emerald-400">Zero Bluff Data</span>
          </div>
        </div>

        {/* 2-Column Main Layout: Bands + Fix Terminal (Left) & Domain Simulator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center flex-1 my-auto min-h-0">
          {/* LEFT COLUMN: 4 Readiness Bands + Code Diff Terminal (7 cols) */}
          <div className="lg:col-span-7 space-y-3 text-left flex flex-col justify-between h-full py-1">
            {/* 4 Distinct Readiness Bands */}
            <div className="space-y-2">
              {/* Band 1: Launch Ready (85-100) */}
              <div
                className={cn(
                  "p-2.5 sm:p-3 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3",
                  currentTarget.score >= 85
                    ? "bg-[#0A1612] border-emerald-500/80 shadow-md shadow-emerald-500/10 scale-[1.01]"
                    : "bg-black border-neutral-800 hover:border-neutral-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 sm:size-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="size-4 sm:size-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-tight">
                        LAUNCH READY (85 - 100 pts)
                      </span>
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-400 font-sans">
                      Zero high/critical blockers • Safe for live users
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 shrink-0">
                  SAFE
                </span>
              </div>

              {/* Band 2: Action Recommended (70-84) */}
              <div
                className={cn(
                  "p-2.5 sm:p-3 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3",
                  currentTarget.score >= 70 && currentTarget.score < 85
                    ? "bg-[#18150A] border-yellow-500/80 shadow-md shadow-yellow-500/10 scale-[1.01]"
                    : "bg-black border-neutral-800 hover:border-neutral-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 sm:size-9 rounded-lg bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0">
                    <AlertTriangle className="size-4 sm:size-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-tight">
                        ACTION RECOMMENDED (70 - 84 pts)
                      </span>
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-400 font-sans">
                      Missing CSP headers or source map warnings
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-yellow-950/80 border border-yellow-500/40 text-yellow-400 shrink-0">
                  REVIEW
                </span>
              </div>

              {/* Band 3: High Risk (50-69) */}
              <div
                className={cn(
                  "p-2.5 sm:p-3 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3",
                  currentTarget.score >= 50 && currentTarget.score < 70
                    ? "bg-[#1B110A] border-orange-500/80 shadow-md shadow-orange-500/10 scale-[1.01]"
                    : "bg-black border-neutral-800 hover:border-neutral-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 sm:size-9 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                    <AlertOctagon className="size-4 sm:size-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-tight">
                        HIGH RISK (50 - 69 pts)
                      </span>
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-400 font-sans">
                      Unprotected API routes or permissive RLS policies
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-950/80 border border-orange-500/40 text-orange-400 shrink-0">
                  RISK
                </span>
              </div>

              {/* Band 4: Launch Blocker (< 50) */}
              <div
                className={cn(
                  "p-2.5 sm:p-3 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3",
                  currentTarget.score < 50
                    ? "bg-[#1D0B0D] border-red-500/80 shadow-md shadow-red-500/10 scale-[1.01]"
                    : "bg-black border-neutral-800 hover:border-neutral-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 sm:size-9 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                    <XCircle className="size-4 sm:size-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-tight">
                        LAUNCH BLOCKER (&lt; 50 pts)
                      </span>
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-400 font-sans">
                      Critical SQL injection or leaked database credentials
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950/80 border border-red-500/40 text-red-400 shrink-0">
                  BLOCKER
                </span>
              </div>
            </div>

            {/* AI Fix Prompt for Cursor & Claude (Terminal) */}
            <div className="rounded-xl bg-black border border-neutral-800 shadow-xl overflow-hidden font-mono text-xs">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-black border-b border-neutral-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                  <Terminal className="size-3" />
                  <span>AI Fix Prompt for Cursor & Claude</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10.5px] text-neutral-300 hover:text-white bg-black hover:bg-neutral-900 border border-neutral-700 hover:border-neutral-500 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3 text-slate-400" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Body */}
              <div className="p-2.5 bg-black overflow-x-auto max-h-[85px] sm:max-h-[95px] overflow-y-auto text-[10.5px] leading-relaxed text-slate-300 scrollbar-thin">
                <pre className="font-mono whitespace-pre text-slate-300">
                  {currentTarget.fixPrompt}
                </pre>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Domain Readiness Simulator (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-black border border-neutral-800 p-4 sm:p-5 shadow-2xl backdrop-blur-xl space-y-3 text-left">
            {/* Simulator Title */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                SIMULATE TARGET DOMAIN
              </span>
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* 4 Clickable Simulation Domain Cards */}
            <div className="grid grid-cols-2 gap-2">
              {TARGETS.map((t) => {
                const isSelected = selectedTargetId === t.id;
                const targetTheme = getStatusTheme(t.status);

                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTargetId(t.id)}
                    className={cn(
                      "p-2 rounded-lg border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-[52px]",
                      isSelected
                        ? "bg-neutral-900 shadow-md scale-[1.01]"
                        : "bg-black border-neutral-800 hover:border-neutral-700 opacity-80 hover:opacity-100"
                    )}
                    style={{
                      borderColor: isSelected ? targetTheme.color : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-[10.5px] font-bold text-slate-200 truncate">
                        {t.domain}
                      </span>
                      <span
                        className="text-[9.5px] font-mono font-black px-1.5 py-0.2 rounded shrink-0"
                        style={{
                          color: targetTheme.color,
                          backgroundColor: targetTheme.bg,
                          border: `1px solid ${targetTheme.border}`,
                        }}
                      >
                        {t.score}/100
                      </span>
                    </div>
                    <span className="text-[9.5px] text-slate-400 font-sans">
                      {t.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Circular SVG Gauge Display */}
            <div className="py-1 flex flex-col items-center justify-center relative">
              <div className="relative size-28 sm:size-32 lg:size-36 flex items-center justify-center">
                <svg className="size-full -rotate-90" viewBox="0 0 180 180">
                  {/* Gauge Background Track */}
                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="18"
                  />
                  {/* Gauge Active Score Arc */}
                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke={currentTheme.gaugeColor}
                    strokeWidth="18"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                    style={{
                      filter: `drop-shadow(0 0 10px ${currentTheme.color})`,
                    }}
                  />
                </svg>

                {/* Score Number in Gauge Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
                      <NumberFlow value={currentTarget.score} />
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-slate-400 font-bold ml-0.5">
                      /100
                    </span>
                  </div>
                  <span
                    className="text-[9.5px] font-mono font-bold mt-0.5 px-1.5 py-0.2 rounded border"
                    style={{
                      color: currentTheme.color,
                      backgroundColor: currentTheme.bg,
                      borderColor: currentTheme.border,
                    }}
                  >
                    {currentTarget.statusLabel}
                  </span>
                </div>
              </div>

              <p className="font-mono text-[10px] text-slate-400 mt-1.5 text-center">
                Calculated against {currentTarget.vectors} security vectors •{" "}
                <span className={currentTarget.activeWarnings > 0 ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
                  {currentTarget.activeWarnings} active warnings
                </span>
              </p>
            </div>

            {/* Sub-Engine Health Telemetry Bars */}
            <div className="space-y-1.5 pt-2 border-t border-neutral-800 font-mono text-[10.5px]">
              <div className="grid grid-cols-2 gap-2">
                {/* DAST Runtime */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span className="truncate">DAST Runtime</span>
                    <span className="text-emerald-400 font-bold">{currentTarget.dastScore}%</span>
                  </div>
                  <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-500"
                      style={{ width: `${currentTarget.dastScore}%` }}
                    />
                  </div>
                </div>

                {/* CVE Feed */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span className="truncate">CVE Zero-Day</span>
                    <span className="text-emerald-400 font-bold">{currentTarget.cveScore}%</span>
                  </div>
                  <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-500"
                      style={{ width: `${currentTarget.cveScore}%` }}
                    />
                  </div>
                </div>

                {/* SAST Code Logic */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span className="truncate">SAST AST Code</span>
                    <span className="text-emerald-400 font-bold">{currentTarget.sastScore}%</span>
                  </div>
                  <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-500"
                      style={{ width: `${currentTarget.sastScore}%` }}
                    />
                  </div>
                </div>

                {/* Production Auth */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span className="truncate">Auth Graph</span>
                    <span className="text-emerald-400 font-bold">{currentTarget.authScore}%</span>
                  </div>
                  <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-500"
                      style={{ width: `${currentTarget.authScore}%` }}
                    />
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

export default SecurityScoreSection;
