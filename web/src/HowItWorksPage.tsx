import React, { useState } from "react";
import Timeline, { JourneyItem } from "@/components/ui/timeline";
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
      <Navbar className="top-4">
        {/* Desktop Navigation */}
        <NavBody className="max-w-4xl">
          {/* LEFT: Brand Logo */}
          <NavbarLogo href="/" />

          {/* CENTER: Navigation Links */}
          <NavItems items={navItems} />

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2">
            <a
              href="/#signin"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/");
              }}
              className="px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white text-xs font-medium hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              Sign In
            </a>
            <button
              type="button"
              onClick={() => navigateTo("/")}
              className="px-5 py-2 rounded-xl bg-black hover:bg-neutral-900 text-white font-semibold text-xs border border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
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

      {/* Main Content Area: Pinned Horizontal Execution Timeline Experience */}
      <main className="flex-1 w-full bg-black text-white">
        {/* Lead-in Hero so the pinned timeline has somewhere to scroll in from */}
        <section className="flex h-screen flex-col items-center justify-center gap-4 px-6 text-center pt-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
            Autonomous Security Execution Bus
          </p>
          <h1 className="max-w-[18ch] text-4xl font-black leading-tight tracking-tight sm:text-6xl text-white">
            Six stages, one horizontal execution pipeline.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            Keep scrolling — the section pins, the track slides sideways, and each
            security milestone draws its stem and reveals its telemetry as it reaches center.
          </p>
          <span className="mt-4 animate-bounce text-emerald-400 text-xl font-bold">&darr;</span>
        </section>

        {/* Pinned Horizontal Scroll Timeline */}
        <Timeline
          title="Security Pipeline"
          periodLabel="Surface ➔ Fix"
          backgroundColor="#000000"
          textColor="#ffffff"
          mutedTextColor="#a1a1aa"
          activeColor="#10b981"
          imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
          imageAlt="Cybersecurity SOC operations monitor"
          topItems={hmwTopJourney}
          bottomItems={hmwBottomJourney}
          duration={1.4}
        />

        {/* Lead-out Closing Section */}
        <section className="flex h-screen flex-col items-center justify-center gap-6 px-6 text-center text-slate-400 border-t border-neutral-900 bg-black">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
            Closed-Loop Verification Guarantee
          </p>
          <h2 className="max-w-2xl text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
            From initial perimeter reconnaissance to mathematically verified 1-click pull request patches.
          </h2>
          <p className="max-w-md text-sm text-neutral-400 leading-relaxed">
            Zero bluff vulnerabilities. 100% reproducible non-destructive proof. Instant automated developer workflow.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => {
                navigateTo("/");
                setTimeout(() => {
                  const input = document.querySelector('input[placeholder*="your-startup"]') as HTMLInputElement | null;
                  if (input) {
                    input.focus();
                    input.select();
                  }
                }, 300);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Free Security Scan
            </button>
            <button
              type="button"
              onClick={() => navigateTo("/")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-slate-200 bg-black hover:bg-neutral-900 border border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Enterprise Demo
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <EnterpriseFooter />
    </div>
  );
};
