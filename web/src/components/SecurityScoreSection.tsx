"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  XCircle,
  Copy,
  Check,
  Terminal,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [displayScore, setDisplayScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  const currentTarget = TARGETS.find((t) => t.id === selectedTargetId) || TARGETS[1];

  // Smooth count-up animation from 0 to target score
  const runScoreAnimation = (targetScore: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsLoading(true);
    setDisplayScore(0);
    const startTime = performance.now();
    const duration = 700; // ms

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * targetScore);
      setDisplayScore(current);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayScore(targetScore);
        setIsLoading(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
  };

  const handleSelectTarget = (targetId: string) => {
    const target = TARGETS.find((t) => t.id === targetId);
    if (!target) return;
    setSelectedTargetId(targetId);
    runScoreAnimation(target.score);
  };

  // Initial animation on mount
  useEffect(() => {
    runScoreAnimation(currentTarget.score);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTarget.fixPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Status-dependent theme colors
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

  // SVG Gauge Calculations (Radius = 72, Circumference = 2 * PI * 72 ~= 452.39)
  // Arc sweeps smoothly with displayScore without any gradient or heavy filter
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  // Sync sub-engine bars with loading progress
  const progressRatio = currentTarget.score > 0 ? displayScore / currentTarget.score : 0;
  const animDast = Math.round(currentTarget.dastScore * progressRatio);
  const animCve = Math.round(currentTarget.cveScore * progressRatio);
  const animSast = Math.round(currentTarget.sastScore * progressRatio);
  const animAuth = Math.round(currentTarget.authScore * progressRatio);

  return (
    <section
      id="readiness-score"
      aria-label="Enterprise Security & Production Readiness Score"
      className="relative w-full bg-black text-slate-100 py-24 sm:py-32 border-b border-neutral-800 overflow-hidden"
    >
      {/* Background ambient lighting from Hero Green/Black color reference (Static - No motion) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(16,185,129,0.16),rgba(5,150,105,0.07)_40%,rgba(2,44,34,0.03)_70%,transparent_100%)] blur-2xl" />
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#022C22]/35 blur-[140px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#10B981]/12 blur-[140px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Header - Pure White Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-emerald-400" />
              <span className=" text-xs font-bold uppercase tracking-wider text-emerald-400">
                AI LAUNCH SCORE
              </span>
            </div>
            {/* Header is 100% pure solid white */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              THE AI LAUNCH SCORE (0-100)
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
              Know exactly what is lowering your security score. Our proprietary scoring engine translates 200+ technical checks into 4 distinct readiness bands with clear go/no-go guidance. Click any band to simulate its live telemetry.
            </p>
          </div>

          <div className="max-w-md text-left lg:text-right text-xs text-slate-400  hidden lg:block">
            <span>Deterministic Multi-Engine Synthesis</span> •{" "}
            <span className="text-emerald-400">Zero Bluff Data</span>
          </div>
        </div>

        {/* 2-Column Main Layout: Interactive Bands + Fix Terminal (Left) & Domain Simulator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Interactive 4 Readiness Bands (Clickable) + Code Diff Terminal (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* 4 Distinct Readiness Bands - Interactive Buttons */}
            <div className="space-y-3.5" role="tablist" aria-label="Security Readiness Bands">
              {/* Band 1: Launch Ready (85-100) */}
              <button
                type="button"
                onClick={() => handleSelectTarget("acme")}
                className={cn(
                  "w-full p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none",
                  selectedTargetId === "acme"
                    ? "bg-[#0A1612] border-emerald-500/90 shadow-lg shadow-emerald-500/15 scale-[1.01] ring-1 ring-emerald-500/40"
                    : "bg-black border-neutral-800 hover:border-neutral-700 opacity-75 hover:opacity-100"
                )}
                aria-selected={selectedTargetId === "acme"}
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="size-10 sm:size-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className=" text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                        LAUNCH READY (85 - 100 pts)
                      </span>
                      {selectedTargetId === "acme" && (
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-sans">
                      Zero high/critical blockers • Safe for live users
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-full text-xs  font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                    SAFE
                  </span>
                  <span className="text-xs  font-bold text-emerald-400 hidden sm:inline">
                    92/100
                  </span>
                </div>
              </button>

              {/* Band 2: Action Recommended (70-84) */}
              <button
                type="button"
                onClick={() => handleSelectTarget("cloud-crm")}
                className={cn(
                  "w-full p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none",
                  selectedTargetId === "cloud-crm"
                    ? "bg-[#18150A] border-yellow-500/90 shadow-lg shadow-yellow-500/15 scale-[1.01] ring-1 ring-yellow-500/40"
                    : "bg-black border-neutral-800 hover:border-neutral-700 opacity-75 hover:opacity-100"
                )}
                aria-selected={selectedTargetId === "cloud-crm"}
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="size-10 sm:size-11 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0">
                    <AlertTriangle className="size-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className=" text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                        ACTION RECOMMENDED (70 - 84 pts)
                      </span>
                      {selectedTargetId === "cloud-crm" && (
                        <span className="size-1.5 rounded-full bg-yellow-400 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-sans">
                      Missing CSP headers or source map warnings
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-full text-xs  font-bold bg-yellow-950/80 border border-yellow-500/40 text-yellow-400">
                    REVIEW
                  </span>
                  <span className="text-xs  font-bold text-yellow-400 hidden sm:inline">
                    76/100
                  </span>
                </div>
              </button>

              {/* Band 3: High Risk (50-69) */}
              <button
                type="button"
                onClick={() => handleSelectTarget("ai-agent")}
                className={cn(
                  "w-full p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none",
                  selectedTargetId === "ai-agent"
                    ? "bg-[#1B110A] border-orange-500/90 shadow-lg shadow-orange-500/15 scale-[1.01] ring-1 ring-orange-500/40"
                    : "bg-black border-neutral-800 hover:border-neutral-700 opacity-75 hover:opacity-100"
                )}
                aria-selected={selectedTargetId === "ai-agent"}
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="size-10 sm:size-11 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                    <AlertOctagon className="size-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className=" text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                        HIGH RISK (50 - 69 pts)
                      </span>
                      {selectedTargetId === "ai-agent" && (
                        <span className="size-1.5 rounded-full bg-orange-400 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-sans">
                      Unprotected API routes or permissive RLS policies
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-full text-xs  font-bold bg-orange-950/80 border border-orange-500/40 text-orange-400">
                    RISK
                  </span>
                  <span className="text-xs  font-bold text-orange-400 hidden sm:inline">
                    67/100
                  </span>
                </div>
              </button>

              {/* Band 4: Launch Blocker (< 50) */}
              <button
                type="button"
                onClick={() => handleSelectTarget("legacy")}
                className={cn(
                  "w-full p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none",
                  selectedTargetId === "legacy"
                    ? "bg-[#1D0B0D] border-red-500/90 shadow-lg shadow-red-500/15 scale-[1.01] ring-1 ring-red-500/40"
                    : "bg-black border-neutral-800 hover:border-neutral-700 opacity-75 hover:opacity-100"
                )}
                aria-selected={selectedTargetId === "legacy"}
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="size-10 sm:size-11 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                    <XCircle className="size-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className=" text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                        LAUNCH BLOCKER (&lt; 50 pts)
                      </span>
                      {selectedTargetId === "legacy" && (
                        <span className="size-1.5 rounded-full bg-red-400 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-sans">
                      Critical SQL injection or leaked database credentials
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-full text-xs  font-bold bg-red-950/80 border border-red-500/40 text-red-400">
                    BLOCKER
                  </span>
                  <span className="text-xs  font-bold text-red-400 hidden sm:inline">
                    34/100
                  </span>
                </div>
              </button>
            </div>

            {/* AI Fix Prompt for Cursor & Claude (Terminal) */}
            <div className="rounded-2xl bg-black border border-neutral-800 shadow-2xl overflow-hidden  text-xs">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-black border-b border-neutral-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Terminal className="size-3.5" />
                  <span>AI Fix Prompt for Cursor & Claude</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-neutral-300 hover:text-white bg-black hover:bg-neutral-900 border border-neutral-700 hover:border-neutral-500 transition-colors cursor-pointer"
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
              <div className="p-4 bg-black overflow-x-auto text-[11.5px] leading-relaxed text-slate-300">
                <pre className=" whitespace-pre text-slate-300">
                  {currentTarget.fixPrompt}
                </pre>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Domain Readiness Simulator (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-black border border-neutral-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6 text-left">
            {/* Simulator Title */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className=" text-xs font-bold uppercase tracking-wider text-emerald-400">
                SIMULATE TARGET DOMAIN
              </span>
              <div className="flex items-center gap-1.5 text-xs  text-slate-400">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                <span>INTERACTIVE</span>
              </div>
            </div>

            {/* 4 Clickable Simulation Domain Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              {TARGETS.map((t) => {
                const isSelected = selectedTargetId === t.id;
                const targetTheme = getStatusTheme(t.status);

                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectTarget(t.id)}
                    className={cn(
                      "p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-[68px]",
                      isSelected
                        ? "bg-neutral-900 shadow-md scale-[1.02]"
                        : "bg-black border-neutral-800 hover:border-neutral-700 opacity-80 hover:opacity-100"
                    )}
                    style={{
                      borderColor: isSelected ? targetTheme.color : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className=" text-xs font-bold text-slate-200 truncate">
                        {t.domain}
                      </span>
                      <span
                        className="text-xs  font-black px-1.5 py-0.5 rounded shrink-0"
                        style={{
                          color: targetTheme.color,
                          backgroundColor: targetTheme.bg,
                          border: `1px solid ${targetTheme.border}`,
                        }}
                      >
                        {t.score}/100
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-sans">
                      {t.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Circular SVG Gauge Display - Crisp & Minimalist (NO GRADIENTS, NO HEAVY GLOW) */}
            <div className="py-4 flex flex-col items-center justify-center relative">
              <div className="relative size-44 sm:size-48 flex items-center justify-center">
                <svg className="size-full -rotate-90" viewBox="0 0 180 180">
                  {/* Clean Neutral Background Track */}
                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke="#171717"
                    strokeWidth="14"
                  />
                  {/* Solid Crisp Active Score Arc - Fills up with displayScore without gradient */}
                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke={currentTheme.gaugeColor}
                    strokeWidth="14"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-150 ease-out"
                  />
                </svg>

                {/* Score Number in Gauge Center - Animated from 0 to target score */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl sm:text-5xl  font-black text-white tracking-tight">
                      {displayScore}
                    </span>
                    <span className="text-base sm:text-lg  text-neutral-400 font-bold ml-0.5">
                      /100
                    </span>
                  </div>
                  {isLoading ? (
                    <span className="text-xs  font-bold mt-1 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 animate-pulse">
                      EVALUATING...
                    </span>
                  ) : (
                    <span
                      className="text-xs  font-bold mt-1 px-2.5 py-0.5 rounded border transition-all"
                      style={{
                        color: currentTheme.color,
                        backgroundColor: currentTheme.bg,
                        borderColor: currentTheme.border,
                      }}
                    >
                      {currentTarget.statusLabel}
                    </span>
                  )}
                </div>
              </div>

              <p className=" text-xs text-slate-400 mt-4 text-center">
                Calculated against {currentTarget.vectors} security vectors •{" "}
                <span className={currentTarget.activeWarnings > 0 ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
                  {currentTarget.activeWarnings} active warnings
                </span>
              </p>
            </div>

            {/* Sub-Engine Health Telemetry Bars - Filling smoothly in sync */}
            <div className="space-y-3 pt-3 border-t border-neutral-800  text-xs">
              <div className="grid grid-cols-2 gap-3">
                {/* DAST Runtime */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="truncate">DAST Runtime & APIs</span>
                    <span className="text-emerald-400 font-bold">{animDast}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-150"
                      style={{ width: `${animDast}%` }}
                    />
                  </div>
                </div>

                {/* CVE Feed */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="truncate">CVE Zero-Day Feed</span>
                    <span className="text-emerald-400 font-bold">{animCve}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-150"
                      style={{ width: `${animCve}%` }}
                    />
                  </div>
                </div>

                {/* SAST Code Logic */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="truncate">SAST AST Code</span>
                    <span className="text-emerald-400 font-bold">{animSast}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-150"
                      style={{ width: `${animSast}%` }}
                    />
                  </div>
                </div>

                {/* Production Auth */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="truncate">Auth & Surface Graph</span>
                    <span className="text-emerald-400 font-bold">{animAuth}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-150"
                      style={{ width: `${animAuth}%` }}
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
