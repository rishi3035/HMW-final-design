import React from "react";
import {
  ShieldCheck,
  LockKeyhole,
  Zap,
  Code2,
  CheckCircle2,
  ArrowRight,
  Terminal,
} from "lucide-react";

export const HowItWorksStepsSection: React.FC = () => {
  const steps = [
    {
      num: "STEP 01",
      title: "Verify Domain Ownership",
      description:
        "Add a lightweight DNS TXT record or upload a temporary validation file. Guarantees 100% legal authorization and prevents unauthorized scanning.",
      icon: LockKeyhole,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10 border-emerald-500/30",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      tagColor: "text-emerald-400",
      hoverBorder: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
      tag: "Instant DNS / well-known Check",
      tagIcon: CheckCircle2,
    },
    {
      num: "STEP 02",
      title: "Run 200+ Multi-Engine Audit",
      description:
        "OWASP ZAP, Nuclei, and Semgrep analyze your active routes, headers, exposed .env secrets, auth logic, and API endpoints in 3–8 minutes.",
      icon: Zap,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10 border-amber-500/30",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      tagColor: "text-amber-400",
      hoverBorder: "hover:border-amber-500/50 hover:shadow-amber-500/10",
      tag: "ZAP DAST + Nuclei CVEs + Semgrep SAST",
      tagIcon: Zap,
    },
    {
      num: "STEP 03",
      title: "Launch Score & AI Fix Prompts",
      description:
        "Receive your 0–100 Launch Scorecard and formatted prompts. Copy and paste directly into Cursor or Claude to refactor the code automatically.",
      icon: Code2,
      iconColor: "text-orange-400",
      iconBg: "bg-orange-500/10 border-orange-500/30",
      badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      tagColor: "text-orange-400",
      hoverBorder: "hover:border-orange-500/50 hover:shadow-orange-500/10",
      tag: "1-Click Copy Prompts For Developers",
      tagIcon: Terminal,
    },
  ];

  return (
    <section
      id="how-it-works"
      aria-label="How It Works in 3 Simple Steps"
      className="relative w-full py-16 sm:py-24 border-b border-neutral-800 bg-neutral-950 overflow-hidden text-center"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url('/green-aura-bg.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Header & Category Badge */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            <span>HOW IT WORKS IN 3 SIMPLE STEPS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            From Verification to Instant Security Fix Prompts
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Safe, automated, and legal. Audit any website in minutes and patch code vulnerabilities effortlessly.
          </p>
        </div>

        {/* 3 Side-by-Side Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto pt-2 text-left">
          {steps.map((step) => {
            const StepIcon = step.icon;
            const TagIcon = step.tagIcon;
            return (
              <div
                key={step.num}
                className={`group relative rounded-3xl p-6 sm:p-8 bg-neutral-900/90 border border-neutral-800 shadow-2xl flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] ${step.hoverBorder}`}
              >
                <div className="space-y-5">
                  {/* Top Row: Icon Container + Step Pill */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`size-12 rounded-2xl border flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 ${step.iconBg} ${step.iconColor}`}
                    >
                      <StepIcon className="size-5" />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border ${step.badgeColor}`}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Card Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Verified Line */}
                <div className="pt-4 border-t border-neutral-800 flex items-center gap-2 text-xs font-semibold font-mono">
                  <TagIcon className={`size-4 shrink-0 ${step.tagColor}`} />
                  <span className={step.tagColor}>{step.tag}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Action Bar under 3 Steps */}
        <div className="max-w-6xl mx-auto mt-6 p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-left">
          <div className="flex items-center gap-3 text-slate-300 font-medium text-xs sm:text-sm">
            <Zap className="size-5 text-emerald-400 shrink-0" />
            <span>Want to see our complete workflow from vulnerability scan to verified code fix?</span>
          </div>
          <a
            href="/how-it-works"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-all flex items-center gap-2 shrink-0 shadow-md shadow-emerald-500/20 hover:scale-[1.02] cursor-pointer"
          >
            <span>Explore Complete 8-Step Guide</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksStepsSection;
