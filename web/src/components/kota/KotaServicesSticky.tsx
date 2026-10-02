import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Clock, PackageCheck, Zap } from "lucide-react";

interface ServiceTier {
  id: string;
  number: string;
  name: string;
  tagline: string;
  timeline: string;
  startingPrice: string;
  deliverables: string[];
  highlight: string;
}

const services: ServiceTier[] = [
  {
    id: "landing",
    number: "01",
    name: "Landing Page",
    tagline: "High-converting, motion-driven single-page experiences built to capture interest and drive immediate signups.",
    timeline: "1–2 Weeks",
    startingPrice: "$2,500",
    highlight: "Most Popular for Product Launches",
    deliverables: [
      "Custom responsive design in Figma",
      "Production-ready Framer build",
      "Smooth scroll animations & micro-interactions",
      "Interactive 3D / WebGL accents",
      "Form integration & analytics tracking",
      "SEO & OpenGraph optimization",
    ],
  },
  {
    id: "marketing",
    number: "02",
    name: "Marketing Site",
    tagline: "Scalable multi-page digital flagships with modular CMS, custom layouts, and flawless responsiveness across all devices.",
    timeline: "2–4 Weeks",
    startingPrice: "$4,500",
    highlight: "For Scaling Startups & Agencies",
    deliverables: [
      "Full site architecture (5–12 pages)",
      "Dynamic Framer CMS collections (Blog, Case Studies)",
      "Bespoke motion systems & page transitions",
      "Figma design system & reusable tokens",
      "Zero-latency global CDN deployment",
      "1-on-1 team handover & video tutorials",
    ],
  },
  {
    id: "motion",
    number: "03",
    name: "Motion Design",
    tagline: "Elevating existing websites with buttery-smooth spring physics, kinetic typography, and immersive custom interactions.",
    timeline: "1–3 Weeks",
    startingPrice: "$3,000",
    highlight: "For Next-Gen Creative Impact",
    deliverables: [
      "Fluid magnetic follower cursors",
      "Word-by-word scroll-linked reveals",
      "WebGL shader & canvas backgrounds",
      "Interactive product showcase carousels",
      "Custom React / GSAP animation bridges",
      "Performance audit & 60fps optimization",
    ],
  },
];

interface KotaServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export const KotaServicesSticky: React.FC<KotaServicesProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<string>("landing");
  const currentService = services.find((s) => s.id === activeTab) || services[0];

  return (
    <section id="services" className="relative w-full bg-[#EFEFEF] text-black py-24 sm:py-32 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-700">
              [ 02 / Services ]
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight mt-2">
              Our Services
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            We partner with forward-thinking founders and creative brands to design and engineer motion-rich web experiences.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap gap-2 pt-8 pb-10">
          {services.map((service) => {
            const isActive = service.id === activeTab;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`relative px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-black text-white shadow-lg"
                    : "bg-white/80 text-neutral-700 hover:bg-white hover:text-black border border-black/5"
                }`}
              >
                <span className="font-mono text-[11px] opacity-60">{service.number}</span>
                <span>{service.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="w-1.5 h-1.5 rounded-full bg-blue-500"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Card Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-12 lg:p-16 rounded-[40px] bg-white border border-black/10 shadow-xl relative overflow-hidden"
          >
            {/* Subtle background badge */}
            <div className="absolute top-8 right-8 hidden md:block">
              <span className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-medium text-blue-700 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                {currentService.highlight}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* LEFT: Overview */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
                <div>
                  <span className="font-mono text-xs font-bold text-neutral-400">
                    SERVICE {currentService.number}
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-1">
                    {currentService.name}
                  </h3>
                  <p className="text-neutral-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
                    {currentService.tagline}
                  </p>
                </div>

                {/* Meta Grid */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-100">
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Timeline</span>
                    </div>
                    <div className="text-xl font-bold text-neutral-900 mt-1">
                      {currentService.timeline}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500">
                      <PackageCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Starting from</span>
                    </div>
                    <div className="text-xl font-bold text-neutral-900 mt-1">
                      {currentService.startingPrice}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div>
                  <button
                    onClick={() => onSelectService?.(currentService.name)}
                    data-cursor-text="START"
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors cursor-pointer shadow-lg shadow-black/10"
                  >
                    <span>Start a project</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* RIGHT: Deliverables checklist */}
              <div className="lg:col-span-6 bg-[#FAFAFA] p-6 sm:p-10 rounded-[32px] border border-neutral-200/70 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-6">
                    What's Included
                  </h4>
                  <ul className="space-y-4">
                    {currentService.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-neutral-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200/60 text-xs font-mono text-neutral-500 flex items-center justify-between">
                  <span>Guaranteed turnaround</span>
                  <span>100% Framer native</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
