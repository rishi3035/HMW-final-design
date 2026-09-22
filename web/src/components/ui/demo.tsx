import React from "react";
import { PricingSection, type PricingPlan } from "@/components/ui/pricing";

// Official HackMyWebsite pricing tiers from hackmywebsite.io
const hmwPricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "0",
    yearlyPrice: "0",
    period: "month",
    description: "Instant security scanning to identify vulnerability risks with blurred dashboard findings.",
    buttonText: "Start Free Scan",
    href: "https://hackmywebsite.io/workspace",
    features: [
      "1 website target",
      "1 scan per month",
      "2-page executive PDF summary",
      "Blurred vulnerability details preview",
      "Domain ownership verification required",
    ],
  },
  {
    name: "Starter",
    price: "1999",
    yearlyPrice: "1599",
    period: "month",
    description: "For solo founders who want full unblurred security reports and PDF exports.",
    buttonText: "Get Starter Plan",
    href: "https://hackmywebsite.io/workspace?tab=billing&plan=starter",
    features: [
      "1 website target",
      "3 scans per month",
      "Full unblurred PDF security report",
      "AI Launch Score evaluation",
      "Cursor / Claude Code fix prompts",
    ],
  },
  {
    name: "Pro",
    price: "2999",
    yearlyPrice: "2399",
    period: "month",
    description: "The most practical tier for growing startups with GitHub integration and API fuzzing.",
    buttonText: "Get Pro Plan",
    href: "https://hackmywebsite.io/workspace?tab=billing&plan=pro",
    isPopular: true,
    popularBadge: "Most Practical",
    features: [
      "3 website targets",
      "10 scans per month",
      "GitHub repo SAST/DAST checks",
      "API & GraphQL fuzzing",
      "Priority scan queue processing",
    ],
  },
  {
    name: "Agency",
    price: "4999",
    yearlyPrice: "3999",
    period: "month",
    description: "For agencies and development studios requiring white-label reports and compliance maps.",
    buttonText: "Get Agency Plan",
    href: "https://hackmywebsite.io/workspace?tab=billing&plan=agency",
    features: [
      "10 website targets",
      "Unlimited monthly scans",
      "White-label PDF report branding",
      "Compliance mapping (SOC 2, ISO, HIPAA, DPDP)",
      "Dedicated agency support channel",
    ],
  },
];

// Showcase component connected to HackMyWebsite pricing
export default function PricingSectionDemo() {
  return (
    <PricingSection
      plans={hmwPricingPlans}
      badge="Transparent Subscription Tiers"
      title="Predictable Pricing for Founders & Agencies"
      description="Choose a plan to run unblurred scans, get AI remediation prompts, and unlock white-label client security deliverables."
    />
  );
}
