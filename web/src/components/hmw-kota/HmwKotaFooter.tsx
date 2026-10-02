import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Shield } from "lucide-react";

interface HmwKotaFooterProps {
  onStartScan: () => void;
}

export const HmwKotaFooter: React.FC<HmwKotaFooterProps> = ({ onStartScan }) => {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative w-full bg-black text-white pt-28 pb-16 px-4 sm:px-8 overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-emerald-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Massive CTA Area */}
        <div className="text-center py-12 sm:py-24 border-b border-white/10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-4"
          >
            [ Zero-Risk Onboarding ]
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-3xl mx-auto"
          >
            Let’s secure your{" "}
            <span className="text-emerald-400">application.</span>
          </motion.h2>

          <p className="mt-6 text-neutral-400 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Enter your domain or repository to identify exploitable attack vectors before malicious actors do. 100% non-destructive.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onStartScan}
              data-cursor-text="SCAN"
              className="group relative px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-xl shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
            >
              <span>Start Free Security Scan</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Multi-Column Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-xs text-neutral-300">
          <div>
            <span className="text-neutral-500 uppercase tracking-wider block mb-3 font-bold">
              Product &amp; Engine
            </span>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="/how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="/#architecture" className="hover:text-emerald-400 transition-colors">3-Tier Architecture</a></li>
              <li><a href="/#comparison" className="hover:text-emerald-400 transition-colors">Comparative Benchmarks</a></li>
              <li><a href="/#deliverables" className="hover:text-emerald-400 transition-colors">Security Deliverables</a></li>
              <li><a href="/#pricing" className="hover:text-emerald-400 transition-colors">Subscription Tiers</a></li>
            </ul>
          </div>

          <div>
            <span className="text-neutral-500 uppercase tracking-wider block mb-3 font-bold">
              Intelligence &amp; Trust
            </span>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="/methodology" className="hover:text-emerald-400 transition-colors">Scoring Methodology</a></li>
              <li><a href="/sample-report" className="hover:text-emerald-400 transition-colors">Sample Audit Report (PDF)</a></li>
              <li><a href="/contact" className="hover:text-emerald-400 transition-colors">Contact &amp; Agency Support</a></li>
              <li><a href="/privacy-policy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-and-conditions" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <span className="text-neutral-500 uppercase tracking-wider block mb-3 font-bold">
              Trust & Governance
            </span>
            <p className="text-neutral-400 leading-relaxed">
              100% Non-Destructive Scanning<br />
              Zero Source Code Retention<br />
              AWS Mumbai Sovereign Region<br />
              <span className="text-emerald-400 font-semibold">SOC 2, ISO & DPDP Ready</span>
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="text-neutral-500 uppercase tracking-wider block mb-3 font-bold">
                Live Telemetry
              </span>
              <div className="flex items-center gap-2 text-neutral-200 font-bold text-sm">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{timeString} (Active)</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-2 font-normal">
                Queue Latency: &lt; 0.04s
              </div>
            </div>

            <div className="text-neutral-500 text-[11px] mt-6 sm:mt-0 leading-relaxed font-normal">
              © 2026 Hack My Website.<br />
              A Product of AIVI Intelligence Private Limited.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
