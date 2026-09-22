"use client";

import React from "react";
import { HmwLogo } from "../../../design-system/src/HmwLogo";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { IconBrandGithub, IconBrandX, IconBrandLinkedin } from "@tabler/icons-react";

export const EnterpriseFooter: React.FC = () => {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      const input = document.querySelector('input[placeholder*="your-startup"]') as HTMLInputElement | null;
      if (input) {
        input.focus();
        input.select();
      }
    }, 500);
  };

  return (
    <footer className="w-full h-screen min-h-[100vh] lg:h-screen lg:max-h-screen flex flex-col justify-between bg-black text-slate-400 border-t border-neutral-800 py-6 sm:py-8 lg:py-10 text-xs font-sans relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-gradient-to-t from-emerald-500/5 to-transparent blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between h-full w-full relative z-10">
        {/* Top Header Block: Logo, Statement & Compact Actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-neutral-800 shrink-0">
          <div className="space-y-1.5 text-left">
            <HmwLogo size="sm" showSubtitle={false} />
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Continuous application security for modern teams.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#top"
              onClick={handleScrollToTop}
              className="text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer px-2 py-1"
            >
              Start a Free Scan
            </a>

            <button
              type="button"
              onClick={() => {
                window.location.href = "mailto:security@hackmywebsite.io?subject=Enterprise%20Demo%20Request";
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-black border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-900 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Book Enterprise Demo</span>
              <ArrowRight className="size-3.5 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* 4-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 text-left flex-1 my-auto py-4 sm:py-6 items-start">
          {/* Column 1: Product */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Platform
                </a>
              </li>
              <li>
                <a href="/#security" className="hover:text-white transition-colors">
                  Security Engines
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="hover:text-white transition-colors flex items-center gap-1">
                  How It Works
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                </a>
              </li>
              <li>
                <a href="/#pricing" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Solutions
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/#solutions" className="hover:text-white transition-colors">
                  Enterprise
                </a>
              </li>
              <li>
                <a href="/#solutions" className="hover:text-white transition-colors">
                  SaaS Companies
                </a>
              </li>
              <li>
                <a href="/#solutions" className="hover:text-white transition-colors">
                  Development Agencies
                </a>
              </li>
              <li>
                <a href="/#solutions" className="hover:text-white transition-colors">
                  Security Teams
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/docs" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/security" className="hover:text-white transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/sample-report" className="hover:text-white transition-colors">
                  Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="mailto:contact@hackmywebsite.io" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Careers</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Hiring
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, System Telemetry & Statutory Credentials */}
        <div className="pt-4 sm:pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px] font-mono shrink-0">
          <div className="flex flex-wrap items-center gap-2 text-left">
            <span>© 2026 HackMyWebsite.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="text-slate-400">All rights reserved.</span>
          </div>

          {/* Understated Security Status Telemetry */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-neutral-800 text-[10px]">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">All Systems Operational</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">SOC 2 Type II</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">DPDP Sovereign</span>
          </div>

          {/* Legal and Social Links */}
          <div className="flex items-center gap-4 text-slate-400">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="/security" className="hover:text-white transition-colors">
              Security
            </a>

            <div className="flex items-center gap-3 pl-2 border-l border-neutral-800 text-slate-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-white transition-colors"
              >
                <IconBrandGithub className="size-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="hover:text-white transition-colors"
              >
                <IconBrandX className="size-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors"
              >
                <IconBrandLinkedin className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnterpriseFooter;
