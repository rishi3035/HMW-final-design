import React from "react";
import { Radar, ShieldAlert, Code2, ShieldCheck } from "lucide-react";
import { ServiceCarousel, type Service } from "@/components/ui/services-card";

const workflowServices: Service[] = [
  {
    number: "01",
    title: "Discover",
    subheading: "Map Your Application Attack Surface",
    description:
      "Discover accessible routes, APIs, pages, and application surfaces before security testing begins.",
    icon: Radar,
    gradient:
      "from-[#0B0F19] via-[#0D1525] to-emerald-950/50 border-emerald-500/20",
  },
  {
    number: "02",
    title: "Detect",
    subheading: "Multi-Engine Security Testing",
    description:
      "Combine dynamic testing, static analysis, and vulnerability detection to identify weaknesses across your application.",
    icon: ShieldAlert,
    gradient:
      "from-[#0B0F19] via-[#0E1A29] to-cyan-950/50 border-cyan-500/20",
  },
  {
    number: "03",
    title: "Remediate",
    subheading: "Developer-Ready Remediation",
    description:
      "Give engineers contextual findings and actionable remediation guidance they can use to address security issues.",
    icon: Code2,
    gradient:
      "from-[#0B0F19] via-[#1A1813] to-amber-950/50 border-amber-500/20",
  },
  {
    number: "04",
    title: "Verify",
    subheading: "Retest Every Fix",
    description:
      "Run targeted retesting to verify that vulnerabilities have actually been resolved.",
    icon: ShieldCheck,
    gradient:
      "from-[#0B0F19] via-[#0B1A18] to-emerald-950/60 border-emerald-500/30",
  },
];

export const CoreSecurityWorkflow: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#06080F] border-t border-slate-800/80 overflow-hidden text-center">
      {/* Subtle Background Radial Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_15%,rgba(16,185,129,0.07),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.04),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        {/* Section Header (Eyebrow Badge removed as requested) */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.15]">
            From Vulnerability Detection to Verified Remediation
          </h2>

          <div className="space-y-2 pt-2 text-slate-300 max-w-3xl mx-auto">
            <p className="text-base sm:text-lg leading-relaxed">
              Security teams don't need another list of vulnerabilities. They need to know what matters, what to fix, whether it was fixed, and whether the risk is actually reduced.
            </p>
            <p className="text-sm sm:text-base text-emerald-400 font-semibold pt-1">
              HackMyWebsite brings the complete workflow into one platform.
            </p>
          </div>
        </div>

        {/* Animated Service Card Carousel (Ribbon Bar removed as requested) */}
        <div className="pt-4">
          <ServiceCarousel services={workflowServices} />
        </div>
      </div>
    </section>
  );
};

export default CoreSecurityWorkflow;
