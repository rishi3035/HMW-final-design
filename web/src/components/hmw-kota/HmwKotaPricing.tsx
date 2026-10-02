import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  description: string;
  buttonText: string;
  popular?: boolean;
  features: string[];
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    yearlyPrice: "$0",
    description: "Instant security scanning to identify vulnerability risks with blurred dashboard findings.",
    buttonText: "Start Free Scan",
    features: [
      "1 website target domain",
      "1 scan per month",
      "2-page executive summary PDF",
      "Blurred vulnerability findings preview",
      "DNS domain ownership verification",
    ],
  },
  {
    name: "Starter",
    price: "$1,999",
    yearlyPrice: "$1,599",
    description: "For solo founders who want full unblurred vulnerability reports and PDF exports.",
    buttonText: "Get Starter Plan",
    features: [
      "1 website target domain",
      "3 scans per month",
      "Full unblurred PDF security report",
      "AI Launch Score evaluation",
      "Cursor / Claude Code fix prompts",
      "Email vulnerability alerts",
    ],
  },
  {
    name: "Pro",
    price: "$2,999",
    yearlyPrice: "$2,399",
    popular: true,
    description: "The most practical tier for growing startups with GitHub integration and API fuzzing.",
    buttonText: "Get Pro Plan",
    features: [
      "3 website targets",
      "10 scans per month",
      "GitHub repo SAST/DAST checks",
      "API & GraphQL fuzzing suite",
      "Automated PR security gate bot",
      "Priority scan queue processing",
    ],
  },
  {
    name: "Agency",
    price: "$4,999",
    yearlyPrice: "$3,999",
    description: "For agencies and development studios requiring white-label reports and compliance maps.",
    buttonText: "Get Agency Plan",
    features: [
      "10 website targets",
      "Unlimited monthly scans",
      "White-label PDF report branding",
      "Compliance mapping (India DPDP Act 2023, HIPAA, OWASP)",
      "Dedicated agency Slack channel",
      "Tamper-proof client QR seals",
    ],
  },
];

interface HmwKotaPricingProps {
  onSelectPlan: (planName: string) => void;
}

export const HmwKotaPricing: React.FC<HmwKotaPricingProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="relative w-full bg-[#EFEFEF] text-black py-24 sm:py-36 px-4 sm:px-8 border-b border-black/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto pb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-2">
            [ Transparent Pricing ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950">
            Predictable Tiers for Founders & <span className="text-emerald-700">Agencies.</span>
          </h2>
          <p className="mt-4 text-neutral-600 text-base sm:text-lg">
            Choose a plan to run unblurred scans, get automated Cursor remediation prompts, and unlock white-label client security deliverables.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-white border border-black/10 shadow-sm">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                !isAnnual
                  ? "bg-black text-white shadow-sm"
                  : "text-neutral-600 hover:text-black"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                isAnnual
                  ? "bg-black text-white shadow-sm"
                  : "text-neutral-600 hover:text-black"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {plans.map((plan, idx) => {
            const price = isAnnual ? plan.yearlyPrice : plan.price;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative rounded-[32px] p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  plan.popular
                    ? "bg-black text-white border-2 border-emerald-500 shadow-2xl scale-[1.02] z-10"
                    : "bg-white text-black border border-black/10 shadow-lg hover:border-black/25"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Most Practical
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold tracking-tight">{plan.name}</h3>
                    <span className="text-xs font-medium text-neutral-400">
                      / mo
                    </span>
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-bold tracking-tight">
                      {price}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">USD</span>
                  </div>

                  <p
                    className={`mt-4 text-xs leading-relaxed ${
                      plan.popular ? "text-neutral-300" : "text-neutral-600"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div
                    className={`my-6 h-[1px] ${
                      plan.popular ? "bg-white/15" : "bg-black/10"
                    }`}
                  />

                  {/* Feature checklist */}
                  <ul className="space-y-3 text-xs">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span
                          className={
                            plan.popular ? "text-neutral-200" : "text-neutral-800"
                          }
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan Button */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectPlan(plan.name)}
                    data-cursor-text={plan.popular ? "UPGRADE" : "CHOOSE"}
                    className={`w-full py-3.5 px-6 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      plan.popular
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                        : "bg-black hover:bg-neutral-800 text-white"
                    }`}
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
