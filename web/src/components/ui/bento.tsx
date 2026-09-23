"use client";

import React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

export function BentoCard({
  dark = false,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
}: {
  dark?: boolean;
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  fade?: ("top" | "bottom")[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-3xl",
        "bg-black transform-gpu border border-neutral-800 shadow-xl ring-1 ring-white/10 hover:border-neutral-700 transition-all duration-300"
      )}
    >
      <div className="relative h-[23rem] sm:h-[26rem] shrink-0 overflow-hidden bg-black">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-black to-50% opacity-40 pointer-events-none" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-black to-50% opacity-40 pointer-events-none" />
        )}
      </div>
      <div className="relative p-7 sm:p-8 z-20 isolate mt-[-90px] min-h-[12.5rem] backdrop-blur-xl bg-black/95 border-t border-neutral-800 text-white flex flex-col justify-between">
        <div>
          <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            {eyebrow}
          </span>
          <h3 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white">
            {title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FUIBentoGridDark() {
  return (
    <div className="pt-32 container mx-auto bg-black min-w-screen flex flex-col p-10 bg-gray-950/10">
      <h1 className="font-mono tracking-tight text-3xl md:text-5xl text-white">
        Sales
      </h1>
      <p className="max-w-3xl text-2xl/8 font-medium tracking-tight mt-2 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
        Know more about your customers than they do.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Insight"
          title="Get perfect clarity"
          description="PerkAI uses social engineering to build a detailed financial picture of your leads. Know their budget, compensation package, social security number, and more."
          graphic={
            <div className="absolute inset-0 bg-[url(https://cdn.21st.dev/assets/mirror/82/8216d38fc7b6e661002e520eceae40f036741db2f2281729f62bc2885f168bff.png)] object-fill" />
          }
          className="max-lg:rounded-t-3xl lg:col-span-3 lg:rounded-tl-3xl"
        />
        <BentoCard
          eyebrow="Analysis"
          title="Undercut your competitors"
          description="With our advanced data mining, you’ll know which companies your leads are talking to and exactly how much they’re being charged."
          graphic={
            <div className="absolute inset-0 bg-[url(https://cdn.21st.dev/assets/mirror/38/388b12fd04fd758f8af4db4ff90a362fdefabc172e3f532d6595f2ba4a86a76b.png)] object-fill" />
          }
          className="lg:col-span-3 lg:rounded-tr-3xl"
        />
        <BentoCard
          eyebrow="Speed"
          title="Built for power users"
          description="It’s never been faster to cold email your entire contact list using our streamlined keyboard shortcuts."
          graphic={
            <div className="absolute inset-0 -top-20 -left-60 bg-[url(https://cdn.21st.dev/assets/mirror/e1/e11e231bc3af40fd287e47edf1ae6caf40f5421f6fadee45b6e10a635ddea8c0.png)] object-scale-down bg-black" />
          }
          className="lg:col-span-2 lg:rounded-bl-3xl"
        />
        <BentoCard
          eyebrow="Source"
          title="Get the furthest reach"
          description="Bypass those inconvenient privacy laws to source leads from the most unexpected places."
          graphic={
            <div className="absolute inset-0 bg-[url(https://cdn.21st.dev/assets/mirror/05/05a9718924c99a9e5c6d5a61b9ea8d088c6f2ce2515716d60f69064dc178462f.png)] object-contain" />
          }
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Limitless"
          title="Sell globally"
          description="PerkAI helps you sell in locations currently under international embargo."
          graphic={
            <div className="absolute inset-0 -top-44 -left-60 bg-[url(https://cdn.21st.dev/assets/mirror/1a/1aa128de57f039b2b380e36a1b540ebbabe497490bb78e07ec6ab8c8cb9383f8.png)] object-contain" />
          }
          className="max-lg:rounded-b-3xl lg:col-span-2 lg:rounded-br-3xl"
        />
      </div>
    </div>
  );
}
