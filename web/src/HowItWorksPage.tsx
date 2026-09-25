import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Radar,
  Activity,
  TerminalSquare,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Zap,
  Layers,
  FileCode2,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  ServerCrash,
  Cpu,
  Globe,
  Terminal,
  Bot,
  Copy,
  Check,
  Download,
  Briefcase,
  Users,
  Code2,
  FileText,
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

export const HowItWorksPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  const workflowSteps = [
    { num: "01", name: "VERIFY", subtitle: "Authorization", href: "#step-01-verify", color: "text-emerald-400" },
    { num: "02", name: "SCAN", subtitle: "Multi-Engine", href: "#step-02-scan", color: "text-sky-400" },
    { num: "03", name: "UNDERSTAND", subtitle: "Evidence & Risk", href: "#step-03-understand", color: "text-amber-400" },
    { num: "04", name: "PRIORITIZE", subtitle: "High Leverage", href: "#step-04-prioritize", color: "text-orange-400" },
    { num: "05", name: "FIX", subtitle: "AI IDE Prompts", href: "#step-05-fix", color: "text-purple-400" },
    { num: "06", name: "RETEST", subtitle: "3.2s Retest", href: "#step-06-retest", color: "text-rose-400" },
    { num: "07", name: "CONFIRM", subtitle: "Verified Fixed", href: "#step-07-confirm", color: "text-emerald-400" },
    { num: "08", name: "TRACK", subtitle: "Posture History", href: "#step-08-track", color: "text-emerald-400" },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(id);
    setTimeout(() => setCopiedStep(null), 2000);
  };

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

      <main id="main-content" className="space-y-0 pt-20">
        
        {/* ========================================================================= */}
        {/* SECTION 01: PAGE HERO                                                     */}
        {/* ========================================================================= */}
        <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 border-b border-neutral-800 bg-neutral-950 overflow-hidden text-center">
          {/* Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[130px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400 shadow-sm">
              <Sparkles className="size-3.5" />
              <span>The Complete Security Engineering Workflow</span>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                From Scan to <span className="text-emerald-400">Verified Fix</span>.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Hack My Website doesn't stop at finding vulnerabilities. It proves the evidence, explains the risk, gives your developers an actionable AI fix prompt, and lets you retest the finding in seconds.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigateTo("/workspace")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02] cursor-pointer"
              >
                <Zap className="size-4 fill-neutral-950" />
                <span>Scan My Website</span>
                <ArrowRight className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo("/sample-report")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-slate-200 border border-neutral-700/80 text-sm font-semibold transition-colors cursor-pointer"
              >
                <FileText className="size-4 text-slate-400" />
                <span>View Sample Report</span>
                <ExternalLink className="size-3.5 text-slate-400" />
              </button>
            </div>

            {/* Compact Visual Workflow Strip */}
            <div className="pt-8 max-w-5xl mx-auto">
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono">
                <span className="text-emerald-400 font-bold">01 VERIFY</span>
                <ChevronRight className="size-3.5 text-neutral-600 hidden sm:block" />
                <span className="text-sky-400 font-bold">02 SCAN</span>
                <ChevronRight className="size-3.5 text-neutral-600 hidden sm:block" />
                <span className="text-amber-400 font-bold">03 UNDERSTAND</span>
                <ChevronRight className="size-3.5 text-neutral-600 hidden sm:block" />
                <span className="text-purple-400 font-bold">04 PRIORITIZE</span>
                <ChevronRight className="size-3.5 text-neutral-600 hidden sm:block" />
                <span className="text-orange-400 font-bold">05 FIX</span>
                <ChevronRight className="size-3.5 text-neutral-600 hidden sm:block" />
                <span className="text-rose-400 font-bold">06 RETEST</span>
                <ChevronRight className="size-3.5 text-neutral-600 hidden sm:block" />
                <span className="text-emerald-400 font-bold">07 CONFIRM</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 02: THE COMPLETE 8-STAGE WORKFLOW JOURNEY                         */}
        {/* ========================================================================= */}
        <section id="workflow" className="py-16 md:py-24 border-b border-neutral-800 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
            
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
                <Layers className="size-3.5" />
                <span>Connected Lifecycle</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                One Security Workflow. From Detection to Proof.
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Click any stage in the security journey to jump directly to its technical breakdown.
              </p>
            </div>

            {/* 8-Stage Interactive Connected Timeline */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {workflowSteps.map((step) => (
                <a
                  key={step.num}
                  href={step.href}
                  className="p-4 rounded-2xl border border-neutral-800 bg-neutral-900/90 hover:border-neutral-700 hover:bg-neutral-850 transition-all flex flex-col justify-between space-y-3 group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-neutral-500 group-hover:text-white">
                      {step.num}
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${step.color}`}>
                      ●
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white tracking-tight truncate group-hover:text-emerald-400 transition-colors">
                      {step.name}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono mt-0.5 truncate">
                      {step.subtitle}
                    </div>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 03: STEP 01: VERIFY                                               */}
        {/* ========================================================================= */}
        <section id="step-01-verify" className="py-16 md:py-24 border-b border-neutral-800 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
              
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
                  <LockKeyhole className="size-3.5" />
                  <span>Stage 01 • Authorization</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Security starts with permission.
                </h2>

                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  Before scanning, Hack My Website strictly verifies that you own or are authorized to test the target. This ensures enterprise safe-harbor compliance, eliminates spoofed target abuse, and keeps our security scans 100% legal.
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3">
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200"><strong>DNS TXT Record:</strong> Add a temporary TXT token to your domain root (checked in 30 seconds).</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3">
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200"><strong>HTML Meta Tag / File:</strong> Upload a verification token to <code className="text-emerald-400 font-mono">/.well-known/hackmywebsite.txt</code>.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  🛡️ Responsible scanning starts with authorization.
                </div>
              </div>

              {/* Visual Domain Verification Mockup */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-md p-6 sm:p-8 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                    <div className="flex items-center gap-2.5">
                      <LockKeyhole className="size-4 text-emerald-400" />
                      <span className="text-sm font-bold text-white">Domain Ownership Verification</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                      REQUIRED
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-neutral-400 font-mono text-[11px]">Target Domain</label>
                      <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-white font-bold">
                        https://demo-saas-platform.com
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-neutral-400 font-mono text-[11px]">Required DNS TXT Record</label>
                      <pre className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-emerald-400 text-xs overflow-x-auto">
                        hmw-verify=9f8c2b1e4d3a776c8890
                      </pre>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-500">DNS validation response...</span>
                    <span className="px-3 py-1 rounded-lg bg-emerald-500 text-neutral-950 font-bold text-xs font-mono">
                      ✓ Target Authorized
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 04: STEP 02: SCAN (MULTI-ENGINE ARCHITECTURE)                     */}
        {/* ========================================================================= */}
        <section id="step-02-scan" className="py-16 md:py-24 border-b border-neutral-800 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
            
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-sky-400">
                <Radar className="size-3.5" />
                <span>Stage 02 • Automated Multi-Engine Scanning</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Scan your website from multiple angles.
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Single-engine tools miss context. Hack My Website runs a synchronized multi-engine pipeline to catch vulnerabilities across runtime, external network, and source code layers.
              </p>
            </div>

            {/* 3 Engines Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Engine 1 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4 shadow-xl">
                <div className="size-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Zap className="size-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Engine 01 • Runtime DAST</span>
                  <h3 className="text-lg font-bold text-white">OWASP ZAP Core</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Crawls your web app like an attacker. Detects XSS, SQLi, CSRF, insecure headers, and auth bypasses in active sessions without destructive exploits.
                </p>
                <div className="pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                  <Activity className="size-3.5 text-emerald-400" />
                  <span>Dynamic runtime crawling</span>
                </div>
              </div>

              {/* Engine 2 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4 shadow-xl">
                <div className="size-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <ServerCrash className="size-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">Engine 02 • Threat Templates</span>
                  <h3 className="text-lg font-bold text-white">Nuclei v3.3 Framework</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tests against 200+ curated CVE templates for known zero-days, exposed panels, misconfigured cloud storage, and leaked secrets.
                </p>
                <div className="pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                  <ShieldAlert className="size-3.5 text-purple-400" />
                  <span>200+ CVE vulnerability probes</span>
                </div>
              </div>

              {/* Engine 3 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4 shadow-xl">
                <div className="size-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <FileCode2 className="size-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider">Engine 03 • Static Code SAST</span>
                  <h3 className="text-lg font-bold text-white">Semgrep Engine</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Audits your source code repository for leaked API keys, hardcoded credentials, dangerous regexes, and vulnerable package dependencies.
                </p>
                <div className="pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                  <Terminal className="size-3.5 text-sky-400" />
                  <span>Repo-level code pattern auditing</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 05: STEP 03: UNDERSTAND (EVIDENCE PROOF)                           */}
        {/* ========================================================================= */}
        <section id="step-03-understand" className="py-16 md:py-24 border-b border-neutral-800 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
              
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-amber-400">
                  <Activity className="size-3.5" />
                  <span>Stage 03 • Evidence & Risk</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Show me the proof, not just the score.
                </h2>

                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  Most scanners produce confusing, noisy alert lists with high false-positive rates. Hack My Website pairs every finding with raw HTTP request/response evidence, exact line numbers, and actionable business impact.
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
                    <div className="text-white font-bold flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-400" />
                      <span>Zero Bluff Data Guarantee</span>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">
                      Every finding is verified against actual server responses. We never report speculative vulnerabilities that cannot be reproduced.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
                    <div className="text-white font-bold flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-400" />
                      <span>Developer & Executive Dual Views</span>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">
                      Developers get curl commands and code snippets. Executives get business impact summaries, compliance mapping, and risk categorization.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample Evidence Inspector Card */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        MEDIUM SEVERITY
                      </span>
                      <span className="text-xs font-mono text-neutral-400">OWASP A05</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">100% High Confidence</span>
                  </div>

                  <h3 className="text-base font-bold text-white">Missing Content Security Policy (CSP)</h3>
                  
                  <div className="space-y-1.5 text-xs">
                    <div className="text-[11px] font-mono text-neutral-400">HTTP Response Evidence:</div>
                    <pre className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-slate-300 text-xs overflow-x-auto leading-relaxed">
{`HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Strict-Transport-Security: max-age=31536000
X-Frame-Options: SAMEORIGIN
[!] Content-Security-Policy: <MISSING>`}
                    </pre>
                  </div>

                  <p className="text-xs text-neutral-400">
                    <strong>Business Impact:</strong> Allows execution of arbitrary untrusted JavaScript from compromised third-party script integrations.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 06: STEP 04: PRIORITIZE                                           */}
        {/* ========================================================================= */}
        <section id="step-04-prioritize" className="py-16 md:py-24 border-b border-neutral-800 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-orange-400">
                <TrendingUp className="size-3.5" />
                <span>Stage 04 • High Leverage Prioritization</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Fix what matters first. Skip the noise.
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                A backlog of 200 security warnings is paralyzing. Hack My Website groups findings by severity, leverage, and exploitability so you can resolve 80% of your risk in under 15 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-rose-500/30 space-y-3">
                <div className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">Tier 1 • Immediate Blockers</div>
                <h3 className="text-lg font-bold text-white">Blockers & Leaked Keys</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Critical SQLi, exposed .env files, leaked Stripe or OpenAI secret keys. Fix immediately before deploying any live code.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-amber-500/30 space-y-3">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">Tier 2 • High Leverage Fixes</div>
                <h3 className="text-lg font-bold text-white">Headers & Auth Policies</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Missing Clickjacking protection, permissive CORS headers, absent SRI hashes. One single drop-in config file resolves all of them.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                <div className="text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider">Tier 3 • Hardening Advisories</div>
                <h3 className="text-lg font-bold text-white">Informational Hygiene</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Server version banners, sourcemap disclosures, cache headers. Clean them up over time during regular engineering sprints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 07: STEP 05: FIX (AI IDE REMEDIATION)                              */}
        {/* ========================================================================= */}
        <section id="step-05-fix" className="py-16 md:py-24 border-b border-neutral-800 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
            
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-purple-400">
                <TerminalSquare className="size-3.5" />
                <span>Stage 05 • AI IDE Remediation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Fix it with the tools your developers already use.
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Every actionable finding translates into a developer-ready code prompt formatted for Cursor, Claude Code, and Windsurf.
              </p>
            </div>

            {/* Before / After Split Demonstration */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Side: Security Finding */}
              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase">1. Security Finding Detected</span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    MEDIUM
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Missing X-Content-Type-Options Header
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Allows browsers to MIME-sniff response content types away from the declared Content-Type, opening risks for script injection via user uploads.
                </p>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-400">
                  Target: https://demo-saas-platform.com • OWASP A05: Security Misconfiguration
                </div>
              </div>

              {/* Right Side: AI Remediation Code Diff */}
              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-emerald-500/30 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase">2. AI IDE Fix Prompt</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        "diff-code",
                        `// Add to Next.js headers config in next.config.mjs:\nasync headers() {\n  return [{\n    source: '/:path*',\n    headers: [\n      { key: 'X-Content-Type-Options', value: 'nosniff' }\n    ]\n  }];\n}`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-slate-300 text-xs font-mono cursor-pointer"
                  >
                    {copiedStep === "diff-code" ? (
                      <>
                        <Check className="size-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`// Add to Next.js headers config:
async headers() {
  return [{
    source: '/:path*',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' }
    ]
  }];
}`}
                </pre>
                <p className="text-xs text-slate-300">
                  Click <strong>Copy Prompt</strong>, paste into your AI IDE, and deploy your code fix in minutes.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 08: STEP 06: RETEST (3.2S INSTANT RETEST)                         */}
        {/* ========================================================================= */}
        <section id="step-06-retest" className="py-16 md:py-24 border-b border-neutral-800 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
              
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-rose-400">
                  <RotateCcw className="size-3.5" />
                  <span>Stage 06 • Instant Targeted Retesting</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Verify your patch in 3.2 seconds.
                </h2>

                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  Traditional penetration testers take 2 to 3 weeks to respond to a retest ticket. Hack My Website lets you click <strong>Retest Endpoint</strong> right inside the dashboard to execute an isolated check and verify the patch immediately.
                </p>

                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2 text-xs">
                  <div className="text-white font-bold">Why developers love targeted retesting:</div>
                  <ul className="space-y-1.5 text-neutral-400 list-disc list-inside">
                    <li>No need to wait 8 minutes for a full multi-engine re-scan</li>
                    <li>Instant proof that your code changes resolved the exact vulnerability</li>
                    <li>Score updates in real-time with verified fix bonuses (+5 points)</li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 space-y-5 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono">
                    <span className="text-neutral-400">Targeted Probe Execution</span>
                    <span className="text-emerald-400 font-bold">Execution Time: 3.2s</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                      <span className="text-slate-300">GET /api/checkout (X-Frame-Options)</span>
                      <span className="text-emerald-400 font-mono font-bold">PASSED (200 OK)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                      <span className="text-slate-300">GET /assets/main.js (SRI Integrity)</span>
                      <span className="text-emerald-400 font-mono font-bold">VERIFIED (SHA-384)</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-neutral-800/80">
                    <span className="text-xs text-neutral-400 font-mono">Status: Patch Confirmed</span>
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
                      ✓ Posture Elevated
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 09: STEP 07: CONFIRM (VERIFIED FIXED)                             */}
        {/* ========================================================================= */}
        <section id="step-07-confirm" className="py-16 md:py-24 border-b border-neutral-800 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
                <ShieldCheck className="size-3.5" />
                <span>Stage 07 • Verified Fixed Status</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Proof you can show to clients, investors & auditors.
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Once verified, the finding moves to the Resolved stream. Your executive PDF report automatically updates to display an unblemished, green audit trail.
              </p>
            </div>

            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Closed-Loop Verification</h3>
                    <p className="text-xs text-neutral-400 font-mono">Cryptographically hashed audit entry #VRF-2026-8812</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo("/sample-report")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
                >
                  <FileText className="size-3.5 text-emerald-400" />
                  <span>Inspect Audit Report</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-neutral-400">Time to Fix</div>
                  <div className="text-base font-bold font-mono text-white mt-0.5">14 Minutes</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-neutral-400">Score Improvement</div>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">+18 Points</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-neutral-400">Audit Status</div>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">LAUNCH READY (92)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 10: STEP 08: TRACK (POSTURE OVER TIME)                            */}
        {/* ========================================================================= */}
        <section id="step-08-track" className="py-16 md:py-24 border-b border-neutral-800 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
                <TrendingUp className="size-3.5" />
                <span>Stage 08 • Continuous Security History</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Continuous security that never sleeps.
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Security is not a one-time event. Schedule weekly scans, track historical trends, and block regressions in GitHub Pull Requests before vulnerable code ever reaches production.
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Activity className="size-5" />
                </div>
                <h3 className="text-base font-bold text-white">Automated Recurring Scans</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Run automated weekly or monthly audits without lifting a finger. Get email alerts whenever your launch score fluctuates.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                <div className="size-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Code2 className="size-5" />
                </div>
                <h3 className="text-base font-bold text-white">GitHub PR Safeguard</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Connect your repository to scan PR branches ephemerally. Block PRs with high-risk secrets or open endpoints automatically.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Briefcase className="size-5" />
                </div>
                <h3 className="text-base font-bold text-white">Agency White-Labeling</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Brand executive PDF reports with your agency logo and custom colors. Present hardened deliverables to high-value enterprise clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 11: TARGET PERSONAS                                               */}
        {/* ========================================================================= */}
        <section id="who-it-is-for" className="py-16 md:py-24 border-b border-neutral-800 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
                <Users className="size-3.5" />
                <span>Target Engineering Personas</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Built for Modern Product Teams
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Whether you are launching a startup, shipping daily commits, or delivering client deliverables, Hack My Website fits your workflow.
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="text-base font-bold text-white">Founders & Solo Devs</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  "Know whether your website is ready to launch without hiring an expensive penetration tester."
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                <div className="size-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Code2 className="size-5" />
                </div>
                <h3 className="text-base font-bold text-white">Engineering Teams</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  "Find the root cause, get instant AI IDE fix prompts for Cursor, and verify the patch with 3.2s targeted retests."
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Briefcase className="size-5" />
                </div>
                <h3 className="text-base font-bold text-white">Digital Agencies</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  "Scan client websites and generate white-label PDF security audit deliverables branded with your agency logo."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 12: FINAL CTA                                                     */}
        {/* ========================================================================= */}
        <section className="py-20 border-b border-neutral-800 bg-neutral-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
              <ShieldCheck className="size-3.5" />
              <span>Ready to Verify Your Web Security?</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Find it. Fix it. Prove it's fixed.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Scan your website, understand the risk, fix vulnerabilities with 1-click AI IDE prompts, and verify the result in seconds.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => navigateTo("/workspace")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 hover:scale-[1.02] cursor-pointer"
              >
                <Zap className="size-4 fill-neutral-950" />
                <span>Scan My Website</span>
                <ArrowRight className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo("/sample-report")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-slate-200 border border-neutral-700 text-sm font-semibold transition-colors cursor-pointer"
              >
                <FileText className="size-4 text-slate-400" />
                <span>View Sample Report</span>
                <ExternalLink className="size-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Global Footer */}
      <EnterpriseFooter />
    </div>
  );
};

export default HowItWorksPage;
