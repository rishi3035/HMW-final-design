"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  title: string;
  description: string;
  date: string;
  image?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-5xl mx-auto py-12 md:py-20", className)}
    >
      {/* Background Central Tracking Guide Spine */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-neutral-800" />

      {/* Animated Glowing Progress Line */}
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 w-[2px] bg-gradient-to-b from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(16,185,129,0.7)] origin-top rounded-full"
      />

      {/* Timeline Items List */}
      <div className="space-y-12 md:space-y-20 relative">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={cn(
                "relative flex flex-col md:flex-row items-start md:items-center w-full",
                isEven ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Timeline Center Node Beacon */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-1.5 md:top-auto z-20 flex items-center justify-center">
                <div className="relative size-5 rounded-full bg-black border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                  <div className="size-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>

              {/* Content Card Side (Half Width on Desktop) */}
              <div
                className={cn(
                  "w-full md:w-1/2 pl-14 md:pl-0",
                  isEven ? "md:pl-12 text-left" : "md:pr-12 md:text-right text-left"
                )}
              >
                <div className="group relative rounded-2xl p-6 bg-black border border-neutral-800 hover:border-neutral-700 transition-all duration-300 shadow-xl overflow-hidden">
                  {/* Atmospheric Top Glow */}
                  <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-32 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />

                  {/* Date Badge */}
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold tracking-wider bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 mb-3">
                    {item.date}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 font-sans leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Media Asset Preview if present */}
                  {item.image && (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-neutral-800/80 bg-neutral-900 mt-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}
                </div>
              </div>

              {/* Blank Opposite Spacer for Desktop Balance */}
              <div className="hidden md:block w-1/2" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
