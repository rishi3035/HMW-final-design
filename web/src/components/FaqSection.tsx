"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    id: "scan-targets",
    question: "What can HackMyWebsite scan?",
    answer:
      "HackMyWebsite scans web applications, Single Page Applications (React, Next.js, Vue, Angular), REST & GraphQL APIs, microservices, cloud storage perimeters, and repository code. It handles authenticated workflows seamlessly via session cookies, OAuth handshakes, and API tokens.",
    category: "SCOPE",
  },
  {
    id: "production-safety",
    question: "Will scanning affect my production application?",
    answer:
      "No. HackMyWebsite is engineered to be 100% non-destructive. Our DAST and CVE engines utilize adaptive rate limiting and safe payload execution that validates security vulnerabilities without altering database state, degrading server availability, or disrupting live customer traffic.",
    category: "SAFETY",
  },
  {
    id: "scan-duration",
    question: "How long does a typical security scan take?",
    answer:
      "A standard full-pipeline scan executes in 3 to 8 minutes. Our distributed multi-engine architecture runs external reconnaissance, headless DOM crawling, runtime probing, and static AST analysis in parallel, delivering rigorous audit depth with zero developer delay.",
    category: "PERFORMANCE",
  },
  {
    id: "vuln-types",
    question: "What types of vulnerabilities can HackMyWebsite detect?",
    answer:
      "The platform detects OWASP Top 10 flaws (SQLi, XSS, SSRF, CSRF, IDOR), unpatched CVE zero-days, API authorization vulnerabilities, CORS and CSP misconfigurations, exposed secrets and API tokens in client bundles, and vulnerable third-party dependencies.",
    category: "COVERAGE",
  },
  {
    id: "risk-scoring",
    question: "How is the risk score calculated?",
    answer:
      "Risk scores range from 0 to 100 using a normalized telemetry algorithm combining CVSS v3.1 base severity with real-world internet reachability and asset business criticality. Crucially, only validated vulnerabilities with confirmed proof-of-concept impact your score.",
    category: "TRIAGE",
  },
  {
    id: "github-integration",
    question: "Can HackMyWebsite integrate with GitHub and developer workflows?",
    answer:
      "Yes. HackMyWebsite integrates directly into GitHub Actions and GitLab CI/CD pipelines as an automated PR security gate. When vulnerabilities are detected, it generates 1-click Cursor IDE code diffs and contextual pull request comments with ready-to-merge patches.",
    category: "INTEGRATION",
  },
  {
    id: "data-privacy",
    question: "How is application and scan data handled?",
    answer:
      "All scan telemetry is encrypted in transit via TLS 1.3 and at rest with AES-256 inside sovereign AWS Mumbai infrastructure with Redis semantic caching. We never store source code or database records, maintaining full compliance with India DPDP regulations and SOC 2 Type II controls.",
    category: "COMPLIANCE",
  },
  {
    id: "reports-export",
    question: "Can I generate executive or security reports?",
    answer:
      "Yes. Every completed scan provides an executive PDF audit report alongside developer JSON and SARIF exports. Reports feature deterministic proof-of-concept evidence, executive risk summaries, compliance cross-references (SOC 2, ISO 27001), and step-by-step remediation instructions.",
    category: "REPORTING",
  },
  {
    id: "enterprise-support",
    question: "Does HackMyWebsite support enterprise deployments?",
    answer:
      "Yes. Enterprise tiers support custom on-premises agent workers, VPC peering, SAML 2.0 / SSO authentication, multi-team role-based access control (RBAC), customized SLA thresholds, and dedicated security engineering support.",
    category: "ENTERPRISE",
  },
  {
    id: "free-scan",
    question: "Can I start with a free security scan?",
    answer:
      "Yes. You can initiate an immediate, zero-friction external perimeter scan without entering a credit card. It discovers your public attack surface, maps exposed routes, and generates a preliminary security risk posture assessment within minutes.",
    category: "ONBOARDING",
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("scan-targets");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const col1 = FAQS.slice(0, 5);
  const col2 = FAQS.slice(5, 10);

  const renderFaqItem = (faq: FaqItem, index: number) => {
    const isOpen = openId === faq.id;
    const itemNum = String(index + 1).padStart(2, "0");

    return (
      <div
        key={faq.id}
        className={cn(
          "rounded-xl bg-black border transition-colors duration-200 overflow-hidden",
          isOpen ? "border-emerald-500/40 bg-neutral-950" : "border-neutral-800 hover:border-neutral-700"
        )}
      >
        <button
          type="button"
          onClick={() => toggleFaq(faq.id)}
          aria-expanded={isOpen}
          className="w-full py-2 sm:py-2.5 px-3 sm:px-3.5 flex items-center justify-between text-left gap-3 cursor-pointer focus:outline-none group"
        >
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <span className="font-mono text-[11px] font-bold text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0">
              {itemNum}
            </span>

            <span
              className={cn(
                "text-xs sm:text-[13px] font-semibold transition-colors duration-150 truncate",
                isOpen
                  ? "text-white"
                  : "text-slate-200 group-hover:text-white"
              )}
            >
              {faq.question}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.2 rounded bg-black text-neutral-400 border border-neutral-800 group-hover:border-neutral-700">
              {faq.category}
            </span>

            <div
              className={cn(
                "size-5 rounded flex items-center justify-center border transition-all duration-200",
                isOpen
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 rotate-180"
                  : "bg-black border-neutral-800 text-neutral-400 group-hover:text-white group-hover:border-neutral-700"
              )}
            >
              <ChevronDown className="size-3" />
            </div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key={`content-${faq.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-3 sm:px-3.5 pb-2.5 pt-1 text-[11px] sm:text-xs text-slate-300 leading-relaxed font-sans border-t border-neutral-800/80 mt-0.5 pl-7 sm:pl-8">
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

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
            Everything you need to know before connecting your application to HackMyWebsite.
          </p>
        </div>

        {/* 2-Column Accordion List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 flex-1 my-auto min-h-0 items-start w-full">
          <div className="space-y-2">
            {col1.map((faq, index) => renderFaqItem(faq, index))}
          </div>
          <div className="space-y-2">
            {col2.map((faq, index) => renderFaqItem(faq, index + 5))}
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
