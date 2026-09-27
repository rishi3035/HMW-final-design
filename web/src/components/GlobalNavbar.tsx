"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "./ui/resizable-navbar";
import { globalNavItems } from "../lib/navigation";
import { AuthModal } from "./AuthModal";

export interface GlobalNavbarProps {
  className?: string;
  initialDomain?: string;
  onBookDemo?: () => void;
}

export const GlobalNavbar: React.FC<GlobalNavbarProps> = ({
  className,
  initialDomain = "https://my-startup.com",
  onBookDemo,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenAuth = () => {
    if (onBookDemo) {
      onBookDemo();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = (email: string) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("hmw_target_domain", initialDomain);
      window.sessionStorage.setItem("hmw_user_email", email);
      window.history.pushState({}, "", "/workspace");
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar className={className || "top-4"}>
        {/* Desktop Navigation */}
        <NavBody>
          {/* LEFT: Brand Logo */}
          <div className="shrink-0 flex items-center justify-start z-20">
            <NavbarLogo />
          </div>

          {/* CENTER: Perfectly Centered Middle Nav Items */}
          <div className="flex-1 flex items-center justify-center z-20 min-w-0 px-2">
            <NavItems items={globalNavItems} />
          </div>

          {/* RIGHT: Professional Enterprise Actions */}
          <div className="shrink-0 flex items-center justify-end gap-3 sm:gap-3.5 z-20">
            <a
              href="/login"
              className="px-3 py-2 rounded-xl text-slate-300 hover:text-white text-xs font-medium hover:bg-neutral-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Sign In
            </a>

            <button
              type="button"
              onClick={handleOpenAuth}
              className="px-5 sm:px-6 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white font-semibold text-xs border border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer shadow-sm tracking-normal whitespace-nowrap shrink-0"
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
            <div className="w-full space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {globalNavItems.map((item, idx) => (
                <div key={`mobile-nav-${idx}`} className="border-b border-neutral-800/80 pb-2">
                  <a
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-slate-200 hover:text-emerald-400 font-semibold text-sm py-1.5 transition-colors"
                  >
                    {item.name}
                  </a>
                  {item.dropdown && (
                    <div className="pl-3 mt-1 space-y-1.5 border-l border-neutral-800">
                      {item.dropdown.map((sub, sIdx) => (
                        <a
                          key={`mobile-sub-${sIdx}`}
                          href={sub.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-300 py-1 transition-colors"
                        >
                          <span className="text-xs">{sub.icon}</span>
                          <span className="font-medium">{sub.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex w-full flex-col gap-2.5 pt-3 border-t border-neutral-800">
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

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialDomain={initialDomain}
      />
    </>
  );
};
export default GlobalNavbar;
