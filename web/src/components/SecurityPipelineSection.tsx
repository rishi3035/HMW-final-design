'use client';

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Zap,
  TrendingUp,
  Users,
  ShieldCheck,
  Globe,
  Terminal,
  Cpu,
  Layers,
  Lock,
  BarChart3,
  CheckCircle2,
  Code2,
  Sparkles,
} from "lucide-react";

export const SecurityPipelineSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState(0);

  const features = [
    {
      id: 0,
      title: "Autonomous Recon",
      desc: "Maps DNS, subdomains, cloud buckets & shadow APIs",
      icon: Globe,
      stat: "84 Targets",
      badge: "Perimeter Scoped",
      codeSnippet: "// Reconnaissance completed\n✓ 84 hostnames mapped across 6 TLDs\n✓ 14 S3/GCS buckets inspected\n⚡ 12 undocumented REST/GraphQL endpoints cataloged",
    },
    {
      id: 1,
      title: "Runtime DAST",
      desc: "Behavioral fuzzing across OWASP Top 10 & zero-days",
      icon: Cpu,
      stat: "5,420 CVEs",
      badge: "Multi-Engine Fuzzing",
      codeSnippet: "// Multi-engine vulnerability synthesis\n✓ OWASP Top 10 active probe vectors\n✓ 5,420+ CVE vulnerability signatures\n⚡ 8 potential vulnerabilities isolated for PoC verification",
    },
    {
      id: 2,
      title: "Safe Validation",
      desc: "Isolated sandbox replay guarantees zero DB mutations",
      icon: ShieldCheck,
      stat: "100% Safe",
      badge: "Non-Destructive Guard",
      codeSnippet: "// Non-destructive sandbox replay\n✓ Ephemeral isolated container provisioned\n✓ Safe canary payload sent: HM-CANARY-9281\n✓ DB Mutation Guard: 0 rows altered (100% Safe)",
    },
    {
      id: 3,
      title: "Cursor IDE Diffs",
      desc: "Ready-to-merge patches and contextual IDE prompts",
      icon: Terminal,
      stat: "1-Click Diffs",
      badge: "GitHub PR Safeguard",
      codeSnippet: "// 1-Click Cursor IDE Prompt Generated\n- jwt.decode(req.headers['authorization']);\n+ sovereign_jwt.verify(req.headers['authorization'], secretKey);\n✓ PR check armed in GitHub Actions",
    },
  ];

  const metrics = [
    { label: "Scan Velocity", value: "3.4ms", unit: "latency", trend: "3–8 Min Scan" },
    { label: "Verified Accuracy", value: "99.2%", unit: "proof", trend: "0% Bluff Data" },
    { label: "Runtime Safety", value: "100%", unit: "safe", trend: "Non-Destructive" },
  ];

  const integrations = [
    { name: "React", abbr: "⚛️" },
    { name: "Next.js", abbr: "▲" },
    { name: "Node.js", abbr: "⚙️" },
    { name: "GitHub", abbr: "🐙" },
    { name: "Docker", abbr: "🐳" },
    { name: "GraphQL", abbr: "◈" },
  ];

  const codeExample = `// Autonomous Security Execution Pipeline
const scan = await hmw.scan("https://app.startup.com", {
  recon: { subdomains: true, cloudBuckets: true },
  dast: { owaspTop10: true, cveSignatures: 5420 },
  safety: "100%-non-destructive",
  remediation: "cursor-diff"
});

await scan.verify();
// ✓ 84 endpoints mapped • 0 DB mutations • Patch PR #142 ready
// [RECON] Discovered 14 subdomains across AWS ap-south-1
// [DAST] 5,420 CVE signatures evaluated with 3.4ms latency
// [AST GUARD] AST parser triggered on /api/v1/auth/session.ts
// [VULN] IDOR unauthenticated direct object reference verified
// [REPLAY] Non-destructive isolated sandbox verification PASS
// [DIFF] Generated Cursor 1-click prompt and unified diff
// [GITHUB] PR #142 check armed • Zero-downtime deployment ready`;

  const stats = [
    { label: "Scan Velocity", value: "3–8 Min", icon: Zap, detail: "Parallel Distributed Pipeline" },
    { label: "Accuracy Rate", value: "99.2%", icon: ShieldCheck, detail: "Deterministic Verified PoC" },
    { label: "Runtime Safety", value: "100%", icon: Lock, detail: "Zero Production Mutation" },
    { label: "Fix Workflow", value: "1-Click", icon: Terminal, detail: "Cursor & Claude Code Diffs" },
  ];

  const activeFeature = features[activeTab];

  return (
    <section
      id="how-it-works"
      aria-label="Section 4 — From Attack Surface to Actionable Security"
      className="relative w-full py-16 sm:py-20 px-4 md:px-8 text-white font-sans antialiased overflow-hidden border-b border-neutral-800"
    >
      {/* Green Aura Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{
            backgroundImage: `url('/green-aura-bg.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
        
        {/* Section Header - Centered in Middle with tight spacing */}
        <div className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15]">
            From Attack Surface to<br className="hidden sm:inline" /> Actionable Security.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            One continuous security pipeline that discovers, analyzes, validates, and prioritizes vulnerabilities before they become production incidents.
          </p>
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto md:auto-rows-[315px]">
          
          {/* Large Hero Card - Interactive Features */}
          <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-2xl border border-neutral-800 bg-black p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-neutral-700 shadow-xl ring-1 ring-white/10">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-emerald-400 text-xs  font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Autonomous Engine
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-white">
                Core Execution Stages
              </h3>
              <p className="text-sm text-slate-400">
                Click any stage to inspect live vulnerability telemetry
              </p>
            </div>

            {/* Feature Selector Grid */}
            <div className="grid grid-cols-2 gap-3 relative z-10 my-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                const isActive = activeTab === feature.id;
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => setActiveTab(feature.id)}
                    className={cn(
                      "group/card relative overflow-hidden rounded-xl p-3.5 border transition-all duration-300 flex flex-col cursor-pointer text-left",
                      isActive
                        ? "bg-neutral-900 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                        : "bg-black border-neutral-800 hover:border-neutral-700"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 mb-2 transition-colors",
                        isActive ? "text-emerald-400" : "text-neutral-500"
                      )}
                    />
                    <span className="text-xs font-bold text-white text-left">{feature.title}</span>
                    <span className="text-xs text-emerald-400/90 text-left mt-1  font-medium line-clamp-1">
                      {feature.stat}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Area */}
            <div className="relative z-10 p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs  text-emerald-400 font-bold uppercase">
                    STAGE 0{activeFeature.id + 1} // {activeFeature.badge}
                  </span>
                  <span className="text-xs  text-slate-500">Telemetry Active</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-white">{activeFeature.title}</p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeFeature.desc}</p>
              </div>

              {/* Code Snippet Preview */}
              <div className="mt-3 p-2.5 rounded-lg bg-black border border-neutral-800/80  text-xs text-slate-400 leading-snug">
                <pre className="whitespace-pre-wrap  text-xs text-emerald-400/90">
                  {activeFeature.codeSnippet}
                </pre>
              </div>
            </div>
          </div>

          {/* Metrics Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-black p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:border-neutral-700 shadow-xl ring-1 ring-white/10">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-emerald-400">
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/20 text-emerald-400  font-semibold">
                    Live Stream
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white leading-none">Telemetry Metrics</h3>
                <p className="text-xs text-slate-400 mt-1.5 mb-3">Real-time scan guarantees</p>
              </div>

              <div className="space-y-2.5">
                {metrics.map((metric, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedMetric(idx)}
                    className={cn(
                      "w-full text-left px-3 py-2 sm:py-2.5 rounded-xl transition-all duration-200 border cursor-pointer flex items-center justify-between",
                      selectedMetric === idx
                        ? "bg-neutral-900 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                        : "bg-neutral-950/70 border-neutral-800/80 hover:border-neutral-700"
                    )}
                  >
                    <div>
                      <p className="text-xs text-slate-400  leading-none">{metric.label}</p>
                      <p className="text-sm font-bold  text-white leading-none mt-1.5">{metric.value}</p>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold  bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      {metric.trend}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Integrations Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-black p-6 flex flex-col justify-between transition-all duration-300 hover:border-neutral-700 shadow-xl ring-1 ring-white/10">
            <div className="relative z-10">
              <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg w-fit mb-3 text-emerald-400">
                <Layers className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-0.5">Tech Integrations</h3>
              <p className="text-xs text-slate-400 mb-3">Native stack & CI/CD support</p>

              <div className="grid grid-cols-3 gap-2">
                {integrations.map((int, idx) => (
                  <div
                    key={idx}
                    className="group/int p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <span className="text-xl group-hover/int:scale-125 transition-transform duration-200">
                      {int.abbr}
                    </span>
                    <p className="text-xs text-slate-400 text-center ">{int.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Terminal Demo Card */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-2xl border border-neutral-800 bg-black p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:border-neutral-700 shadow-xl ring-1 ring-white/10">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-emerald-400">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-sm font-bold text-white">Autonomous Scan Command</h3>
              </div>
              <span className="text-xs  text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold">
                GitHub PR Gateway
              </span>
            </div>

            {/* Terminal Code Box - Scrollable Command Center */}
            <div className="flex-1 w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 sm:p-4  text-xs sm:text-[11.5px] leading-relaxed overflow-y-auto max-h-[195px] terminal-scroll pr-2.5">
              <div className="space-y-1">
                {codeExample.split("\n").map((line, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <span className="text-neutral-600 select-none w-4 text-right shrink-0  text-xs pt-0.5">
                      {idx + 1}
                    </span>
                    <span
                      className={cn(
                        "whitespace-pre ",
                        line.includes("//")
                          ? "text-slate-500 font-medium"
                          : line.includes("✓")
                          ? "text-emerald-400 font-bold"
                          : line.includes("const") || line.includes("await")
                          ? "text-cyan-400"
                          : line.includes("[")
                          ? "text-amber-400/90 font-medium"
                          : "text-slate-200"
                      )}
                    >
                      {line || "\u00A0"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Stats Guarantee Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-black p-4 transition-all duration-300 hover:border-neutral-700 shadow-lg ring-1 ring-white/5"
              >
                <Icon className="w-4 h-4 text-emerald-400 mb-2 relative z-10" />
                <p className="text-xs text-slate-400 relative z-10 ">{stat.label}</p>
                <p className="text-xl font-bold  text-white mt-0.5 relative z-10">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 mt-1 relative z-10">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecurityPipelineSection;
