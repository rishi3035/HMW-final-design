"use client";

import React from "react";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FAQItem = {
  question: string;
  answer: string;
};

// Top 6 most critical, high-impact questions for founders, CTOs & security engineers
const faqsLeft: FAQItem[] = [
  {
    question: "What can HackMyWebsite scan?",
    answer:
      "HackMyWebsite scans modern Single Page Applications (Next.js, React, Vue), REST and GraphQL APIs, DNS attack surfaces, exposed cloud buckets, and repository code. It also supports authenticated workflows via session cookies, OAuth tokens, and bearer credentials.",
  },
  {
    question: "Will scanning affect my live production application?",
    answer:
      "Never. HackMyWebsite is engineered to be 100% non-destructive. Our DAST and CVE validation engines run with adaptive rate limiting and safe replay payloads that verify exploitability without mutating databases, degrading server response times, or disrupting customer traffic.",
  },
  {
    question: "How long does a full security scan take?",
    answer:
      "A full-pipeline security audit completes in 3 to 8 minutes. Our distributed multi-engine architecture runs external DNS reconnaissance, headless DOM crawling, runtime active probing, and AST token scanning in parallel with zero developer queue delay.",
  },
];

const faqsRight: FAQItem[] = [
  {
    question: "What types of vulnerabilities are detected?",
    answer:
      "The platform detects OWASP Top 10 vulnerabilities (SQL injection, XSS, SSRF, IDOR, CORS misconfigurations), unpatched CVE zero-days, exposed secret keys and API credentials in JS bundles, and vulnerable third-party npm/PyPI dependencies.",
  },
  {
    question: "How does GitHub and Cursor IDE integration work?",
    answer:
      "HackMyWebsite integrates directly into GitHub Actions as an automated PR security gate. When a vulnerability is confirmed, it generates 1-click Cursor and Claude Code fix prompts with ready-to-merge diffs so you can patch issues in seconds.",
  },
  {
    question: "Can I start with a free security scan?",
    answer:
      "Yes. You can initiate an immediate, zero-friction external perimeter scan without entering a credit card. It discovers your public attack surface, catalogs exposed routes, and delivers an executive security score within minutes.",
  },
];

export const FaqSection: React.FC = () => {
  const scrollToScanInput = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const input = document.querySelector('input[type="text"]') as HTMLInputElement | null;
    if (input) {
      setTimeout(() => input.focus(), 600);
    }
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative w-full py-24 sm:py-32 border-b border-neutral-800 overflow-hidden text-slate-100"
    >
      {/* Green Aura Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{
            backgroundImage: `url('/green-aura-bg.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold tracking-wider uppercase shadow-inner">
            <HelpCircle className="size-3 text-emerald-400" />
            <span>SECTION 06 // FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
            Questions Before You Scan?
          </h2>

          <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed font-sans max-w-xl mx-auto">
            Everything you need to know about our non-destructive vulnerability scanner, automated PR safeguards, and compliance audits.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={scrollToScanInput}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white font-semibold text-xs sm:text-sm border border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer shadow-sm group"
            >
              <span>Start Free Security Scan</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform text-emerald-400" />
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Accordion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 text-left items-start">
          {[faqsLeft, faqsRight].map((faqColumn, columnIndex) => (
            <Accordion
              key={`faq-col-${columnIndex}`}
              type="single"
              collapsible
              className="space-y-4"
            >
              {faqColumn.map((faq, i) => {
                const itemNum = String(columnIndex * 3 + i + 1).padStart(2, "0");
                return (
                  <AccordionItem
                    key={`item-${columnIndex}-${i}`}
                    value={`item-${columnIndex}-${i}`}
                    className="border border-neutral-800 rounded-2xl bg-black/95 px-5 sm:px-6 py-1 shadow-lg transition-colors hover:border-neutral-700"
                  >
                    <AccordionTrigger className="text-sm sm:text-base font-semibold text-white hover:text-emerald-400 hover:no-underline py-4 text-left gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-slate-500 shrink-0">
                          {itemNum}
                        </span>
                        <span className="leading-snug">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1 pb-4 pl-7">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};
