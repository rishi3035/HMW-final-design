import React, { useState } from "react";
import { KotaCursor } from "./components/kota/KotaCursor";
import { KotaNavbar } from "./components/kota/KotaNavbar";
import { KotaHero } from "./components/kota/KotaHero";
import { KotaServicesSticky } from "./components/kota/KotaServicesSticky";
import { KotaWordReveal } from "./components/kota/KotaWordReveal";
import { KotaTemplatesGrid } from "./components/kota/KotaTemplatesGrid";
import { KotaAccordionFaq } from "./components/kota/KotaAccordionFaq";
import { KotaFooter } from "./components/kota/KotaFooter";
import { KotaReelModal } from "./components/kota/KotaReelModal";
import { ShieldCheck } from "lucide-react";

export const KotaStudioPage: React.FC = () => {
  const [isReelOpen, setIsReelOpen] = useState(false);

  const handleContact = () => {
    const el = document.getElementById("faq");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#EFEFEF] text-black selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* 1. Fluid Follower Cursor */}
      <KotaCursor />

      {/* 2. Floating Pill Navigation */}
      <KotaNavbar onContactClick={handleContact} />

      {/* 3. Hero Section with Kinetic Headline */}
      <KotaHero onOpenReel={() => setIsReelOpen(true)} />

      {/* 4. Services Breakdown (Landing Page / Marketing Site / Motion Design) */}
      <KotaServicesSticky onSelectService={() => handleContact()} />

      {/* 5. Signature Word-by-Word Scroll Reveal */}
      <KotaWordReveal />

      {/* 6. Featured Framer Templates Grid */}
      <KotaTemplatesGrid />

      {/* 7. Questions & Hairline FAQ Accordion */}
      <KotaAccordionFaq />

      {/* 8. Massive Magnetic Display Footer */}
      <KotaFooter onStartProject={handleContact} />

      {/* 9. Interactive Showreel Modal */}
      <KotaReelModal isOpen={isReelOpen} onClose={() => setIsReelOpen(false)} />

      {/* Floating Link back to HackMyWebsite */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="/"
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 hover:bg-black text-white text-xs font-mono shadow-2xl backdrop-blur-md border border-white/20 transition-all hover:scale-105"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Back to Hack My Website</span>
        </a>
      </div>
    </div>
  );
};

export default KotaStudioPage;
