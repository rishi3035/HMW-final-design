import React from "react";
import { motion } from "framer-motion";
import {
  Play,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  FileText,
  ArrowDown,
  Terminal,
} from "lucide-react";
import { WavesShader } from "@/components/ui/waves-shader";

interface HmwKotaHeroProps {
  scanUrl: string;
  setScanUrl: (url: string) => void;
  onStartScan: () => void;
  onOpenDemo: () => void;
  onOpenSampleReport?: () => void;
}

export const HmwKotaHero: React.FC<HmwKotaHeroProps> = ({
  scanUrl,
  setScanUrl,
  onStartScan,
  onOpenDemo,
  onOpenSampleReport,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-black text-white flex flex-col justify-between px-4 sm:px-8 pt-32 pb-10 overflow-hidden"
    >
      {/* Animated WebGL Waves Flow Shader Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <WavesShader className="w-full h-full" />
        {/* Subtle dark gradient overlay to ensure perfect contrast and legibility */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px] pointer-events-none" />
      </div>

      {/* CENTER: Clean Enterprise Headline & Interactive Scanner */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto text-center px-4 py-6">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]"
        >
          Detect Security Risk{" "}
          <span className="text-emerald-400">Before It Reaches Production.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-neutral-300 font-normal leading-relaxed"
        >
          Continuous application security engineered for enterprise platforms, development agencies, SaaS companies, and mission-critical web applications.
        </motion.p>

        {/* Interactive URL Scanner Input Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-10 max-w-2xl mx-auto p-2 min-h-[58px] sm:h-[62px] rounded-[24px] bg-black/95 border border-white/15 shadow-2xl backdrop-blur-2xl flex flex-col sm:flex-row items-center gap-2 hover:border-emerald-500/40 transition-colors"
        >
          <div className="flex items-center gap-2.5 px-4 py-2 w-full text-left">
            <span className="text-neutral-500 text-xs font-medium">https://</span>
            <input
              type="text"
              value={scanUrl.replace(/^https?:\/\//, "")}
              onChange={(e) => setScanUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onStartScan();
              }}
              placeholder="app.your-startup.com"
              className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder-neutral-500 font-sans"
            />
          </div>
          <button
            type="button"
            onClick={onStartScan}
            data-cursor-text="SCAN"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_8px_28px_rgba(85,127,27,0.35)] hover:shadow-[0_10px_35px_rgba(85,127,27,0.50)] transition-all cursor-pointer shrink-0 whitespace-nowrap flex items-center justify-center gap-2"
          >
            <span>Start Free Security Scan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Action Controls: Interactive Sandbox & Verified Audit Report */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* Interactive Security Sandbox Launcher */}
          <button
            onClick={onOpenDemo}
            data-cursor-text="SANDBOX"
            className="group px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wide flex items-center gap-3 border border-white/15 hover:border-emerald-500/50 transition-all cursor-pointer shadow-lg hover:shadow-emerald-500/10"
          >
            <div className="size-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-bold">Explore Interactive Sandbox</span>
            <span className="size-5 rounded-full bg-white/10 text-neutral-300 group-hover:bg-emerald-500 group-hover:text-neutral-950 flex items-center justify-center transition-colors">
              <ArrowRight className="w-3 h-3" />
            </span>
          </button>

          {/* Sample Audit Report Preview Button */}
          <button
            onClick={onOpenSampleReport || onOpenDemo}
            data-cursor-text="REPORT"
            className="group px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-medium text-xs tracking-wide flex items-center gap-2.5 border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-sm"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Sample Audit Report</span>
            <span className="text-[10px] font-mono font-bold text-neutral-400 bg-white/10 px-2 py-0.5 rounded-full">
              PDF
            </span>
          </button>

          {/* Live Trust Guarantee */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900/80 border border-white/10 text-xs text-neutral-300 font-medium">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>100% Non-Destructive · Zero False Positives</span>
          </div>
        </motion.div>

        {/* Security Architecture Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-wrap items-center justify-center gap-2 pt-8"
        >
          {[
            "Enterprise Platforms",
            "Agencies & Dev Partners",
            "DAST Runtime",
            "SAST Code Logic",
            "Vulnerability Detection",
            "GitHub Security Gate",
            "0–100 Risk Scoring",
          ].map((tech, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/90 border border-white/10 text-xs font-medium text-neutral-300 shadow-sm"
            >
              <span className="size-1.5 rounded-full bg-emerald-400" />
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* BOTTOM: Trust Highlights & Scroll Cue */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-400 pt-8 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-300 font-medium">
          <span className="flex items-center gap-1.5">
            <Zap className="size-3.5 text-emerald-400" /> 3–8 Min Pipeline
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-400" /> 100% Non-Destructive
          </span>
          <span className="flex items-center gap-1.5">
            <FileText className="size-3.5 text-emerald-400" /> Executive PDF Report
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-emerald-400" /> 1-Click Cursor Prompts
          </span>
        </div>

        <a
          href="#architecture"
          className="flex items-center gap-1.5 hover:text-white transition-colors group cursor-pointer"
        >
          <span>Scroll for architecture</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
};
