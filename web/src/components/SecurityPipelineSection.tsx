"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Network,
  Cpu,
  ShieldCheck,
  BarChart3,
  Terminal,
  ArrowRight,
  Activity,
  Zap,
  CheckCircle2,
  Lock,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineStage {
  step: string;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  glowColor: string;
  icon: React.ComponentType<{ className?: string }>;
  telemetryMetric: string;
  telemetryLabel: string;
  statusBadge: string;
  telemetryItems: {
    key: string;
    val: string;
    highlight?: boolean;
  }[];
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    step: "01",
    name: "Discover",
    tagline: "Domains / APIs / Endpoints",
    description: "Autonomous external reconnaissance maps active subdomains, IP ranges, public cloud buckets, and exposed REST/GraphQL endpoints.",
    accentColor: "#10B981",
    accentBg: "rgba(16, 185, 129, 0.12)",
    accentBorder: "rgba(16, 185, 129, 0.4)",
    glowColor: "rgba(16, 185, 129, 0.25)",
    icon: Globe,
    telemetryMetric: "84 Endpoints",
    telemetryLabel: "Endpoints Discovered",
    statusBadge: "PERIMETER SCOPED",
    telemetryItems: [
      { key: "Target Assets", val: "DNS & ASN Mapped", highlight: true },
      { key: "Protocols", val: "HTTPS, gRPC, REST" },
      { key: "Shadow APIs", val: "12 Uncataloged Routes" },
    ],
  },
  {
    step: "02",
    name: "Crawl",
    tagline: "Routes / Parameters / Attack Surface",
    description: "Headless browser spider walks dynamic Single Page Applications, rendering DOM states and cataloging parameterized attack surfaces.",
    accentColor: "#06B6D4",
    accentBg: "rgba(6, 182, 212, 0.12)",
    accentBorder: "rgba(6, 182, 212, 0.4)",
    glowColor: "rgba(6, 182, 212, 0.25)",
    icon: Network,
    telemetryMetric: "420+ Vectors",
    telemetryLabel: "Routes & Params Mapped",
    statusBadge: "DOM GRAPHED",
    telemetryItems: [
      { key: "DOM State Graph", val: "240 Client Routes", highlight: true },
      { key: "Auth Surfaces", val: "OAuth / JWT Handshake" },
      { key: "Query & Body", val: "420+ Param Slots" },
    ],
  },
  {
    step: "03",
    name: "Analyze",
    tagline: "DAST / SAST / CVE Intelligence",
    description: "Multi-engine synthesis runs active behavioral runtime probes alongside AST static token scans against 5,400+ CVE vulnerability signatures.",
    accentColor: "#3B82F6",
    accentBg: "rgba(59, 130, 246, 0.12)",
    accentBorder: "rgba(59, 130, 246, 0.4)",
    glowColor: "rgba(59, 130, 246, 0.25)",
    icon: Cpu,
    telemetryMetric: "5,420 CVEs",
    telemetryLabel: "CVEs & AST Rules Scanned",
    statusBadge: "ENGINES CORRELATED",
    telemetryItems: [
      { key: "Runtime DAST", val: "OWASP Top 10 Active", highlight: true },
      { key: "Static SAST", val: "Secret & Token Leaks" },
      { key: "CVE Intelligence", val: "Zero-Day Signatures" },
    ],
  },
  {
    step: "04",
    name: "Validate",
    tagline: "Exploit Verification / False-Positive Filtering",
    description: "Safely replays proof-of-concept exploits in an isolated sandbox environment to eliminate noise and mathematically guarantee findings.",
    accentColor: "#14B8A6",
    accentBg: "rgba(20, 184, 166, 0.12)",
    accentBorder: "rgba(20, 184, 166, 0.4)",
    glowColor: "rgba(20, 184, 166, 0.25)",
    icon: ShieldCheck,
    telemetryMetric: "99.2% Filtered",
    telemetryLabel: "Vulnerabilities Validated",
    statusBadge: "EXPLOIT VERIFIED",
    telemetryItems: [
      { key: "Sandbox PoC", val: "Non-Destructive Replay", highlight: true },
      { key: "False Positives", val: "Suppressed (0% Bluff)" },
      { key: "Payload Proof", val: "Deterministic Evidence" },
    ],
  },
  {
    step: "05",
    name: "Prioritize",
    tagline: "Risk Score / Severity / Business Impact",
    description: "Contextual triage engine weighs CVSS 3.1 scores with real-world internet reachability, data sensitivity, and mission-critical business risk.",
    accentColor: "#F59E0B",
    accentBg: "rgba(245, 158, 11, 0.12)",
    accentBorder: "rgba(245, 158, 11, 0.4)",
    glowColor: "rgba(245, 158, 11, 0.25)",
    icon: BarChart3,
    telemetryMetric: "Score 0–100",
    telemetryLabel: "Risk Score Generated",
    statusBadge: "TRIAGE SYNTHESIZED",
    telemetryItems: [
      { key: "CVSS Severity", val: "Normalized 9.4 (P0)", highlight: true },
      { key: "Reachability", val: "Public API Exposure" },
      { key: "Posture Score", val: "Composite Metric: 88" },
    ],
  },
  {
    step: "06",
    name: "Remediate",
    tagline: "Fix Guidance / Cursor Prompts / Developer Workflow",
    description: "Produces ready-to-merge code diffs, contextual Cursor IDE prompts, and automated GitHub PR safeguard checks for instant developer execution.",
    accentColor: "#10B981",
    accentBg: "rgba(16, 185, 129, 0.12)",
    accentBorder: "rgba(16, 185, 129, 0.4)",
    glowColor: "rgba(16, 185, 129, 0.25)",
    icon: Terminal,
    telemetryMetric: "1-Click Diffs",
    telemetryLabel: "Remediation Guidance Produced",
    statusBadge: "PATCH READY",
    telemetryItems: [
      { key: "IDE Fixes", val: "1-Click Cursor Prompts", highlight: true },
      { key: "CI/CD Gate", val: "GitHub PR Safeguard" },
      { key: "Retest Loop", val: "Closed-Loop Verified" },
    ],
  },
];

export const SecurityPipelineSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-cycle through the 6 stages every 3 seconds unless hovered by user
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleStartScan = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      const input = document.querySelector('input[placeholder*="your-startup"]') as HTMLInputElement | null;
      if (input) {
        input.focus();
        input.select();
      }
    }, 500);
  };

  const handleNavigateHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", "/how-it-works");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="how-it-works"
      aria-label="Section 3 — How It Works: Continuous Security Pipeline"
      className="relative w-full bg-[#06080F] text-slate-100 py-24 sm:py-32 border-b border-slate-800/80 overflow-hidden"
    >
      {/* User-Provided Background Image Aura */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen -z-10"
        style={{
          backgroundImage: `url('/attack-surface-bg.png')`,
        }}
      />
      {/* Vignette Gradients for seamless dark transition */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06080F] via-transparent to-[#06080F] -z-10" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl -z-10" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-96 h-96 rounded-full bg-emerald-950/20 blur-[130px] -z-10" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-950/20 blur-[130px] -z-10" />

      {/* Subtle background circuit grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
            From Attack Surface to Actionable Security.
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            One continuous security pipeline that discovers, analyzes, validates, and prioritizes vulnerabilities before they become production incidents.
          </p>
        </div>

        {/* PIPELINE INFRASTRUCTURE CONTAINER */}
        <div
          className="relative w-full rounded-3xl bg-[#080D1A]/80 border border-slate-800/80 p-5 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top Telemetry Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 sm:pb-8 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                AUTONOMOUS SECURITY EXECUTION BUS
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded hidden sm:inline-block">
                LIVE PIPELINE
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Activity className="size-3.5 text-emerald-400" />
                <span>LATENCY: <strong className="text-white">3.4ms</strong></span>
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <Lock className="size-3.5 text-cyan-400" />
                <span>NON-DESTRUCTIVE: <strong className="text-emerald-400">100% SAFE</strong></span>
              </span>
              <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                ACTIVE STAGE: {PIPELINE_STAGES[activeStage].step} / 06
              </span>
            </div>
          </div>

          {/* CONTINUOUS PIPELINE VISUAL BACKBONE TRACK (Desktop) */}
          <div className="hidden lg:block relative my-6">
            {/* Horizontal Bus Conduit Line */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] bg-slate-800" />

            {/* Glowing Traveling Data Stream Beam */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[3px] rounded-full transition-all duration-700 ease-out"
              style={{
                left: `${(activeStage / 5) * 82}%`,
                width: "18%",
                background: `linear-gradient(90deg, transparent, ${PIPELINE_STAGES[activeStage].accentColor}, #ffffff, ${PIPELINE_STAGES[activeStage].accentColor}, transparent)`,
                boxShadow: `0 0 15px ${PIPELINE_STAGES[activeStage].accentColor}`,
              }}
            />

            {/* 6 Sequential Bus Junction Nodes */}
            <div className="relative flex items-center justify-between z-10">
              {PIPELINE_STAGES.map((stage, idx) => {
                const isActive = activeStage === idx;
                const isPassed = activeStage >= idx;

                return (
                  <button
                    key={`node-${stage.step}`}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none"
                    aria-label={`Select stage ${stage.step} ${stage.name}`}
                  >
                    {/* Node Circle Anchor */}
                    <div
                      className={cn(
                        "relative size-9 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                        isActive
                          ? "bg-slate-950 scale-110 shadow-lg"
                          : isPassed
                          ? "bg-slate-900 border-slate-700 hover:border-slate-500"
                          : "bg-slate-950 border-slate-800"
                      )}
                      style={{
                        borderColor: isActive ? stage.accentColor : undefined,
                        boxShadow: isActive ? `0 0 20px ${stage.glowColor}` : undefined,
                      }}
                    >
                      {/* Pulse ring on active node */}
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-full animate-ping opacity-60"
                          style={{ backgroundColor: stage.accentColor }}
                        />
                      )}
                      <span
                        className={cn(
                          "font-mono text-xs font-bold transition-colors",
                          isActive ? "text-white" : isPassed ? "text-slate-300" : "text-slate-500"
                        )}
                      >
                        {stage.step}
                      </span>
                    </div>

                    {/* Small vertical connector down to stage HUD card */}
                    <div
                      className={cn(
                        "w-[1.5px] h-4 transition-colors duration-300",
                        isActive ? "bg-emerald-400" : "bg-slate-800"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* SIX SEQUENTIAL PIPELINE STAGES HUD (Horizontal on Desktop, Scroll/Stack on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3.5 lg:gap-2.5 pt-2">
            {PIPELINE_STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              const Icon = stage.icon;

              return (
                <div
                  key={stage.step}
                  onMouseEnter={() => setActiveStage(idx)}
                  className={cn(
                    "group relative rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left h-full min-h-[340px]",
                    isActive
                      ? "bg-[#0A1020] border shadow-2xl scale-[1.02] z-20"
                      : "bg-[#070B14]/90 hover:bg-[#090F1C] border border-slate-800/80 hover:border-slate-700/80"
                  )}
                  style={{
                    borderColor: isActive ? stage.accentBorder : undefined,
                    boxShadow: isActive
                      ? `0 15px 35px rgba(0, 0, 0, 0.7), 0 0 30px ${stage.glowColor}`
                      : undefined,
                  }}
                >
                  {/* Active Top Beacon */}
                  {isActive && (
                    <div
                      className="absolute -top-px left-6 right-6 h-[2px] rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${stage.accentColor}, transparent)`,
                      }}
                    />
                  )}

                  {/* Stage Header Section */}
                  <div className="space-y-2.5">
                    {/* Top Row: Icon + Step Badge */}
                    <div className="flex items-center justify-between">
                      <div
                        className="size-8 rounded-xl flex items-center justify-center transition-colors"
                        style={{
                          backgroundColor: stage.accentBg,
                          color: stage.accentColor,
                        }}
                      >
                        <Icon className="size-4" />
                      </div>

                      <span
                        className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border transition-colors"
                        style={{
                          color: stage.accentColor,
                          backgroundColor: stage.accentBg,
                          borderColor: stage.accentBorder,
                        }}
                      >
                        STAGE {stage.step}
                      </span>
                    </div>

                    {/* Stage Name */}
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                        {stage.name}
                        {isActive && (
                          <span
                            className="size-1.5 rounded-full animate-ping"
                            style={{ backgroundColor: stage.accentColor }}
                          />
                        )}
                      </h3>
                      <p
                        className="font-mono text-[10.5px] font-semibold tracking-wide line-clamp-1 mt-0.5"
                        style={{ color: stage.accentColor }}
                      >
                        {stage.tagline}
                      </p>
                    </div>

                    {/* Short Technical Description */}
                    <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans line-clamp-3">
                      {stage.description}
                    </p>
                  </div>

                  {/* Technical Telemetry HUD Box */}
                  <div className="mt-4 pt-3 border-t border-slate-800/90 space-y-2">
                    <div className="flex items-center justify-between text-[9.5px] font-mono uppercase tracking-wider text-slate-400">
                      <span>Telemetry Feed</span>
                      <span
                        className="font-semibold"
                        style={{ color: stage.accentColor }}
                      >
                        {stage.telemetryMetric}
                      </span>
                    </div>

                    {/* Structured Key-Values */}
                    <div className="space-y-1.5 bg-slate-950/80 rounded-xl p-2.5 border border-slate-800/80 font-mono text-[10px]">
                      {stage.telemetryItems.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="flex items-center justify-between text-left gap-1"
                        >
                          <span className="text-slate-400 truncate max-w-[55%]">
                            {item.key}:
                          </span>
                          <span
                            className={cn(
                              "font-semibold truncate max-w-[45%] text-right",
                              item.highlight ? "text-slate-200" : "text-slate-300"
                            )}
                            style={{
                              color: item.highlight && isActive ? stage.accentColor : undefined,
                            }}
                          >
                            {item.val}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Status Pill */}
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[9px] font-mono text-slate-400 uppercase">
                        {stage.telemetryLabel}
                      </span>
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* LOWER PIPELINE TELEMETRY STREAM & ACTION CONSOLE */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Continuous Process Flow Ticker */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-hidden">
              <div className="size-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                <Zap className="size-4" />
              </div>
              <div className="text-left text-xs font-mono">
                <div className="text-white font-bold flex items-center gap-2">
                  <span>CONTINUOUS DATA STREAM</span>
                  <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    AUTOMATED
                  </span>
                </div>
                <div className="text-slate-400 text-[11px] truncate flex items-center gap-1.5 mt-0.5">
                  <span>Discover</span>
                  <ChevronRight className="size-3 text-slate-600" />
                  <span>Crawl</span>
                  <ChevronRight className="size-3 text-slate-600" />
                  <span>Analyze</span>
                  <ChevronRight className="size-3 text-slate-600" />
                  <span>Validate</span>
                  <ChevronRight className="size-3 text-slate-600" />
                  <span>Prioritize</span>
                  <ChevronRight className="size-3 text-slate-600" />
                  <span className="text-emerald-400 font-semibold">Remediate</span>
                </div>
              </div>
            </div>

            {/* Right: Primary & Secondary CTAs */}
            <div className="flex items-center gap-3.5 w-full md:w-auto justify-end shrink-0">
              {/* Secondary CTA: Start a Free Scan */}
              <button
                type="button"
                onClick={handleStartScan}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                Start a Free Scan
              </button>

              {/* Primary CTA: See How It Works → */}
              <a
                href="/how-it-works"
                onClick={handleNavigateHowItWorks}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>See How It Works</span>
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Pipeline Architecture Highlights Guarantee */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Scan Duration</span>
            <span className="text-sm font-mono font-bold text-white">3–8 Min Execution</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Accuracy Rate</span>
            <span className="text-sm font-mono font-bold text-emerald-400">99.2% Verified Proof</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Runtime Safety</span>
            <span className="text-sm font-mono font-bold text-cyan-400">100% Non-Destructive</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Fix Workflow</span>
            <span className="text-sm font-mono font-bold text-white">1-Click Cursor IDE Diffs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityPipelineSection;
