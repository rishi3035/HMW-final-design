import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface KotaNavbarProps {
  onContactClick?: () => void;
}

export const KotaNavbar: React.FC<KotaNavbarProps> = ({ onContactClick }) => {
  const [timeString, setTimeString] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Studio time in GMT+7 (Bangkok/Saigon) or local
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Bangkok",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-5 pointer-events-none">
      {/* LEFT: Studio Brand Logo */}
      <div className="pointer-events-auto">
        <a
          href="/kota"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-sm hover:border-black/30 transition-all"
        >
          <span className="font-extrabold tracking-tighter text-sm text-black dark:text-white uppercase font-sans">
            KOTA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
        </a>
      </div>

      {/* CENTER: Floating Pill Navigation (Desktop) */}
      <nav className="hidden lg:flex pointer-events-auto items-center gap-1 px-3 py-2 rounded-full bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg shadow-black/5">
        {[
          { label: "Home", href: "#hero" },
          { label: "Services", href: "#services" },
          { label: "Templates", href: "#templates" },
          { label: "About", href: "#about" },
          { label: "FAQ", href: "#faq" },
        ].map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            {item.label}
          </a>
        ))}

        <div className="w-[1px] h-4 bg-neutral-300 dark:bg-neutral-700 mx-1" />

        {/* Live Studio Time & Availability */}
        <div className="flex items-center gap-2 px-3 py-1 text-[11px] font-mono text-neutral-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>{timeString || "05:51 AM"} (GMT+7)</span>
        </div>
      </nav>

      {/* RIGHT: Actions & CTA */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={onContactClick}
          className="group relative px-5 py-2.5 rounded-full bg-black text-white text-xs font-semibold overflow-hidden shadow-md hover:bg-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>Get in touch</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-2.5 rounded-full bg-white/90 dark:bg-black/90 border border-black/10 dark:border-white/10 shadow-sm text-neutral-800 dark:text-neutral-200"
          aria-label="Toggle Navigation"
        >
          {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 pointer-events-auto p-6 rounded-3xl bg-white/95 dark:bg-black/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl flex flex-col gap-4 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", href: "#hero" },
                { label: "Services", href: "#services" },
                { label: "Templates", href: "#templates" },
                { label: "About", href: "#about" },
                { label: "FAQ", href: "#faq" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-3 py-2 text-base font-semibold text-neutral-900 dark:text-white hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for projects
              </span>
              <span>{timeString} (GMT+7)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
