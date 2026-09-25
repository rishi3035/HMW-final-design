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
import { AuthModal } from "./components/AuthModal";

const enterpriseNavItems: NavItemConfig[] = [
  { name: "Platform", link: "/" },
  { name: "Security Engines", link: "#security" },
  { name: "How It Works", link: "#how-it-works" },
  { name: "Pricing", link: "#pricing" },
  { name: "FAQ", link: "#faq" },
];

export const RedesignedHmwPage: React.FC = () => {
  const [scanUrl, setScanUrl] = useState("https://my-startup.com");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenAuth = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (email: string) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("hmw_target_domain", scanUrl);
      window.sessionStorage.setItem("hmw_user_email", email);
      window.history.pushState({}, "", "/workspace");
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 selection:bg-emerald-500 selection:text-neutral-950 font-sans relative">
      {/* Enterprise Resizable Scroll-Morphing Navbar - Sticky/Fixed across page till footer */}
      <Navbar className="top-4">
        {/* Desktop Navigation */}
        <NavBody className="max-w-5xl">
          {/* LEFT: Brand Logo */}
          <div className="flex-1 flex items-center justify-start z-20 min-w-0">
            <NavbarLogo />
          </div>

          {/* CENTER: Perfectly Centered Middle Nav Items */}
          <div className="flex items-center justify-center shrink-0 z-20">
            <NavItems items={enterpriseNavItems} />
          </div>

          {/* RIGHT: Professional Enterprise Actions */}
          <div className="flex-1 flex items-center justify-end gap-2.5 z-20 min-w-0">
            <a
              href="/login"
              className="px-3.5 py-2 rounded-xl text-slate-300 hover:text-white text-xs font-medium hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              Sign In
            </a>

            <button
              type="button"
              onClick={handleOpenAuth}
              className="px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white font-semibold text-xs border border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer shadow-sm whitespace-nowrap"
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
                  className="block text-slate-200 hover:text-white font-semibold text-sm py-2 border-b border-neutral-800"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex w-full flex-col gap-2.5 pt-3">
              <a
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center text-slate-200 py-2.5 text-xs font-medium rounded-xl bg-black border border-neutral-800 hover:border-neutral-700 block cursor-pointer"
              >
                Sign In
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenAuth();
                }}
                className="w-full text-center text-white py-2.5 text-xs font-semibold rounded-xl bg-black hover:bg-neutral-900 border border-neutral-700 shadow-md block cursor-pointer"
              >
                Book Enterprise Demo
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

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

      {/* Enterprise Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialDomain={scanUrl}
      />
    </div>
  );
};
