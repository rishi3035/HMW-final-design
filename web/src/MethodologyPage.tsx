"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Radar,
  LockKeyhole,
  CheckCircle2,
  FileCode2,
  Globe,
  RefreshCw,
  AlertTriangle,
  Flame,
  Binary,
  Layers,
  Database,
  Cpu,
  TrendingUp,
  Award,
  BookOpen,
  Zap,
  Calculator,
  Server,
  FileText,
  Check,
} from "lucide-react";
import { HmwKotaNavbar, HmwKotaFooter, HmwKotaCursor } from "./components/hmw-kota";
import { GreenAuraBackground } from "./components/ui/GreenAuraBackground";
import { WavesShader } from "@/components/ui/waves-shader";

export const MethodologyPage: React.FC = () => {
  // Interactive Simulator State
  const [criticalCount, setCriticalCount] = useState<number>(0);
  const [highCount, setHighCount] = useState<number>(1);
  const [mediumCount, setMediumCount] = useState<number>(2);
  const [lowCount, setLowCount] = useState<number>(3);
  const [hasDnsProof, setHasDnsProof] = useState<boolean>(true);

  // Mathematical Calculation
  const totalDeductions =
    criticalCount * 15 +
    highCount * 8 +
    mediumCount * 3 +
    lowCount * 1 +
    (hasDnsProof ? 0 : 10);

  const calculatedScore = Math.max(0, 100 - totalDeductions);

  const getReadinessTier = (score: number) => {
    if (score >= 90) return { label: "LAUNCH READY", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30", grade: "A+" };
    if (score >= 75) return { label: "STAGING READY", color: "text-sky-400 bg-sky-500/10 border-sky-500/30", grade: "B" };
    if (score >= 50) return { label: "ELEVATED RISK", color: "text-amber-400 bg-amber-500/10 border-amber-500/30", grade: "C" };
    return { label: "CRITICAL DANGER", color: "text-rose-400 bg-rose-500/10 border-rose-500/30", grade: "F" };
  };

  const readiness = getReadinessTier(calculatedScore);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dimensions = [
    {
      weight: "35% WEIGHT",
      title: "1. Runtime DAST & Active Fuzzing",
      icon: Radar,
      color: "emerald",
      desc: "OWASP ZAP active crawler fuzzing HTTP endpoints, form inputs, session cookies, and dynamic injection points for runtime vulnerabilities.",
      checks: ["SQLi, XSS, SSRF, IDOR Checks", "Session Token & Auth Header Fuzzing", "DOM-based Vulnerabilities"],
    },
    {
      weight: "20% WEIGHT",
      title: "2. Known CVEs & Exploits",
      icon: Flame,
      color: "amber",
      desc: "Nuclei v3.3 template engine matching 200+ known CVEs, exposed backup databases, misconfigured Next.js routes, and unauthenticated panels.",
      checks: ["Exposed .git, .env & Swagger Docs", "Server-Side CVE Signature Matching", "Default Cloud Credential Probes"],
    },
    {
      weight: "15% WEIGHT",
      title: "3. Cryptographic & TLS Posture",
      icon: LockKeyhole,
      color: "sky",
      desc: "Evaluates transport encryption, SSL/TLS handshake versions, cipher suites, certificate expiration validity, and HSTS preload readiness.",
      checks: ["TLS 1.2 & 1.3 Cipher Suite Audit", "HSTS Max-Age & Preload Flags", "Mixed-Content HTTPS Ingestion"],
    },
    {
      weight: "15% WEIGHT",
      title: "4. Security Headers & Defense-in-Depth",
      icon: ShieldCheck,
      color: "purple",
      desc: "Deep inspection of defensive HTTP headers that instruct modern browsers to block cross-site framing, sniffing, and script injection.",
      checks: ["Strict Content-Security-Policy (CSP)", "X-Frame-Options & Clickjacking", "CORS Origin Wildcards & Access-Control"],
    },
    {
      weight: "10% WEIGHT",
      title: "5. Static Code & Secrets Exposure (SAST)",
      icon: FileCode2,
      color: "orange",
      desc: "Semgrep static engine inspecting frontend source bundles, API definitions, leaked tokens, and insecure framework dependencies.",
      checks: ["Stripe / AWS / OpenAI API Key Leaks", "Client-Side Sourcemap Leakage", "Vulnerable NPM / PyPI Dependencies"],
    },
    {
      weight: "5% WEIGHT",
      title: "6. DNS, Email & Safe Harbor Posture",
      icon: Globe,
      color: "rose",
      desc: "Verifies domain identity and perimeter hygiene to prevent DNS hijacking, subdomain takeover, and spoofed outbound email abuse.",
      checks: ["SPF, DKIM & DMARC Mail Hygiene", "Dangling CNAME Subdomain Takeover", "Cryptographic Ownership Handshake"],
    },
  ];

  const complianceMappings = [
    {
      framework: "SOC 2 Type II",
      clause: "CC6.1, CC6.6, CC7.1",
      requirement: "Vulnerability scanning, perimeter defense, and continuous change verification.",
      howHmwComplies: "Deterministic DAST scanning, cryptographic audit trail, and instant 3.2s retest evidence.",
    },
    {
      framework: "ISO/IEC 27001:2022",
      clause: "A.8.8 Management of Tech Vulnerabilities",
      requirement: "Timely acquisition of information about technical vulnerabilities and exposure mitigation.",
      howHmwComplies: "Automated Nuclei CVE template matching combined with Cursor AI remediation diffs.",
    },
    {
      framework: "Digital Personal Data Protection (DPDP 2023)",
      clause: "Section 8(5) Reasonable Security Safeguards",
      requirement: "Data Fiduciary must implement reasonable security safeguards to prevent personal data breach.",
      howHmwComplies: "Sovereign AWS Mumbai nodes, authenticated session DAST, and zero data exfiltration.",
    },
    {
      framework: "OWASP ASVS Level 2",
      clause: "V1–V14 Architecture & Code",
      requirement: "Verification of authentication, session management, access control, and sanitization.",
      howHmwComplies: "Comprehensive DAST/SAST multi-engine coverage mapping directly to ASVS control items.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950 font-sans antialiased relative">
      <HmwKotaCursor />

      <HmwKotaNavbar
        onStartScan={() => navigateTo("/workspace")}
        onBookDemo={() => navigateTo("/contact")}
      />

      <main className="space-y-0 pt-20">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section className="relative w-full min-h-[75vh] flex flex-col justify-center py-20 sm:py-24 border-b border-white/10 overflow-hidden text-center">
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
            <WavesShader className="w-full h-full" />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px] pointer-events-none" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 relative z-10 w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/10 text-xs font-mono text-emerald-400 backdrop-blur-md shadow-lg">
              <Sparkles className="size-3.5" />
              <span>Scientific Threat Modeling & Mathematical Scoring</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              AI Launch Score (0–100)<br />
              <span className="text-emerald-400">Scoring Methodology.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl mx-auto font-normal">
              The AI Launch Score is an objective, mathematical security index designed to evaluate the launch-readiness of modern websites, SaaS applications, and AI tools. It synthesizes <strong>200+ automated multi-engine checks</strong> across 6 weighted security dimensions into actionable readiness bands.
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo("/workspace")}
                className="px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                Calculate My Score
              </button>
              <button
                type="button"
                onClick={() => {
                  document.getElementById("interactive-calculator")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-full bg-black/80 hover:bg-white/10 text-neutral-200 border border-white/15 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Launch Score Simulator
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. THE 6 DIMENSIONS OF LAUNCH READINESS                                    */}
        {/* ========================================================================= */}
        <section className="relative py-20 sm:py-24 border-b border-white/10 bg-[#07090E] overflow-hidden">
          <GreenAuraBackground opacity={75} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10 w-full text-left">
            <div className="space-y-2 border-b border-white/10 pb-6 text-center sm:text-left">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold block">
                [ Weighted Multi-Engine Architecture ]
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                The 6 Dimensions of Launch Readiness
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
                Unlike simple linting tools, Hack My Website evaluates both dynamic runtime attack surfaces and static code posture. Each dimension carries an explicit mathematical weight representing its exploitability in production.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dimensions.map((dim, idx) => {
                const Icon = dim.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-black/60 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="size-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                          <Icon className="size-5" />
                        </div>
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {dim.weight}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {dim.title}
                      </h3>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {dim.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 space-y-1.5 text-[11px] text-neutral-400">
                      {dim.checks.map((check, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-1.5 text-neutral-300">
                          <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                          <span>{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE SCORE CALCULATOR SIMULATOR                                 */}
        {/* ========================================================================= */}
        <section id="interactive-calculator" className="relative py-20 sm:py-24 border-b border-white/10 bg-black overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                [ Interactive Threat Simulator ]
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Simulate How Findings Impact Your Score.
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Adjust vulnerability counts below to observe how our mathematical deduction engine scores launch readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#0A0D14] border border-white/10 p-6 sm:p-10 shadow-2xl">
              {/* Controls Column (7 Cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-2">
                  <Calculator className="size-4 text-emerald-400" />
                  <span>Vulnerability Deduction Inputs</span>
                </div>

                {/* Critical */}
                <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Critical Findings (-15 pts each)</span>
                    <span className="text-[11px] text-neutral-400 font-mono">SQLi, Unauth RCE, Exposed DB Secrets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCriticalCount(Math.max(0, criticalCount - 1))}
                      className="size-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-white">{criticalCount}</span>
                    <button
                      onClick={() => setCriticalCount(criticalCount + 1)}
                      className="size-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* High */}
                <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">High Findings (-8 pts each)</span>
                    <span className="text-[11px] text-neutral-400 font-mono">Stored XSS, Broken Object Auth (IDOR)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHighCount(Math.max(0, highCount - 1))}
                      className="size-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-white">{highCount}</span>
                    <button
                      onClick={() => setHighCount(highCount + 1)}
                      className="size-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Medium */}
                <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Medium Findings (-3 pts each)</span>
                    <span className="text-[11px] text-neutral-400 font-mono">Missing Subresource Integrity, Permissive CSP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMediumCount(Math.max(0, mediumCount - 1))}
                      className="size-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-white">{mediumCount}</span>
                    <button
                      onClick={() => setMediumCount(mediumCount + 1)}
                      className="size-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Low */}
                <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Low Findings (-1 pt each)</span>
                    <span className="text-[11px] text-neutral-400 font-mono">Missing HSTS, Server Version Disclosure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLowCount(Math.max(0, lowCount - 1))}
                      className="size-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-white">{lowCount}</span>
                    <button
                      onClick={() => setLowCount(lowCount + 1)}
                      className="size-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Score Display Column (5 Cols) */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-black/80 border border-white/10 flex flex-col items-center justify-center text-center space-y-4">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                  Simulated Launch Score
                </span>

                <div className="relative size-36 flex items-center justify-center">
                  <div className="text-5xl font-black font-mono text-white tracking-tight">
                    {calculatedScore}
                  </div>
                </div>

                <div className={`px-4 py-1.5 rounded-full border text-xs font-mono font-extrabold uppercase tracking-wider ${readiness.color}`}>
                  {readiness.label} ({readiness.grade})
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
                  {calculatedScore >= 90
                    ? "Safe for production release. Zero critical blockers detected."
                    : calculatedScore >= 75
                    ? "Minor configuration findings remain. Safe for staging tests."
                    : "High risk exposure. Vulnerabilities must be patched prior to public deployment."}
                </p>

                <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-white/10 w-full">
                  Total Penalty Applied: -{totalDeductions} PTS
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. COMPLIANCE & REGULATORY MAPPING TABLE                                  */}
        {/* ========================================================================= */}
        <section className="relative py-20 sm:py-24 border-b border-white/10 bg-[#07090E] overflow-hidden">
          <GreenAuraBackground opacity={75} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10 w-full text-left">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold block">
                [ Regulatory Audit Alignment ]
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Compliance & Framework Mapping
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
                Every test executed by Hack My Website maps directly to international cybersecurity frameworks, enabling frictionless proof for enterprise security reviews.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-black/60 shadow-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-neutral-300 font-mono uppercase text-[11px]">
                    <th className="p-4 sm:p-5">Security Standard</th>
                    <th className="p-4 sm:p-5">Clause / Section</th>
                    <th className="p-4 sm:p-5">Mandated Control</th>
                    <th className="p-4 sm:p-5">HMW Automated Execution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  {complianceMappings.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-white font-mono">{row.framework}</td>
                      <td className="p-4 sm:p-5 font-mono text-emerald-400">{row.clause}</td>
                      <td className="p-4 sm:p-5 max-w-xs leading-relaxed">{row.requirement}</td>
                      <td className="p-4 sm:p-5 max-w-xs text-neutral-400 leading-relaxed">{row.howHmwComplies}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. BOTTOM CTA                                                             */}
        {/* ========================================================================= */}
        <section className="relative py-20 sm:py-24 bg-black overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Test Your Own Production Domain.
            </h2>
            <p className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Find out where your launch score stands across 200+ automated security checks. Get deterministic technical proof and 1-click AI IDE fixes.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateTo("/workspace")}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/25 cursor-pointer"
              >
                <Zap className="size-4 fill-neutral-950" />
                <span>Calculate Your Launch Score</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <HmwKotaFooter onStartScan={() => navigateTo("/workspace")} />
    </div>
  );
};

export default MethodologyPage;
