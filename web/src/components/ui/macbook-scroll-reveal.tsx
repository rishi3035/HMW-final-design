"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Shield,
  Zap,
  ArrowRight,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  GitPullRequest,
} from "lucide-react";

interface ComparisonMetric {
  label: string;
  traditional: string;
  traditionalSub: string;
  hmw: string;
  hmwSub: string;
}

const comparisonMetrics: ComparisonMetric[] = [
  {
    label: "Time to First Results",
    traditional: "3 Months",
    traditionalSub: "Manual scheduling & consultant backlog",
    hmw: "7 Minutes",
    hmwSub: "Instant automated DAST radar & API map",
  },
  {
    label: "Financial Investment",
    traditional: "$25,000 – $50,000",
    traditionalSub: "Upfront consulting retainers per audit",
    hmw: "Starts at $0 Free",
    hmwSub: "Instant posture score + $1,999/mo unlimited",
  },
  {
    label: "Engineering Deliverable",
    traditional: "100+ Page Static PDF",
    traditionalSub: "Zero automated patch instructions",
    hmw: "1-Click AI Fix Prompts",
    hmwSub: "Pre-tested code diffs for Cursor & Claude",
  },
  {
    label: "Pipeline & CI/CD Gate",
    traditional: "Blocks Sprints",
    traditionalSub: "Instantly obsolete upon next git merge",
    hmw: "Automated GitHub Bot",
    hmwSub: "Blocks CVE regressions before production",
  },
];

function LaptopScreenContent({ onStartScan }: { onStartScan?: () => void }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-black text-white font-sans select-none">
      {/* Top Browser / OS Header */}
      <div className="border-b border-white/10 px-3 py-1.5 sm:px-4 sm:py-2 bg-neutral-950/95 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-rose-500/80" />
            <span className="size-2 rounded-full bg-amber-500/80" />
            <span className="size-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[8px] sm:text-[10px] font-mono text-neutral-400 pl-1">
            https://hackmywebsite.io/audit-comparison
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[7px] sm:text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE RADAR
          </span>
        </div>
      </div>

      {/* Comparison Title Header */}
      <div className="border-b border-white/10 px-3 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-neutral-950 via-neutral-900/60 to-neutral-950 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <div>
          <p className="text-[7px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400">
            The Traditional Way vs Autonomous DevSecOps
          </p>
          <h3 className="text-[10px] sm:text-sm lg:text-base font-bold tracking-tight text-white">
            One Web Application. Two Completely Different Operating Models.
          </h3>
        </div>

        {onStartScan && (
          <button
            type="button"
            onClick={onStartScan}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-[10px] font-extrabold tracking-wide uppercase transition-colors shrink-0 shadow-md shadow-emerald-500/20"
          >
            <span>Start Scan</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* 2-Column Comparison Layout */}
      <div className="grid flex-1 grid-cols-2 divide-x divide-white/10 text-left overflow-hidden">
        {/* LEFT COLUMN: Traditional Pentest */}
        <div className="p-2 sm:p-4 flex flex-col justify-between bg-gradient-to-br from-[#160a0d] via-[#100709] to-[#080405]">
          <div>
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-rose-950/80">
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 sm:size-2 rounded-full bg-rose-500 animate-pulse" />
                <p className="text-[8px] sm:text-xs font-bold uppercase tracking-wider text-rose-400">
                  The Traditional Way
                </p>
              </div>
              <span className="text-[7px] sm:text-[9px] text-rose-300 font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                Legacy Pentest
              </span>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              {comparisonMetrics.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-md sm:rounded-xl border border-rose-950/60 bg-black/40 p-1.5 sm:p-2"
                >
                  <p className="text-[6px] sm:text-[8px] font-medium text-neutral-400 uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-[8px] sm:text-xs font-bold text-rose-300 leading-tight mt-0.5">
                    {item.traditional}
                  </p>
                  <p className="text-[6px] sm:text-[8px] text-neutral-400 leading-tight mt-0.5 hidden sm:block">
                    {item.traditionalSub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-1.5 border-t border-rose-950/80 flex items-center justify-between text-[6px] sm:text-[8px] text-neutral-500">
            <span>Status: Deployment Blocked</span>
            <span className="text-rose-400 font-semibold">Zero Automation</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Hack My Website */}
        <div className="p-2 sm:p-4 flex flex-col justify-between bg-gradient-to-br from-[#121c07] via-[#0d1605] to-[#060a02]">
          <div>
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-emerald-900/60">
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 sm:size-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[8px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Hack My Website
                </p>
              </div>
              <span className="text-[7px] sm:text-[9px] text-emerald-300 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-1">
                <Zap className="size-2 text-emerald-400" />
                7-Min Pipeline
              </span>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              {comparisonMetrics.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-md sm:rounded-xl border border-emerald-500/30 bg-black/60 p-1.5 sm:p-2 shadow-sm"
                >
                  <p className="text-[6px] sm:text-[8px] font-medium text-emerald-300/80 uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-[8px] sm:text-xs font-bold text-white leading-tight mt-0.5 flex items-center gap-1">
                    <span className="text-emerald-400 font-extrabold">✓</span> {item.hmw}
                  </p>
                  <p className="text-[6px] sm:text-[8px] text-neutral-300 leading-tight mt-0.5 hidden sm:block">
                    {item.hmwSub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-1.5 border-t border-emerald-900/60 flex items-center justify-between text-[6px] sm:text-[8px] text-neutral-400">
            <span className="text-emerald-400 font-semibold">100% Non-Destructive</span>
            <span>Status: Audit-Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface MacbookScrollRevealProps {
  onStartScan?: () => void;
}

export function MacbookScrollReveal({ onStartScan }: MacbookScrollRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 25,
    mass: 0.3,
  });

  // MacBook lid rotation:
  // Starts visibly angled at -70° (resting down on keyboard, clearly showing the Space Black shell & logo)
  // and progressively rotates up to 0° (standing upright, facing the user)
  const lidRotateX = useTransform(
    smoothProgress,
    [0.05, 0.55],
    shouldReduceMotion ? [0, 0] : [-72, 0]
  );

  // Subtle 3D perspective tilt
  const laptopRotateY = useTransform(
    smoothProgress,
    [0, 0.25, 0.65],
    shouldReduceMotion ? [0, 0, 0] : [-8, -4, 0]
  );

  const laptopRotateX = useTransform(
    smoothProgress,
    [0, 0.25, 0.65],
    shouldReduceMotion ? [0, 0, 0] : [8, 4, 0]
  );

  const laptopScale = useTransform(
    smoothProgress,
    [0, 0.3, 0.7],
    [0.85, 0.92, 1]
  );

  const laptopY = useTransform(
    smoothProgress,
    [0, 0.35, 0.75],
    shouldReduceMotion ? [0, 0, 0] : [30, 10, 0]
  );

  // Outside lid cover fades out as it opens past 35%
  const lidCoverOpacity = useTransform(
    smoothProgress,
    [0.2, 0.42],
    shouldReduceMotion ? [0, 0] : [1, 0]
  );

  // Screen display illuminates as lid opens past 25%
  const screenDisplayOpacity = useTransform(
    smoothProgress,
    [0.25, 0.48],
    shouldReduceMotion ? [1, 1] : [0, 1]
  );

  // Headers fade in/out smoothly
  const introHeaderOpacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.28],
    shouldReduceMotion ? [0, 0, 0] : [1, 1, 0]
  );

  const comparisonHeaderOpacity = useTransform(
    smoothProgress,
    [0.45, 0.65],
    shouldReduceMotion ? [1, 1] : [0, 1]
  );

  const scrollHintOpacity = useTransform(
    smoothProgress,
    [0, 0.14],
    shouldReduceMotion ? [0, 0] : [1, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="relative h-[220vh] sm:h-[250vh] bg-black text-white"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-emerald-500/5 rounded-full blur-[160px]" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-purple-900/10 rounded-full blur-[140px]" />
        </div>

        {/* ================= 1. INTRO HEADER (Visible while closed) ================= */}
        <motion.div
          style={{ opacity: introHeaderOpacity }}
          className="absolute top-[6%] sm:top-[8%] z-10 mx-auto w-full max-w-3xl px-4 text-center pointer-events-none"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            [ The Security Paradigm Shift ]
          </span>

          <h2 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Traditional Pentesting <br className="hidden sm:inline" />
            <span className="text-emerald-400">vs. Autonomous DevSecOps.</span>
          </h2>

          <p className="mx-auto mt-2.5 max-w-md text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Scroll down to open the MacBook and inspect the live telemetry comparison.
          </p>
        </motion.div>

        {/* ================= 2. COMPARISON HEADER (Visible when open) ================= */}
        <motion.div
          style={{ opacity: comparisonHeaderOpacity }}
          className="absolute top-[4%] sm:top-[6%] z-20 w-full px-4 text-center pointer-events-none"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            [ Continuous Telemetry vs. Legacy Retainers ]
          </span>

          <h2 className="mt-1 text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Same codebase. <span className="text-emerald-400">Completely different operating speed.</span>
          </h2>
        </motion.div>

        {/* ================= 3. 3D MACBOOK PHYSICAL ASSEMBLY ================= */}
        <motion.div
          style={{
            y: laptopY,
            scale: laptopScale,
            rotateY: laptopRotateY,
            rotateX: laptopRotateX,
            transformStyle: "preserve-3d",
          }}
          className="relative mt-8 sm:mt-12 w-full max-w-[680px] sm:max-w-[780px] lg:max-w-[850px]"
        >
          <div
            className="relative mx-auto"
            style={{
              perspective: "1600px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            {/* ================= A. MACBOOK LID (Rotates in 3D) ================= */}
            <motion.div
              style={{
                rotateX: lidRotateX,
                transformOrigin: "bottom center",
                transformStyle: "preserve-3d",
              }}
              className="relative z-20 mx-auto aspect-[1.56/1] w-[86%] sm:w-[84%]"
            >
              {/* 1. OUTSIDE LID COVER (Space Black Aluminum + Glowing HMW Logo) */}
              <motion.div
                style={{ opacity: lidCoverOpacity }}
                className="absolute inset-0 rounded-[18px] sm:rounded-[22px] bg-gradient-to-b from-[#2d3035] via-[#1c1e22] to-[#121316] p-[3px] border border-white/15 shadow-2xl flex flex-col items-center justify-center overflow-hidden"
              >
                {/* Subtle metallic sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.06] pointer-events-none" />

                {/* Center Glowing Logo */}
                <div className="relative size-14 sm:size-16 rounded-full bg-black/60 border border-white/20 flex items-center justify-center shadow-inner">
                  <Shield className="size-7 sm:size-8 text-emerald-400 drop-shadow-[0_0_16px_rgba(120,156,54,0.7)]" />
                </div>
                <span className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-widest text-neutral-300 mt-2 font-mono">
                  HACK MY WEBSITE
                </span>

                {/* Top Lip Notch */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/20" />
              </motion.div>

              {/* 2. INSIDE RETINA DISPLAY (Screen Bezel + Live Comparison) */}
              <motion.div
                style={{ opacity: screenDisplayOpacity }}
                className="absolute inset-0 rounded-[18px] sm:rounded-[22px] bg-gradient-to-b from-[#25272b] via-[#18191c] to-[#0f1012] p-[5px] sm:p-[6px] shadow-2xl border border-white/15"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[12px] sm:rounded-[15px] bg-[#090909] p-[2.2%] sm:p-[2.8%]">
                  {/* Camera & Sensor Notch */}
                  <div className="absolute left-1/2 top-[1%] z-30 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-slate-900 border border-white/15 flex items-center justify-center">
                    <span className="size-1 rounded-full bg-emerald-400/90" />
                  </div>

                  {/* Active Comparison Panel */}
                  <div className="relative h-full w-full overflow-hidden rounded-[8px] sm:rounded-[10px] bg-black">
                    <LaptopScreenContent onStartScan={onStartScan} />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ================= B. MACBOOK HINGE CYLINDER ================= */}
            <div className="relative z-30 mx-auto -mt-[2px] h-[8px] sm:h-[10px] w-[78%] rounded-full bg-gradient-to-b from-[#3a3d42] via-[#222428] to-[#121316] border-t border-white/10 shadow-md" />

            {/* ================= C. MACBOOK BASE / KEYBOARD ================= */}
            <div
              className="relative z-10 mx-auto w-[96%]"
              style={{
                transform: "rotateX(62deg)",
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Base Aluminum Chassis */}
              <div className="relative aspect-[2.65/1] rounded-b-[24px] sm:rounded-b-[28px] rounded-t-[6px] bg-gradient-to-b from-[#2a2d32] via-[#1c1e22] to-[#121316] p-[2%] shadow-[0_24px_45px_rgba(0,0,0,0.85)] border border-white/15">
                {/* Keyboard Wells & Keycaps Matrix */}
                <div className="absolute left-[8%] right-[8%] top-[8%] grid h-[52%] grid-cols-12 gap-[0.8%] p-1 bg-black/50 rounded-lg border border-white/5">
                  {Array.from({ length: 48 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-[2px] bg-[#14161a] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    />
                  ))}
                </div>

                {/* Haptic Glass Trackpad */}
                <div className="absolute bottom-[6%] left-1/2 h-[28%] w-[34%] -translate-x-1/2 rounded-[6px] border border-white/10 bg-[#16181d] shadow-inner" />
              </div>

              {/* Front Lip with Thumb Opening Notch */}
              <div className="relative mx-auto h-[8px] w-[99%] rounded-b-[50%] bg-gradient-to-b from-[#222428] to-[#141518]">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-16 sm:w-20 h-1.5 rounded-b-md bg-[#0f1012]" />
              </div>
            </div>

            {/* ================= D. AMBIENT FLOOR SHADOW ================= */}
            <div className="absolute left-[10%] right-[10%] top-[94%] -z-10 h-24 rounded-[50%] bg-[#789C36]/20 blur-3xl" />
            <div className="absolute left-[5%] right-[5%] top-[95%] -z-10 h-20 rounded-[50%] bg-black blur-2xl" />
          </div>
        </motion.div>

        {/* ================= 4. SCROLL INSTRUCTIONAL HINT ================= */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
            <span>Scroll to open</span>
            <div className="h-6 w-px bg-gradient-to-b from-emerald-400 to-transparent animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
