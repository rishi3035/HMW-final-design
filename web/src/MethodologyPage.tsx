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
} from "lucide-react";
import { HmwLogo } from "../../design-system/src/HmwLogo";
import { EnterpriseFooter } from "./components/EnterpriseFooter";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavItemConfig,
} from "@/components/ui/resizable-navbar";

const navItems: NavItemConfig[] = [
  { name: "Platform", link: "/" },
  { name: "How It Works", link: "/how-it-works" },
  { name: "Methodology", link: "/methodology" },
  { name: "Sample Report", link: "/sample-report" },
  { name: "Pricing", link: "/#pricing" },
  { name: "Contact", link: "/contact" },
];

export const MethodologyPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950 font-sans antialiased">
      {/* Resizable Global Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo>
            <div
              onClick={() => navigateTo("/")}
              className="cursor-pointer transition-transform hover:scale-[1.02] flex items-center"
            >
              <HmwLogo size="sm" showSubtitle={false} />
            </div>
          </NavbarLogo>

          <NavItems items={navItems} />

          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo("/workspace")}
              className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer px-3 py-1.5"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => navigateTo("/workspace")}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
            >
              Launch Console
            </button>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <div onClick={() => navigateTo("/")} className="cursor-pointer flex items-center">
              <HmwLogo size="sm" showSubtitle={false} />
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-medium text-neutral-300 hover:text-emerald-400 transition-colors py-2"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigateTo("/workspace");
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs uppercase tracking-wider"
              >
                Launch Console
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <main className="py-16 md:py-24 pt-24 md:pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* ========================================================================= */}
          {/* HEADER SECTION                                                            */}
          {/* ========================================================================= */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
              <Sparkles className="size-3.5" />
              <span>Scientific Threat Modeling & Scoring Matrix</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              AI Launch Score (0–100)<br className="hidden sm:inline" />
              Scoring Methodology
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              The AI Launch Score is an objective, mathematical security index designed to evaluate the launch-readiness of modern websites, SaaS applications, and AI tools. It synthesizes <strong>200+ automated multi-engine checks</strong> across 6 weighted security dimensions into actionable readiness bands.
            </p>
          </div>

          {/* ========================================================================= */}
          {/* 6 DIMENSIONS OF LAUNCH READINESS                                          */}
          {/* ========================================================================= */}
          <section className="p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-10 text-left shadow-2xl">
            <div className="space-y-2 border-b border-neutral-800 pb-6">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                Multi-Engine Weighted Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                The 6 Dimensions of Launch Readiness
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                Unlike simple linting tools, Hack My Website evaluates both dynamic runtime attack surfaces and static code posture. Each dimension carries an explicit mathematical weight representing its exploitability in production.
              </p>
            </div>

            {/* 6 Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              
              {/* Dimension 1 */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-colors shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Radar className="size-5" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      35% WEIGHT
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">1. Runtime DAST & Fuzzing</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    OWASP ZAP active crawler fuzzing HTTP endpoints, query parameters, auth cookies, and dynamic injection points for runtime vulnerabilities.
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-800/80 space-y-1 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="size-3" />
                    <span>SQLi, XSS, SSRF, IDOR Checks</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="size-3" />
                    <span>Session Token & Auth Header Fuzzing</span>
                  </div>
                </div>
              </div>

              {/* Dimension 2 */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-colors shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Flame className="size-5" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      20% WEIGHT
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">2. Known CVEs & Exploits</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Nuclei v3.3 template engine matching 200+ known CVEs, exposed backup databases, misconfigured Next.js routes, and unauthenticated panels.
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-800/80 space-y-1 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <CheckCircle2 className="size-3" />
                    <span>Exposed .git, .env & Swagger Docs</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <CheckCircle2 className="size-3" />
                    <span>Server-Side CVE Signature Matching</span>
                  </div>
                </div>
              </div>

              {/* Dimension 3 */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-colors shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                      <FileCode2 className="size-5" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                      20% WEIGHT
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">3. Code SAST & Leaked Secrets</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Semgrep static analysis scanning source maps, frontend client bundles, and GitHub repositories for hardcoded API keys, tokens, and database URIs.
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-800/80 space-y-1 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5 text-orange-400 font-semibold">
                    <CheckCircle2 className="size-3" />
                    <span>Stripe, AWS, OpenAI, Firebase Keys</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-orange-400 font-semibold">
                    <CheckCircle2 className="size-3" />
                    <span>Frontend Source Map Leak Auditing</span>
                  </div>
                </div>
              </div>

              {/* Dimension 4 */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-colors shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Globe className="size-5" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      10% WEIGHT
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">4. Security Headers & TLS</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Browser posture validation covering HSTS preload, Content-Security-Policy (CSP), CORS wildcard rules, and secure cookie parameters.
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-800/80 space-y-1 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="size-3" />
                    <span>Strict-Transport-Security & Preload</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="size-3" />
                    <span>X-Frame-Options & CSP Directives</span>
                  </div>
                </div>
              </div>

              {/* Dimension 5 */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-colors shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <LockKeyhole className="size-5" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      10% WEIGHT
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">5. DNS Ownership Proof</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Cryptographic DNS TXT or well-known token verification proving legal asset control, preventing unauthorized scanning and spoofed targets.
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-800/80 space-y-1 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="size-3" />
                    <span>Safe Harbor & Asset Authorization</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="size-3" />
                    <span>Automated Root/Apex Token Lookup</span>
                  </div>
                </div>
              </div>

              {/* Dimension 6 */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-colors shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <RefreshCw className="size-5" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      5% WEIGHT
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">6. Remediation & Patch Velocity</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Continuous posture monitoring rewarding teams that resolve reported vulnerabilities and trigger verification re-scans within 30 days.
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-800/80 space-y-1 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <CheckCircle2 className="size-3" />
                    <span>30-Day Patch Velocity Verification</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <CheckCircle2 className="size-3" />
                    <span>Historical Regression Prevention</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* POINT DEDUCTIONS & SEVERITY PENALTY MATRIX                                */}
          {/* ========================================================================= */}
          <section className="p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-8 text-left shadow-2xl">
            <div className="space-y-2 border-b border-neutral-800 pb-6">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                Mathematical Deduction Model
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Severity Penalties & Mathematical Guardrails
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                Every scanned domain begins at a baseline of <strong>100 points</strong>. Deductions are subtracted deterministically according to CVSS 3.1 severity scores, bounded by safety caps so non-critical noise never tanks an otherwise robust site to zero.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12 items-start">
              
              {/* Left Column: Penalty Scale (7 Cols) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">
                  CVSS 3.1 Severity Penalty Scale
                </div>

                <div className="space-y-3">
                  
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-rose-500/40 flex items-center justify-between shadow-md">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span className="size-2 rounded-full bg-rose-500" />
                        <span>Critical Severity Finding</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">SQL Injection, Unauth RCE, Hardcoded DB Credentials</p>
                    </div>
                    <div className="text-base font-black text-rose-400 font-mono pl-4">
                      -15 PTS
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-950 border border-amber-500/40 flex items-center justify-between shadow-md">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span className="size-2 rounded-full bg-amber-500" />
                        <span>High Severity Finding</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">Stored XSS, Broken Object Auth (IDOR), Leaked Stripe Key</p>
                    </div>
                    <div className="text-base font-black text-amber-400 font-mono pl-4">
                      -8 PTS
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-950 border border-orange-500/30 flex items-center justify-between shadow-md">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span className="size-2 rounded-full bg-orange-500" />
                        <span>Medium Severity Finding</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">Missing CSP, Permissive CORS Wildcard, Open Redirect</p>
                    </div>
                    <div className="text-base font-black text-orange-400 font-mono pl-4">
                      -3 PTS
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between shadow-md">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span className="size-2 rounded-full bg-neutral-500" />
                        <span>Low / Informational Advisory</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">Missing Referrer-Policy, Verbose Server Headers</p>
                    </div>
                    <div className="text-base font-black text-neutral-400 font-mono pl-4">
                      -1 PT
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Mathematical Guardrails (5 Cols) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 text-xs">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <ShieldCheck className="size-5 text-emerald-400" />
                  <span>Mathematical Guardrails</span>
                </div>
                
                <p className="text-slate-300 leading-relaxed">
                  To prevent duplicate warnings (e.g. 10 missing header variants) from masking actual code security, <strong>deductions within each vector are strictly capped at that vector's maximum assigned weight</strong>.
                </p>

                <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="font-bold text-emerald-400 text-[11px] uppercase tracking-wider font-mono">
                    Positive Bonus Incentives
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Cryptographic DNS Ownership Verified</span>
                    <span className="text-emerald-400 font-mono font-bold">+5 PTS</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>30-Day Patch Re-test Complete</span>
                    <span className="text-emerald-400 font-mono font-bold">+5 PTS</span>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 leading-relaxed pt-1">
                  Formula: <code className="text-emerald-400 font-mono bg-neutral-900 px-1.5 py-0.5 rounded">Score = clamp(0, 100 - Penalties + Bonuses, 100)</code>
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4 HIGH-VISIBILITY READINESS BANDS BREAKDOWN                                */}
          {/* ========================================================================= */}
          <section className="p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-8 text-left shadow-2xl">
            <div className="space-y-2 border-b border-neutral-800 pb-6">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                Deployment Decision Matrix
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Readiness Bands & Go/No-Go Decision Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Scores translate into four clear readiness classifications used by engineering leads, investors, and security auditors to decide whether an application is safe for production traffic.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              
              {/* Band 1: 85-100 */}
              <div className="p-6 rounded-2xl bg-neutral-950 border-2 border-emerald-500/60 flex flex-col justify-between space-y-4 shadow-xl shadow-emerald-500/10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black font-mono px-3 py-1 rounded-full bg-emerald-500 text-neutral-950">
                      85 – 100 PTS
                    </span>
                    <span className="size-3 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-bold text-white">🟢 Launch Ready</h3>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[95%]" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Hardened production posture. Zero high or critical vulnerabilities. All security headers and DNS verification in place.
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-800/80 text-[11px] font-bold text-emerald-400">
                  Status: Approved for Production & Payments
                </div>
              </div>

              {/* Band 2: 70-84 */}
              <div className="p-6 rounded-2xl bg-neutral-950 border-2 border-amber-500/60 flex flex-col justify-between space-y-4 shadow-xl shadow-amber-500/10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black font-mono px-3 py-1 rounded-full bg-amber-500 text-neutral-950">
                      70 – 84 PTS
                    </span>
                    <span className="size-3 rounded-full bg-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">🟡 Action Recommended</h3>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[78%]" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Minor configuration advisories present. Safe for staging and closed beta, but requires fixing before public marketing push.
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-800/80 text-[11px] font-bold text-amber-400">
                  Status: Staging Safe • Fix Before Scaling
                </div>
              </div>

              {/* Band 3: 50-69 */}
              <div className="p-6 rounded-2xl bg-neutral-950 border-2 border-orange-500/60 flex flex-col justify-between space-y-4 shadow-xl shadow-orange-500/10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black font-mono px-3 py-1 rounded-full bg-orange-500 text-neutral-950">
                      50 – 69 PTS
                    </span>
                    <span className="size-3 rounded-full bg-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">🟠 High Risk</h3>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-400 h-full w-[60%]" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    High severity issues or secret leaks detected. Attackers could exploit these to extract customer data or hijack sessions.
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-800/80 text-[11px] font-bold text-orange-400">
                  Status: Unsafe for Live Payments or Users
                </div>
              </div>

              {/* Band 4: 0-49 */}
              <div className="p-6 rounded-2xl bg-neutral-950 border-2 border-rose-500/60 flex flex-col justify-between space-y-4 shadow-xl shadow-rose-500/10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black font-mono px-3 py-1 rounded-full bg-rose-500 text-white">
                      0 – 49 PTS
                    </span>
                    <span className="size-3 rounded-full bg-rose-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white">🔴 Launch Blocker</h3>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[35%]" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Critical structural vulnerabilities or exposed administrative databases. Do not deploy to production under any circumstances.
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-800/80 text-[11px] font-bold text-rose-400">
                  Status: Critical Hazard • Immediate Refactor
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* BOTTOM CONVERSION CTA                                                     */}
          {/* ========================================================================= */}
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/90 border border-emerald-500/40 text-center space-y-5 shadow-2xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ready to Measure Your Website's Launch Readiness?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Verify your domain origin in 30 seconds and generate an objective 0–100 AI Launch Score with instant code fix prompts.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => navigateTo("/workspace")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02] cursor-pointer"
              >
                <span>Verify Domain & Get Launch Score</span>
                <ArrowRight className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => navigateTo("/how-it-works")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-slate-200 font-bold text-xs border border-neutral-700 transition-colors cursor-pointer"
              >
                <span>See How It Works</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo("/sample-report")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-slate-200 font-bold text-xs border border-neutral-700 transition-colors cursor-pointer"
              >
                <span>View Sample PDF Report</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      <EnterpriseFooter />
    </div>
  );
};

export default MethodologyPage;
