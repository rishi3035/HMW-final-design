import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface KotaFooterProps {
  onStartProject?: () => void;
}

export const KotaFooter: React.FC<KotaFooterProps> = ({ onStartProject }) => {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Bangkok",
          hour: "numeric",
          minute: "2-digit",
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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Massive CTA Area */}
        <div className="text-center py-12 sm:py-20 border-b border-white/10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block mb-4"
          >
            [ Next Step ]
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-[-0.04em] leading-[0.98]"
          >
            Let’s get <br className="hidden sm:inline" />
            <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
              started!
            </span>
          </motion.h2>

          <p className="mt-8 text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
            Ready to turn your vision into an award-winning, motion-rich Framer website?
          </p>

          <div className="mt-10 flex justify-center">
            <button
              onClick={onStartProject}
              data-cursor-text="START"
              className="group relative px-10 py-5 rounded-full bg-white text-black font-extrabold text-sm tracking-wide uppercase hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-2xl shadow-white/10 flex items-center gap-2 cursor-pointer"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Multi-Column Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-xs font-mono">
          <div>
            <span className="text-neutral-500 uppercase tracking-wider block mb-3">Index</span>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">Templates</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <span className="text-neutral-500 uppercase tracking-wider block mb-3">Socials</span>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter (X)</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://threads.net" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Threads</a></li>
              <li><a href="https://contra.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Contra</a></li>
            </ul>
          </div>

          <div>
            <span className="text-neutral-500 uppercase tracking-wider block mb-3">Credits</span>
            <p className="text-neutral-400 leading-relaxed">
              Designed by <span className="text-white font-medium">LoganCee Studio</span><br />
              Made by <span className="text-white font-medium">Kota Studio</span><br />
              Built in <span className="text-white font-medium">Framer</span>
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="text-neutral-500 uppercase tracking-wider block mb-3">Studio Clock</span>
              <div className="flex items-center gap-2 text-neutral-300 font-bold text-sm">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{timeString} (GMT +7)</span>
              </div>
            </div>

            <div className="text-neutral-500 text-[11px] mt-6 sm:mt-0">
              ©2026 KOTA Studio. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
