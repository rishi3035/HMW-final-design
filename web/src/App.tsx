import React, { useState, useEffect } from "react";
import { RedesignedHmwPage } from "./RedesignedHmwPage";
import { HowItWorksPage } from "./HowItWorksPage";
import { DashboardPage } from "./DashboardPage";

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

  const isHowItWorks =
    currentPath === "/how-it-works" ||
    currentPath.startsWith("/how-it-works/") ||
    currentPath.endsWith("how-it-works");

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

  if (isHowItWorks) {
    return <HowItWorksPage />;
  }

  return <RedesignedHmwPage />;
};

export default App;
