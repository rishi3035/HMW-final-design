"use client";

import React, { useState } from "react";
import {
  IconX,
  IconCheck,
  IconAlertTriangle,
  IconClock,
  IconTrendingUp,
  IconTrendingDown,
  IconHistory,
  IconChevronRight,
  IconShieldCheck,
} from "@tabler/icons-react";

export interface ScanComparisonData {
  previousScanDate?: string;
  scoreDelta?: number;
  fixedFindings?: number;
  newFindings?: number;
  persistingFindings?: number;
}

export interface ScanComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparison?: ScanComparisonData;
  findings?: Array<{
    id: string;
    title: string;
    severity: string;
    affected_url?: string | null;
  }>;
  onSelectFinding?: (findingId: string) => void;
}

export const ScanComparisonModal: React.FC<ScanComparisonModalProps> = ({
  isOpen,
  onClose,
  comparison = {
    previousScanDate: "Sep 22, 2026",
    scoreDelta: 14,
    fixedFindings: 3,
    newFindings: 1,
    persistingFindings: 2,
  },
  findings = [],
  onSelectFinding,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "fixed" | "new" | "persisting">("all");

  if (!isOpen) return null;

  const scoreDelta = comparison.scoreDelta ?? 14;
  const isPositive = scoreDelta >= 0;
  const fixedCount = comparison.fixedFindings ?? 3;
  const newCount = comparison.newFindings ?? 1;
  const persistingCount = comparison.persistingFindings ?? 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 shadow-2xl text-left text-neutral-100">
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-neutral-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1.5">
                <IconHistory className="size-3.5 text-emerald-400" />
                <span>Scan Trajectory Diff</span>
              </span>
              <span className="text-xs text-neutral-400">Previous vs. Current Audit</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              What Changed Since Your Previous Security Scan
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Comparing latest scan results against baseline audit ({comparison.previousScanDate || "Sep 22, 2026"}).
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

        {/* Delta Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 py-6 border-b border-neutral-800/80">
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Score Delta</span>
            <div className={`text-2xl font-extrabold flex items-center gap-1.5 ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
              {isPositive ? <IconTrendingUp className="size-5" /> : <IconTrendingDown className="size-5" />}
              <span>{isPositive ? `+${scoreDelta}` : scoreDelta} pts</span>
            </div>
            <span className="text-xs text-neutral-400">{isPositive ? "Posture Improved" : "Regression Detected"}</span>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 border border-emerald-500/30 space-y-1">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block">Resolved Findings</span>
            <div className="text-2xl font-extrabold text-emerald-300 flex items-center gap-1.5">
              <IconCheck className="size-5" />
              <span>{fixedCount}</span>
            </div>
            <span className="text-xs text-neutral-400">Vulnerabilities fixed ✓</span>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 border border-amber-500/30 space-y-1">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">New Findings</span>
            <div className="text-2xl font-extrabold text-amber-300 flex items-center gap-1.5">
              <IconAlertTriangle className="size-5" />
              <span>{newCount}</span>
            </div>
            <span className="text-xs text-neutral-400">New vectors surfaced</span>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Persisting</span>
            <div className="text-2xl font-extrabold text-neutral-200 flex items-center gap-1.5">
              <IconClock className="size-5" />
              <span>{persistingCount}</span>
            </div>
            <span className="text-xs text-neutral-400">Awaiting remediation</span>
          </div>
        </div>

        {/* Filter Switcher */}
        <div className="flex items-center gap-2 pt-6 pb-4 border-b border-neutral-800/80 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === "all" ? "bg-neutral-800 text-white border border-neutral-700" : "text-neutral-400 hover:text-white"
            }`}
          >
            All Changes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("fixed")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "fixed" ? "bg-emerald-500/10 border border-emerald-500/40 text-emerald-300" : "text-neutral-400 hover:text-white"
            }`}
          >
            <IconCheck className="size-3.5 text-emerald-400" />
            Fixed ({fixedCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("new")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "new" ? "bg-amber-500/10 border border-amber-500/40 text-amber-300" : "text-neutral-400 hover:text-white"
            }`}
          >
            <IconAlertTriangle className="size-3.5 text-amber-400" />
            New ({newCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("persisting")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "persisting" ? "bg-neutral-800 text-white border border-neutral-700" : "text-neutral-400 hover:text-white"
            }`}
          >
            <IconClock className="size-3.5 text-neutral-400" />
            Persisting ({persistingCount})
          </button>
        </div>

        {/* Changes Feed */}
        <div className="py-4 space-y-3">
          {(activeTab === "all" || activeTab === "fixed") && (
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block">
                ✓ Resolved Findings Since Previous Scan
              </span>
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    <span className="text-sm font-bold text-neutral-200">Missing Anti-Clickjacking & Frame Options Defense</span>
                  </div>
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    VERIFIED FIXED
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Target: <code className="text-emerald-300 font-mono">/dashboard</code> · Detected on Sep 22 · Remediated & confirmed on latest audit.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    <span className="text-sm font-bold text-neutral-200">HTTP Strict Transport Security (HSTS) Missing</span>
                  </div>
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    VERIFIED FIXED
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Target: <code className="text-emerald-300 font-mono">https://my-startup.com</code> · max-age=31536000 preload header deployed.
                </p>
              </div>
            </div>
          )}

          {(activeTab === "all" || activeTab === "new") && (
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block">
                ⚠️ New Attack Vectors Surfaced
              </span>
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-amber-400" />
                    <span className="text-sm font-bold text-neutral-200">Exposed GraphQL Introspection Schema</span>
                  </div>
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    NEW DISCOVERY
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Target: <code className="text-amber-300 font-mono">/api/graphql</code> · Full AST schema traversal possible without authentication token.
                </p>
              </div>
            </div>
          )}

          {(activeTab === "all" || activeTab === "persisting") && (
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold block">
                ⏳ Persisting Vulnerabilities
              </span>
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-neutral-500" />
                    <span className="text-sm font-bold text-neutral-200">CORS Wildcard Access-Control-Allow-Origin: *</span>
                  </div>
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300">
                    PERSISTING (2 AUDITS)
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Target: <code className="text-neutral-300 font-mono">/api/v1/auth/session</code> · Still awaiting configuration patch in API gateway.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            Trajectory calculated by comparing multi-engine AST hashes across scan checkpoints.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
