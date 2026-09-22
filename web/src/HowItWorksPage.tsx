import React, { useState } from "react";
import { MultiEngineSecurityArchitecture } from "./components/MultiEngineSecurityArchitecture";
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

export const HowItWorksPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 selection:bg-emerald-500 selection:text-neutral-950 font-sans relative flex flex-col justify-between">
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
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
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
                className="w-full text-center text-slate-200 py-2.5 text-xs font-medium rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 block"
              >
                Sign In
              </a>
              <button
                type="button"
                onClick={() => {
                  navigateTo("/");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center text-white py-2.5 text-xs font-semibold rounded-xl bg-slate-800 border border-slate-700 shadow-md block cursor-pointer"
              >
                Book Enterprise Demo
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Main Content Area: Multi-Engine Security Architecture */}
      <main className="flex-1 w-full flex flex-col justify-center">
        <MultiEngineSecurityArchitecture />
      </main>

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
