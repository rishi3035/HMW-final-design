import React from "react";
import {
  Radar,
  Zap,
  Share2,
  Code2,
  Layout,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface EngineItem {
  name: string;
  tag: string;
  tagColor: string;
  icon: React.ElementType;
  iconColor: string;
  description: string;
  metrics: string;
}

export const OfficialMultiEngineSection: React.FC = () => {
  const engines: EngineItem[] = [
    {
      name: "OWASP ZAP",
      tag: "DAST RUNTIME",
      tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      icon: Zap,
      iconColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      description: "Dynamic Application Security Testing simulating live attacks to uncover SQLi, XSS, and broken access controls with zero service interruption.",
      metrics: "240 Probes / Sec",
    },
    {
      name: "Nuclei v3.3",
      tag: "CVE TEMPLATES",
      tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      icon: Share2,
      iconColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      description: "Curated community feed of 5,400+ zero-day CVEs, unpatched CVE signatures, open admin consoles, and SSL/TLS cipher misconfigurations.",
      metrics: "5,420+ CVE Feed",
    },
    {
      name: "Semgrep SAST",
      tag: "SAST & SECRETS",
      tagColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      icon: Code2,
      iconColor: "text-sky-400 border-sky-500/30 bg-sky-500/10",
      description: "Static code analysis scanning source trees, exposed .env variables, hardcoded JWT secrets, and client-side JavaScript sourcemaps.",
      metrics: "AST Syntax Rules",
    },
    {
      name: "Playwright Crawler",
      tag: "HEADLESS SPIDER",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      icon: Layout,
      iconColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      description: "Headless Chromium browser surface crawler rendering dynamic Single Page Applications (Next.js, React, Vue) to map hidden API attack vectors.",
      metrics: "Full DOM Traversal",
    },
    {
      name: "Custom Policy Checks",
      tag: "HEURISTIC POLICIES",
      tagColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
      icon: ShieldCheck,
      iconColor: "text-teal-400 border-teal-500/30 bg-teal-500/10",
      description: "Deterministic SaaS security rules for CSP frame-ancestors, HSTS preload, CORS wildcard policies, and Supabase / Firebase RLS safeguards.",
      metrics: "200+ Policy Rules",
    },
  ];

  return (
    <section
      id="detection"
      aria-labelledby="multi-engine-heading"
      className="relative w-full py-16 sm:py-24 border-b border-neutral-800 bg-neutral-950 overflow-hidden text-left"
    >
      {/* Background radial atmosphere */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Main Card Container */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Top Header Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Header */}
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <Radar className="size-4 text-emerald-400 animate-pulse" />
                <span>Multi-Engine Detection Architecture</span>
              </div>
              <h2
                id="multi-engine-heading"
                className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight"
              >
                Multi-Engine Detection.<br />
                One <span className="text-emerald-400">Actionable</span> Report.
              </h2>
            </div>

            {/* Right Header with Left Vertical Border */}
            <div className="lg:col-span-6 lg:border-l lg:border-neutral-800 lg:pl-8 space-y-3">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                Multiple specialized security engines collect raw technical evidence across your application layer. Hack My Website correlates, deduplicates, and turns findings into a single prioritized remediation workflow with 1-click IDE fix prompts.
              </p>
              <div>
                <a
                  href="/sample-report"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors group cursor-pointer"
                >
                  <span>View Sample Assessment Report</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* 5 Engine Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
            {engines.map((eng) => {
              const EngineIcon = eng.icon;
              return (
                <div
                  key={eng.name}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/90 hover:bg-neutral-850 hover:border-neutral-700 p-5 flex flex-col justify-between space-y-5 transition-all duration-200 shadow-md group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Title & Pill */}
                    <div className="flex items-start gap-3">
                      <div className={`size-10 rounded-xl flex items-center justify-center border shrink-0 ${eng.iconColor}`}>
                        <EngineIcon className="size-5" />
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="text-sm font-bold text-white tracking-tight leading-snug">
                          {eng.name}
                        </div>
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wide uppercase border ${eng.tagColor}`}>
                          {eng.tag}
                        </span>
                      </div>
                    </div>

                    {/* Engine Description */}
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {eng.description}
                    </p>
                  </div>

                  {/* Bottom Active Status & Metric Badge */}
                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="size-3.5 text-emerald-400" />
                      <span>Active</span>
                    </span>
                    <span className="text-neutral-500 font-mono text-[10px]">
                      {eng.metrics}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
