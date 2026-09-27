"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

interface DataPoint {
  date: string;
  fullDate: string;
  scans: number;
  advisories: number;
  greenY: number; // SVG Y coordinate (height 200, 25=400, 175=100)
  cyanY: number;
}

const TIME_RANGE_DATA: Record<
  "30days" | "12months" | "1week",
  {
    labels: string[];
    points: DataPoint[];
    defaultActiveIndex: number;
    greenPath: string;
    cyanPath: string;
  }
> = {
  "30days": {
    labels: ["24 Aug", "31 Aug", "7 Sept", "14 Sept", "21 Sept", "28 Sept"],
    defaultActiveIndex: 2, // 7 Sept
    points: [
      { date: "24 Aug", fullDate: "24 August", scans: 124, advisories: 0, greenY: 165, cyanY: 90 },
      { date: "31 Aug", fullDate: "31 August", scans: 182, advisories: 0, greenY: 140, cyanY: 140 },
      { date: "7 Sept", fullDate: "7 September", scans: 318, advisories: 0, greenY: 55, cyanY: 100 },
      { date: "14 Sept", fullDate: "14 September", scans: 112, advisories: 0, greenY: 170, cyanY: 85 },
      { date: "21 Sept", fullDate: "21 September", scans: 295, advisories: 0, greenY: 65, cyanY: 130 },
      { date: "28 Sept", fullDate: "28 September", scans: 268, advisories: 0, greenY: 90, cyanY: 150 },
    ],
    // Smooth cubic bezier curves matching the exact geometry of media_1790527766284.png
    greenPath:
      "M 20 165 C 60 165, 90 155, 136 140 C 180 125, 210 55, 252 55 C 294 55, 330 170, 368 170 C 410 170, 440 65, 484 65 C 520 65, 550 85, 580 90",
    cyanPath:
      "M 20 90 C 60 90, 90 140, 136 140 C 180 140, 210 100, 252 100 C 294 100, 330 85, 368 85 C 410 85, 445 130, 484 130 C 520 130, 550 145, 580 150",
  },
  "12months": {
    labels: ["Oct", "Dec", "Feb", "Apr", "Jun", "Aug"],
    defaultActiveIndex: 4, // Jun
    points: [
      { date: "Oct", fullDate: "October 2025", scans: 840, advisories: 0, greenY: 150, cyanY: 110 },
      { date: "Dec", fullDate: "December 2025", scans: 1120, advisories: 0, greenY: 120, cyanY: 130 },
      { date: "Feb", fullDate: "February 2026", scans: 1650, advisories: 0, greenY: 80, cyanY: 95 },
      { date: "Apr", fullDate: "April 2026", scans: 2100, advisories: 0, greenY: 60, cyanY: 110 },
      { date: "Jun", fullDate: "June 2026", scans: 2890, advisories: 0, greenY: 45, cyanY: 80 },
      { date: "Aug", fullDate: "August 2026", scans: 3420, advisories: 0, greenY: 50, cyanY: 70 },
    ],
    greenPath:
      "M 20 150 C 60 150, 90 130, 136 120 C 180 110, 210 80, 252 80 C 294 80, 330 60, 368 60 C 410 60, 440 45, 484 45 C 520 45, 550 48, 580 50",
    cyanPath:
      "M 20 110 C 60 110, 90 130, 136 130 C 180 130, 210 95, 252 95 C 294 95, 330 110, 368 110 C 410 110, 445 80, 484 80 C 520 80, 550 75, 580 70",
  },
  "1week": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    defaultActiveIndex: 2, // Wed
    points: [
      { date: "Mon", fullDate: "Monday", scans: 34, advisories: 0, greenY: 155, cyanY: 105 },
      { date: "Tue", fullDate: "Tuesday", scans: 41, advisories: 0, greenY: 135, cyanY: 125 },
      { date: "Wed", fullDate: "Wednesday", scans: 62, advisories: 0, greenY: 60, cyanY: 90 },
      { date: "Thu", fullDate: "Thursday", scans: 38, advisories: 0, greenY: 160, cyanY: 80 },
      { date: "Fri", fullDate: "Friday", scans: 55, advisories: 0, greenY: 75, cyanY: 115 },
      { date: "Sat", fullDate: "Saturday", scans: 49, advisories: 0, greenY: 95, cyanY: 135 },
    ],
    greenPath:
      "M 20 155 C 60 155, 90 145, 136 135 C 180 125, 210 60, 252 60 C 294 60, 330 160, 368 160 C 410 160, 440 75, 484 75 C 520 75, 550 90, 580 95",
    cyanPath:
      "M 20 105 C 60 105, 90 125, 136 125 C 180 125, 210 90, 252 90 C 294 90, 330 80, 368 80 C 410 80, 445 115, 484 115 C 520 115, 550 130, 580 135",
  },
};

const X_COORDINATES = [20, 136, 252, 368, 484, 580];

export interface RiskVelocityTelemetrySectionProps {
  className?: string;
}

export const RiskVelocityTelemetrySection: React.FC<RiskVelocityTelemetrySectionProps> = ({
  className,
}) => {
  const [timeRange, setTimeRange] = useState<"30days" | "12months" | "1week">("30days");
  const [activePointIndex, setActivePointIndex] = useState<number>(2); // Default to 7 Sept

  const activeDataset = TIME_RANGE_DATA[timeRange];
  const activePoint = activeDataset.points[activePointIndex] || activeDataset.points[2];
  const activeX = X_COORDINATES[activePointIndex] || 252;
  const activeY = activePoint.greenY;

  // Percentage for CSS horizontal placement of tooltip
  const activeXPercent = ((activeX - 20) / (580 - 20)) * 100;

  const handleTimeRangeChange = (range: "30days" | "12months" | "1week") => {
    setTimeRange(range);
    setActivePointIndex(TIME_RANGE_DATA[range].defaultActiveIndex);
  };

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-5", className)}>
      {/* ==================== LEFT CARD: DAST RISK VELOCITY (8 COLS) ==================== */}
      <div className="lg:col-span-8 p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between relative overflow-hidden shadow-xl">
        <div>
          {/* Card Header & Time Range Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                DAST Risk Velocity
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Clean scan execution telemetry across fleet
              </p>
            </div>

            {/* Time Filter Capsule (12 months | 30 days | 1 week) */}
            <div className="flex items-center gap-1 bg-black/70 p-1 rounded-full border border-neutral-800 text-xs self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleTimeRangeChange("12months")}
                className={cn(
                  "px-3 py-1 rounded-full transition-all cursor-pointer text-xs",
                  timeRange === "12months"
                    ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                12 months
              </button>
              <button
                type="button"
                onClick={() => handleTimeRangeChange("30days")}
                className={cn(
                  "px-3 py-1 rounded-full transition-all cursor-pointer text-xs",
                  timeRange === "30days"
                    ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                30 days
              </button>
              <button
                type="button"
                onClick={() => handleTimeRangeChange("1week")}
                className={cn(
                  "px-3 py-1 rounded-full transition-all cursor-pointer text-xs",
                  timeRange === "1week"
                    ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                1 week
              </button>
            </div>
          </div>

          {/* Interactive Chart Canvas */}
          <div className="relative pt-6 pb-2">
            {/* Floating Tooltip Pill (Animated to active point) */}
            <div
              className="absolute -top-3 -translate-x-1/2 px-3.5 py-1.5 rounded-xl bg-neutral-950/95 border border-emerald-500/40 shadow-2xl backdrop-blur-md text-center pointer-events-none z-30 transition-all duration-300"
              style={{
                left: `calc(32px + (100% - 48px) * ${activeXPercent / 100})`,
              }}
            >
              <div className="text-[11px] text-neutral-400 font-medium">
                {activePoint.fullDate}
              </div>
              <div className="text-xs font-bold text-emerald-400">
                {activePoint.scans} Scans Passed ({activePoint.advisories} Advisories)
              </div>
              {/* Tooltip Downward Caret */}
              <div className="w-2 h-2 bg-neutral-950 border-b border-r border-emerald-500/40 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
            </div>

            {/* Chart Body: Y-Axis + SVG Grid & Curves */}
            <div className="flex items-stretch gap-3">
              {/* Y-Axis Scale Labels */}
              <div className="flex flex-col justify-between text-xs text-neutral-500 py-1 shrink-0 h-44 select-none">
                <span>400</span>
                <span>300</span>
                <span>200</span>
                <span>100</span>
              </div>

              {/* SVG Area */}
              <div className="flex-1 relative">
                <svg
                  viewBox="0 0 600 200"
                  className="w-full h-44 overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="emeraldVelocityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#34D399" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="cyanVelocityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="50%" stopColor="#2DD4BF" />
                      <stop offset="100%" stopColor="#14B8A6" />
                    </linearGradient>
                    <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Horizontal Dashed Grid Lines */}
                  <line x1="10" y1="25" x2="590" y2="25" stroke="#1c1f2e" strokeDasharray="3 3" />
                  <line x1="10" y1="75" x2="590" y2="75" stroke="#1c1f2e" strokeDasharray="3 3" />
                  <line x1="10" y1="125" x2="590" y2="125" stroke="#1c1f2e" strokeDasharray="3 3" />
                  <line x1="10" y1="175" x2="590" y2="175" stroke="#1c1f2e" strokeDasharray="3 3" />

                  {/* Cyan Curve */}
                  <motion.path
                    key={`cyan-${timeRange}`}
                    d={activeDataset.cyanPath}
                    fill="none"
                    stroke="url(#cyanVelocityGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                  />

                  {/* Emerald Curve */}
                  <motion.path
                    key={`emerald-${timeRange}`}
                    d={activeDataset.greenPath}
                    fill="none"
                    stroke="url(#emeraldVelocityGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter="url(#emeraldGlow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />

                  {/* Active Point Glowing Beacon */}
                  <motion.g
                    animate={{ x: activeX, y: activeY }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <circle cx={0} cy={0} r={8} fill="#10B981" className="animate-ping opacity-60" />
                    <circle cx={0} cy={0} r={5} fill="#34D399" />
                    <circle cx={0} cy={0} r={2.5} fill="#ffffff" />
                  </motion.g>

                  {/* Interactive invisible hit targets for smooth hovering */}
                  {X_COORDINATES.map((x, idx) => (
                    <rect
                      key={idx}
                      x={x - 30}
                      y={0}
                      width={60}
                      height={200}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setActivePointIndex(idx)}
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* X-Axis Date Labels matching screenshot */}
            <div className="flex items-center justify-between text-xs text-neutral-500 pl-8 pt-2 select-none">
              {activeDataset.labels.map((label, idx) => {
                const isSelected = idx === activePointIndex;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActivePointIndex(idx)}
                    onMouseEnter={() => setActivePointIndex(idx)}
                    className={cn(
                      "transition-colors cursor-pointer",
                      isSelected
                        ? "text-emerald-400 font-bold"
                        : "text-neutral-500 hover:text-neutral-300"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ==================== RIGHT CARD: FLEET TELEMETRY (4 COLS) ==================== */}
      <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all relative overflow-hidden flex flex-col justify-between shadow-xl">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Fleet Telemetry</h3>
            <p className="text-xs text-neutral-400 mt-0.5">Safe Harbor & quota coverage</p>
          </div>
        </div>

        {/* Central Overlapping Spheres Visual */}
        <div className="relative flex items-center justify-center py-6 my-auto min-h-[170px]">
          {/* Sphere 1: 100% Safe Harbor (Emerald) */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex flex-col items-center justify-center text-neutral-950 shadow-[0_0_40px_rgba(16,185,129,0.35)] relative z-10 transition-transform duration-300 hover:scale-105 cursor-pointer">
            <span className="text-2xl sm:text-3xl font-black leading-none mb-1 text-black">
              100%
            </span>
            <span className="text-xs font-bold text-neutral-950">Safe Harbor</span>
          </div>

          {/* Sphere 2: 0 CVE Advisories (Cyan) */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex flex-col items-center justify-center text-neutral-950 shadow-[0_0_35px_rgba(6,182,212,0.4)] -ml-6 sm:-ml-8 mt-5 relative z-20 transition-transform duration-300 hover:scale-105 cursor-pointer">
            <span className="text-base sm:text-lg font-black leading-none mb-0.5 text-black">
              0 CVE
            </span>
            <span className="text-xs font-semibold text-neutral-950">Advisories</span>
          </div>

          {/* Sphere 3: 150 Quota (Diagonal Hashed Pattern) */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-center -mt-14 -ml-3 sm:-ml-4 relative z-30 shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer [background-image:repeating-linear-gradient(45deg,#262626_0,#262626_2px,transparent_0,transparent_6px)]">
            <span className="text-xs sm:text-sm font-bold text-emerald-400 leading-none mb-0.5">
              150
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">Quota</span>
          </div>
        </div>

        {/* Card Footer: Coverage Status */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
          <span>Coverage Status:</span>
          <span className="text-emerald-400 font-bold">100% Monitored</span>
        </div>
      </div>
    </div>
  );
};
