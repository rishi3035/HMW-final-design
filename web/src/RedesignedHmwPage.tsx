import React, { useState } from "react";
import {
  HmwKotaCursor,
  HmwKotaNavbar,
  HmwKotaHero,
  HmwKotaArchitecture,
  HmwKotaWordReveal,
  HmwKotaComparisonSection,
  HmwKotaDeliverablesGrid,
  HmwKotaPricing,
  HmwKotaAccordionFaq,
  HmwKotaFooter,
  HmwScanDemoModal,
} from "./components/hmw-kota";
import { AuthModal } from "./components/AuthModal";
import { BrandedPdfModal } from "./components/BrandedPdfModal";

export const RedesignedHmwPage: React.FC = () => {
  const [scanUrl, setScanUrl] = useState("https://my-startup.com");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

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
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-neutral-950 font-sans relative antialiased">
      {/* 1. Fluid Follower Magnetic Cursor with [SCAN] / [RUN] tags */}
      <HmwKotaCursor />

      {/* 2. Floating Glass Pill Navigation with Live Telemetry Clock */}
      <HmwKotaNavbar
        onStartScan={handleOpenAuth}
        onBookDemo={handleOpenAuth}
      />

      {/* 3. Kinetic Display Hero with Interactive URL Scanner & Demo Trigger */}
      <HmwKotaHero
        scanUrl={scanUrl}
        setScanUrl={setScanUrl}
        onStartScan={handleOpenAuth}
        onOpenDemo={() => setIsDemoModalOpen(true)}
        onOpenSampleReport={() => setIsPdfModalOpen(true)}
      />

      {/* 4. Three-Tier Security Engine (DAST / SAST / AI Remediation) */}
      <HmwKotaArchitecture onSelectTier={handleOpenAuth} />

      {/* 5. Signature Word-by-Word Scroll Reveal Endorsement */}
      <HmwKotaWordReveal />

      {/* 6. Traditional Pentest vs. Hack My Website (7 Min) Interactive Slider Comparison */}
      <HmwKotaComparisonSection onStartScan={handleOpenAuth} />

      {/* 7. Security Deliverables Grid (PDF / Cursor Prompts / GitHub Bot / API Fuzzing / Compliance) */}
      <HmwKotaDeliverablesGrid onSelectDeliverable={handleOpenAuth} />

      {/* 7. Predictable Transparent Pricing Tiers */}
      <HmwKotaPricing onSelectPlan={handleOpenAuth} />

      {/* 8. Hairline Security FAQ Accordion */}
      <HmwKotaAccordionFaq />

      {/* 9. Massive Kinetic Display Footer */}
      <HmwKotaFooter onStartScan={handleOpenAuth} />

      {/* 10. Live Interactive Security Sandbox Modal */}
      <HmwScanDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onStartRealScan={handleOpenAuth}
      />

      {/* 11. Verified Sample Audit Report (PDF) Preview Modal */}
      <BrandedPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        agencyName="Hack My Website Sovereign Security"
        primaryAccent="#22C55E"
        secondaryAccent="#4ADE80"
        disclaimer="This executive security assessment report is generated via autonomous non-destructive DAST, SAST, and API telemetry on AWS Mumbai sovereign nodes."
        targetDomain={scanUrl || "https://app.production-saas.com"}
        score={94}
      />

      {/* 12. Enterprise Authentication & Scan Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialDomain={scanUrl}
      />
    </div>
  );
};

export default RedesignedHmwPage;
