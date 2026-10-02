import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Who is this for?",
    answer:
      "Kota Studio partners with venture-backed startups, creative agencies, and modern founders who need high-impact, motion-rich websites that stand out and convert without months of agency bureaucracy.",
  },
  {
    question: "What do you actually help with?",
    answer:
      "We provide end-to-end design & engineering: UX/UI art direction in Figma, native Framer production builds, bespoke kinetic typography, WebGL shader integration, CMS architecture, and global CDN deployment.",
  },
  {
    question: "Are you a designer, or do you also build the site?",
    answer:
      "Both. We are official Framer Experts who bridge top-tier aesthetic design and clean frontend engineering, guaranteeing zero compromise between the Figma prototype and the live production website.",
  },
  {
    question: "Can you build my site from scratch?",
    answer:
      "Absolutely. We can take an early-stage napkin sketch, pitch deck, or existing branding and build your complete digital presence from ground zero to production launch.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Our bespoke single-page landing pages start at $2,500, while comprehensive multi-page marketing websites with dynamic CMS typically range from $4,500 to $8,000.",
  },
  {
    question: "How fast can you start?",
    answer:
      "We accept a limited number of clients per sprint to maintain unmatched attention to detail. We can usually kick off within 3 to 7 business days of deposit and scope signoff.",
  },
  {
    question: "How do we work together day to day?",
    answer:
      "We work async-first with maximum clarity: a dedicated private Slack connect channel, weekly Loom video design walkthroughs, and live Figma/Framer staging preview links.",
  },
  {
    question: "What happens after the site launches?",
    answer:
      "Every project includes a 30-day post-launch warranty, detailed video tutorials for your non-technical team to edit copy/images, and ongoing maintenance retainers if needed.",
  },
];

export const KotaAccordionFaq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full bg-[#EFEFEF] text-black py-24 sm:py-36 px-4 sm:px-8 border-t border-black/10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
            [ 05 / Frequently Asked Questions ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mt-2">
            Questions before you decide.
          </h2>
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
                  <span className="text-lg sm:text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-blue-700 transition-colors pr-6">
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
