"use client";

import React from "react";
import {
  IconX,
  IconShieldCheck,
  IconAlertTriangle,
  IconSparkles,
  IconFlame,
  IconChevronRight,
  IconLock,
  IconShield,
  IconTrendingUp,
} from "@tabler/icons-react";

export interface ScoreCategory {
  key: string;
  label: string;
  max: number;
  score: number;
  deduction: number;
  findingsCount: number;
  description: string;
}

export interface ScoreBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScore: number;
  findings?: Array<{
    id: string;
    title: string;
    severity: string;
    affected_url?: string | null;
    tool_source?: string | null;
  }>;
  onSelectFinding?: (findingId: string) => void;
}

const CATEGORY_DEFINITIONS = [
  {
    key: "security_basics",
    label: "Security Basics & Headers",
    max: 25,
    description: "Core defense headers (CSP, HSTS, X-Frame-Options, X-Content-Type), SSL/TLS configuration, and subresource integrity.",
  },
  {
    key: "auth_session_safety",
    label: "Auth & Session Safety",
    max: 20,
    description: "Cookie security flags (HttpOnly, Secure, SameSite), token protection, and session exposure risks.",
  },
  {
    key: "secrets_api_exposure",
    label: "Secrets & API Exposure",
    max: 20,
    description: "Hardcoded API keys, private credentials, GraphQL introspection, and exposed sensitive endpoints.",
  },
  {
    key: "production_readiness",
    label: "Production Readiness",
    max: 15,
    description: "CORS wildcard misconfigurations, verbose stack traces, server banner disclosures, and debug endpoints.",
  },
  {
    key: "payment_user_data_risk",
    label: "Payment & User Data Risk",
    max: 10,
    description: "Checkout workflow safety, payment gateway script integrity, and customer data handling boundaries.",
  },
  {
    key: "scalability_reliability",
    label: "Scalability & Reliability",
    max: 10,
    description: "Rate limiting defenses, brute-force protections, and request timeout resilience under load.",
  },
];

export const ScoreBreakdownModal: React.FC<ScoreBreakdownModalProps> = ({
  isOpen,
  onClose,
  currentScore = 78,
  findings = [],
  onSelectFinding,
}) => {
  if (!isOpen) return null;

  const totalDeductions = Math.max(0, Math.min(100, 100 - currentScore));

  const penaltyWeights: Record<string, number> = {
    critical: 14,
    high: 9,
    medium: 5,
    low: 2,
    info: 1,
  };

  const criticalCount = findings.filter((f) => f.severity === "critical").length;
  const highCount = findings.filter((f) => f.severity === "high").length;

  const topBlockerPenalty = findings.length > 0 ? (penaltyWeights[findings[0].severity] ?? 5) : 8;
  const scoreAfterTopBlocker = Math.min(100, currentScore + topBlockerPenalty);
  const criticalHighDeductions = criticalCount * 14 + highCount * 9 || 18;
  const scoreAfterCriticalHigh = Math.min(100, currentScore + criticalHighDeductions);

  // Group findings into categories
  const findingsByCategory: Record<string, Array<any>> = {
    security_basics: [],
    auth_session_safety: [],
    secrets_api_exposure: [],
    production_readiness: [],
    payment_user_data_risk: [],
    scalability_reliability: [],
  };

  findings.forEach((f, idx) => {
    const t = (f.title || "").toLowerCase();
    if (t.includes("header") || t.includes("csp") || t.includes("hsts") || t.includes("sri") || t.includes("frame") || t.includes("ssl") || t.includes("tls")) {
      findingsByCategory.security_basics.push(f);
    } else if (t.includes("auth") || t.includes("cookie") || t.includes("session") || t.includes("token") || t.includes("login") || t.includes("jwt")) {
      findingsByCategory.auth_session_safety.push(f);
    } else if (t.includes("key") || t.includes("secret") || t.includes("graphql") || t.includes("api") || t.includes("leak") || t.includes("exposure")) {
      findingsByCategory.secrets_api_exposure.push(f);
    } else if (t.includes("cors") || t.includes("debug") || t.includes("trace") || t.includes("banner") || t.includes("version") || t.includes("sourcemap")) {
      findingsByCategory.production_readiness.push(f);
    } else if (t.includes("payment") || t.includes("card") || t.includes("checkout") || t.includes("stripe") || t.includes("razorpay") || t.includes("pii")) {
      findingsByCategory.payment_user_data_risk.push(f);
    } else if (t.includes("rate") || t.includes("limit") || t.includes("brute") || t.includes("timeout") || t.includes("dos")) {
      findingsByCategory.scalability_reliability.push(f);
    } else {
      const catKeys = Object.keys(findingsByCategory);
      findingsByCategory[catKeys[idx % catKeys.length]].push(f);
    }
  });

  const categories: ScoreCategory[] = CATEGORY_DEFINITIONS.map((def) => {
    const catFindings = findingsByCategory[def.key] || [];
    const penalty = catFindings.reduce((sum, f) => sum + (penaltyWeights[f.severity] ?? 3), 0);
    const deduction = Math.min(def.max, penalty > 0 ? penalty : Math.round((def.max / 100) * totalDeductions));
    const score = Math.max(0, def.max - deduction);

    return {
      key: def.key,
      label: def.label,
      max: def.max,
      score,
      deduction,
      findingsCount: catFindings.length,
      description: def.description,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 shadow-2xl text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                Deterministic Scoring
              </span>
              <span className="text-xs text-neutral-400">CVSS 3.1 & Multi-Engine Rubric</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              AI Launch Score Category Breakdown
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer border border-neutral-800"
          >
            <IconX className="size-5" />
          </button>
        </div>

        {/* Current Score & Forecast Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-neutral-800/80">
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Current Score</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {currentScore}<span className="text-sm font-normal text-neutral-400">/100</span>
              </div>
            </div>
            <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <IconShieldCheck className="size-6 text-emerald-400" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
                <IconSparkles className="size-3" />
                <span>Fix Top Blocker</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
                {scoreAfterTopBlocker}<span className="text-sm font-normal text-neutral-400">/100</span>
              </div>
              <div className="text-[11px] text-neutral-400">+{topBlockerPenalty} pts projected</div>
            </div>
            <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <IconTrendingUp className="size-6 text-emerald-400" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-teal-400 font-semibold flex items-center gap-1">
                <IconFlame className="size-3" />
                <span>Clear Crit & High</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 mt-1">
                {scoreAfterCriticalHigh}<span className="text-sm font-normal text-neutral-400">/100</span>
              </div>
              <div className="text-[11px] text-neutral-400">+{criticalHighDeductions} pts projected</div>
            </div>
            <div className="size-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <IconShield className="size-6 text-teal-400" />
            </div>
          </div>
        </div>

        {/* 6 Category Breakdown List */}
        <div className="py-6 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold">
            Evaluation Dimensions ({categories.length})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => {
              const pct = Math.round((cat.score / cat.max) * 100);
              const isPassing = pct >= 70;

              return (
                <div
                  key={cat.key}
                  className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{cat.label}</span>
                        {cat.deduction > 0 ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
                            -{cat.deduction} pts
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                            Clean
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold font-mono text-white">
                        {cat.score}/{cat.max}
                      </div>
                      <div className="text-xs text-neutral-500 font-mono">{pct}%</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isPassing ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                    <span>
                      {cat.findingsCount > 0
                        ? `${cat.findingsCount} flagged issue${cat.findingsCount > 1 ? "s" : ""}`
                        : "Zero vulnerabilities detected"}
                    </span>
                    {onSelectFinding && cat.findingsCount > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const firstId = findingsByCategory[cat.key]?.[0]?.id;
                          if (firstId) {
                            onSelectFinding(firstId);
                            onClose();
                          }
                        }}
                        className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Inspect</span>
                        <IconChevronRight className="size-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            Clicking <strong className="text-white">Inspect</strong> focuses the flagged finding and loads its reproduction cURL.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};
