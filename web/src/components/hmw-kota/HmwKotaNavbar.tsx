"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowUpRight, Menu, X } from "lucide-react";

interface HmwKotaNavbarProps {
  onStartScan?: () => void;
  onBookDemo?: () => void;
}

export const HmwKotaNavbar: React.FC<HmwKotaNavbarProps> = ({
  onStartScan,
  onBookDemo,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const navItems = [
    { label: "How It Works", href: "/how-it-works", isRoute: true },
    { label: "Architecture", href: "/#architecture" },
    { label: "Comparison", href: "/#comparison" },
    { label: "Methodology", href: "/methodology", isRoute: true },
    { label: "Sample Report", href: "/sample-report", isRoute: true },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contact", href: "/contact", isRoute: true },
  ];

  const isItemActive = (item: (typeof navItems)[0]) => {
    if (item.isRoute) {
      return currentPath === item.href || currentPath.startsWith(item.href + "/");
    }
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-8 py-4 sm:py-5 pointer-events-none">
      {/* LEFT: Brand Logo */}
      <div className="pointer-events-auto">
        <a
          href="/"
          className="group flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-black/90 backdrop-blur-xl border border-white/15 shadow-lg hover:border-emerald-500/50 transition-all cursor-pointer"
        >
          <div className="size-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="font-extrabold tracking-tight text-xs sm:text-sm text-white uppercase font-sans">
            HACK MY WEBSITE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </a>
      </div>

      {/* CENTER: Floating Pill Navigation (Desktop) */}
      <nav className="hidden lg:flex pointer-events-auto items-center gap-0.5 xl:gap-1 px-3 py-1.5 rounded-full bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80">
        {navItems.map((item, idx) => {
          const active = isItemActive(item);
          return (
            <a
              key={idx}
              href={item.href}
              className={`px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 ${
                active
                  ? "text-white bg-white/15 font-semibold border border-white/15 shadow-sm"
                  : "text-neutral-300 hover:text-white hover:bg-white/10 font-medium"
              }`}
            >
              {active && <span className="size-1.5 rounded-full bg-emerald-400" />}
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* RIGHT: Actions & Emerald CTA */}
      <div className="flex items-center gap-2 sm:gap-2.5 pointer-events-auto">
        <a
          href="/login"
          className="hidden sm:inline-flex px-3.5 py-2 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          Sign In
        </a>

        <button
          onClick={onStartScan || onBookDemo}
          data-cursor-text="SCAN"
          className="group relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-extrabold tracking-wide overflow-hidden shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <span>Start Free Scan</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-2.5 rounded-full bg-black/90 border border-white/15 shadow-sm text-neutral-200 cursor-pointer"
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
            className="fixed inset-x-4 top-20 pointer-events-auto p-6 rounded-3xl bg-black/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-4 lg:hidden"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item, idx) => {
                const active = isItemActive(item);
                return (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                      active
                        ? "text-emerald-400 bg-white/10"
                        : "text-neutral-200 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="size-2 rounded-full bg-emerald-400" />}
                  </a>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Telemetry: AWS Mumbai
              </span>
              <span className="text-emerald-400 font-mono text-[11px] font-semibold">100% Operational</span>
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="w-1/3 py-3 rounded-2xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider text-center"
              >
                Sign In
              </a>
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onStartScan?.();
                }}
                className="w-2/3 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-lg"
              >
                Start Free Scan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default HmwKotaNavbar;
