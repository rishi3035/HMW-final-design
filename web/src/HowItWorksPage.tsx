import React, { useState } from "react";
import Timeline, { JourneyItem } from "@/components/ui/timeline";
import { MultiEngineSecurityArchitecture } from "./components/MultiEngineSecurityArchitecture";
import { EnterpriseFooter } from "./components/EnterpriseFooter";
import { HmwLogo } from "../../design-system/src/HmwLogo";
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

const navItems: NavItemConfig[] = [
  { name: "Platform", link: "/" },
  { name: "Solutions", link: "/#solutions" },
  { name: "How It Works", link: "/how-it-works" },
  { name: "Security", link: "/#security" },
  { name: "Resources", link: "/#resources" },
  { name: "Pricing", link: "/#pricing" },
];

const hmwTopJourney: JourneyItem[] = [
  {
    id: "stage-01",
    year: "STAGE 01",
    month: "January",
    content: "Discover: Autonomous external reconnaissance maps DNS, IP ranges, public cloud buckets, and exposed REST/GraphQL APIs.",
  },
  {
    id: "stage-03",
    year: "STAGE 03",
    month: "March",
    content: "Analyze: Multi-engine correlation runs active DAST probes and AST static token scans against 5,420+ CVE vulnerability signatures.",
  },
  {
    id: "stage-05",
    year: "STAGE 05",
    month: "May",
    content: "Prioritize: Contextual triage engine weighs CVSS 3.1 scores with real-world reachability, data sensitivity, and 0–100 posture score.",
  },
  {
    id: "stage-07",
    year: "VERIFIED",
    month: "July",
    content: "Continuous Gate: Closed-loop retesting confirms patches with automated PR checks and real-time posture monitoring.",
  },
];

const hmwBottomJourney: JourneyItem[] = [
  {
    id: "stage-02",
    year: "STAGE 02",
    month: "February",
    content: "Crawl: Headless browser spider walks dynamic SPAs, rendering DOM states and cataloging parameterized attack surfaces.",
  },
  {
    id: "stage-04",
    year: "STAGE 04",
    month: "April",
    content: "Validate: Safely replays proof-of-concept exploits in isolated sandboxes to eliminate noise and guarantee 0% bluff data.",
  },
  {
    id: "stage-06",
    year: "STAGE 06",
    month: "June",
    content: "Remediate: Produces ready-to-merge code diffs, contextual Cursor IDE prompts, and automated GitHub PR safeguard actions.",
  },
];

export const HowItWorksPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 selection:bg-emerald-500 selection:text-neutral-950 font-sans relative flex flex-col justify-between">
      {/* Enterprise Resizable Scroll-Morphing Navbar */}
      <Navbar className="top-3">
        {/* Desktop Navigation */}
        <NavBody className="max-w-7xl">
          {/* LEFT: Brand Logo */}
          <NavbarLogo href="/" />

          {/* CENTER: Navigation Links */}
          <NavItems items={navItems} />

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3">
            <a
              href="/#signin"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/");
              }}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 transition-colors cursor-pointer"
            >
              Sign In
            </a>
            <button
              type="button"
              onClick={() => navigateTo("/")}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-black hover:bg-neutral-900 border border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Enterprise Demo
            </button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo href="/" />
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
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-nav-${idx}`}
                  href={item.link}
                  onClick={(e) => {
                    if (item.link?.startsWith("/")) {
                      e.preventDefault();
                      navigateTo(item.link);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-slate-200 hover:text-white font-semibold text-sm py-2 border-b border-slate-800/60"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex w-full flex-col gap-2.5 pt-3">
              <a
                href="/#signin"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center text-slate-200 py-2.5 text-xs font-medium rounded-xl bg-black border border-neutral-800 hover:border-neutral-700 block"
              >
                Sign In
              </a>
              <button
                type="button"
                onClick={() => {
                  navigateTo("/");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center text-white py-2.5 text-xs font-semibold rounded-xl bg-black hover:bg-neutral-900 border border-neutral-700 shadow-md block cursor-pointer"
              >
                Book Enterprise Demo
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col justify-start">
        {/* Lead-in Hero for Timeline */}
        <section className="min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 sm:px-6 text-center pt-32 sm:pt-40 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AUTONOMOUS EXECUTION ARCHITECTURE</span>
          </div>

          <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
            Six Stages, One Horizontal Execution Pipeline.
          </h1>

          <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-slate-400">
            Scroll down — the section pins, the execution track slides sideways, and each security milestone draws its stem, illuminating runtime telemetry as it reaches center.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-emerald-400/90 animate-bounce">
            <span>SCROLL TO EXPLORE PIPELINE</span>
            <span>&darr;</span>
          </div>
        </section>

        {/* Pinned Horizontal Scroll Timeline */}
        <Timeline
          title="Security Pipeline"
          periodLabel="Surface ➔ Fix"
          backgroundColor="#000000"
          textColor="#ffffff"
          mutedTextColor="#94a3b8"
          activeColor="#10b981"
          imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
          imageAlt="Cybersecurity SOC operations monitor"
          topItems={hmwTopJourney}
          bottomItems={hmwBottomJourney}
          duration={1.4}
        />

        {/* Lead-out Transition Section */}
        <section className="py-16 px-6 text-center text-sm font-mono text-slate-400 border-t border-b border-neutral-900 bg-black">
          <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">
            CONTINUOUS VERIFICATION GUARANTEE
          </p>
          <p className="text-white text-base font-semibold max-w-xl mx-auto">
            From initial perimeter DNS mapping to mathematically verified 1-click pull request patches.
          </p>
        </section>

        {/* Deep Multi-Engine Technical Specifications Flow */}
        <MultiEngineSecurityArchitecture />
      </main>

      {/* Footer */}
      <EnterpriseFooter />
    </div>
  );
};
