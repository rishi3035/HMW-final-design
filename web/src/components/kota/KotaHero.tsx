import React from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, ArrowDown } from "lucide-react";

interface KotaHeroProps {
  onOpenReel?: () => void;
}

export const KotaHero: React.FC<KotaHeroProps> = ({ onOpenReel }) => {
  const words = [
    { text: "Turning", accent: false },
    { text: "ideas", accent: false },
    { text: "into", accent: false },
    { text: "high — impact", accent: true },
    { text: "Framer", accent: false },
    { text: "websites", accent: false },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-black text-white flex flex-col justify-between px-4 sm:px-8 pt-32 pb-10 overflow-hidden"
    >
      {/* Ambient background subtle lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* TOP: Pill Badge */}
      <div className="relative z-10 flex justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-neutral-300 font-medium backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Official Framer Expert</span>
        </motion.div>
      </div>

      {/* CENTER: Massive Kinetic Display Headline */}
      <div className="relative z-10 max-w-6xl mx-auto my-auto text-center px-2 py-8">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[96px] font-black tracking-[-0.04em] leading-[1.05] flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
          {words.map((item, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 0.3 + idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                item.accent
                  ? "italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 pr-2"
                  : "text-white"
              }
            >
              {item.text}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle & Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-neutral-400 font-normal leading-relaxed"
        >
          Kota Studio designs motion-rich, high-converting Framer websites and creates premium, ready-to-launch Framer templates.
        </motion.p>

        {/* Action Controls & Showreel Launcher */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Showreel Pill Button */}
          <button
            onClick={onOpenReel}
            data-cursor-text="PLAY REEL"
            className="group relative px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider flex items-center gap-3 hover:bg-neutral-200 transition-all shadow-xl shadow-white/10 cursor-pointer"
          >
            <span className="font-mono text-neutral-500 text-[11px]">[ 00:44 ]</span>
            <span className="font-sans font-bold uppercase">PLAY REEL</span>
            <span className="size-6 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-3 h-3 fill-white ml-0.5" />
            </span>
          </button>

          {/* Project availability badge */}
          <div className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 font-mono">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for new projects</span>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM: Studio Meta & Scroll Cue */}
      <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono text-neutral-500 pt-8 border-t border-white/10">
        <div>©2026 KOTA Studio</div>

        <a
          href="#services"
          className="flex items-center gap-1.5 hover:text-white transition-colors group cursor-pointer"
        >
          <span>Scroll for more</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </a>

        <div className="hidden sm:block">Framer Master Agency</div>
      </div>
    </section>
  );
};
