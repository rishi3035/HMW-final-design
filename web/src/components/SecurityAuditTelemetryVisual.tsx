"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconActivity,
  IconShieldCheck,
  IconLock,
  IconBug,
  IconCpu,
  IconCopy,
  IconCheck,
  IconSparkles,
  IconRadar,
  IconFlame,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface DataPoint {
  label: string;
  scans: number;
  cves: number;
  latency: string;
  dateFull: string;
  engines: string;
}

const DATA_BY_RANGE: Record<"12months" | "30days" | "1week", DataPoint[]> = {
  "1week": [
    { label: "Mon", scans: 45, cves: 0, latency: "112ms", dateFull: "Monday, Sep 22", engines: "ZAP + Nuclei" },
    { label: "Tue", scans: 62, cves: 0, latency: "98ms", dateFull: "Tuesday, Sep 23", engines: "ZAP + Nuclei" },
    { label: "Wed", scans: 58, cves: 0, latency: "105ms", dateFull: "Wednesday, Sep 24", engines: "ZAP + Semgrep" },
    { label: "Thu", scans: 74, cves: 0, latency: "120ms", dateFull: "Thursday, Sep 25", engines: "Full Multi-Engine Suite" },
    { label: "Fri", scans: 88, cves: 0, latency: "95ms", dateFull: "Friday, Sep 26", engines: "ZAP + Nuclei" },
    { label: "Sat", scans: 52, cves: 0, latency: "110ms", dateFull: "Saturday, Sep 27", engines: "Light DAST" },
    { label: "Sun", scans: 65, cves: 0, latency: "102ms", dateFull: "Sunday, Sep 28", engines: "Full Multi-Engine Suite" },
  ],
  "30days": [
    { label: "24 Aug", scans: 185, cves: 0, latency: "115ms", dateFull: "24 August 2026", engines: "ZAP + Nuclei" },
    { label: "31 Aug", scans: 240, cves: 0, latency: "108ms", dateFull: "31 August 2026", engines: "Full Multi-Engine Suite" },
    { label: "7 Sept", scans: 318, cves: 0, latency: "92ms", dateFull: "7 September 2026", engines: "OWASP ZAP 2.14 + Nuclei" },
    { label: "14 Sept", scans: 275, cves: 0, latency: "114ms", dateFull: "14 September 2026", engines: "Nuclei v3.2 Heuristics" },
    { label: "21 Sept", scans: 340, cves: 0, latency: "104ms", dateFull: "21 September 2026", engines: "Full Multi-Engine Suite" },
    { label: "28 Sept", scans: 395, cves: 0, latency: "98ms", dateFull: "28 September 2026", engines: "Continuous Fleet DAST" },
  ],
  "12months": [
    { label: "Oct", scans: 820, cves: 0, latency: "140ms", dateFull: "October 2025", engines: "OWASP ZAP Core" },
    { label: "Dec", scans: 1250, cves: 0, latency: "132ms", dateFull: "December 2025", engines: "ZAP + Nuclei" },
    { label: "Feb", scans: 1840, cves: 0, latency: "125ms", dateFull: "February 2026", engines: "Full Multi-Engine Suite" },
    { label: "Apr", scans: 2490, cves: 0, latency: "118ms", dateFull: "April 2026", engines: "Multi-Engine + Semgrep" },
    { label: "Jun", scans: 3150, cves: 0, latency: "105ms", dateFull: "June 2026", engines: "Continuous DAST" },
    { label: "Aug", scans: 4120, cves: 0, latency: "96ms", dateFull: "August 2026", engines: "Multi-Engine Suite" },
    { label: "Sep", scans: 4890, cves: 0, latency: "92ms", dateFull: "September 2026", engines: "Autonomous Fleet DAST" },
  ],
};

export interface SecurityAuditTelemetryVisualProps {
  timeRange: "12months" | "30days" | "1week";
  setTimeRange: (range: "12months" | "30days" | "1week") => void;
  scannerIp?: string;
  onCopyIp?: () => void;
}

export const SecurityAuditTelemetryVisual: React.FC<SecurityAuditTelemetryVisualProps> = ({
  timeRange,
  setTimeRange,
  scannerIp = "168.144.94.35",
  onCopyIp,
}) => {
  const [copied, setCopied] = useState(false);
  const data = DATA_BY_RANGE[timeRange];
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    // Default to a notable peak index
    return timeRange === "30days" ? 2 : data.length - 1;
  });

  // Keep active index within bounds if data length changes
  const activeDataPoint = data[Math.min(activeIndex, data.length - 1)] || data[0];

  const handleCopy = () => {
    if (onCopyIp) {
      onCopyIp();
    } else {
      navigator.clipboard.writeText(scannerIp);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SVG Geometry calculations
  const svgWidth = 640;
  const svgHeight = 170;
  const paddingX = 40;
  const paddingYTop = 30;
  const paddingYBottom = 30;
  const usableWidth = svgWidth - paddingX * 2;
  const usableHeight = svgHeight - paddingYTop - paddingYBottom;

  const maxScans = useMemo(() => {
    return Math.max(...data.map((d) => d.scans)) * 1.15;
  }, [data]);

  const points = useMemo(() => {
    const step = usableWidth / (data.length - 1);
    return data.map((d, i) => {
      const x = paddingX + i * step;
      const y = paddingYTop + usableHeight - (d.scans / maxScans) * usableHeight;
      return { x, y, ...d };
    });
  }, [data, maxScans, usableWidth, usableHeight]);

  // Cubic Bezier curve generator for silky smooth motion graphics
  const pathD = useMemo(() => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx1 = p0.x + (p1.x - p0.x) / 2;
      const cy1 = p0.y;
      const cx2 = p0.x + (p1.x - p0.x) / 2;
      const cy2 = p1.y;
      d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p1.x} ${p1.y}`;
    }
    return d;
  }, [points]);

  // Area path for gradient under the curve
  const areaD = useMemo(() => {
    if (points.length === 0) return "";
    const bottomY = svgHeight - paddingYBottom;
    return `${pathD} L ${points[points.length - 1].x} ${bottomY} L ${points[0].x} ${bottomY} Z`;
  }, [pathD, points, svgHeight, paddingYBottom]);

  // Selected point coordinates for tooltip positioning
  const activeCoord = points[Math.min(activeIndex, points.length - 1)] || points[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
      {/* ─────────────────────────────────────────────────────────────
          CARD 1: DAST Risk Velocity & Telemetry Stream (8 COLS)
         ───────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-neutral-950 border border-neutral-800/90 hover:border-neutral-700 transition-all flex flex-col justify-between relative overflow-hidden shadow-2xl group">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-0 right-1/4 w-80 h-60 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-40 bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />

        {/* Top Header & Range Controls */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span>DAST Risk Velocity</span>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Continuous Probing
                  </span>
                </h3>
              </div>
              <p className="text-xs text-neutral-400">
                Non-destructive execution velocity & zero-advisory baseline across fleet
              </p>
            </div>

            {/* Time Range Toggle Pills */}
            <div className="flex items-center gap-1 bg-black p-1 rounded-full border border-neutral-800 text-xs self-start sm:self-auto shadow-inner">
              {(["12months", "30days", "1week"] as const).map((range) => {
                const isSelected = timeRange === range;
                const labels = {
                  "12months": "12 months",
                  "30days": "30 days",
                  "1week": "1 week",
                };
                return (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setTimeRange(range)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer relative",
                      isSelected
                        ? "text-emerald-300 font-bold shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    )}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeRangePill"
                        className="absolute inset-0 rounded-full bg-emerald-950/80 border border-emerald-500/40"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{labels[range]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Legend & KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pb-4 pt-1 border-b border-neutral-800/70 text-xs">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Clean Scans</span>
                <span className="text-xs font-bold text-white font-mono">
                  {data.reduce((acc, d) => acc + d.scans, 0).toLocaleString()} Passed
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#06B6D4]" />
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Risk Floor</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">0 CVEs Found</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
              <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_6px_#14B8A6]" />
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Mean Latency</span>
                <span className="text-xs font-bold text-slate-200 font-mono">{activeDataPoint.latency}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]" />
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Safe Harbor</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">100% Certified</span>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              MOTION GRAPHICS CHART CANVAS
             ───────────────────────────────────────────────────────── */}
          <div className="relative pt-6 pb-2 select-none">
            {/* Glassmorphic Floating HUD Tooltip */}
            <AnimatePresence mode="wait">
              {activeDataPoint && (
                <motion.div
                  key={`${timeRange}-${activeIndex}`}
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    left: `${(activeCoord.x / svgWidth) * 100}%`,
                  }}
                  className="absolute top-0 -translate-x-1/2 px-3.5 py-2 rounded-xl bg-neutral-900/95 border border-emerald-500/50 shadow-2xl backdrop-blur-md text-center pointer-events-none z-30 min-w-[210px]"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-1 mb-1">
                    <span className="text-[11px] font-bold text-slate-200">{activeDataPoint.dateFull}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                      CLEAN
                    </span>
                  </div>
                  <div className="text-xs font-extrabold text-emerald-400 font-mono">
                    {activeDataPoint.scans.toLocaleString()} Scans Executed (0 CVEs)
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5 flex items-center justify-between">
                    <span>Engine: {activeDataPoint.engines}</span>
                    <span className="text-slate-300">{activeDataPoint.latency}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SVG Visualizer with Equalizer Frequency Bars + Neon Spline + Laser Sweep */}
            <div className="relative w-full h-48 overflow-hidden rounded-xl bg-black/40 border border-neutral-900">
              {/* Motion Graphic 1: Sweeping Radar Laser Scanline */}
              <motion.div
                className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-400/80 via-cyan-400/90 to-transparent pointer-events-none z-20 shadow-[0_0_12px_#10B981]"
                animate={{
                  x: [0, svgWidth - 10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Neon Glow Filter */}
                  <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Gradient Area Fill */}
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.28" />
                    <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Spline Stroke Gradient */}
                  <linearGradient id="splineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#34D399" />
                    <stop offset="85%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>

                  {/* Bar Fill Gradient */}
                  <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Subtle Horizontal Guide Grid Lines */}
                {[0.2, 0.45, 0.7, 0.95].map((pct, idx) => {
                  const y = paddingYTop + usableHeight * (1 - pct);
                  return (
                    <g key={idx}>
                      <line
                        x1={paddingX}
                        y1={y}
                        x2={svgWidth - paddingX}
                        y2={y}
                        stroke="#1a1e29"
                        strokeDasharray="4 4"
                        strokeWidth="1"
                      />
                    </g>
                  );
                })}

                {/* Motion Graphics: Equalizer Volume Bars for Each Interval */}
                {points.map((p, idx) => {
                  const isHovered = activeIndex === idx;
                  const barWidth = 24;
                  const bottomY = svgHeight - paddingYBottom;
                  const barHeight = Math.max(8, bottomY - p.y);

                  return (
                    <g
                      key={`bar-${idx}`}
                      className="cursor-pointer transition-opacity"
                      onClick={() => setActiveIndex(idx)}
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      {/* Bar body */}
                      <rect
                        x={p.x - barWidth / 2}
                        y={p.y}
                        width={barWidth}
                        height={barHeight}
                        rx="4"
                        fill="url(#barGradient)"
                        stroke={isHovered ? "#10B981" : "#1f2937"}
                        strokeWidth={isHovered ? "1.5" : "1"}
                        className="transition-all duration-300"
                        opacity={isHovered ? 1 : 0.7}
                      />

                      {/* Bar glowing neon cap */}
                      <rect
                        x={p.x - barWidth / 2}
                        y={p.y}
                        width={barWidth}
                        height="3"
                        rx="1.5"
                        fill={isHovered ? "#34D399" : "#10B981"}
                        filter={isHovered ? "url(#neonGlow)" : undefined}
                      />
                    </g>
                  );
                })}

                {/* Gradient Area Fill under spline */}
                <motion.path
                  d={areaD}
                  fill="url(#areaGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Main Glowing Spline Path */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="url(#splineGradient)"
                  strokeWidth="3"
                  filter="url(#neonGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                />

                {/* Motion Graphic 2: Active Node Glowing Pulse Indicator */}
                <circle
                  cx={activeCoord.x}
                  cy={activeCoord.y}
                  r="10"
                  fill="#10B981"
                  className="animate-ping opacity-40 pointer-events-none"
                />
                <circle
                  cx={activeCoord.x}
                  cy={activeCoord.y}
                  r="6"
                  fill="#059669"
                  stroke="#34D399"
                  strokeWidth="2"
                  className="pointer-events-none"
                />
                <circle
                  cx={activeCoord.x}
                  cy={activeCoord.y}
                  r="2.5"
                  fill="#ffffff"
                  className="pointer-events-none"
                />
              </svg>
            </div>

            {/* X-Axis Interval Labels with Active Glow */}
            <div className="flex items-center justify-between text-xs text-neutral-400 px-6 pt-2 font-mono">
              {data.map((d, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "px-2 py-1 rounded-md transition-all cursor-pointer",
                      isSelected
                        ? "text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30"
                        : "hover:text-white"
                    )}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Cyber Telemetry Ticker Stream */}
        <div className="pt-3 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-400">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              LIVE DAST STREAM:
            </span>
          </div>

          <div className="overflow-hidden text-[11px] font-mono text-neutral-400 truncate">
            <span className="text-white font-semibold">{scannerIp}</span>
            <span className="text-emerald-400 mx-1">➔</span>
            <span>TLS 1.3 OK</span>
            <span className="text-emerald-400 mx-1">➔</span>
            <span>200+ DAST Injections Passed</span>
            <span className="text-emerald-400 mx-1">➔</span>
            <span className="text-slate-200">0 CVE Matches</span>
          </div>

          <span className="text-[11px] text-neutral-500 shrink-0 font-mono hidden md:inline">
            Non-Destructive Guaranteed
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CARD 2: Fleet Defense Telemetry & Orbital Radar (4 COLS)
         ───────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-neutral-950 border border-neutral-800/90 hover:border-neutral-700 transition-all relative overflow-hidden flex flex-col justify-between shadow-2xl group">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <IconRadar className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Fleet Telemetry</h3>
            </div>
            <p className="text-xs text-neutral-400">Safe Harbor & quota coverage</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            100% SECURE
          </span>
        </div>

        {/* ─────────────────────────────────────────────────────────
            MOTION GRAPHICS CONCENTRIC ORBITAL RADAR
           ───────────────────────────────────────────────────────── */}
        <div className="relative flex items-center justify-center py-4 my-auto select-none">
          {/* Radar Container Frame */}
          <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full border border-neutral-800 bg-black/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">
            {/* Motion Graphic 1: Infinite 360° Rotating Radar Sweep */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(16, 185, 129, 0.05) 300deg, rgba(16, 185, 129, 0.28) 360deg)",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Radar Crosshairs Reticle */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-neutral-800/80 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-neutral-800/80 pointer-events-none" />

            {/* SVG Concentric Arc Rings */}
            <svg className="w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 200 200">
              <defs>
                <filter id="radarRingGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ring 1 (Outer - Safe Harbor 100%): R=80, Circ ≈ 502 */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#1f2937"
                strokeWidth="4"
              />
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#10B981"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="502"
                initial={{ strokeDashoffset: 502 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                filter="url(#radarRingGlow)"
              />

              {/* Ring 2 (Middle - CVE Clearance 100%): R=62, Circ ≈ 390 */}
              <circle
                cx="100"
                cy="100"
                r="62"
                fill="none"
                stroke="#1f2937"
                strokeWidth="4"
              />
              <motion.circle
                cx="100"
                cy="100"
                r="62"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="390"
                initial={{ strokeDashoffset: 390 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.6, delay: 0.2, ease: "easeOut" }}
                filter="url(#radarRingGlow)"
              />

              {/* Ring 3 (Inner - Quota 75%): R=44, Circ ≈ 276 (75% = 207, offset = 69) */}
              <circle
                cx="100"
                cy="100"
                r="44"
                fill="none"
                stroke="#1f2937"
                strokeWidth="4"
              />
              <motion.circle
                cx="100"
                cy="100"
                r="44"
                fill="none"
                stroke="#14B8A6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="276"
                initial={{ strokeDashoffset: 276 }}
                animate={{ strokeDashoffset: 69 }}
                transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
                filter="url(#radarRingGlow)"
              />
            </svg>

            {/* Motion Graphic 2: Orbiting Telemetry Satellite Node on Outer Ring */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-white" />
              </div>
            </motion.div>

            {/* Center Breathing Cyber Shield Hub */}
            <div className="absolute w-14 h-14 rounded-2xl bg-neutral-900 border border-emerald-500/40 shadow-xl shadow-emerald-500/20 flex flex-col items-center justify-center z-10">
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <IconShieldCheck className="w-6 h-6 text-emerald-400" />
              </motion.div>
              <span className="text-[9px] font-extrabold text-white font-mono mt-0.5">
                SAFE
              </span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            CLEAR SELF-EXPLANATORY BREAKDOWN ROWS
           ───────────────────────────────────────────────────────── */}
        <div className="space-y-2 pt-2">
          {/* Item 1: Safe Harbor */}
          <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <IconLock className="w-3.5 h-3.5" />
              </div>
              <span className="text-neutral-300 font-medium">Safe Harbor Protocol</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold font-mono text-[11px]">
              100% Active
            </span>
          </div>

          {/* Item 2: Vulnerability Exposure */}
          <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <IconBug className="w-3.5 h-3.5" />
              </div>
              <span className="text-neutral-300 font-medium">CVE Advisories</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold font-mono text-[11px]">
              0 Detected
            </span>
          </div>

          {/* Item 3: Fleet Scan Quota */}
          <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <IconCpu className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-neutral-300 font-medium block">Monthly Quota</span>
                <span className="text-[10px] text-neutral-500 font-mono">150 / 200 Scans (75%)</span>
              </div>
            </div>
            <div className="w-16 h-1.5 rounded-full bg-neutral-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-3/4 rounded-full" />
            </div>
          </div>
        </div>

        {/* Footer Status with Copyable Scanner IP */}
        <div className="pt-3 mt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
          <span>Static IP: <code className="text-white font-mono">{scannerIp}</code></span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <IconCheck className="w-3 h-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <IconCopy className="w-3 h-3" />
                <span>Copy IP</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
