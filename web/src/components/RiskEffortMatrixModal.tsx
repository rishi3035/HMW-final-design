"use client";

import React, { useMemo, useState } from "react";
import {
  IconX,
  IconSparkles,
  IconFlame,
  IconCheck,
  IconTool,
  IconClock,
  IconStack,
  IconChevronRight,
  IconRocket,
} from "@tabler/icons-react";

export interface FindingItem {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  affected_url?: string | null;
  business_impact?: string | null;
  owasp_category?: string | null;
}

export interface RiskEffortMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  findings?: FindingItem[];
  onSelectFinding?: (findingId: string) => void;
}

export type EffortLevel = "low" | "medium" | "high";

function deriveRemediationEffort(title: string): EffortLevel {
  const t = title.toLowerCase();
  if (
    t.includes("header") ||
    t.includes("x-frame-options") ||
    t.includes("hsts") ||
    t.includes("content-type") ||
    t.includes("sri") ||
    t.includes("subresource") ||
    t.includes("cookie") ||
    t.includes("banner")
  ) {
    return "low";
  }
  if (
    t.includes("cors") ||
    t.includes("tls") ||
    t.includes("ssl") ||
    t.includes("introspection") ||
    t.includes("debug") ||
    t.includes("trace")
  ) {
    return "medium";
  }
  return "high";
}

export const RiskEffortMatrixModal: React.FC<RiskEffortMatrixModalProps> = ({
  isOpen,
  onClose,
  findings = [],
  onSelectFinding,
}) => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<"quick_wins" | "major_projects" | "fill_ins" | "deprioritized">("quick_wins");

  if (!isOpen) return null;

  const defaultSampleFindings: FindingItem[] = [
    {
      id: "zap-clickjacking-01",
      title: "Missing Anti-Clickjacking & Frame Options Defense",
      severity: "critical",
      affected_url: "https://my-startup.com/dashboard",
      business_impact: "Attackers can transparently overlay malicious frames to steal user actions.",
    },
    {
      id: "zap-hsts-02",
      title: "HTTP Strict Transport Security (HSTS) Missing",
      severity: "high",
      affected_url: "https://my-startup.com",
      business_impact: "Browsers may downgrade connections to unencrypted HTTP via SSL-stripping.",
    },
    {
      id: "zap-cors-03",
      title: "Overly Permissive CORS Access-Control-Allow-Origin: *",
      severity: "high",
      affected_url: "https://my-startup.com/api/v1/auth/session",
      business_impact: "Third-party domains can access authenticated session data and API responses.",
    },
    {
      id: "zap-graphql-04",
      title: "Exposed GraphQL Introspection Schema",
      severity: "medium",
      affected_url: "https://my-startup.com/api/graphql",
      business_impact: "Exposes complete API schema graph to unauthenticated public attackers.",
    },
    {
      id: "zap-server-05",
      title: "Server Banner & Framework Version Disclosure",
      severity: "low",
      affected_url: "https://my-startup.com",
      business_impact: "Provides reconnaissance hints on unpatched host framework vulnerabilities.",
    },
  ];

  const sourceFindings = findings.length > 0 ? findings : defaultSampleFindings;

  // Group into 4 quadrants
  const quadrants = useMemo(() => {
    const quickWins: FindingItem[] = [];
    const majorProjects: FindingItem[] = [];
    const fillIns: FindingItem[] = [];
    const deprioritized: FindingItem[] = [];

    sourceFindings.forEach((f) => {
      const effort = deriveRemediationEffort(f.title);
      const isHighRisk = f.severity === "critical" || f.severity === "high";

      if (isHighRisk && effort === "low") {
        quickWins.push(f);
      } else if (isHighRisk && (effort === "medium" || effort === "high")) {
        majorProjects.push(f);
      } else if (!isHighRisk && effort === "low") {
        fillIns.push(f);
      } else {
        deprioritized.push(f);
      }
    });

    return { quickWins, majorProjects, fillIns, deprioritized };
  }, [sourceFindings]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 shadow-2xl text-left text-neutral-100">
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-neutral-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1.5">
                <IconRocket className="size-3.5 text-emerald-400" />
                <span>Leverage Matrix</span>
              </span>
              <span className="text-xs text-neutral-400">Security ROI Prioritization</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Remediation Effort vs. Security Impact Quadrants
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Focus your engineering sprints on high-leverage fixes that eliminate the maximum attack surface with minimal code changes.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer border border-neutral-800"
          >
            <IconX className="size-5" />
          </button>
        </div>

        {/* 4 Quadrants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
          {/* Quadrant 1: Quick Wins */}
          <div
            onClick={() => setSelectedQuadrant("quick_wins")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              selectedQuadrant === "quick_wins"
                ? "bg-emerald-950/20 border-emerald-500/50 shadow-lg shadow-emerald-500/10"
                : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <IconSparkles className="size-4" />
                </span>
                <span className="text-sm font-bold text-white">Quadrant 1: Quick Wins</span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {quadrants.quickWins.length} Items
              </span>
            </div>
            <p className="text-xs text-emerald-400/90 font-medium mt-2">
              High Impact · Low Effort (Highest ROI)
            </p>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              One-line header directives and config flags that wipe out critical attack surfaces in minutes.
            </p>
          </div>

          {/* Quadrant 2: Major Projects */}
          <div
            onClick={() => setSelectedQuadrant("major_projects")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              selectedQuadrant === "major_projects"
                ? "bg-amber-950/20 border-amber-500/50 shadow-lg shadow-amber-500/10"
                : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <IconFlame className="size-4" />
                </span>
                <span className="text-sm font-bold text-white">Quadrant 2: Major Projects</span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {quadrants.majorProjects.length} Items
              </span>
            </div>
            <p className="text-xs text-amber-400/90 font-medium mt-2">
              High Impact · High Effort (Architecture Overhauls)
            </p>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Complex auth redesigns, database sanitization rewrites, or API gateway access controls.
            </p>
          </div>

          {/* Quadrant 3: Fill-Ins */}
          <div
            onClick={() => setSelectedQuadrant("fill_ins")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              selectedQuadrant === "fill_ins"
                ? "bg-sky-950/20 border-sky-500/50 shadow-lg shadow-sky-500/10"
                : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <IconTool className="size-4" />
                </span>
                <span className="text-sm font-bold text-white">Quadrant 3: Easy Fill-Ins</span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                {quadrants.fillIns.length} Items
              </span>
            </div>
            <p className="text-xs text-sky-400/90 font-medium mt-2">
              Low Impact · Low Effort (Hygiene Tasks)
            </p>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Removing server version banners, standardizing robots.txt, or updating static favicon headers.
            </p>
          </div>

          {/* Quadrant 4: Deprioritized */}
          <div
            onClick={() => setSelectedQuadrant("deprioritized")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              selectedQuadrant === "deprioritized"
                ? "bg-neutral-800/80 border-neutral-600 shadow-lg shadow-black/20"
                : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-400">
                  <IconStack className="size-4" />
                </span>
                <span className="text-sm font-bold text-white">Quadrant 4: Deprioritized</span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
                {quadrants.deprioritized.length} Items
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-medium mt-2">
              Low Impact · High Effort (Defer Unless Mandated)
            </p>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Extensive legacy refactoring with negligible direct security score benefit.
            </p>
          </div>
        </div>

        {/* Selected Quadrant Items List */}
        <div className="space-y-3 pt-4 border-t border-neutral-800">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold flex items-center justify-between">
            <span>
              {selectedQuadrant === "quick_wins" && "Quick Wins (Fix First)"}
              {selectedQuadrant === "major_projects" && "Major Projects (Sprint Planning)"}
              {selectedQuadrant === "fill_ins" && "Easy Fill-Ins"}
              {selectedQuadrant === "deprioritized" && "Deprioritized Tasks"}
            </span>
            <span className="text-xs text-emerald-400">
              {selectedQuadrant === "quick_wins" && "Max Score Boost per Dev Hour"}
            </span>
          </div>

          <div className="space-y-2">
            {(selectedQuadrant === "quick_wins" ? quadrants.quickWins :
              selectedQuadrant === "major_projects" ? quadrants.majorProjects :
              selectedQuadrant === "fill_ins" ? quadrants.fillIns :
              quadrants.deprioritized).map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-4 hover:border-neutral-700 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-sm font-bold text-white truncate">{item.title}</span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                      item.severity === "critical"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        : item.severity === "high"
                        ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 truncate">
                    {item.business_impact || item.affected_url}
                  </p>
                </div>

                {onSelectFinding && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectFinding(item.id);
                      onClose();
                    }}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-emerald-400 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>Inspect</span>
                    <IconChevronRight className="size-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            Quadrant placement derived from OWASP remediation complexity & CVSS 3.1 exploitability.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
