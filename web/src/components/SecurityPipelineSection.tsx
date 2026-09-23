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
  subTitle: string;
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
  speedScore: number;
  depthScore: number;
  speedLabel: string;
  depthLabel: string;
  outputLabel: string;
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
    subTitle: "Perimeter Recon",
    tagline: "Domains / APIs / Cloud Assets",
    description: "Autonomous external reconnaissance maps active subdomains, IP ranges, public cloud buckets, and exposed REST/GraphQL endpoints.",
    accentColor: "#10B981",
    accentBg: "rgba(16, 185, 129, 0.12)",
    accentBorder: "rgba(16, 185, 129, 0.4)",
    glowColor: "rgba(16, 185, 129, 0.45)",
    icon: Globe,
    speedScore: 5,
    depthScore: 6,
    speedLabel: "SPEED",
    depthLabel: "COVERAGE",
    outputLabel: "TARGETS",
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
    subTitle: "DOM & Attack Graph",
    tagline: "Routes / Parameters / State",
    description: "Headless browser spider walks dynamic Single Page Applications, rendering DOM states and cataloging parameterized attack surfaces.",
    accentColor: "#06B6D4",
    accentBg: "rgba(6, 182, 212, 0.12)",
    accentBorder: "rgba(6, 182, 212, 0.4)",
    glowColor: "rgba(6, 182, 212, 0.45)",
    icon: Network,
    speedScore: 4,
    depthScore: 5,
    speedLabel: "SPEED",
    depthLabel: "DOM DEPTH",
    outputLabel: "VECTORS",
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
    subTitle: "DAST & CVE Intelligence",
    tagline: "Runtime Probes / Static SAST",
    description: "Multi-engine synthesis runs active behavioral runtime probes alongside AST static token scans against 5,420+ CVE vulnerability signatures.",
    accentColor: "#3B82F6",
    accentBg: "rgba(59, 130, 246, 0.12)",
    accentBorder: "rgba(59, 130, 246, 0.4)",
    glowColor: "rgba(59, 130, 246, 0.45)",
    icon: Cpu,
    speedScore: 5,
    depthScore: 6,
    speedLabel: "THROUGHPUT",
    depthLabel: "INTELLIGENCE",
    outputLabel: "SIGNATURES",
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
    subTitle: "Sandbox PoC Exploit",
    tagline: "False-Positive Suppression",
    description: "Safely replays proof-of-concept exploits in an isolated sandbox environment to eliminate noise and mathematically guarantee findings.",
    accentColor: "#14B8A6",
    accentBg: "rgba(20, 184, 166, 0.12)",
    accentBorder: "rgba(20, 184, 166, 0.4)",
    glowColor: "rgba(20, 184, 166, 0.45)",
    icon: ShieldCheck,
    speedScore: 5,
    depthScore: 6,
    speedLabel: "VERIFICATION",
    depthLabel: "ACCURACY",
    outputLabel: "PROOF CONFIDENCE",
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
    subTitle: "Contextual Risk Triage",
    tagline: "CVSS 3.1 / Reachability",
    description: "Contextual triage engine weighs CVSS 3.1 scores with real-world internet reachability, data sensitivity, and mission-critical business risk.",
    accentColor: "#F59E0B",
    accentBg: "rgba(245, 158, 11, 0.12)",
    accentBorder: "rgba(245, 158, 11, 0.4)",
    glowColor: "rgba(245, 158, 11, 0.45)",
    icon: BarChart3,
    speedScore: 6,
    depthScore: 5,
    speedLabel: "TRIAGE SPEED",
    depthLabel: "RISK MATRIX",
    outputLabel: "POSTURE SCORE",
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
    subTitle: "Cursor & PR Gateway",
    tagline: "1-Click Diffs / GitHub Action",
    description: "Produces ready-to-merge code diffs, contextual Cursor IDE prompts, and automated GitHub PR safeguard checks for instant developer execution.",
    accentColor: "#10B981",
    accentBg: "rgba(16, 185, 129, 0.12)",
    accentBorder: "rgba(16, 185, 129, 0.4)",
    glowColor: "rgba(16, 185, 129, 0.45)",
    icon: Terminal,
    speedScore: 6,
    depthScore: 6,
    speedLabel: "DIFF VELOCITY",
    depthLabel: "COMPLIANCE",
    outputLabel: "IDE WORKFLOW",
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

  // Auto-cycle through the 6 stages every 3.5 seconds unless hovered by user
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 3500);
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

  // Helper for segmented pills matching the reference image
  const renderSegmentedPills = (activeCount: number, total: number = 6, color: string, glow: string) => {
    return (
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const isLit = i < activeCount;
          return (
            <span
              key={i}
              className={cn(
                "h-1.5 w-3.5 sm:w-4 rounded-full transition-all duration-300",
                isLit ? "" : "bg-neutral-800/90"
              )}
              style={{
                backgroundColor: isLit ? color : undefined,
                boxShadow: isLit ? `0 0 8px ${glow}` : undefined,
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <section
      id="how-it-works"
      aria-label="Section 3 — How It Works: Continuous Security Pipeline"
      className="relative w-full text-slate-100 py-24 sm:py-32 border-b border-neutral-800 overflow-hidden"
    >
      {/* User-Provided Green Aura Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Pure black base */}
        <div className="absolute inset-0 bg-black" />

        {/* Green Aura Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{
            backgroundImage: `url('/green-aura-bg.png')`,
          }}
        />

        {/* Soft edge vignettes for seamless dark transition to pure black */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      </div>

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
          className="relative w-full rounded-3xl bg-black border border-neutral-800 p-5 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top Telemetry Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 sm:pb-8 border-b border-neutral-800">
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
              <span className="text-[10px] text-neutral-400 bg-black px-2 py-0.5 rounded border border-neutral-800">
                ACTIVE STAGE: {PIPELINE_STAGES[activeStage].step} / 06
              </span>
            </div>
          </div>

          {/* CONTINUOUS PIPELINE VISUAL BACKBONE TRACK (Desktop) */}
          <div className="hidden lg:block relative my-8">
            {/* Horizontal Bus Conduit Line */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] bg-neutral-800" />

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
            <div className="relative flex items-center justify-between z-10 px-4">
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
                          ? "bg-black scale-110 shadow-lg"
                          : isPassed
                          ? "bg-black border-neutral-700 hover:border-neutral-500"
                          : "bg-black border-neutral-800"
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

                    <span className={cn(
                      "mt-2 text-[11px] font-mono font-medium transition-colors",
                      isActive ? "text-white font-bold" : "text-neutral-500 group-hover:text-neutral-300"
                    )}>
                      {stage.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* REDESIGNED STAGE CARDS — 3x2 Grid matching reference images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 pt-4">
            {PIPELINE_STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              const Icon = stage.icon;

              return (
                <div
                  key={stage.step}
                  onMouseEnter={() => setActiveStage(idx)}
                  className={cn(
                    "group relative rounded-[28px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left overflow-hidden bg-black",
                    isActive
                      ? "border border-neutral-700 shadow-2xl scale-[1.01] z-20"
                      : "border border-neutral-800/90 hover:border-neutral-700"
                  )}
                  style={{
                    borderColor: isActive ? stage.accentBorder : undefined,
                    boxShadow: isActive
                      ? `0 20px 45px rgba(0, 0, 0, 0.8), 0 0 35px ${stage.glowColor}`
                      : undefined,
                  }}
                >
                  {/* Atmospheric Top Radial Neon Glow (Image 1 reference) */}
                  <div
                    className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-3/4 h-56 rounded-full blur-3xl opacity-35 group-hover:opacity-70 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, ${stage.accentColor} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Atmospheric Bottom-Right Corner Bloom (Image 2 reference) */}
                  <div
                    className="pointer-events-none absolute -bottom-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-15 group-hover:opacity-35 transition-opacity duration-500"
                    style={{
                      background: stage.accentColor,
                    }}
                  />

                  {/* Top Rim Specular Neon Highlight */}
                  <div
                    className="pointer-events-none absolute -top-px left-8 right-8 h-[1.5px] rounded-full transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${stage.accentColor}, transparent)`,
                      opacity: isActive ? 1 : 0.4,
                    }}
                  />

                  {/* Upper Section: Stage Pill & Telemetry Status */}
                  <div className="relative z-10 space-y-5">
                    {/* Top Row: Stage Indicator & Status Badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors tracking-wider"
                        style={{
                          color: stage.accentColor,
                          backgroundColor: stage.accentBg,
                          borderColor: stage.accentBorder,
                        }}
                      >
                        STAGE {stage.step}
                      </span>

                      <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900/90 border border-neutral-800 px-2.5 py-0.5 rounded-full">
                        {stage.statusBadge}
                      </span>
                    </div>

                    {/* Emblem Pedestal with Luminous Glow (Image 1 & 2 fusion) */}
                    <div className="pt-2 flex items-center justify-start">
                      <div
                        className="relative size-14 rounded-2xl flex items-center justify-center border transition-all duration-300"
                        style={{
                          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                          borderColor: "rgba(255, 255, 255, 0.12)",
                          boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 8px 20px rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        <Icon
                          className="size-7 transition-transform duration-300 group-hover:scale-110"
                          style={{
                            color: stage.accentColor,
                            filter: `drop-shadow(0 0 10px ${stage.accentColor})`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Headline: Stage Name (bold white) + Subtitle (Image 1 format) */}
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {stage.name}
                        </h3>
                        <span className="text-sm font-medium text-neutral-300">
                          {stage.subTitle}
                        </span>
                      </div>
                      <p
                        className="font-mono text-[11px] font-semibold tracking-wide"
                        style={{ color: stage.accentColor }}
                      >
                        {stage.tagline}
                      </p>
                    </div>

                    {/* Technical Description */}
                    <p className="text-sm text-neutral-400 font-sans leading-relaxed line-clamp-3">
                      {stage.description}
                    </p>
                  </div>

                  {/* Middle: Structured Telemetry Tags */}
                  <div className="relative z-10 my-4 flex flex-wrap gap-1.5">
                    {stage.telemetryItems.slice(0, 2).map((item, iIdx) => (
                      <span
                        key={iIdx}
                        className={cn(
                          "inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded-md border",
                          item.highlight
                            ? "bg-neutral-900 border-neutral-700 text-slate-200"
                            : "bg-black/60 border-neutral-800 text-slate-400"
                        )}
                      >
                        <span className="text-neutral-500 mr-1">{item.key}:</span>
                        <strong className={item.highlight ? "text-white" : ""}>{item.val}</strong>
                      </span>
                    ))}
                  </div>

                  {/* Lower Section: Segmented Pill Telemetry HUD (Direct from Image 1) */}
                  <div className="relative z-10 pt-4 border-t border-neutral-800/80 space-y-2.5 font-mono">
                    {/* Meter Row 1: SPEED / THROUGHPUT */}
                    <div className="flex items-center justify-between text-[10px] tracking-wider text-neutral-400">
                      <span className="uppercase font-semibold tracking-widest">{stage.speedLabel}</span>
                      {renderSegmentedPills(stage.speedScore, 6, stage.accentColor, stage.glowColor)}
                    </div>

                    {/* Meter Row 2: COVERAGE / INTELLIGENCE */}
                    <div className="flex items-center justify-between text-[10px] tracking-wider text-neutral-400">
                      <span className="uppercase font-semibold tracking-widest">{stage.depthLabel}</span>
                      {renderSegmentedPills(stage.depthScore, 6, stage.accentColor, stage.glowColor)}
                    </div>

                    {/* Row 3: OUTPUT / CONTEXT WINDOW */}
                    <div className="flex items-center justify-between text-[10px] tracking-wider text-neutral-400 pt-0.5">
                      <span className="uppercase font-semibold tracking-widest">{stage.outputLabel}</span>
                      <span className="font-mono text-xs font-bold text-white">
                        {stage.telemetryMetric}
                      </span>
                    </div>

                    {/* Interactive "Explore Engine →" Action Link (Image 2 style) */}
                    <div className="pt-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors">
                        <span>Explore Engine</span>
                        <ArrowRight
                          className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          style={{ color: stage.accentColor }}
                        />
                      </span>

                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
                        {stage.telemetryLabel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* LOWER PIPELINE TELEMETRY STREAM & ACTION CONSOLE */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Continuous Process Flow Ticker */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-hidden">
              <div className="size-8 rounded-xl bg-black border border-neutral-800 flex items-center justify-center text-emerald-400 shrink-0">
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
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-black hover:bg-neutral-900 border border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
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
          <div className="p-3 rounded-xl bg-black border border-neutral-800 text-left">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Scan Duration</span>
            <span className="text-sm font-mono font-bold text-white">3–8 Min Execution</span>
          </div>
          <div className="p-3 rounded-xl bg-black border border-neutral-800 text-left">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Accuracy Rate</span>
            <span className="text-sm font-mono font-bold text-emerald-400">99.2% Verified Proof</span>
          </div>
          <div className="p-3 rounded-xl bg-black border border-neutral-800 text-left">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Runtime Safety</span>
            <span className="text-sm font-mono font-bold text-cyan-400">100% Non-Destructive</span>
          </div>
          <div className="p-3 rounded-xl bg-black border border-neutral-800 text-left">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Fix Workflow</span>
            <span className="text-sm font-mono font-bold text-white">1-Click Cursor IDE Diffs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityPipelineSection;
