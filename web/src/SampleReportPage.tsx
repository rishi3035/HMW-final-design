import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Globe,
  ShieldAlert,
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  Calendar,
  Layers,
  FileCode2,
  Briefcase,
  TerminalSquare,
  Shield,
  Activity,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Code2,
  Zap,
} from "lucide-react";
import { sampleReport, type SampleFinding } from "./lib/sampleReportData";
import { BrandedPdfModal } from "./components/BrandedPdfModal";
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

export const SampleReportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"findings" | "executive" | "ide-prompts">("findings");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedFindingIds, setExpandedFindingIds] = useState<Set<string>>(new Set(["sample-01", "sample-02"]));
  const [activePatchFramework, setActivePatchFramework] = useState<"nextjs" | "nginx" | "fastapi">("nextjs");
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalFindings = sampleReport.findings.length;

  const filteredFindings = sampleReport.findings.filter((f) => {
    if (severityFilter === "all") return true;
    return f.severity === severityFilter;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (id: string) => {
    setExpandedFindingIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedFindingIds(new Set(sampleReport.findings.map((f) => f.id)));
  };

  const collapseAll = () => {
    setExpandedFindingIds(new Set());
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "high":
        return "bg-orange-500/10 text-orange-400 border-orange-500/30";
      case "medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "low":
        return "bg-sky-500/10 text-sky-400 border-sky-500/30";
      case "info":
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-700/40";
    }
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
              onClick={() => setIsPdfModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-mono font-semibold text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
            >
              <Download className="size-3.5 text-emerald-400" />
              <span>Export Branded PDF</span>
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
                  setIsPdfModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-neutral-900 border border-emerald-500/40 text-emerald-400 font-bold text-xs uppercase tracking-wider"
              >
                Export Branded PDF
              </button>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
        
        {/* ========================================================================= */}
        {/* 1. REPORT HERO & AI LAUNCH SCORE HERO BANNER                              */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 sm:p-8 shadow-2xl space-y-6 text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs font-bold">
                  SAMPLE AUDIT
                </span>
                <span className="text-xs text-neutral-400 font-mono flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {sampleReport.scanDate}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Globe className="size-7 text-emerald-400 shrink-0" />
                <span>{sampleReport.domain}</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Automated security assessment conducted across OWASP ZAP (DAST), Nuclei v3.3 CVE engine, and Semgrep static analysis.
              </p>
            </div>

            {/* AI Launch Score Metric Card */}
            <div className="flex items-center gap-6 bg-neutral-950 border border-neutral-800 rounded-2xl p-4 sm:p-6 shrink-0 shadow-inner">
              <div className="space-y-1 text-right sm:text-left">
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  AI Launch Score
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-amber-400 tracking-tight">
                  {sampleReport.launchScore}
                  <span className="text-lg text-neutral-500 font-normal">/100</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 text-[11px] font-bold">
                  HIGH RISK
                </div>
              </div>

              <div className="h-16 w-px bg-neutral-800 hidden sm:block" />

              <div className="space-y-1.5 hidden sm:block text-xs font-mono text-neutral-400">
                <div>Status: <strong className="text-amber-400">Pre-Launch</strong></div>
                <div>Action: <strong className="text-slate-200">Fix 3 Mediums</strong></div>
                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(true)}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer pt-1"
                >
                  <Download className="size-3" />
                  <span>Preview PDF Deliverable</span>
                </button>
              </div>
            </div>
          </div>

          {/* Severity 5-Column Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            {[
              { label: "CRITICAL", count: sampleReport.severitySummary.critical, color: "border-rose-500/30 bg-rose-950/10 text-rose-400", filter: "critical" },
              { label: "HIGH", count: sampleReport.severitySummary.high, color: "border-orange-500/30 bg-orange-950/10 text-orange-400", filter: "high" },
              { label: "MEDIUM", count: sampleReport.severitySummary.medium, color: "border-amber-500/30 bg-amber-950/10 text-amber-400", filter: "medium" },
              { label: "LOW", count: sampleReport.severitySummary.low, color: "border-sky-500/30 bg-sky-950/10 text-sky-400", filter: "low" },
              { label: "INFO", count: sampleReport.severitySummary.info, color: "border-neutral-700/40 bg-neutral-900/30 text-neutral-400", filter: "info" },
            ].map((sev) => (
              <button
                key={sev.label}
                onClick={() => setSeverityFilter(severityFilter === sev.filter ? "all" : sev.filter)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${sev.color} ${
                  severityFilter === sev.filter ? "ring-2 ring-emerald-400 scale-[1.02]" : "hover:border-neutral-600"
                }`}
              >
                <div className="text-[10px] font-mono font-bold tracking-wider uppercase opacity-80">
                  {sev.label}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono mt-0.5">
                  {sev.count}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. INTERACTIVE TAB NAVIGATION                                             */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
          <button
            onClick={() => setActiveTab("findings")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "findings"
                ? "bg-neutral-900 border-emerald-500/60 text-white shadow-lg shadow-emerald-500/10"
                : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-slate-200"
            }`}
          >
            <ShieldAlert className="size-3.5 text-emerald-400" />
            <span>Discovered Vulnerabilities ({totalFindings})</span>
          </button>

          <button
            onClick={() => setActiveTab("executive")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "executive"
                ? "bg-neutral-900 border-emerald-500/60 text-white shadow-lg shadow-emerald-500/10"
                : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-slate-200"
            }`}
          >
            <Briefcase className="size-3.5 text-amber-400" />
            <span>Executive Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("ide-prompts")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "ide-prompts"
                ? "bg-neutral-900 border-emerald-500/60 text-white shadow-lg shadow-emerald-500/10"
                : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-slate-200"
            }`}
          >
            <TerminalSquare className="size-3.5 text-sky-400" />
            <span>IDE AI Fix Prompts</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: DISCOVERED FINDINGS LIST                                           */}
        {/* ========================================================================= */}
        {activeTab === "findings" && (
          <div className="space-y-4 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-400">
              <div className="flex items-center gap-3">
                <span>Showing {filteredFindings.length} of {totalFindings} findings</span>
                {severityFilter !== "all" && (
                  <button
                    onClick={() => setSeverityFilter("all")}
                    className="text-emerald-400 hover:underline font-mono text-xs cursor-pointer"
                  >
                    Clear filter ({severityFilter})
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={expandAll}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-slate-300 hover:text-white hover:border-neutral-700 text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 text-xs font-mono transition-colors cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>

            <div className="space-y-3.5">
              {filteredFindings.map((finding) => {
                const isExpanded = expandedFindingIds.has(finding.id);
                return (
                  <div
                    key={finding.id}
                    className="rounded-2xl border border-neutral-800 bg-neutral-900/90 overflow-hidden transition-all shadow-md"
                  >
                    {/* Collapsed Header Bar */}
                    <div
                      onClick={() => toggleExpand(finding.id)}
                      className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-850 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider border shrink-0 ${getSeverityBadge(
                            finding.severity
                          )}`}
                        >
                          {finding.severity}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-base font-bold text-white hover:text-emerald-300 transition-colors truncate">
                            {finding.title}
                          </h3>
                          <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                            {finding.owaspCategory} • {finding.toolSource}
                          </div>
                          {!isExpanded && (
                            <p className="text-xs text-neutral-400 line-clamp-1 mt-1 font-sans">
                              {finding.summary}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                          {finding.confidence} Confidence
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="size-4 text-neutral-400" />
                        ) : (
                          <ChevronDown className="size-4 text-neutral-400" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Content Details */}
                    {isExpanded && (
                      <div className="p-5 sm:p-6 border-t border-neutral-800 bg-neutral-950 space-y-5 text-xs sm:text-sm">
                        {/* Summary & Impact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                            <div className="text-[11px] font-mono text-neutral-400 uppercase">What this means</div>
                            <p className="text-slate-300 leading-relaxed">{finding.summary}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                            <div className="text-[11px] font-mono text-neutral-400 uppercase">Business impact</div>
                            <p className="text-slate-300 leading-relaxed">{finding.businessImpact}</p>
                          </div>
                        </div>

                        {/* Evidence */}
                        <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                          <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                            Evidence: {finding.evidenceTitle}
                          </div>
                          <pre className="text-xs font-mono text-slate-300 bg-neutral-950 p-3 rounded-lg overflow-x-auto border border-neutral-800 whitespace-pre-wrap">
                            {finding.evidenceSummary}
                          </pre>
                        </div>

                        {/* Fix Code / Prompt */}
                        {finding.cursorPrompt && (
                          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-mono text-sky-400 font-bold flex items-center gap-1.5">
                                <Code2 className="size-3.5" />
                                Cursor / Claude AI Fix Directive
                              </span>
                              <button
                                onClick={() => handleCopy(finding.id, finding.cursorPrompt || "")}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-slate-200 border border-neutral-700 text-xs font-mono font-semibold transition-colors cursor-pointer"
                              >
                                {copiedId === finding.id ? (
                                  <>
                                    <Check className="size-3 text-emerald-400" />
                                    <span className="text-emerald-400">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="size-3" />
                                    <span>Copy Fix Prompt</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="text-xs font-mono text-slate-300 bg-neutral-950 p-3 rounded-lg border border-neutral-800 whitespace-pre-wrap">
                              {finding.cursorPrompt}
                            </pre>
                          </div>
                        )}

                        {/* Remediation Steps */}
                        <div className="space-y-2 pt-1">
                          <div className="text-[11px] font-mono text-neutral-400 uppercase">Recommended Remediation</div>
                          <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                            {finding.remediation.map((step, sIdx) => (
                              <li key={sIdx}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: EXECUTIVE SUMMARY                                                  */}
        {/* ========================================================================= */}
        {activeTab === "executive" && (
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 sm:p-8 space-y-8 text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400">
                <Briefcase className="size-3.5" />
                <span>Executive Decision Brief</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                High-Level Security Assessment for Founders & Stakeholders
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {sampleReport.executiveSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="text-xs font-bold text-amber-400 font-mono uppercase">What Matters Most</div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {sampleReport.whatMattersMost.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="size-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="text-xs font-bold text-rose-400 font-mono uppercase">What to Fix First</div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {sampleReport.fixFirst.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="size-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="text-xs font-bold text-emerald-400 font-mono uppercase">Quick Wins</div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {sampleReport.quickWins.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="size-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: IDE AI FIX PROMPTS                                                 */}
        {/* ========================================================================= */}
        {activeTab === "ide-prompts" && (
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 sm:p-8 space-y-6 text-left">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400">
                <TerminalSquare className="size-3.5" />
                <span>Developer Dispatchers</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                AI Coding Prompts Ready for Cursor, Claude Code & Windsurf
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Copy any formatted remediation prompt directly into your IDE chat to apply the security patch with 0 regressions.
              </p>
            </div>

            {/* CONSOLIDATED ONE-SHOT PATCH SYNTHESIZER */}
            <div className="rounded-2xl border border-emerald-500/40 bg-neutral-950 p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    <Zap className="size-3.5" />
                    <span>Consolidated Security Patch (One-Shot Fix)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Fix all 7 detected HTTP header and policy vulnerabilities in a single drop-in config file instead of 10 individual prompts.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-1 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setActivePatchFramework("nextjs")}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activePatchFramework === "nextjs"
                          ? "bg-emerald-500 text-neutral-950 font-bold"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      Next.js
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePatchFramework("nginx")}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activePatchFramework === "nginx"
                          ? "bg-emerald-500 text-neutral-950 font-bold"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      Nginx
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePatchFramework("fastapi")}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activePatchFramework === "fastapi"
                          ? "bg-emerald-500 text-neutral-950 font-bold"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      FastAPI
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const patchCode = sampleReport.consolidatedPatches[activePatchFramework];
                      handleCopy(`patch-${activePatchFramework}`, patchCode);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono font-bold transition-colors cursor-pointer"
                  >
                    {copiedId === `patch-${activePatchFramework}` ? (
                      <>
                        <Check className="size-3.5" />
                        <span>Copied Patch!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy Patch</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-black border border-neutral-800 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-72">
                {sampleReport.consolidatedPatches[activePatchFramework]}
              </pre>
            </div>

            <div className="pt-2">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block font-bold">
                Individual Finding Prompts
              </span>
            </div>

            <div className="space-y-4">
              {sampleReport.findings
                .filter((f) => f.cursorPrompt)
                .map((finding) => (
                  <div
                    key={finding.id}
                    className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase border ${getSeverityBadge(
                            finding.severity
                          )}`}
                        >
                          {finding.severity}
                        </span>
                        <span className="text-sm font-bold text-white">{finding.title}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(finding.id, finding.cursorPrompt || "")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-slate-200 border border-neutral-700 text-xs font-mono font-semibold transition-colors cursor-pointer"
                      >
                        {copiedId === finding.id ? (
                          <>
                            <Check className="size-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-slate-300 bg-black p-4 rounded-xl border border-neutral-800 whitespace-pre-wrap">
                      {finding.cursorPrompt}
                    </pre>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 border border-neutral-800 text-center space-y-5 shadow-2xl">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Ready to scan your own website?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Verify domain ownership in under 60 seconds and receive your full interactive security report with prioritized fixes.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigateTo("/workspace")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 hover:scale-[1.02] cursor-pointer"
            >
              <span>Launch Free Security Scan</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

      </main>

      {/* Global Footer */}
      <EnterpriseFooter />

      {/* White-Label PDF Export Modal */}
      <BrandedPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        agencyName="Hack My Website Labs"
        primaryAccent="#10b981"
        secondaryAccent="#064e3b"
        disclaimer="Confidential Security Assessment Report. Prepared by Hack My Website Autonomous DAST & SAST Intelligence Engine."
        targetDomain={sampleReport.domain}
        score={sampleReport.launchScore}
      />
    </div>
  );
};

export default SampleReportPage;
