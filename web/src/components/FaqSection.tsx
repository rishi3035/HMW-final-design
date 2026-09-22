"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  Layers,
  ShieldAlert,
  BarChart3,
  GitPullRequest,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/faq-9-utils/accordion";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/faq-9-utils/toggle-group";

interface FaqQuestion {
  id: string;
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  questions: FaqQuestion[];
}

const FAQ_GROUPS: Record<string, FaqCategory> = {
  scope: {
    id: "scope",
    name: "Scope & Detection",
    icon: Layers,
    tagline: "Perimeters, frameworks, and detected vulnerabilities",
    questions: [
      {
        id: "scan-targets",
        question: "What can HackMyWebsite scan?",
        answer:
          "HackMyWebsite scans web applications, Single Page Applications (React, Next.js, Vue, Angular), REST & GraphQL APIs, microservices, cloud storage perimeters, and repository code. It handles authenticated workflows seamlessly via session cookies, OAuth handshakes, and API tokens.",
      },
      {
        id: "vuln-types",
        question: "What types of vulnerabilities can HackMyWebsite detect?",
        answer:
          "The platform detects OWASP Top 10 flaws (SQLi, XSS, SSRF, CSRF, IDOR), unpatched CVE zero-days, API authorization vulnerabilities, CORS and CSP misconfigurations, exposed secrets and API tokens in client bundles, and vulnerable third-party dependencies.",
      },
      {
        id: "free-scan",
        question: "Can I start with a free security scan?",
        answer:
          "Yes. You can initiate an immediate, zero-friction external perimeter scan without entering a credit card. It discovers your public attack surface, maps exposed routes, and generates a preliminary security risk posture assessment within minutes.",
      },
    ],
  },
  safety: {
    id: "safety",
    name: "Production Safety",
    icon: ShieldAlert,
    tagline: "Execution speed and zero-impact guarantees",
    questions: [
      {
        id: "production-safety",
        question: "Will scanning affect my live production application?",
        answer:
          "No. HackMyWebsite is engineered to be 100% non-destructive. Our DAST and CVE engines utilize adaptive rate limiting and safe payload execution that validates security vulnerabilities without altering database state, degrading server availability, or disrupting live customer traffic.",
      },
      {
        id: "scan-duration",
        question: "How long does a typical full-pipeline security scan take?",
        answer:
          "A standard full-pipeline scan executes in 3 to 8 minutes. Our distributed multi-engine architecture runs external reconnaissance, headless DOM crawling, runtime probing, and static AST analysis in parallel, delivering rigorous audit depth with zero developer delay.",
      },
      {
        id: "data-privacy",
        question: "How is application telemetry and scan data handled?",
        answer:
          "All scan telemetry is encrypted in transit via TLS 1.3 and at rest with AES-256 inside sovereign AWS Mumbai infrastructure with Redis semantic caching. We never store source code or database records, maintaining full compliance with India DPDP regulations and SOC 2 Type II controls.",
      },
    ],
  },
  scoring: {
    id: "scoring",
    name: "Scoring & Reports",
    icon: BarChart3,
    tagline: "0–100 AI launch score and exportable audits",
    questions: [
      {
        id: "risk-scoring",
        question: "How is the 0–100 AI launch risk score calculated?",
        answer:
          "Risk scores range from 0 to 100 using a normalized telemetry algorithm combining CVSS v3.1 base severity with real-world internet reachability and asset business criticality. Crucially, only validated vulnerabilities with confirmed proof-of-concept impact your score.",
      },
      {
        id: "reports-export",
        question: "Can I export executive PDF and developer SARIF audit reports?",
        answer:
          "Yes. Every completed scan provides an executive PDF audit report alongside developer JSON and SARIF exports. Reports feature deterministic proof-of-concept evidence, executive risk summaries, compliance cross-references (SOC 2, ISO 27001), and step-by-step remediation instructions.",
      },
    ],
  },
  enterprise: {
    id: "enterprise",
    name: "CI/CD & Enterprise",
    icon: GitPullRequest,
    tagline: "GitHub Actions, Cursor IDE, and private VPC agents",
    questions: [
      {
        id: "github-integration",
        question: "Can HackMyWebsite integrate with GitHub and developer workflows?",
        answer:
          "Yes. HackMyWebsite integrates directly into GitHub Actions and GitLab CI/CD pipelines as an automated PR security gate. When vulnerabilities are detected, it generates 1-click Cursor IDE code diffs and contextual pull request comments with ready-to-merge patches.",
      },
      {
        id: "enterprise-support",
        question: "Does HackMyWebsite support enterprise VPC deployments and SSO?",
        answer:
          "Yes. Enterprise tiers support custom on-premises agent workers, VPC peering, SAML 2.0 / SSO authentication, multi-team role-based access control (RBAC), customized SLA thresholds, and dedicated security engineering support.",
      },
    ],
  },
};

const categoryKeys = Object.keys(FAQ_GROUPS);

export const FaqSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("scope");
  const activeCategory = FAQ_GROUPS[activeTab] || FAQ_GROUPS.scope;

  return (
    <section
      id="faq"
      aria-label="Section 5 — Frequently Asked Questions"
      className="relative w-full h-screen min-h-[100vh] lg:h-screen lg:max-h-screen flex flex-col justify-between bg-black text-slate-100 py-4 sm:py-6 lg:py-6 border-b border-neutral-800 overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-emerald-950/15 blur-[140px] -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-between h-full w-full">
        {/* Section Header */}
        <div className="text-center space-y-1 sm:space-y-1.5 mb-2 sm:mb-3 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-semibold tracking-wider uppercase shadow-inner">
            <HelpCircle className="size-3 text-emerald-400" />
            <span>SECTION 05 // FAQ</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Questions Before You Scan?
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans max-w-xl mx-auto">
            Use the rail to switch topics. Inspect technical scanning depth, compliance standards, and automated workflows.
          </p>
        </div>

        {/* 2-Column Rail + Accordion Layout (faq-9 inspiration) */}
        <div className="grid grid-cols-1 md:grid-cols-[14rem_1fr] lg:grid-cols-[16rem_1fr] gap-4 lg:gap-6 flex-1 my-auto min-h-0 items-start w-full">
          {/* LEFT RAIL: Interactive Topic Switcher */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-slate-400 px-1 font-semibold hidden md:block">
              Topics
            </span>

            <ToggleGroup
              type="single"
              value={activeTab}
              onValueChange={(value) => {
                if (value) setActiveTab(value);
              }}
              className="flex flex-row md:flex-col gap-1.5 sm:gap-2 w-full justify-start overflow-x-auto md:overflow-visible pb-1 md:pb-0"
            >
              {categoryKeys.map((key) => {
                const cat = FAQ_GROUPS[key];
                const IconComponent = cat.icon;
                const isSelected = activeTab === key;

                return (
                  <ToggleGroupItem
                    key={key}
                    value={key}
                    className={cn(
                      "w-full justify-between items-center rounded-xl px-3 py-2 sm:py-2.5 text-left transition-all duration-200 border cursor-pointer",
                      isSelected
                        ? "bg-neutral-900 border-emerald-500/60 text-white shadow-md shadow-emerald-500/10 font-bold"
                        : "bg-black border-neutral-800 text-slate-400 hover:text-slate-200 hover:border-neutral-700 font-medium"
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <IconComponent
                        className={cn(
                          "size-3.5 shrink-0 transition-colors",
                          isSelected ? "text-emerald-400" : "text-slate-500"
                        )}
                      />
                      <span className="text-xs sm:text-xs truncate">{cat.name}</span>
                    </div>

                    <span
                      className={cn(
                        "text-[9px] font-mono px-1.5 py-0.2 rounded shrink-0 hidden sm:inline-block",
                        isSelected
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-neutral-900 text-slate-500 border border-neutral-800"
                      )}
                    >
                      {cat.questions.length} Qs
                    </span>
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>

          {/* RIGHT COLUMN: Dynamic Topic Questions in Accordion */}
          <div className="flex flex-col gap-2 min-h-0">
            <div className="flex items-center justify-between px-1 pb-1 border-b border-neutral-800/80">
              <span className="text-xs font-mono font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                {activeCategory.name}
              </span>
              <span className="text-[11px] text-slate-400 font-sans hidden sm:inline">
                {activeCategory.tagline}
              </span>
            </div>

            <Accordion
              key={activeTab}
              type="multiple"
              defaultValue={[activeCategory.questions[0]?.id]}
              className="space-y-2 w-full"
            >
              {activeCategory.questions.map((item, idx) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="rounded-xl border border-neutral-800 bg-black hover:border-neutral-700 transition-colors overflow-hidden data-[state=open]:border-emerald-500/40 data-[state=open]:bg-neutral-950"
                >
                  <AccordionTrigger className="px-3.5 sm:px-4 py-2.5 sm:py-3 text-left hover:no-underline text-xs sm:text-[13px] font-semibold text-slate-200 data-[state=open]:text-white">
                    <div className="flex items-center gap-2.5 flex-1 pr-2">
                      <span className="font-mono text-[10px] text-slate-500 shrink-0">
                        0{idx + 1}
                      </span>
                      <span>{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3.5 sm:px-4 pb-3 pt-0 text-[11px] sm:text-xs text-slate-300 leading-relaxed font-sans border-t border-neutral-900 mt-1 pl-8">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Objection-Free Trust Reassurance */}
        <div className="mt-2 shrink-0 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 font-mono text-center pb-1">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-400" /> Zero Credit Card Required
          </span>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-400" /> Non-Destructive Scanning
          </span>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-400" /> Instant Results in 3–8 Min
          </span>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
