"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, AlertTriangle, Check, Sparkles } from "lucide-react";

interface ComparisonRow {
  metric: string;
  traditional: {
    value: string;
    barWidth: string; // percentage
  };
  competitors: {
    value: string;
    barWidth: string;
  };
  hmw: {
    value: string;
    barWidth: string;
    highlight?: string;
  };
}

const comparisonRows: ComparisonRow[] = [
  {
    metric: "Scan Velocity",
    traditional: {
      value: "3 Months (Manual)",
      barWidth: "15%",
    },
    competitors: {
      value: "24–48 Hours",
      barWidth: "40%",
    },
    hmw: {
      value: "7 Minutes",
      highlight: "99.8% Faster",
      barWidth: "100%",
    },
  },
  {
    metric: "Remediation Output",
    traditional: {
      value: "100+ Page Static PDF",
      barWidth: "10%",
    },
    competitors: {
      value: "Generic Advice (No Diffs)",
      barWidth: "45%",
    },
    hmw: {
      value: "1-Click Cursor & Claude Diffs",
      highlight: "Zero Dev Triage",
      barWidth: "100%",
    },
  },
  {
    metric: "Verification Accuracy",
    traditional: {
      value: "32% False Positives",
      barWidth: "20%",
    },
    competitors: {
      value: "18% Alert Fatigue",
      barWidth: "50%",
    },
    hmw: {
      value: "0% False Positives",
      highlight: "100% Deterministic",
      barWidth: "100%",
    },
  },
  {
    metric: "Attack Surface Depth",
    traditional: {
      value: "Manual Sample Only",
      barWidth: "25%",
    },
    competitors: {
      value: "Siloed SAST or DAST",
      barWidth: "55%",
    },
    hmw: {
      value: "Unified DAST + SAST + API Fuzzing",
      highlight: "Full Spectrum",
      barWidth: "100%",
    },
  },
  {
    metric: "CI/CD Pipeline Gate",
    traditional: {
      value: "None / Blocks Sprints",
      barWidth: "8%",
    },
    competitors: {
      value: "Basic Webhook / Flaky",
      barWidth: "60%",
    },
    hmw: {
      value: "Automated GitHub PR Bot",
      highlight: "Pre-Merge Blocker",
      barWidth: "100%",
    },
  },
  {
    metric: "Compliance Mapping",
    traditional: {
      value: "Ad-hoc PDF Letter",
      barWidth: "30%",
    },
    competitors: {
      value: "Raw CSV Export",
      barWidth: "45%",
    },
    hmw: {
      value: "India DPDP Act & OWASP Aligned",
      highlight: "Tamper-Proof QR",
      barWidth: "100%",
    },
  },
  {
    metric: "Financial Investment",
    traditional: {
      value: "$25,000–$50,000 Retainers",
      barWidth: "18%",
    },
    competitors: {
      value: "$12,000–$25,000/yr Lock-in",
      barWidth: "45%",
    },
    hmw: {
      value: "Starts at $0 Free Scan",
      highlight: "Zero Risk Access",
      barWidth: "100%",
    },
  },
];

export interface HmwKotaComparisonSectionProps {
  onStartScan?: () => void;
}

export const HmwKotaComparisonSection: React.FC<HmwKotaComparisonSectionProps> = ({ onStartScan }) => {
  return (
    <section
      id="comparison"
      className="relative w-full bg-black text-white py-24 sm:py-32 px-4 sm:px-8 border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ================= 1. H1-TAG & DESCRIPTION ================= */}
        <div className="mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400 block mb-3">
            [ Comparative Benchmarks ]
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            How We Compare <span className="text-emerald-400">Against The Industry.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-3xl leading-relaxed font-normal">
            A direct performance audit comparing traditional manual penetration testing, legacy automated scanners (Snyk, Astra Security), and Hack My Website’s autonomous DevSecOps engine.
          </p>
        </div>

        {/* ================= 2. GRAPH-BASED BENCHMARK COMPARISON TABLE ================= */}
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#0A0D14] border border-white/10 p-2 sm:p-4 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[820px]">
              {/* TABLE GRID: 4 COLUMNS */}
              <div className="grid grid-cols-12 rounded-[22px] sm:rounded-[28px] overflow-hidden bg-black/60 border border-white/10">
                {/* ================= COLUMN HEADERS ================= */}
                {/* 1. Metric Label Header */}
                <div className="col-span-3 p-5 sm:p-6 bg-neutral-950 border-r border-b border-white/10 flex flex-col justify-end">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">
                    Security Vectors
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
                    Benchmark Metrics
                  </h3>
                </div>

                {/* 2. Traditional Way Header */}
                <div className="col-span-3 p-5 sm:p-6 bg-neutral-950/80 border-r border-b border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-200 px-2.5 py-0.5 rounded-full bg-rose-500/25 border border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.3)]">
                      Legacy Way
                    </span>
                    <AlertTriangle className="size-4 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      The Traditional Way
                    </h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Manual Consultancy Pentest
                    </p>
                  </div>
                </div>

                {/* 3. Competitor Header (Snyk, Astra) */}
                <div className="col-span-3 p-5 sm:p-6 bg-neutral-950/80 border-r border-b border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200 px-2.5 py-0.5 rounded-full bg-sky-500/25 border border-sky-500/40">
                      Competitor Scanners
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      Snyk & Astra Security
                    </h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Developer AppSec & Scanners
                    </p>
                  </div>
                </div>

                {/* 4. Hack My Website Header (EXCEEDING BENCHMARK HERO COLUMN) */}
                <div className="col-span-3 p-5 sm:p-6 bg-gradient-to-b from-emerald-950/60 to-black border-b border-emerald-500/40 relative overflow-hidden flex flex-col justify-between">
                  {/* Subtle top glow */}
                  <div className="absolute top-0 right-0 w-32 h-16 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />

                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-emerald-500 px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 font-mono">
                      <Sparkles className="size-3" />
                      EXCEEDING
                    </span>
                    <div className="size-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                      <Shield className="size-3.5 text-emerald-400" />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-1.5">
                      <span>Hack My Website</span>
                    </h4>
                    <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                      Autonomous DevSecOps Engine
                    </p>
                  </div>
                </div>

                {/* ================= TABLE ROWS ================= */}
                {comparisonRows.map((row, idx) => (
                  <React.Fragment key={idx}>
                    {/* Row Label (Left) */}
                    <div className="col-span-3 px-5 py-4 sm:px-6 sm:py-5 bg-neutral-950/90 border-r border-b border-white/5 flex items-center">
                      <span className="text-xs sm:text-sm font-semibold text-neutral-200">
                        {row.metric}
                      </span>
                    </div>

                    {/* Traditional Way (Normal Text + Subtle Benchmark Bar) */}
                    <div className="col-span-3 px-5 py-4 sm:px-6 sm:py-5 bg-black/40 border-r border-b border-white/5 flex flex-col justify-center">
                      <span className="text-xs sm:text-sm text-neutral-300 font-normal">
                        {row.traditional.value}
                      </span>
                      <div className="w-full h-1 rounded-full bg-white/5 mt-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-rose-500/50"
                          style={{ width: row.traditional.barWidth }}
                        />
                      </div>
                    </div>

                    {/* Competitors (Snyk, Astra) (Normal Text + Subtle Benchmark Bar) */}
                    <div className="col-span-3 px-5 py-4 sm:px-6 sm:py-5 bg-black/40 border-r border-b border-white/5 flex flex-col justify-center">
                      <span className="text-xs sm:text-sm text-neutral-300 font-normal">
                        {row.competitors.value}
                      </span>
                      <div className="w-full h-1 rounded-full bg-white/5 mt-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-sky-500/50"
                          style={{ width: row.competitors.barWidth }}
                        />
                      </div>
                    </div>

                    {/* Hack My Website (Normal Text + Checkmark + Benchmark Graph Bar) */}
                    <div className="col-span-3 px-5 py-4 sm:px-6 sm:py-5 bg-emerald-950/20 border-b border-emerald-500/20 flex flex-col justify-center">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                          <Check className="size-3.5 text-emerald-400 stroke-[2.5] shrink-0" />
                          <span>{row.hmw.value}</span>
                        </span>
                        {row.hmw.highlight && (
                          <span className="text-[10px] font-mono font-medium text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full shrink-0">
                            {row.hmw.highlight}
                          </span>
                        )}
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/5 mt-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.35)]"
                          style={{ width: row.hmw.barWidth }}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
