import React, { useState } from "react";
import { Velaris } from "@/components/ui/velaris";
import { SecurityTechnologyBeam } from "@/components/ui/security-technology-beam";
import { HowItWorksStepsSection } from "./components/HowItWorksStepsSection";
import PricingSectionDemo from "@/components/ui/demo";
import { FaqSection } from "./components/FaqSection";
import { EnterpriseFooter } from "./components/EnterpriseFooter";
import { HmwLogo } from "../../design-system/src/HmwLogo";
import {
  ShieldCheck,
  Zap,
  Sparkles,
  FileText,
} from "lucide-react";
import { GlobalNavbar } from "./components/GlobalNavbar";

export const RedesignedHmwPage: React.FC = () => {
  const [scanUrl, setScanUrl] = useState("https://my-startup.com");

  return (
    <div className="min-h-screen bg-black text-slate-100 selection:bg-emerald-500 selection:text-neutral-950 font-sans relative">
      {/* Enterprise Static Global Navbar */}
      <GlobalNavbar initialDomain={scanUrl} />

      {/* Hero Section with Living WebGL Simplex-Noise Shader (Velaris) - 100vh */}
      <Velaris
        bg="#000000"
        colors={["#10B981", "#34D399", "#059669", "#022C22"]}
        speed={1.0}
        grain={0.25}
        height="100vh"
        className="relative overflow-hidden border-b border-neutral-800 h-screen min-h-[100vh]"
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
            <div className="max-w-2xl mx-auto p-2 min-h-[58px] sm:h-[58px] rounded-2xl bg-black/95 border border-neutral-800 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center gap-2.5 px-3 py-2 w-full text-left">
                <span className="text-neutral-500  text-xs">https://</span>
                <input
                  type="text"
                  value={scanUrl.replace(/^https?:\/\//, "")}
                  onChange={(e) => setScanUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleOpenAuth();
                  }}
                  placeholder="app.your-startup.com"
                  className="w-full bg-transparent text-white  text-xs sm:text-sm focus:outline-none placeholder-neutral-500"
                />
              </div>
              <button
                type="button"
                onClick={handleOpenAuth}
                className="px-6 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white font-semibold text-xs sm:text-sm border border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer shrink-0 shadow-sm whitespace-nowrap"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black border border-slate-800 text-xs  font-medium text-slate-300 shadow-sm"
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

      {/* SECTION 4 — HOW IT WORKS IN 3 SIMPLE STEPS */}
      <HowItWorksStepsSection />

      {/* SECTION 5 — PRICING */}
      <section id="pricing" aria-label="Transparent Pricing Plans" className="relative">
        <PricingSectionDemo />
      </section>

      {/* SECTION 6 — FAQ */}
      <FaqSection />

      {/* SECTION 7 — ENTERPRISE FOOTER */}
      <EnterpriseFooter />
    </div>
  );
};
