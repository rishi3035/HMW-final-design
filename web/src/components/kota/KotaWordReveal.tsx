import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

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

export const KotaWordReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const quote =
    "I'm thrilled with how the final website turned out—just as envisioned. Communication was top-notch throughout. Kota was always quick to respond, super clear about progress, and worked hard to meet our ambitious goals. Extremely professional, nailed every expectation, 10/10 would recommend!";

  const words = quote.split(" ");

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-[#EFEFEF] py-32 sm:py-48 px-4 sm:px-8 border-t border-b border-black/10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
            [ 03 / Client Endorsement ]
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
        <div className="mt-12 flex items-center justify-between border-t border-black/10 pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
              TH
            </div>
            <div>
              <div className="font-bold text-base text-neutral-900">Tim Hafner</div>
              <div className="text-xs font-mono text-neutral-500">Founder & CEO, OpenServ</div>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <div className="text-xs font-mono text-blue-700 font-semibold">Project Rating</div>
            <div className="text-lg font-black tracking-tight">★ 10 / 10</div>
          </div>
        </div>
      </div>
    </section>
  );
};
