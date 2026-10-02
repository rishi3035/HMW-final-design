import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How does Hack My Website scan without breaking production?",
    answer:
      "All runtime security evaluations operate strictly in 100% non-destructive mode. We simulate black-box attacker telemetry using rate-limited, read-only payload probes and passive header/TLS audits. We never perform destructive data manipulation, SQL drop cascades, or denial-of-service stress tests against your production database.",
  },
  {
    question: "What is the difference between DAST runtime and SAST code logic?",
    answer:
      "DAST (Dynamic Application Security Testing) tests your live domain from the outside like an external attacker, finding misconfigured headers, live API vulnerabilities, and broken auth. SAST (Static Application Security Testing) analyzes your source code repositories via AST parsing to find hardcoded secrets and logic flaws before the code is merged.",
  },
  {
    question: "How do the 1-click Cursor and Claude Code fix prompts work?",
    answer:
      "When a vulnerability is verified, our AI remediation engine extracts the exact source file path, vulnerable code lines, and root cause. It synthesizes a deterministic prompt with markdown diff blocks formatted specifically for AI-powered IDEs like Cursor, Claude Code, and GitHub Copilot, allowing you to patch the flaw in seconds.",
  },
  {
    question: "Can I integrate Hack My Website into our existing GitHub CI/CD pipeline?",
    answer:
      "Yes. Pro and Agency tiers include our automated GitHub Action security bot. It runs automatically on pull requests, flags high-severity CVEs with inline line comments, and can be configured to block merges until security requirements are satisfied.",
  },
  {
    question: "What compliance frameworks are mapped in the executive PDF report?",
    answer:
      "Discovered findings are automatically mapped to OWASP Top 10, CWE Common Weakness Enumeration, HIPAA Security Rule (§ 164.308), and India's Digital Personal Data Protection Act (DPDP Act 2023).",
  },
  {
    question: "Do you store or retain our proprietary source code or credentials?",
    answer:
      "No. We enforce a strict zero-retention sovereign architecture. Code analysis is processed in isolated ephemeral containers on AWS Mumbai and discarded immediately after AST AST parsing. We never store proprietary source code, secrets, or API keys on persistent storage.",
  },
  {
    question: "How does the blurred free scan differ from paid subscription tiers?",
    answer:
      "The free tier generates an instant executive security posture score with blurred vulnerability specifics to confirm if your domain is at risk. Upgrading to Starter or Pro unlocks the unblurred CVSS radar, exact file locations, full PDF downloads, and AI remediation prompts.",
  },
  {
    question: "What happens if a scan discovers a critical zero-day vulnerability?",
    answer:
      "Critical findings trigger immediate priority email telemetry with severity breakdowns and instant patch diffs. On Agency and Pro tiers, notifications can be routed directly to your private Slack webhook for zero-delay engineering response.",
  },
];

export const HmwKotaAccordionFaq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-[#EFEFEF] text-black py-24 sm:py-36 px-4 sm:px-8 border-b border-black/10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
            [ Common Questions ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 mt-2">
            Frequently Asked <span className="text-emerald-700">Questions.</span>
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base">
            Everything you need to know about our autonomous DevSecOps scanner, non-destructive telemetry, and compliance reports.
          </p>
        </div>

        {/* Hairline Accordion List */}
        <div className="border-t border-black/15">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="border-b border-black/15">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-7 flex items-center justify-between text-left group cursor-pointer"
                >
                  <span className="text-lg sm:text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-emerald-700 transition-colors pr-6">
                    {faq.question}
                  </span>
                  <div
                    className={`size-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-black text-white rotate-45"
                        : "bg-white text-black border border-black/10 group-hover:bg-black group-hover:text-white"
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
