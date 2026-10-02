import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Clock, ShieldCheck, Zap } from "lucide-react";

interface ArchitectureTier {
  id: string;
  number: string;
  name: string;
  tagline: string;
  latency: string;
  startingTier: string;
  deliverables: string[];
  highlight: string;
}

const tiers: ArchitectureTier[] = [
  {
    id: "dast",
    number: "01",
    name: "DAST Runtime Engine",
    tagline:
      "Non-destructive autonomous runtime black-box security scanning that identifies exploitable attack vectors against live domains without requiring code access or agent installs.",
    latency: "3–8 Minutes",
    startingTier: "Included in Free",
    highlight: "Autonomous Live Scanner",
    deliverables: [
      "OWASP Top 10 automated fuzzing & vulnerability detection",
      "Broken Object Level Authorization (BOLA) tests",
      "SSRF, blind SQLi, and DOM-based XSS verification",
      "SSL/TLS cipher suite and HTTP security header auditing",
      "API endpoint enumeration and rate-limit stress tests",
      "100% non-destructive with sovereign AWS Mumbai routing",
    ],
  },
  {
    id: "sast",
    number: "02",
    name: "SAST Code Gate & GitHub Bot",
    tagline:
      "Continuous static application security testing that intercepts pull requests, detects hardcoded secrets, and prevents insecure code merges automatically.",
    latency: "Zero-Latency CI/CD",
    startingTier: "Pro Tier ($2,999)",
    highlight: "Developer Workflow Native",
    deliverables: [
      "Deterministic Abstract Syntax Tree (AST) vulnerability checks",
      "Hardcoded API keys, JWT secrets, and AWS credential scanner",
      "Automated GitHub PR inline security review bot comments",
      "Configurable blocking thresholds for critical CVEs",
      "Zero-retention sovereign code analysis on AWS Mumbai",
      "Fast integration with GitHub, GitLab, and Bitbucket",
    ],
  },
  {
    id: "remediation",
    number: "03",
    name: "AI Remediation & Compliance",
    tagline:
      "Context-aware AI remediation prompts formatted specifically for Cursor and Claude Code, alongside automated compliance mappings for enterprise procurement audits.",
    latency: "1-Click Generation",
    startingTier: "Starter & Above",
    highlight: "Instant Fix Delivery",
    deliverables: [
      "1-click copy-paste prompts tailored for Cursor AI & Claude Code",
      "Pre-formatted patch diffs with code line references",
      "Deterministic compliance mapping (India DPDP Act 2023, OWASP, HIPAA)",
      "Executive 2-page board-ready PDF security reports",
      "Tamper-proof verifiable digital QR certification seals",
      "White-label PDF branding for dev agencies and client delivery",
    ],
  },
];

interface HmwKotaArchitectureProps {
  onSelectTier?: (tierName: string) => void;
}

export const HmwKotaArchitecture: React.FC<HmwKotaArchitectureProps> = ({
  onSelectTier,
}) => {
  const [activeTab, setActiveTab] = useState<string>("dast");
  const currentTier = tiers.find((t) => t.id === activeTab) || tiers[0];

  return (
    <section
      id="architecture"
      className="relative w-full bg-[#EFEFEF] text-black py-24 sm:py-36 px-4 sm:px-8 border-b border-black/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              [ Core Architecture ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 mt-2">
              Three-Tier <span className="text-emerald-700">Security Engine.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Continuous application security engineered for enterprise platforms, development agencies, SaaS companies, and mission-critical web applications.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap gap-2 pt-8 pb-10">
          {tiers.map((tier) => {
            const isActive = tier.id === activeTab;
            return (
              <button
                key={tier.id}
                onClick={() => setActiveTab(tier.id)}
                className={`relative px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-black text-white shadow-lg"
                    : "bg-white/80 text-neutral-700 hover:bg-white hover:text-black border border-black/5"
                }`}
              >
                <span className="text-[11px] font-bold opacity-60">{tier.number}</span>
                <span>{tier.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activePillHmw"
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Card Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-12 lg:p-16 rounded-[40px] bg-white border border-black/10 shadow-2xl relative overflow-hidden"
          >
            {/* Top Badge */}
            <div className="absolute top-8 right-8 hidden md:block">
              <span className="px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                {currentTier.highlight}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* LEFT: Overview */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
                <div>
                  <span className="text-xs font-bold text-neutral-400">
                    CAPABILITY {currentTier.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-950 mt-1">
                    {currentTier.name}
                  </h3>
                  <p className="text-neutral-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
                    {currentTier.tagline}
                  </p>
                </div>

                {/* Meta Grid */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-100">
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Execution Speed</span>
                    </div>
                    <div className="text-xl font-bold text-neutral-900 mt-1">
                      {currentTier.latency}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Availability</span>
                    </div>
                    <div className="text-xl font-bold text-neutral-900 mt-1">
                      {currentTier.startingTier}
                    </div>
                  </div>
                </div>

                {/* Emerald Action Button */}
                <div>
                  <button
                    onClick={() => onSelectTier?.(currentTier.name)}
                    data-cursor-text="RUN"
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-xl shadow-emerald-500/20"
                  >
                    <span>Run Target Scan</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* RIGHT: Deliverables checklist */}
              <div className="lg:col-span-6 bg-[#FAFAFA] p-6 sm:p-10 rounded-[32px] border border-neutral-200/70 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-6">
                    Verified Capabilities
                  </h4>
                  <ul className="space-y-4">
                    {currentTier.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-neutral-800">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200/60 text-xs font-medium text-neutral-500 flex items-center justify-between">
                  <span>100% Non-Destructive</span>
                  <span>Sovereign AWS Mumbai</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
