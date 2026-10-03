"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Activity,
  Copy,
  Check,
  Radar,
  Lock,
  Zap,
} from "lucide-react";
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
    return timeRange === "30days" ? 2 : data.length - 1;
  });

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

  // SVG Geometry for clean, simple sparkline
  const svgWidth = 640;
  const svgHeight = 150;
  const paddingX = 35;
  const paddingYTop = 25;
  const paddingYBottom = 25;
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

  const areaD = useMemo(() => {
    if (points.length === 0) return "";
    const bottomY = svgHeight - paddingYBottom;
    return `${pathD} L ${points[points.length - 1].x} ${bottomY} L ${points[0].x} ${bottomY} Z`;
  }, [pathD, points, svgHeight, paddingYBottom]);

  const activeCoord = points[Math.min(activeIndex, points.length - 1)] || points[0];
  const totalScans = useMemo(() => data.reduce((acc, d) => acc + d.scans, 0), [data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
      {/* ─────────────────────────────────────────────────────────────
          CARD 1: DAST Risk Velocity (Simplified & Clean) - 8 COLS
         ───────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-[#0A0D14] border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-44 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header & Controls */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  DAST Risk Velocity
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Continuous Probing
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 font-normal">
                Non-destructive execution velocity &amp; zero-advisory baseline across fleet
              </p>
            </div>

            {/* Time Range Pills */}
            <div className="inline-flex items-center gap-1 bg-black/80 p-1 rounded-full border border-white/10 text-xs self-start sm:self-auto">
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
                    onClick={() => {
                      setTimeRange(range);
                      setActiveIndex(0);
                    }}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer",
                      isSelected
                        ? "bg-emerald-500 text-neutral-950 shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    )}
                  >
                    {labels[range]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simple Clean KPI Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-white/10 text-xs">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Clean Scans</span>
              <span className="text-base sm:text-lg font-bold text-white font-mono mt-0.5 block">
                {totalScans.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Risk Floor</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono mt-0.5 block">
                0 CVEs Found
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Mean Latency</span>
              <span className="text-base sm:text-lg font-bold text-neutral-200 font-mono mt-0.5 block">
                {activeDataPoint.latency}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Safe Harbor</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono mt-0.5 block">
                100% Certified
              </span>
            </div>
          </div>

          {/* Clean Smooth Sparkline Chart */}
          <div className="relative pt-6 pb-2 select-none">
            {/* Minimalist Floating Tooltip */}
            <AnimatePresence mode="wait">
              {activeDataPoint && (
                <motion.div
                  key={`${timeRange}-${activeIndex}`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    left: `${(activeCoord.x / svgWidth) * 100}%`,
                  }}
                  className="absolute top-0 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-neutral-900 border border-emerald-500/40 shadow-xl text-center pointer-events-none z-30 whitespace-nowrap"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-white">{activeDataPoint.dateFull}</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded">
                      CLEAN
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-300 font-mono mt-0.5">
                    {activeDataPoint.scans} Scans Executed · {activeDataPoint.latency}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SVG Chart */}
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-36 overflow-visible">
              <defs>
                <linearGradient id="simpleVelocityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A220F" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1A220F" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* Minimal horizontal guide lines */}
              <line x1={paddingX} y1={paddingYTop} x2={svgWidth - paddingX} y2={paddingYTop} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1={paddingX} y1={svgHeight - paddingYBottom} x2={svgWidth - paddingX} y2={svgHeight - paddingYBottom} stroke="rgba(255,255,255,0.08)" />

              {/* Soft Area fill under curve */}
              <path d={areaD} fill="url(#simpleVelocityFill)" />

              {/* Clean Smooth Line */}
              <path d={pathD} fill="none" stroke="#1A220F" strokeWidth="2.5" strokeLinecap="round" />

              {/* Data Points */}
              {points.map((p, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <g key={idx} className="cursor-pointer" onClick={() => setActiveIndex(idx)}>
                    {/* Hover hotspot */}
                    <circle cx={p.x} cy={p.y} r="14" fill="transparent" />
                    {/* Outer ring on active */}
                    {isActive && (
                      <circle cx={p.x} cy={p.y} r="7" fill="none" stroke="#1A220F" strokeWidth="2" opacity="0.6" />
                    )}
                    {/* Core dot */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? "4" : "3"}
                      fill={isActive ? "#FFFFFF" : "#1A220F"}
                      stroke="#0A0D14"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>

            {/* X-Axis Date Labels */}
            <div className="flex justify-between px-6 pt-1 text-[11px] font-mono text-neutral-400">
              {data.map((d, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "transition-colors cursor-pointer",
                    idx === activeIndex ? "text-emerald-400 font-bold" : "hover:text-white"
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Stream Ticker */}
        <div className="pt-3 mt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
              LIVE DAST STREAM:
            </span>
            <span className="text-[11px] font-mono text-neutral-300">
              {scannerIp} · TLS 1.3 · 200+ Injections Passed · 0 CVE Matches
            </span>
          </div>

          <span className="text-[11px] font-mono text-neutral-500 hidden md:inline">
            Non-Destructive Guaranteed
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CARD 2: Fleet Telemetry (Simplified & Clean) - 4 COLS
         ───────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-[#0A0D14] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Radar className="size-4 text-emerald-400" />
              <span>Fleet Telemetry</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">Safe Harbor &amp; quota coverage</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold font-mono flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            100% SECURE
          </span>
        </div>

        {/* Simplified Clean Circular Health Gauge */}
        <div className="flex flex-col items-center justify-center py-4 my-auto">
          <div className="relative size-36 sm:size-40 flex items-center justify-center">
            {/* Background Track Circle */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="7"
              />
              {/* Vibrant Emerald Progress Arc (100% Complete) */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#1A220F"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="314"
                strokeDashoffset="0"
                className="transition-all duration-1000"
              />
            </svg>

            {/* Inner Shield & Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <ShieldCheck className="size-7 text-emerald-400 mb-1" />
              <span className="text-xs font-mono font-extrabold text-white tracking-wider">
                SAFE
              </span>
              <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                0 Exploits
              </span>
            </div>
          </div>
        </div>

        {/* 3 Clean Status Rows */}
        <div className="space-y-2.5 pt-2">
          {/* Safe Harbor Protocol */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/60 border border-white/5 text-xs">
            <div className="flex items-center gap-2 text-neutral-300">
              <Lock className="size-3.5 text-emerald-400" />
              <span className="font-medium">Safe Harbor Protocol</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              100% Active
            </span>
          </div>

          {/* CVE Advisories */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/60 border border-white/5 text-xs">
            <div className="flex items-center gap-2 text-neutral-300">
              <Activity className="size-3.5 text-emerald-400" />
              <span className="font-medium">CVE Advisories</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              0 Detected
            </span>
          </div>

          {/* Monthly Quota */}
          <div className="p-2.5 rounded-xl bg-black/60 border border-white/5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-neutral-300">
              <div className="flex items-center gap-2">
                <Zap className="size-3.5 text-emerald-400" />
                <span className="font-medium">Monthly Quota</span>
              </div>
              <span className="font-mono text-neutral-400 text-[11px]">150 / 200 (75%)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: "75%" }} />
            </div>
          </div>
        </div>

        {/* Footer: Static IP & Copy */}
        <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span className="text-[11px]">Static IP: {scannerIp}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="size-3" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span>Copy IP</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default SecurityAuditTelemetryVisual;
