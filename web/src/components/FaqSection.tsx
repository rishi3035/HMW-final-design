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

  return (
    <section
      id="faq"
      aria-label="Section 5 — Frequently Asked Questions"
      className="relative w-full bg-black text-slate-100 py-24 sm:py-32 border-b border-neutral-800 overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-emerald-950/15 blur-[140px] -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold tracking-wider uppercase shadow-inner">
            <HelpCircle className="size-3 text-emerald-400" />
            <span>SECTION 05 // FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
            Questions Before You Scan?
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans max-w-xl mx-auto">
            Everything you need to know before connecting your application to HackMyWebsite.
          </p>
        </div>

        {/* Minimal Accordion List */}
        <div className="rounded-3xl bg-black border border-neutral-800 divide-y divide-neutral-800 p-2 sm:p-4 shadow-2xl backdrop-blur-xl">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            const itemNum = String(index + 1).padStart(2, "0");

            return (
              <div
                key={faq.id}
                className={cn(
                  "transition-colors duration-200 rounded-2xl",
                  isOpen ? "bg-neutral-950" : "hover:bg-neutral-950/60"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-4 sm:py-5 px-4 sm:px-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none group"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                    <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0">
                      {itemNum}
                    </span>

                    <span
                      className={cn(
                        "text-sm sm:text-base font-semibold transition-colors duration-150",
                        isOpen
                          ? "text-white"
                          : "text-slate-200 group-hover:text-white"
                      )}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-black text-neutral-400 border border-neutral-800 group-hover:border-neutral-700">
                      {faq.category}
                    </span>

                    <div
                      className={cn(
                        "size-7 rounded-lg flex items-center justify-center border transition-all duration-200",
                        isOpen
                          ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 rotate-180"
                          : "bg-black border-neutral-800 text-neutral-400 group-hover:text-white group-hover:border-neutral-700"
                      )}
                    >
                      <ChevronDown className="size-4" />
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
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans border-t border-slate-800/40 mt-1 pl-11 sm:pl-14">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Objection-Free Trust Reassurance */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono text-center">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-400" /> Zero Credit Card Required
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-400" /> Non-Destructive Scanning
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-400" /> Instant Results in 3–8 Min
          </span>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
