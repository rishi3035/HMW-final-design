"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Radar,
  Activity,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Zap,
  Layers,
  FileCode2,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  ServerCrash,
  Globe,
  Terminal,
  Copy,
  Check,
  Briefcase,
  Users,
  Code2,
  FileText,
  PackageCheck,
  Bot,
  Layout,
  HelpCircle,
  Clock,
  Shield,
} from "lucide-react";
import { HmwKotaNavbar, HmwKotaFooter, HmwKotaCursor } from "./components/hmw-kota";
import { GreenAuraBackground } from "./components/ui/GreenAuraBackground";
import { WavesShader } from "@/components/ui/waves-shader";

export const HowItWorksPage: React.FC = () => {
  const [copiedProof, setCopiedProof] = useState<string | null>(null);
  const [activeProof, setActiveProof] = useState<"sri" | "csp" | "hsts" | "env">("sri");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedProof(id);
    setTimeout(() => setCopiedProof(null), 2000);
  };

  const proofData = {
    sri: {
      title: "Missing Subresource Integrity (SRI) on CDN Script",
      severity: "MEDIUM",
      severityColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      target: "https://demo-saas-platform.com",
      engine: "OWASP ZAP Runtime DAST",
      confidence: "100% Deterministic",
      curl: `curl -sI https://demo-saas-platform.com | grep -i "script"`,
      requestSnippet: `GET / HTTP/1.1\nHost: demo-saas-platform.com\nUser-Agent: Mozilla/5.0 (HMW Autonomous Security Crawler)`,
      responseSnippet: `HTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\n\n<!-- Matched Third-Party Asset: -->\n<script src="https://checkout.razorpay.com/v1/checkout.js"></script>\n[!] EVIDENCE: Script tag lacks 'integrity' hash and 'crossorigin' attribute. CDN tampering can compromise checkout execution.`,
      fix: `Add SHA-384 subresource integrity hash to third-party script tags.`,
    },
    csp: {
      title: "Permissive Content-Security-Policy Directives",
      severity: "MEDIUM",
      severityColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      target: "https://demo-saas-platform.com",
      engine: "HMW Policy & Config Engine",
      confidence: "Deterministic Header Check",
      curl: `curl -I https://demo-saas-platform.com | grep -i "content-security-policy"`,
      requestSnippet: `HEAD / HTTP/1.1\nHost: demo-saas-platform.com`,
      responseSnippet: `HTTP/1.1 200 OK\nContent-Type: text/html\nContent-Security-Policy: default-src * 'unsafe-inline';\n\n[!] EVIDENCE: Wildcard default-src allows arbitrary script/style execution. Missing object-src and base-uri restrictions.`,
      fix: `Restrict default-src to 'self' and whitelist explicit CDN domains.`,
    },
    hsts: {
      title: "Missing HTTP Strict Transport Security (HSTS)",
      severity: "LOW",
      severityColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      target: "https://demo-saas-platform.com",
      engine: "Nuclei v3.3 SSL/TLS Engine",
      confidence: "Deterministic Header Check",
      curl: `curl -s -D- https://demo-saas-platform.com -o /dev/null | grep -i "strict-transport-security"`,
      requestSnippet: `GET / HTTP/1.1\nHost: demo-saas-platform.com`,
      responseSnippet: `HTTP/1.1 200 OK\nServer: Cloudflare\nConnection: keep-alive\n\n[!] EVIDENCE: Strict-Transport-Security header was not returned in HTTPS response. Allows potential SSL stripping attacks on unencrypted initial handshakes.`,
      fix: `Add 'Strict-Transport-Security: max-age=63072000; includeSubDomains; preload' in web server config.`,
    },
    env: {
      title: "Exposed Production Environment Variables (.env)",
      severity: "CRITICAL",
      severityColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      target: "https://demo-saas-platform.com/.env",
      engine: "Nuclei v3.3 Web Exposure Engine",
      confidence: "100% Deterministic (200 OK Content Match)",
      curl: `curl -i -s https://demo-saas-platform.com/.env | head -n 8`,
      requestSnippet: `GET /.env HTTP/1.1\nHost: demo-saas-platform.com`,
      responseSnippet: `HTTP/1.1 200 OK\nContent-Type: text/plain\n\nDATABASE_URL=postgres://app_user:secr3t@rds.amazonaws.com/prod\nAWS_SECRET_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE\n[!] EVIDENCE: Publicly readable credential file discovered in webroot.`,
      fix: `Block dotfile URI patterns in Nginx/Vercel and immediately rotate exposed cloud credentials.`,
    },
  };

  const detectionCategories = [
    {
      id: "appsec",
      title: "Application Security",
      badge: "OWASP Top 10",
      icon: ShieldAlert,
      color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
      description: "SQL Injection, Cross-Site Scripting (XSS), broken session management, and Insecure Direct Object References (IDOR).",
      examples: ["SQLi & ORM Flaws", "DOM & Stored XSS", "Session Fixation", "IDOR Access Gaps"],
    },
    {
      id: "config",
      title: "Security Configuration",
      badge: "HTTP & Headers",
      icon: Globe,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      description: "Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), CORS allowlists, and cookie protection flags.",
      examples: ["HSTS & TLS Preload", "CSP Frame-Ancestors", "CORS Wildcards", "Secure/HttpOnly Flags"],
    },
    {
      id: "secrets",
      title: "Secrets & Exposure",
      badge: "SAST & Leaks",
      icon: FileCode2,
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      description: "Publicly accessible production .env files, database credentials, Stripe/AWS tokens, and client JavaScript sourcemaps.",
      examples: [".env Credential Leaks", "Cloud API Keys", "Public Sourcemaps", "Backup File Artifacts"],
    },
    {
      id: "api",
      title: "API & GraphQL Security",
      badge: "Endpoints",
      icon: ServerCrash,
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      description: "Unauthenticated backend mutations, public GraphQL introspection consoles, and missing rate limit defenses.",
      examples: ["GraphQL Introspection", "Auth Bypass on APIs", "Missing Rate Limits", "Object Injection"],
    },
    {
      id: "clientside",
      title: "Client-Side Security",
      badge: "Integrity",
      icon: PackageCheck,
      color: "text-sky-400 border-sky-500/30 bg-sky-500/10",
      description: "Subresource Integrity (SRI) for CDN scripts, outdated frontend NPM dependencies, and prototype pollution risks.",
      examples: ["Missing SRI Hashes", "Outdated NPM Packages", "Prototype Pollution", "MIME-Type Sniffing"],
    },
    {
      id: "modernweb",
      title: "Modern Web & AI App Risks",
      badge: "Full-Stack SaaS",
      icon: Bot,
      color: "text-orange-400 border-orange-500/30 bg-orange-500/10",
      description: "AI-generated codebase flaws, insecure Supabase/Firebase rules, unauthenticated debug paths, and exposed route handlers.",
      examples: ["Permissive DB RLS", "Public Debug Routes", "Insecure AI Defaults", "Next.js Route Leaks"],
    },
  ];

  const workflowStages = [
    {
      num: "01",
      name: "Domain Ownership Verification",
      tag: "SAFE HARBOR",
      icon: LockKeyhole,
      summary: "Before initiating scans, Hack My Website confirms target authorization via DNS TXT records or well-known token verification. Zero rogue or unauthorized probing.",
      details: [
        "Cryptographic token verification (DNS TXT or /.well-known/hackmywebsite.txt)",
        "Strict adherence to safe-harbor legal authorization standards",
        "Prevents unauthenticated target scanning and maintains clean security logs",
      ],
    },
    {
      num: "02",
      name: "Automated Multi-Engine Scan",
      tag: "SYNCHRONIZED DAST + SAST",
      icon: Radar,
      summary: "Simultaneously launches OWASP ZAP (runtime DAST), Nuclei v3.3 (200+ CVE vulnerability heuristics), and Semgrep (code/secret leaks) across sovereign AWS Mumbai nodes.",
      details: [
        "Dynamic runtime crawling of forms, query parameters, and session cookies",
        "Community & proprietary CVE template matching for known exploits",
        "100% non-destructive probes that respect production traffic rate limits",
      ],
    },
    {
      num: "03",
      name: "Verifiable Technical Evidence",
      tag: "ZERO HALLUCINATIONS",
      icon: Terminal,
      summary: "Every discovered finding includes a reproducible curl command, exact HTTP request/response headers, and matched payloads. Zero vague hand-waving.",
      details: [
        "Reproducible terminal commands you can run directly from bash or zsh",
        "Highlighted response payloads pinpointing the exact vulnerability trigger",
        "Deterministic verification with 0% false positives guaranteed",
      ],
    },
    {
      num: "04",
      name: "Actionable AI IDE Remediation",
      tag: "CURSOR & CLAUDE READY",
      icon: Code2,
      summary: "Generates tailored copy-paste prompts formatted specifically for Cursor AI, Claude 3.7, and GitHub Copilot, plus unified code diffs for Next.js, Node.js, and Python.",
      details: [
        "Pre-formatted .cursorrules prompts that enforce defensive coding standards",
        "Ready-to-merge unified git diffs targeting exact configuration and route files",
        "Eliminates hours of developer research and security triage overhead",
      ],
    },
    {
      num: "05",
      name: "3.2-Second Targeted Retesting",
      tag: "INSTANT VERIFICATION",
      icon: RotateCcw,
      summary: "After applying the code fix, trigger an isolated retest probe targeting that specific vulnerability endpoint in 3.2 seconds without running a full re-scan.",
      details: [
        "Microsecond feedback loop directly from your staging or production deploy",
        "Immediate green verification badge confirming remediation success",
        "Logs cryptographic proof in your compliance audit trail",
      ],
    },
    {
      num: "06",
      name: "Continuous Posture & Compliance",
      tag: "SOC 2 & DPDP READY",
      icon: ShieldCheck,
      summary: "Tracks your Launch Score trajectory over time, generates board-ready PDF security audits with tamper-proof QR verification, and maintains compliance records.",
      details: [
        "Historical posture timeline tracking security score progression across sprints",
        "1-click white-label PDF export ready for enterprise enterprise sales & compliance",
        "Sovereign AWS Mumbai data residency compliant with DPDP and ISO 27001",
      ],
    },
  ];

  const safetyMetrics = [
    {
      num: "01",
      title: "200+ Automated Probes",
      label: "Coverage",
      desc: "Synchronized DAST runtime crawling, Nuclei CVE heuristics, and SAST secret detection.",
      badge: "Multi-Engine",
      color: "text-emerald-400 border-emerald-500/30",
    },
    {
      num: "02",
      title: "3–8 Min Velocity",
      label: "Speed",
      desc: "Rapid end-to-end security assessment without interrupting CI/CD pipelines or deployments.",
      badge: "Rapid Execution",
      color: "text-sky-400 border-sky-500/30",
    },
    {
      num: "03",
      title: "100% Non-Destructive",
      label: "Safety",
      desc: "Intelligent payload throttling that never corrupts database records or disrupts user traffic.",
      badge: "Zero Uptime Risk",
      color: "text-amber-400 border-amber-500/30",
    },
    {
      num: "04",
      title: "3.2s Instant Retest",
      label: "Verification",
      desc: "Isolated single-vulnerability verification probe giving instant confirmation on fixes.",
      badge: "Micro Feedback Loop",
      color: "text-emerald-400 border-emerald-500/30",
    },
  ];

  const faqs = [
    {
      q: "Will scanning slow down or crash my live production website?",
      a: "No. Hack My Website is 100% non-destructive. Our scanning engine operates with adaptive rate limiting and safe-harbor heuristics that mimic standard browser requests. We do not perform volumetric DDoS attacks or destructive database drop operations.",
    },
    {
      q: "Why do you require domain verification before scanning?",
      a: "Authorization verification protects both you and our platform. By verifying DNS TXT records or well-known HTML tokens, we ensure that only authorized owners or designated engineers can initiate automated vulnerability assessments, maintaining 100% legal compliance.",
    },
    {
      q: "How does the AI IDE remediation prompt work?",
      a: "When a vulnerability is verified, our engine packages the exact reproduction payload, file context, and security patch into a prompt tailored for AI coding assistants (Cursor, Claude 3.7, Copilot). Developers can paste this directly into their IDE to generate accurate, context-aware code diffs.",
    },
    {
      q: "What is the 3.2-second retest feature?",
      a: "Instead of re-running the entire 8-minute multi-engine scan after fixing a vulnerability, the targeted retest sends an isolated verification payload to the specific vulnerable endpoint. You receive confirmation within seconds that the security hole is sealed.",
    },
    {
      q: "Where is scan data hosted and processed?",
      a: "All scans and telemetry execute on sovereign, ISO-certified AWS Mumbai (ap-south-1) cloud infrastructure. Scan data is strictly isolated per tenant, encrypted at rest via AES-256, and fully compliant with the Indian Digital Personal Data Protection Act 2023 (DPDP) and SOC 2 Type II standards.",
    },
  ];

  const currentProof = proofData[activeProof];

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950 font-sans antialiased relative">
      {/* Fluid Follower Magnetic Cursor */}
      <HmwKotaCursor />

      {/* Floating Glass Pill Navigation */}
      <HmwKotaNavbar
        onStartScan={() => navigateTo("/workspace")}
        onBookDemo={() => navigateTo("/contact")}
      />

      <main id="main-content" className="space-y-0 pt-20">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (WAVES SHADER CANVAS)                                     */}
        {/* ========================================================================= */}
        <section className="relative w-full min-h-[85vh] flex flex-col justify-center py-20 sm:py-24 border-b border-white/10 overflow-hidden text-center">
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
            <WavesShader className="w-full h-full" />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px] pointer-events-none" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10 w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/10 text-xs font-mono text-emerald-400 backdrop-blur-md shadow-lg">
              <Sparkles className="size-3.5" />
              <span>Autonomous Security Engineering Pipeline</span>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                From Scan to <span className="text-emerald-400">Verified Fix</span> in Minutes.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed font-normal">
                Traditional penetration testing hands you a 100-page PDF weeks later. Hack My Website continuously verifies permissions, maps your attack surface across 3 synchronized security engines, proves technical evidence with curl scripts, and delivers 1-click AI prompts to remediate before release.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigateTo("/workspace")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02] cursor-pointer"
              >
                <Zap className="size-4 fill-neutral-950" />
                <span>Start Free Autonomous Scan</span>
                <ArrowRight className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo("/sample-report")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black/80 hover:bg-white/10 text-neutral-200 border border-white/15 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer backdrop-blur-md"
              >
                <FileText className="size-4 text-neutral-400" />
                <span>Explore Sample Report</span>
                <ExternalLink className="size-3.5 text-neutral-400" />
              </button>
            </div>

            {/* Fast Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto text-left">
              {[
                { label: "Scan Velocity", val: "3–8 Minutes", sub: "Autonomous Pipeline" },
                { label: "Verification Accuracy", val: "100% Deterministic", sub: "0% False Positives" },
                { label: "Target Retesting", val: "3.2 Seconds", sub: "Targeted Micro-Probe" },
                { label: "Production Safety", val: "Safe Harbor", sub: "Non-Destructive DAST" },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">{item.label}</span>
                  <span className="text-sm sm:text-base font-bold text-white block mt-0.5">{item.val}</span>
                  <span className="text-[11px] text-emerald-400 font-mono block">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. THE 6-STAGE CONNECTED SECURITY WORKFLOW                                 */}
        {/* ========================================================================= */}
        <section className="relative py-20 sm:py-24 border-b border-white/10 bg-[#07090E] overflow-hidden">
          <GreenAuraBackground opacity={80} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                [ End-to-End Architecture ]
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                How The Scan Operates, Step by Step.
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                A connected lifecycle designed for engineering teams that cannot afford alert fatigue or unverified vulnerability claims.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflowStages.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.num}
                    className="p-6 sm:p-7 rounded-3xl bg-black/60 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-5 shadow-xl group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="size-9 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-extrabold text-xs">
                          {stage.num}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/10">
                          {stage.tag}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                          <Icon className="size-4 text-emerald-400 shrink-0" />
                          <span>{stage.name}</span>
                        </h3>
                        <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                          {stage.summary}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] text-neutral-400 font-normal">
                      {stage.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
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
        {/* 3. WHAT WE DETECT: FULL SPECTRUM ATTACK SURFACE                           */}
        {/* ========================================================================= */}
        <section className="relative py-20 sm:py-24 border-b border-white/10 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                [ Comprehensive Threat Coverage ]
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                What We Detect Across Your Web Surface.
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                We combine active dynamic crawling with static pattern matching to catch security flaws before automated adversaries exploit them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {detectionCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="p-6 rounded-3xl bg-[#0A0D14] border border-white/10 hover:border-emerald-500/40 transition-all space-y-4 shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="size-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                        <Icon className="size-5 text-emerald-400" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/10">
                        {cat.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                      {cat.examples.map((ex, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-neutral-300 border border-white/5"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. VERIFIABLE TECHNICAL EVIDENCE (SHOW ME THE PROOF)                      */}
        {/* ========================================================================= */}
        <section className="relative py-20 sm:py-24 border-b border-white/10 bg-[#07090E] overflow-hidden">
          <GreenAuraBackground opacity={70} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-10">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                [ Zero Hallucinations ]
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Verifiable Technical Evidence.
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Every vulnerability report includes the exact reproduction curl command, matched HTTP headers, and raw evidence payload.
              </p>
            </div>

            {/* Interactive Evidence Inspector */}
            <div className="rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl p-5 sm:p-8 shadow-2xl space-y-6">
              {/* Selector Tabs */}
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-white/10">
                {(["sri", "csp", "hsts", "env"] as const).map((key) => {
                  const item = proofData[key];
                  const isActive = activeProof === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveProof(key)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                        isActive
                          ? "bg-white/15 border-emerald-500/50 text-white shadow-sm"
                          : "bg-black/40 border-white/5 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {item.title.split(":")[0]}
                    </button>
                  );
                })}
              </div>

              {/* Inspector Content */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10 text-xs">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {currentProof.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-neutral-400">
                      <span>Engine: {currentProof.engine}</span>
                      <span>·</span>
                      <span className="text-emerald-400">{currentProof.confidence}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border self-start sm:self-auto ${currentProof.severityColor}`}>
                    {currentProof.severity} SEVERITY
                  </span>
                </div>

                {/* Reproduction Curl Command */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>Reproduction Command (Curl)</span>
                    <button
                      onClick={() => handleCopy("curl", currentProof.curl)}
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                    >
                      {copiedProof === "curl" ? (
                        <>
                          <Check className="size-3" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          <span>Copy Bash</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 rounded-xl bg-[#0A0D14] border border-white/10 font-mono text-xs text-neutral-200 overflow-x-auto">
                    <code>{currentProof.curl}</code>
                  </pre>
                </div>

                {/* Raw Evidence Payload Snippet */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-neutral-400">Raw HTTP Verification Payload</span>
                  <pre className="p-3.5 rounded-xl bg-[#0A0D14] border border-white/10 font-mono text-xs text-emerald-400/90 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                    {currentProof.responseSnippet}
                  </pre>
                </div>

                {/* Recommended Patch */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span><strong>Recommended Remediation:</strong> {currentProof.fix}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. PRODUCTION SAFETY & NON-DESTRUCTIVE GUARANTEE                          */}
        {/* ========================================================================= */}
        <section className="relative py-20 sm:py-24 border-b border-white/10 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                [ Production Integrity ]
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Engineered for 100% Production Safety.
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Run deep external attack simulations and security audits without risking database records, user traffic, or checkout workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {safetyMetrics.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#0A0D14] border border-white/10 flex flex-col justify-between space-y-4 shadow-xl hover:border-emerald-500/30 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="size-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 font-bold text-xs font-mono">
                        {item.num}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20">
                        {item.label}
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {item.title}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <Shield className="size-3 text-emerald-400" />
                    <span>{item.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. FREQUENTLY ASKED QUESTIONS (FAQ)                                       */}
        {/* ========================================================================= */}
        <section className="relative py-20 sm:py-24 border-b border-white/10 bg-[#07090E] overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                [ Common Inquiries ]
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Frequently Asked Questions on Scanning Workflow.
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Everything you need to know about setting up, verifying, and running autonomous audits.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-black/60 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <span className="text-sm sm:text-base font-bold text-white flex items-center gap-2.5">
                        <HelpCircle className="size-4 text-emerald-400 shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded transition-transform ${isOpen ? "rotate-90 text-emerald-400" : "text-neutral-400"}`}>
                        ▶
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5 font-normal">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. BOTTOM ENTERPRISE CTA                                                  */}
        {/* ========================================================================= */}
        <section className="relative py-20 sm:py-24 bg-black overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Ready to Audit Your Web Applications?
            </h2>
            <p className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Launch a non-destructive multi-engine scan in under 60 seconds. Verify target ownership, uncover runtime vulnerabilities, and get actionable AI fix prompts.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateTo("/workspace")}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/25 cursor-pointer"
              >
                <Zap className="size-4 fill-neutral-950" />
                <span>Start Free Scan Now</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <HmwKotaFooter onStartScan={() => navigateTo("/workspace")} />
    </div>
  );
};

export default HowItWorksPage;
