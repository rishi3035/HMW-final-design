import React, { useState } from "react";
import { Velaris } from "@/components/ui/velaris";
import { SecurityTechnologyBeam } from "@/components/ui/security-technology-beam";
import { CoreSecurityWorkflow } from "./components/CoreSecurityWorkflow";
import { MultiEngineSecurityArchitecture } from "./components/MultiEngineSecurityArchitecture";
import { DataFlowOrbitSection } from "./components/DataFlowOrbitSection";
import { GitHubSecurityGate } from "./components/GitHubSecurityGate";
import { WhiteLabelReporting } from "./components/WhiteLabelReporting";
import { SolutionsWhoItsFor } from "./components/SolutionsWhoItsFor";
import { HmwLogo } from "../../design-system/src/HmwLogo";
import {
  ShieldCheck,
  Zap,
  Sparkles,
  FileText,
} from "lucide-react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavItemConfig,
} from "@/components/ui/resizable-navbar";

const enterpriseNavItems: NavItemConfig[] = [
  { name: "Platform", link: "#platform" },
  { name: "Solutions", link: "#solutions" },
  { name: "How It Works", link: "#how-it-works" },
  { name: "Security", link: "#security" },
  { name: "Resources", link: "#resources" },
  { name: "Pricing", link: "#pricing" },
];

export const RedesignedHmwPage: React.FC = () => {
  const [scanUrl, setScanUrl] = useState("https://my-startup.com");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 selection:bg-emerald-500 selection:text-neutral-950 font-sans relative">
      {/* Enterprise Resizable Scroll-Morphing Navbar - Sticky/Fixed across page till footer */}
      <Navbar className="top-3">
        {/* Desktop Navigation */}
        <NavBody className="max-w-7xl">
          {/* LEFT: Brand Logo */}
          <NavbarLogo />

          {/* CENTER: Clean Nav Items without dropdowns */}
          <NavItems items={enterpriseNavItems} />

          {/* RIGHT: Professional Enterprise Actions */}
          <div className="flex items-center gap-2 relative z-20 shrink-0">
            <a
              href="#signin"
              className="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Sign In
            </a>

            <button
              type="button"
              className="px-4 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs border border-slate-700 hover:border-slate-600 transition-all cursor-pointer shadow-sm whitespace-nowrap"
            >
              Book Enterprise Demo
            </button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-full space-y-2">
              {enterpriseNavItems.map((item, idx) => (
                <a
                  key={`mobile-nav-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-slate-200 hover:text-white font-semibold text-sm py-2 border-b border-slate-800/60"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex w-full flex-col gap-2.5 pt-3">
              <a
                href="#signin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center text-slate-200 py-2.5 text-xs font-medium rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 block"
              >
                Sign In
              </a>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center text-white py-2.5 text-xs font-semibold rounded-xl bg-slate-800 border border-slate-700 shadow-md block cursor-pointer"
              >
                Book Enterprise Demo
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section with Living WebGL Simplex-Noise Shader (Velaris) - 100vh */}
      <Velaris
        bg="#06080F"
        colors={["#10B981", "#34D399", "#059669", "#022C22"]}
        speed={1.0}
        grain={0.25}
        height="100vh"
        className="relative overflow-hidden border-b border-slate-800/80 h-screen min-h-[100vh]"
      >
        <div className="flex h-full w-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-10">
          {/* Centered High-Impact Enterprise Hero — shifted lower than the middle */}
          <div className="max-w-5xl w-full text-center space-y-6 sm:space-y-7 relative z-10 translate-y-8 sm:translate-y-12 md:translate-y-16">
            {/* Primary Headline - One Uniform Solid Color Throughout */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.12] max-w-4xl mx-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              Detect Security Risk Before<br className="hidden sm:inline" /> It Reaches Production.
            </h1>

            {/* Supporting Text - Concise 1-2 Line Scope */}
            <div className="max-w-3xl mx-auto">
              <p className="text-base sm:text-lg text-slate-200 font-semibold leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Continuous application security engineered for enterprise platforms, development agencies, SaaS companies, and mission-critical web applications.
              </p>
            </div>

            {/* Interactive URL Scanner Input Bar with Professional Enterprise Button */}
            <div className="max-w-2xl mx-auto p-2 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center gap-2.5 px-3 py-2 w-full text-left">
                <span className="text-slate-500 font-mono text-xs">https://</span>
                <input
                  type="text"
                  value={scanUrl.replace(/^https?:\/\//, "")}
                  onChange={(e) => setScanUrl(e.target.value)}
                  placeholder="app.your-startup.com"
                  className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-500"
                />
              </div>
              <button
                type="button"
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-700 hover:border-slate-600 transition-all cursor-pointer shrink-0 shadow-sm"
              >
                Start Free Security Scan
              </button>
            </div>

            {/* Core Security Architecture Microcopy */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {[
                "Enterprise Platforms",
                "Agencies & Dev Partners",
                "DAST Runtime",
                "SAST Code Logic",
                "Vulnerability Detection",
                "GitHub Security Gate",
                "0–100 Risk Scoring"
              ].map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black border border-slate-800 text-xs font-mono font-medium text-slate-300 shadow-sm"
                >
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  {tech}
                </span>
              ))}
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-300 font-medium drop-shadow">
              <span className="flex items-center gap-1.5"><Zap className="size-3.5 text-emerald-400" /> 3–8 Min Pipeline</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-emerald-400" /> 100% Non-Destructive</span>
              <span className="flex items-center gap-1.5"><FileText className="size-3.5 text-emerald-400" /> Executive PDF Report</span>
              <span className="flex items-center gap-1.5"><Sparkles className="size-3.5 text-emerald-400" /> 1-Click Cursor Prompts</span>
            </div>
          </div>
        </div>
      </Velaris>

      {/* SECTION 3 — SECURITY TECHNOLOGY ANIMATED BEAM INTEGRATION (100vh) */}
      <SecurityTechnologyBeam />

      {/* SECTION 4 — CORE SECURITY WORKFLOW */}
      <CoreSecurityWorkflow />

      {/* SECTION 5 — MULTI-ENGINE SECURITY ARCHITECTURE */}
      <MultiEngineSecurityArchitecture />

      {/* SECTION 6 — DATA FLOW ORBIT ARCHITECTURE */}
      <DataFlowOrbitSection />

      {/* SECTION 7 — GITHUB SECURITY GATE / DEVSECOPS */}
      <GitHubSecurityGate />

      {/* SECTION 8 — WHITE-LABEL SECURITY REPORTING */}
      <WhiteLabelReporting />

      {/* SECTION 9 — SOLUTIONS / WHO IT'S FOR */}
      <SolutionsWhoItsFor />

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 text-xs text-slate-500 bg-[#04060A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
            <HmwLogo size="sm" showSubtitle={true} />
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <a href="/sample-report" className="hover:text-white transition-colors">Sample PDF Report</a>
            <a href="/methodology" className="hover:text-white transition-colors">Methodology</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
