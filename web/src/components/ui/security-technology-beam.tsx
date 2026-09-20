"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./animated-beam";
import { HmwLogoIcon } from "../../../../design-system/src/HmwLogo";

interface PodData {
  id: string;
  number: string;
  name: string;
  category: string;
  headline: string;
  telemetry: string;
  metric: string;
  badge: string;
  color: string;
  accentBg: string;
  icon: React.ReactNode;
}

const PODS: Record<string, PodData> = {
  zap: {
    id: "zap",
    number: "01",
    name: "OWASP ZAP",
    category: "DAST RUNTIME",
    headline: "Dynamic Runtime Attack Simulation",
    telemetry: "Simulates threat actors probing live URLs, forms, and API routes. Discovers SQLi, XSS, and broken access controls with zero destructive impact.",
    metric: "240 Probes/Sec",
    badge: "ACTIVE SPIDER",
    color: "#10B981",
    accentBg: "rgba(16, 185, 129, 0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-4 sm:size-5 text-emerald-400" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
        <path d="M13 7l-3 5h4l-2 5" />
      </svg>
    ),
  },
  nuclei: {
    id: "nuclei",
    number: "02",
    name: "Nuclei Engine",
    category: "CVE SCANNER",
    headline: "Vulnerability & Misconfiguration Detection",
    telemetry: "Fast template-based vulnerability scanner matching 5,000+ unpatched zero-days, exposed secrets, open admin panels, and SSL/TLS cipher flaws.",
    metric: "5,420 CVE Feed",
    badge: "COMMUNITY CVE FEED",
    color: "#06B6D4",
    accentBg: "rgba(6, 182, 212, 0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-4 sm:size-5 text-cyan-400" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3.5" fill="currentColor" fillOpacity="0.25" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-30 12 12)" />
      </svg>
    ),
  },
  semgrep: {
    id: "semgrep",
    number: "03",
    name: "Semgrep SAST",
    category: "CODE LOGIC",
    headline: "Static Abstract Syntax Tree Analysis",
    telemetry: "Scans client bundles and repository code to catch leaked API tokens, insecure JWT decoding, unsafe DOM manipulation, and vulnerable dependencies.",
    metric: "AST Pattern Tree",
    badge: "SYNTAX-TREE GUARD",
    color: "#F59E0B",
    accentBg: "rgba(245, 158, 11, 0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-4 sm:size-5 text-amber-400" stroke="currentColor" strokeWidth="2">
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  playwright: {
    id: "playwright",
    number: "04",
    name: "Playwright",
    category: "SURFACE DISCOVERY",
    headline: "Autonomous Application Route Crawler",
    telemetry: "Headless browser spider autonomously indexes client-side SPAs, hidden authenticated portals, dialog modals, and micro-routes prior to scanning.",
    metric: "38/38 Routes Mapped",
    badge: "HEADLESS SPIDER",
    color: "#14B8A6",
    accentBg: "rgba(20, 184, 166, 0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-4 sm:size-5 text-teal-400" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <circle cx="6" cy="7" r="1.3" fill="currentColor" />
        <circle cx="10" cy="7" r="1.3" fill="currentColor" />
        <path d="M6 11h12" />
      </svg>
    ),
  },
  github: {
    id: "github",
    number: "05",
    name: "GitHub Gate",
    category: "CI/CD SECURITY",
    headline: "Continuous DevSecOps Deployment Gate",
    telemetry: "Fails pull requests automatically when high or critical security regressions are detected, enforcing security standards before code merges to main.",
    metric: "PR Check: Enforced",
    badge: "MERGE GUARD",
    color: "#38BDF8",
    accentBg: "rgba(56, 189, 248, 0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 sm:size-5 text-slate-200">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  bashcraft: {
    id: "bashcraft",
    number: "06",
    name: "BashCraft",
    category: "AI REMEDIATION",
    headline: "1-Click CLI & IDE Code Fix Prompts",
    telemetry: "Converts verified vulnerability disclosures directly into context-aware engineering prompts and automated CLI fix patches for engineering teams.",
    metric: "1-Click Code Diff",
    badge: "INSTANT FIX",
    color: "#A855F7",
    accentBg: "rgba(168, 85, 247, 0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-4 sm:size-5 text-purple-400" stroke="currentColor" strokeWidth="2">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
};

interface PodHoverCardProps {
  pod: PodData;
  align?: "left" | "right" | "center";
}

const PodHoverCard: React.FC<PodHoverCardProps> = ({ pod, align = "left" }) => {
  return (
    <div
      className={cn(
        "absolute z-50 w-72 sm:w-80 p-4 rounded-2xl bg-[#090D18] border shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-xl pointer-events-none text-left transition-all duration-200",
        // Opposite positioning: left pods pop to the left (outward), right pods pop to the right (outward)
        align === "left" && "right-full mr-3 top-1/2 -translate-y-1/2",
        align === "right" && "left-full ml-3 top-1/2 -translate-y-1/2",
        align === "center" && "top-full mt-3 left-1/2 -translate-x-1/2",
      )}
      style={{ borderColor: pod.color + "80" }}
    >
      <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-800/80">
        <span
          className="size-2 rounded-full"
          style={{ backgroundColor: pod.color }}
        />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
          {pod.name}
        </span>
        <span className="text-slate-600">•</span>
        <span
          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
          style={{
            color: pod.color,
            backgroundColor: pod.accentBg,
          }}
        >
          {pod.badge}
        </span>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed font-sans">
        {pod.telemetry}
      </p>
      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
        <span className="text-slate-500">ENGINE METRIC:</span>
        <span className="font-semibold" style={{ color: pod.color }}>
          {pod.metric}
        </span>
      </div>
    </div>
  );
};

const HmwHoverCard: React.FC = () => {
  return (
    <div className="absolute z-50 w-80 p-4 rounded-2xl bg-[#090D18] border border-emerald-500/80 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-xl pointer-events-none text-left transition-all duration-200 top-full mt-4 left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-800/80">
        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
          HACKMYWEBSITE
        </span>
        <span className="text-slate-600">•</span>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15">
          SYNTHESIS CORE
        </span>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed font-sans">
        Correlates multi-engine DAST, CVE signatures, and SAST code traces into unified risk scores and verified 1-click IDE remediation prompts.
      </p>
      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
        <span className="text-slate-500">COVERAGE:</span>
        <span className="font-semibold text-emerald-400">100% UNIFIED PIPELINE</span>
      </div>
    </div>
  );
};

export interface SecurityTechnologyBeamProps {
  className?: string;
}

export const SecurityTechnologyBeam: React.FC<SecurityTechnologyBeamProps> = ({
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null); // OWASP ZAP (Top Left)
  const div2Ref = useRef<HTMLDivElement>(null); // Nuclei (Mid Left)
  const div3Ref = useRef<HTMLDivElement>(null); // Semgrep (Bottom Left)
  const div4Ref = useRef<HTMLDivElement>(null); // HMW Core (Center)
  const div5Ref = useRef<HTMLDivElement>(null); // Playwright (Top Right)
  const div6Ref = useRef<HTMLDivElement>(null); // GitHub (Mid Right)
  const div7Ref = useRef<HTMLDivElement>(null); // BashCraft (Bottom Right)

  const [hoveredPodId, setHoveredPodId] = useState<string | null>(null);
  const [hoveredCenter, setHoveredCenter] = useState<boolean>(false);

  return (
    <section
      aria-label="Security Technology Synthesis Architecture"
      style={{ height: "100vh" }}
      className={cn(
        "w-full h-screen min-h-[100vh] flex flex-col justify-between bg-[#06080F] border-b border-slate-800/80 pt-20 sm:pt-24 pb-8 sm:pb-12 relative overflow-hidden",
        className,
      )}
    >
      {/* Centered Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-between h-full relative z-10 w-full">
        {/* Clean, Visible Section Header */}
        <div className="text-center space-y-2.5 max-w-3xl mx-auto pt-2 shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-semibold text-slate-300 backdrop-blur-md shadow-sm">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">APPLICATION SECURITY ARCHITECTURE</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-mono font-bold">MULTI-ENGINE SYNTHESIS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Five Proven Engines. One Sovereign Core.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Hover over any engine to inspect its real-time telemetry, crawling scope, and automated remediation pipeline.
          </p>
        </div>

        {/* Master Interactive Telemetry Arena - Scaled to Fit 100vh */}
        <div
          ref={containerRef}
          className="relative flex flex-1 items-center justify-center overflow-visible w-full py-2 my-auto"
        >
          <div className="flex size-full max-h-[380px] sm:max-h-[420px] max-w-5xl flex-col items-stretch justify-between relative z-10">
            {/* ROW 1: OWASP ZAP (Left) & Playwright (Right) */}
            <div className="flex flex-row items-center justify-between px-2 sm:px-10 md:px-14">
              {/* Pod 1: OWASP ZAP */}
              <div
                className="relative select-none"
                onMouseEnter={() => setHoveredPodId("zap")}
                onMouseLeave={() => setHoveredPodId(null)}
              >
                <div
                  className={cn(
                    "flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer backdrop-blur-md group",
                    hoveredPodId === "zap"
                      ? "bg-slate-900 border-emerald-500 shadow-md scale-105"
                      : "bg-slate-950/80 border-slate-800 hover:border-slate-700",
                  )}
                >
                  <div
                    ref={div1Ref}
                    className="size-9 sm:size-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0"
                  >
                    {PODS.zap.icon}
                  </div>
                  <div className="hidden sm:flex flex-col text-left pr-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">{PODS.zap.number}</span>
                      <span className="text-xs font-bold text-white">{PODS.zap.name}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono">{PODS.zap.metric}</span>
                  </div>
                </div>

                {/* Hover Telemetry Card - Opposite direction (outward to left) */}
                {hoveredPodId === "zap" && <PodHoverCard pod={PODS.zap} align="left" />}
              </div>

              {/* Pod 4: Playwright */}
              <div
                className="relative select-none"
                onMouseEnter={() => setHoveredPodId("playwright")}
                onMouseLeave={() => setHoveredPodId(null)}
              >
                <div
                  className={cn(
                    "flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer backdrop-blur-md group flex-row-reverse text-right",
                    hoveredPodId === "playwright"
                      ? "bg-slate-900 border-teal-400 shadow-md scale-105"
                      : "bg-slate-950/80 border-slate-800 hover:border-slate-700",
                  )}
                >
                  <div
                    ref={div5Ref}
                    className="size-9 sm:size-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0"
                  >
                    {PODS.playwright.icon}
                  </div>
                  <div className="hidden sm:flex flex-col text-right pl-1.5">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="text-xs font-bold text-white">{PODS.playwright.name}</span>
                      <span className="text-[11px] font-mono text-teal-400 font-bold">{PODS.playwright.number}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono">{PODS.playwright.metric}</span>
                  </div>
                </div>

                {/* Hover Telemetry Card - Opposite direction (outward to right) */}
                {hoveredPodId === "playwright" && <PodHoverCard pod={PODS.playwright} align="right" />}
              </div>
            </div>

            {/* ROW 2: Nuclei (Left), HMW Core (Center), GitHub Gate (Right) */}
            <div className="flex flex-row items-center justify-between px-2 sm:px-10 md:px-14">
              {/* Pod 2: Nuclei */}
              <div
                className="relative select-none"
                onMouseEnter={() => setHoveredPodId("nuclei")}
                onMouseLeave={() => setHoveredPodId(null)}
              >
                <div
                  className={cn(
                    "flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer backdrop-blur-md group",
                    hoveredPodId === "nuclei"
                      ? "bg-slate-900 border-cyan-400 shadow-md scale-105"
                      : "bg-slate-950/80 border-slate-800 hover:border-slate-700",
                  )}
                >
                  <div
                    ref={div2Ref}
                    className="size-9 sm:size-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0"
                  >
                    {PODS.nuclei.icon}
                  </div>
                  <div className="hidden sm:flex flex-col text-left pr-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-cyan-400 font-bold">{PODS.nuclei.number}</span>
                      <span className="text-xs font-bold text-white">{PODS.nuclei.name}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono">{PODS.nuclei.metric}</span>
                  </div>
                </div>

                {/* Hover Telemetry Card - Opposite direction (outward to left) */}
                {hoveredPodId === "nuclei" && <PodHoverCard pod={PODS.nuclei} align="left" />}
              </div>

              {/* CENTER: HackMyWebsite "H" Core (Clean - No Background Effects) */}
              <div
                className="relative select-none z-20 flex flex-col items-center"
                onMouseEnter={() => setHoveredCenter(true)}
                onMouseLeave={() => setHoveredCenter(false)}
              >
                <div
                  ref={div4Ref}
                  className="size-16 sm:size-20 rounded-2xl border-2 border-emerald-500 bg-slate-950 flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105"
                >
                  {/* Clean Vector "H" Emblem */}
                  <HmwLogoIcon className="size-9 sm:size-11 text-white" />
                </div>

                {/* Core Brand Label */}
                <div className="mt-2 text-center">
                  <span className="text-xs sm:text-sm font-black tracking-tight text-white block">
                    HACK<span className="text-emerald-400">MY</span>WEBSITE
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 tracking-wider uppercase block">
                    SYNTHESIS CORE
                  </span>
                </div>

                {/* Center Hover Card */}
                {hoveredCenter && <HmwHoverCard />}
              </div>

              {/* Pod 5: GitHub Gate */}
              <div
                className="relative select-none"
                onMouseEnter={() => setHoveredPodId("github")}
                onMouseLeave={() => setHoveredPodId(null)}
              >
                <div
                  className={cn(
                    "flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer backdrop-blur-md group flex-row-reverse text-right",
                    hoveredPodId === "github"
                      ? "bg-slate-900 border-sky-400 shadow-md scale-105"
                      : "bg-slate-950/80 border-slate-800 hover:border-slate-700",
                  )}
                >
                  <div
                    ref={div6Ref}
                    className="size-9 sm:size-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0"
                  >
                    {PODS.github.icon}
                  </div>
                  <div className="hidden sm:flex flex-col text-right pl-1.5">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="text-xs font-bold text-white">{PODS.github.name}</span>
                      <span className="text-[11px] font-mono text-sky-400 font-bold">{PODS.github.number}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono">{PODS.github.metric}</span>
                  </div>
                </div>

                {/* Hover Telemetry Card - Opposite direction (outward to right) */}
                {hoveredPodId === "github" && <PodHoverCard pod={PODS.github} align="right" />}
              </div>
            </div>

            {/* ROW 3: Semgrep (Left) & BashCraft (Right) */}
            <div className="flex flex-row items-center justify-between px-2 sm:px-10 md:px-14">
              {/* Pod 3: Semgrep */}
              <div
                className="relative select-none"
                onMouseEnter={() => setHoveredPodId("semgrep")}
                onMouseLeave={() => setHoveredPodId(null)}
              >
                <div
                  className={cn(
                    "flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer backdrop-blur-md group",
                    hoveredPodId === "semgrep"
                      ? "bg-slate-900 border-amber-400 shadow-md scale-105"
                      : "bg-slate-950/80 border-slate-800 hover:border-slate-700",
                  )}
                >
                  <div
                    ref={div3Ref}
                    className="size-9 sm:size-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0"
                  >
                    {PODS.semgrep.icon}
                  </div>
                  <div className="hidden sm:flex flex-col text-left pr-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-amber-400 font-bold">{PODS.semgrep.number}</span>
                      <span className="text-xs font-bold text-white">{PODS.semgrep.name}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono">{PODS.semgrep.metric}</span>
                  </div>
                </div>

                {/* Hover Telemetry Card - Opposite direction (outward to left) */}
                {hoveredPodId === "semgrep" && <PodHoverCard pod={PODS.semgrep} align="left" />}
              </div>

              {/* Pod 6: BashCraft */}
              <div
                className="relative select-none"
                onMouseEnter={() => setHoveredPodId("bashcraft")}
                onMouseLeave={() => setHoveredPodId(null)}
              >
                <div
                  className={cn(
                    "flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer backdrop-blur-md group flex-row-reverse text-right",
                    hoveredPodId === "bashcraft"
                      ? "bg-slate-900 border-purple-400 shadow-md scale-105"
                      : "bg-slate-950/80 border-slate-800 hover:border-slate-700",
                  )}
                >
                  <div
                    ref={div7Ref}
                    className="size-9 sm:size-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0"
                  >
                    {PODS.bashcraft.icon}
                  </div>
                  <div className="hidden sm:flex flex-col text-right pl-1.5">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="text-xs font-bold text-white">{PODS.bashcraft.name}</span>
                      <span className="text-[11px] font-mono text-purple-400 font-bold">{PODS.bashcraft.number}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono">{PODS.bashcraft.metric}</span>
                  </div>
                </div>

                {/* Hover Telemetry Card - Opposite direction (outward to right) */}
                {hoveredPodId === "bashcraft" && <PodHoverCard pod={PODS.bashcraft} align="right" />}
              </div>
            </div>
          </div>

          {/* Animated Laser Beams: Clean, Sleek Connections */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div4Ref}
            curvature={-70}
            endYOffset={-10}
            gradientStartColor="#10B981"
            gradientStopColor="#34D399"
            pathColor="#1e293b"
            pathWidth={hoveredPodId === "zap" ? 3 : 1.75}
            pathOpacity={hoveredPodId === "zap" ? 0.95 : 0.4}
            duration={hoveredPodId === "zap" ? 2.5 : 4}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div2Ref}
            toRef={div4Ref}
            gradientStartColor="#06B6D4"
            gradientStopColor="#10B981"
            pathColor="#1e293b"
            pathWidth={hoveredPodId === "nuclei" ? 3 : 1.75}
            pathOpacity={hoveredPodId === "nuclei" ? 0.95 : 0.4}
            duration={hoveredPodId === "nuclei" ? 2.2 : 3.6}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div3Ref}
            toRef={div4Ref}
            curvature={70}
            endYOffset={10}
            gradientStartColor="#F59E0B"
            gradientStopColor="#10B981"
            pathColor="#1e293b"
            pathWidth={hoveredPodId === "semgrep" ? 3 : 1.75}
            pathOpacity={hoveredPodId === "semgrep" ? 0.95 : 0.4}
            duration={hoveredPodId === "semgrep" ? 2.6 : 4.2}
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div5Ref}
            toRef={div4Ref}
            curvature={-70}
            endYOffset={-10}
            reverse
            gradientStartColor="#14B8A6"
            gradientStopColor="#10B981"
            pathColor="#1e293b"
            pathWidth={hoveredPodId === "playwright" ? 3 : 1.75}
            pathOpacity={hoveredPodId === "playwright" ? 0.95 : 0.4}
            duration={hoveredPodId === "playwright" ? 2.4 : 3.8}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div6Ref}
            toRef={div4Ref}
            reverse
            gradientStartColor="#38BDF8"
            gradientStopColor="#10B981"
            pathColor="#1e293b"
            pathWidth={hoveredPodId === "github" ? 3 : 1.75}
            pathOpacity={hoveredPodId === "github" ? 0.95 : 0.4}
            duration={hoveredPodId === "github" ? 2.2 : 3.5}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div7Ref}
            toRef={div4Ref}
            curvature={70}
            endYOffset={10}
            reverse
            gradientStartColor="#A855F7"
            gradientStopColor="#10B981"
            pathColor="#1e293b"
            pathWidth={hoveredPodId === "bashcraft" ? 3 : 1.75}
            pathOpacity={hoveredPodId === "bashcraft" ? 0.95 : 0.4}
            duration={hoveredPodId === "bashcraft" ? 2.8 : 4.4}
          />
        </div>
      </div>
    </section>
  );
};
