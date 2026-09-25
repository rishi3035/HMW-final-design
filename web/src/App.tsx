import React, { useState, useEffect } from "react";
import { RedesignedHmwPage } from "./RedesignedHmwPage";
import { HowItWorksPage } from "./HowItWorksPage";
import { DashboardPage } from "./DashboardPage";
import { MethodologyPage } from "./MethodologyPage";
import { SampleReportPage } from "./SampleReportPage";
import { ContactPage } from "./ContactPage";
import { LegalPage } from "./LegalPage";
import { AuthPage } from "./AuthPage";
import { ScanDetailPage } from "./ScanDetailPage";

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    // Global click listener to intercept internal anchor navigation for SPA smoothness
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Skip external links, new tabs, and modifier keys
      if (
        target.target === "_blank" ||
        target.hasAttribute("download") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check if it's an internal route link
      if (href.startsWith("/") || href.startsWith("#") || href.startsWith(window.location.origin)) {
        try {
          const targetUrl = new URL(href, window.location.origin);
          
          if (targetUrl.origin === window.location.origin) {
            // If navigating to a different pathname
            if (targetUrl.pathname !== window.location.pathname) {
              e.preventDefault();
              window.history.pushState({}, "", targetUrl.pathname + targetUrl.search + targetUrl.hash);
              setCurrentPath(targetUrl.pathname);
              if (targetUrl.hash) {
                setTimeout(() => {
                  const targetEl = document.querySelector(targetUrl.hash);
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            } else if (targetUrl.hash) {
              // Same page hash navigation
              const targetEl = document.querySelector(targetUrl.hash);
              if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: "smooth" });
                window.history.pushState({}, "", targetUrl.hash);
              }
            } else if (targetUrl.pathname === window.location.pathname && !targetUrl.hash) {
              // Clicking current page link scrolls to top
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }
        } catch {
          // Ignore parse errors
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  // Scan detail route: /dashboard/scan/:scanId or /workspace/scan/:scanId
  const scanMatch = currentPath.match(/^\/(?:dashboard|workspace)\/scan\/([^/]+)/);
  if (scanMatch) {
    const scanId = decodeURIComponent(scanMatch[1]);
    return (
      <ScanDetailPage
        scanId={scanId}
        onNavigateBack={() => {
          window.history.pushState({}, "", "/workspace");
          setCurrentPath("/workspace");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  // Auth routes
  if (currentPath === "/login") {
    return <AuthPage initialMode="login" />;
  }

  if (currentPath === "/signup") {
    return <AuthPage initialMode="signup" />;
  }

  // Workspace automation subroute
  if (currentPath === "/workspace/automation" || currentPath === "/dashboard/automation") {
    return (
      <DashboardPage
        initialTab="automation"
        onNavigateHome={() => {
          window.history.pushState({}, "", "/");
          setCurrentPath("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  const isWorkspace =
    currentPath === "/workspace" ||
    currentPath.startsWith("/workspace/") ||
    currentPath === "/dashboard" ||
    currentPath.startsWith("/dashboard/");

  if (isWorkspace) {
    const targetDomain =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem("hmw_target_domain") || undefined
        : undefined;

    return (
      <DashboardPage
        initialDomain={targetDomain}
        onNavigateHome={() => {
          window.history.pushState({}, "", "/");
          setCurrentPath("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  const isHowItWorks =
    currentPath === "/how-it-works" ||
    currentPath.startsWith("/how-it-works/") ||
    currentPath.endsWith("how-it-works");

  if (isHowItWorks) {
    return <HowItWorksPage />;
  }

  const isMethodology =
    currentPath === "/methodology" ||
    currentPath.startsWith("/methodology/");

  if (isMethodology) {
    return <MethodologyPage />;
  }

  const isSampleReport =
    currentPath === "/sample-report" ||
    currentPath.startsWith("/sample-report/");

  if (isSampleReport) {
    return <SampleReportPage />;
  }

  const isContact =
    currentPath === "/contact" ||
    currentPath.startsWith("/contact/");

  if (isContact) {
    return <ContactPage />;
  }

  const isPrivacy =
    currentPath === "/privacy-policy" ||
    currentPath === "/privacy";

  if (isPrivacy) {
    return <LegalPage initialTab="privacy" />;
  }

  const isTerms =
    currentPath === "/terms" ||
    currentPath === "/terms-and-conditions";

  if (isTerms) {
    return <LegalPage initialTab="terms" />;
  }

  return <RedesignedHmwPage />;
};

export default App;
