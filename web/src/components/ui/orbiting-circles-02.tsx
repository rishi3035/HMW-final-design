"use client";

import React from "react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";
import {
  Globe,
  Layers,
  Search,
  Activity,
  Bug,
  Code2,
  GitMerge,
  GitPullRequest,
  Sparkles,
  ShieldCheck,
  Shield,
} from "lucide-react";

export interface OrbitIcon {
  name: string;
  role: string;
  badge: string;
  color: string;
  angle: number;
  icon: React.ElementType;
}

export interface OrbitRing {
  stage: string;
  stageName: string;
  size: string;
  duration: number;
  icons: OrbitIcon[];
}

// HackMyWebsite Pipeline Data Flow in Ascending Order (Inner -> Middle -> Outer)
export const securityPipelineOrbits: OrbitRing[] = [
  // INNER RING — STAGE 01: SURFACE MAPPING & TARGET INGESTION
  {
    stage: "STAGE 01",
    stageName: "Surface Mapping & Ingestion",
    size: "w-[270px] h-[270px] sm:w-[320px] sm:h-[320px] md:w-[440px] md:h-[440px]",
    duration: 22,
    icons: [
      {
        name: "Web Applications",
        role: "Target Assets",
        badge: "SPA • SSR",
        color: "#10B981",
        angle: -60,
        icon: Globe,
      },
      {
        name: "REST & GraphQL",
        role: "API Endpoints",
        badge: "SCHEMAS",
        color: "#06B6D4",
        angle: 60,
        icon: Layers,
      },
      {
        name: "Playwright",
        role: "Surface Discovery",
        badge: "DOM CRAWL",
        color: "#A7F3D0",
        angle: 180,
        icon: Search,
      },
    ],
  },
  // MIDDLE RING — STAGE 02: MULTI-ENGINE TESTING
  {
    stage: "STAGE 02",
    stageName: "Multi-Engine Deep Testing",
    size: "w-[390px] h-[390px] sm:w-[470px] sm:h-[470px] md:w-[620px] md:h-[620px]",
    duration: 30,
    icons: [
      {
        name: "OWASP ZAP 2.15",
        role: "Dynamic DAST",
        badge: "RUNTIME",
        color: "#10B981",
        angle: 0,
        icon: Activity,
      },
      {
        name: "Nuclei v3.3",
        role: "Vulnerability Scan",
        badge: "5K+ CVEs",
        color: "#06B6D4",
        angle: 120,
        icon: Bug,
      },
      {
        name: "Semgrep Hybrid",
        role: "Static SAST",
        badge: "AST LOGIC",
        color: "#F59E0B",
        angle: 240,
        icon: Code2,
      },
    ],
  },
  // OUTER RING — STAGE 03: NORMALIZATION, REMEDIATION & VERIFIED RETEST
  {
    stage: "STAGE 03",
    stageName: "DevSecOps & Verified Remediation",
    size: "w-[510px] h-[510px] sm:w-[620px] sm:h-[620px] md:w-[800px] md:h-[800px]",
    duration: 40,
    icons: [
      {
        name: "Finding Normalization",
        role: "Cross-Engine Correlation",
        badge: "CWE / CVSS",
        color: "#34D399",
        angle: -45,
        icon: GitMerge,
      },
      {
        name: "GitHub Security Gate",
        role: "PR Policy Enforcement",
        badge: "CI/CD GATE",
        color: "#F8FAFC",
        angle: 45,
        icon: GitPullRequest,
      },
      {
        name: "1-Click IDE Fixes",
        role: "Cursor & Copilot",
        badge: "CODE PATCH",
        color: "#38BDF8",
        angle: 135,
        icon: Sparkles,
      },
      {
        name: "Closed-Loop Verify",
        role: "Targeted Retesting",
        badge: "VERIFIED",
        color: "#10B981",
        angle: 225,
        icon: ShieldCheck,
      },
    ],
  },
];

export interface OrbitingCirclesGlobeProps {
  orbits?: OrbitRing[];
  className?: string;
}

export function OrbitingCirclesGlobe({
  orbits = securityPipelineOrbits,
  className = "",
}: OrbitingCirclesGlobeProps) {
  return (
    <div
      className={`relative w-full h-[480px] sm:h-[560px] md:h-[660px] lg:h-[720px] overflow-hidden flex items-center justify-center ${className}`}
    >
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
        }
      `}</style>

      {/* Center particle globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square pointer-events-none w-[220px] sm:w-[280px] md:w-[380px] z-10 flex items-center justify-center">
        <ParticleSphereAnimation />

        {/* Central Core Emblem Floating Over the Globe */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto text-center p-3 sm:p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/50 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.35)] min-w-[140px] sm:min-w-[170px] select-none group">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
            <Shield className="size-4 animate-pulse" />
            <span className="text-xs  font-black uppercase tracking-wider">
              SOVEREIGN CORE
            </span>
          </div>
          <div className="text-xs sm:text-sm font-black text-white tracking-tight">
            HackMyWebsite
          </div>
          <div className="text-xs  text-slate-400 mt-0.5">
            AI Risk Engine • 0–100 Score
          </div>
        </div>
      </div>

      {/* Orbiting concentric rings */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        return (
          <div
            key={index}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-800/80 pointer-events-none ${orbit.size}`}
            style={{
              boxShadow:
                index === 0
                  ? "0 0 30px rgba(16, 185, 129, 0.08) inset"
                  : index === 1
                  ? "0 0 45px rgba(6, 182, 212, 0.06) inset"
                  : "0 0 60px rgba(248, 250, 252, 0.04) inset",
            }}
          >
            {/* Stage Tag on Ring Border */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-950/95 border border-slate-800 text-xs  font-bold text-slate-400 tracking-wider uppercase backdrop-blur-md">
              <span className="text-emerald-400">{orbit.stage}</span> • {orbit.stageName}
            </div>

            {/* Orbiting Nodes */}
            {orbit.icons.map((iconData, iconIndex) => {
              const Icon = iconData.icon;

              return (
                <div
                  key={iconIndex}
                  className="absolute top-0 left-1/2 h-1/2 -ml-6 origin-bottom flex flex-col justify-start items-center pointer-events-auto"
                  style={
                    {
                      "--start-angle": `${iconData.angle}deg`,
                      animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="group relative cursor-pointer -mt-6"
                    style={
                      {
                        "--counter-offset": `${-iconData.angle}deg`,
                        animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                      } as React.CSSProperties
                    }
                  >
                    {/* Node Glass Card */}
                    <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-950/95 border border-slate-700/80 group-hover:border-emerald-500/80 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300 backdrop-blur-md flex items-center justify-center">
                      <Icon
                        className="size-4 sm:size-5 transition-transform"
                        style={{ color: iconData.color }}
                      />
                    </div>

                    {/* Popover Hover Telemetry Badge */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30 min-w-[130px]">
                      <div className="p-2 rounded-xl bg-slate-950/95 border border-emerald-500/50 shadow-2xl backdrop-blur-xl text-center space-y-0.5">
                        <div className="text-xs  font-bold text-emerald-400 uppercase tracking-wide">
                          {iconData.badge}
                        </div>
                        <div className="text-xs font-bold text-white whitespace-nowrap">
                          {iconData.name}
                        </div>
                        <div className="text-xs text-slate-400 whitespace-nowrap">
                          {iconData.role}
                        </div>
                      </div>
                      <div className="size-1.5 rotate-45 bg-emerald-500/50 -mt-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default OrbitingCirclesGlobe;
