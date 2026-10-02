import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface WordProps {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const Word: React.FC<WordProps> = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <span className="relative inline-block mr-2 sm:mr-3">
      <motion.span
        style={{ opacity, y }}
        className="text-black transition-colors"
      >
        {children}
      </motion.span>
    </span>
  );
};

export const HmwKotaWordReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const quote =
    "Hack My Website detected two critical privilege escalations before our Series A compliance audit that every legacy scanner missed. The automated Cursor AI fix prompts saved our engineering team three weeks of manual triage. 100% non-destructive, zero false positives.";

  const words = quote.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#EFEFEF] py-32 sm:py-48 px-4 sm:px-8 border-b border-black/10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            [ Verified Enterprise Trust ]
          </span>
        </div>

        {/* Scroll-Linked Word-by-Word Kinetic Display */}
        <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.2] flex flex-wrap">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} range={[start, end]} progress={scrollYProgress}>
                {word}
              </Word>
            );
          })}
        </p>

        {/* Client Attribution */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-black/10 pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm border border-emerald-500/40">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-base text-neutral-900">
                Enterprise FinTech Partner
              </div>
              <div className="text-xs font-mono text-neutral-500">
                Sovereign AWS Mumbai Region · 250,000+ Active Users
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs font-mono text-emerald-700 font-semibold">
              Production Vulnerability Score
            </div>
            <div className="text-xl font-black tracking-tight text-neutral-900">
              Zero Critical Findings
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
