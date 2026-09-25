import React, { useState, useMemo } from "react";
import {
  IconArrowLeft,
  IconShieldCheck,
  IconShieldAlert,
  IconAlertTriangle,
  IconActivity,
  IconDownload,
  IconShare,
  IconRefresh,
  IconSearch,
  IconFilter,
  IconTerminal,
  IconCopy,
  IconCheck,
  IconSparkles,
  IconExternalLink,
  IconFlame,
  IconRadar,
  IconFileCode,
  IconBrandGithub,
  IconChevronRight,
  IconCpu,
} from "@tabler/icons-react";
import { sampleReport, type SampleFinding } from "./lib/sampleReportData";
import {
  generateCurlReplayCommand,
  dispatchToIde,
  type FindingContext,
} from "./lib/ide-dispatcher";
import {
  buildGitHubIssueUrl,
  buildLinearIssueUrl,
  type TicketingFindingContext,
} from "./lib/ticketing-dispatcher";
import { BrandedPdfModal } from "./components/BrandedPdfModal";
import { HmwLogo } from "../../design-system/src/HmwLogo";

interface ScanDetailPageProps {
  scanId?: string;
  onNavigateBack?: () => void;
}

const SCORE_CATEGORIES = [
  { key: "basics", label: "Security Basics & Headers", score: 14, max: 25 },
  { key: "auth", label: "Auth & Session Protection", score: 8, max: 20 },
  { key: "secrets", label: "Secrets & API Exposure", score: 10, max: 20 },
  { key: "readiness", label: "Production Hardening", score: 5, max: 15 },
  { key: "data", label: "Client-Side Script Integrity", score: 3, max: 10 },
  { key: "infra", label: "Infrastructure Posture", score: 2, max: 10 },
];

export const ScanDetailPage: React.FC<ScanDetailPageProps> = ({
  scanId = "scan-8942-mvpstudio",
  onNavigateBack,
}) => {
  const [selectedFindingId, setSelectedFindingId] = useState<string>(
    sampleReport.findings[0]?.id || "zap-clickjacking-01"
  );
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEvidenceTab, setActiveEvidenceTab] = useState<"evidence" | "curl" | "prompt">("evidence");
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [retestStatus, setRetestStatus] = useState<"idle" | "running" | "done">("idle");
  const [fixedFindingIds, setFixedFindingIds] = useState<Set<string>>(new Set());
  const [ideDispatchStatus, setIdeDispatchStatus] = useState<string | null>(null);

  const navigateTo = (path: string) => {
    if (onNavigateBack && (path === "/workspace" || path === "/dashboard")) {
      onNavigateBack();
      return;
    }
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredFindings = useMemo(() => {
    return sampleReport.findings.filter((f) => {
      const matchesSeverity =
        severityFilter === "all" || f.severity === severityFilter;
      const matchesSearch =
        searchQuery === "" ||
        f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.owaspCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.affectedUrl.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSeverity && matchesSearch;
    });
  }, [severityFilter, searchQuery]);

  const activeFinding = useMemo(() => {
    return (
      sampleReport.findings.find((f) => f.id === selectedFindingId) ||
      sampleReport.findings[0]
    );
  }, [selectedFindingId]);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStatus(label);
    setTimeout(() => setCopiedStatus(null), 2000);
  };

  const handleRetestAll = () => {
    setRetestStatus("running");
    setTimeout(() => {
      setRetestStatus("done");
      setTimeout(() => setRetestStatus("idle"), 3000);
    }, 1500);
  };

  const handleToggleFixed = (id: string) => {
    setFixedFindingIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleIdeDispatch = async (ide: "cursor" | "vscode" | "windsurf" | "jetbrains") => {
    if (!activeFinding) return;
    const ctx: FindingContext = {
      id: activeFinding.id,
      title: activeFinding.title,
      severity: activeFinding.severity,
      description: activeFinding.summary,
      affected_url: activeFinding.affectedUrl,
      owasp_category: activeFinding.owaspCategory,
      tool_source: activeFinding.toolSource,
      evidence_summary: activeFinding.evidenceSummary,
      business_impact: activeFinding.businessImpact,
      remediation_steps: activeFinding.remediation,
    };
    await dispatchToIde(ide, ctx, sampleReport.domain);
    setIdeDispatchStatus(`Sent to ${ide.toUpperCase()}! Directive copied to clipboard.`);
    setTimeout(() => setIdeDispatchStatus(null), 3000);
  };

  const currentCurlCommand = useMemo(() => {
    if (!activeFinding) return "";
    const ctx: FindingContext = {
      id: activeFinding.id,
      title: activeFinding.title,
      severity: activeFinding.severity,
      description: activeFinding.summary,
      affected_url: activeFinding.affectedUrl,
      owasp_category: activeFinding.owaspCategory,
      tool_source: activeFinding.toolSource,
    };
    return generateCurlReplayCommand(ctx, sampleReport.domain);
  }, [activeFinding]);

  const currentTicketingContext: TicketingFindingContext = useMemo(() => {
    return {
      id: activeFinding?.id || "",
      title: activeFinding?.title || "",
      severity: activeFinding?.severity || "medium",
      description: activeFinding?.summary || "",
      affected_url: activeFinding?.affectedUrl || sampleReport.domain,
      owasp_category: activeFinding?.owaspCategory,
      tool_source: activeFinding?.toolSource,
      evidence_summary: activeFinding?.evidenceSummary,
      business_impact: activeFinding?.businessImpact,
      remediation_steps: activeFinding?.remediation,
    };
  }, [activeFinding]);

  return (
    <div className="min-h-screen bg-[#030712] text-neutral-100 font-sans selection:bg-emerald-500 selection:text-neutral-950 flex flex-col antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#070A10]/95 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigateTo("/workspace")}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <IconArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Workspace</span>
          </button>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <HmwLogo size="sm" showText={false} />
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">
                  {sampleReport.domain}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono text-emerald-400 font-bold">
                  {scanId}
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-500 hidden sm:block">
                DAST + CVE Engine v2.4 • Completed {sampleReport.scanDate}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleRetestAll}
            disabled={retestStatus === "running"}
            className="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-mono font-semibold text-slate-300 hover:text-white inline-flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <IconRefresh
              className={`w-3.5 h-3.5 ${
                retestStatus === "running" ? "animate-spin text-emerald-400" : ""
              }`}
            />
            <span className="hidden sm:inline">
              {retestStatus === "running" ? "Retesting..." : "Re-Test Findings"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsPdfModalOpen(true)}
            className="h-9 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs font-mono inline-flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <IconDownload className="w-3.5 h-3.5" />
            <span>Generate Branded PDF</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Banner: Score & Executive Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Launch Score Gauge Card */}
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-[#0B0F19] to-[#070A10] p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Overall Security Posture
              </span>
              <h3 className="text-lg font-bold text-white">AI Launch Score</h3>
            </div>

            <div className="my-5 flex items-baseline gap-3">
              <span className="text-6xl font-black font-mono tracking-tight text-amber-400">
                {sampleReport.launchScore}
              </span>
              <span className="text-lg font-mono text-slate-500">/ 100</span>
              <div className="ml-auto text-right">
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  High Risk (Pre-Launch)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed text-left">
              Current posture blocks staging sign-off. Remediation of 3 medium misconfigurations elevates score to <strong className="text-emerald-400 font-mono">88/100 (Safe Harbor Ready)</strong>.
            </p>
          </div>

          {/* Six Pillar Breakdown */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-[#0B0F19] p-6 shadow-2xl space-y-4 text-left flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Score Telemetry
                </span>
                <h3 className="text-base font-bold text-white">
                  6-Pillar Risk Breakdown
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                200 Engine Checks Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {SCORE_CATEGORIES.map((cat) => {
                const percent = Math.round((cat.score / cat.max) * 100);
                return (
                  <div
                    key={cat.key}
                    className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium truncate">
                        {cat.label}
                      </span>
                      <span className="font-mono font-bold text-slate-200">
                        {cat.score}/{cat.max}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          percent >= 80
                            ? "bg-emerald-400"
                            : percent >= 50
                            ? "bg-amber-400"
                            : "bg-rose-400"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Severity Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-[#0B0F19] border border-slate-800 text-left">
            <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">Critical</span>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {sampleReport.severitySummary.critical}
            </div>
            <p className="text-[11px] text-slate-500">Zero RCE or SQLi exploits</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#0B0F19] border border-slate-800 text-left">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">High</span>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {sampleReport.severitySummary.high}
            </div>
            <p className="text-[11px] text-slate-500">Zero auth bypass bugs</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#0B0F19] border border-slate-800 text-left">
            <span className="text-[10px] font-mono uppercase text-yellow-400 font-bold">Medium</span>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {sampleReport.severitySummary.medium}
            </div>
            <p className="text-[11px] text-slate-500">Clickjacking & SRI gaps</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#0B0F19] border border-slate-800 text-left">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Low & Info</span>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {sampleReport.severitySummary.low + sampleReport.severitySummary.info}
            </div>
            <p className="text-[11px] text-slate-500">Headers & referrer config</p>
          </div>
        </div>

        {/* Dispatch notification */}
        {ideDispatchStatus && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-300">
            <div className="flex items-center gap-2">
              <IconCheck className="w-4 h-4 text-emerald-400" />
              <span>{ideDispatchStatus}</span>
            </div>
          </div>
        )}

        {/* Master Findings Explorer: Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Finding List & Filters (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-[#0B0F19] shadow-2xl p-4 sm:p-5 space-y-4 text-left">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Audit Findings ({filteredFindings.length})
                </h4>
                <span className="text-[10px] font-mono text-slate-500">
                  Select to inspect
                </span>
              </div>

              {/* Search Box */}
              <div className="relative">
                <IconSearch className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by vulnerability, category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 font-sans"
                />
              </div>

              {/* Severity Pill Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px] font-mono">
                {["all", "medium", "low", "info"].map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSeverityFilter(sev)}
                    className={`px-3 py-1 rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                      severityFilter === sev
                        ? "bg-emerald-500 text-neutral-950 font-bold"
                        : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            {/* Finding List */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredFindings.map((finding) => {
                const isSelected = finding.id === selectedFindingId;
                const isFixed = fixedFindingIds.has(finding.id);

                return (
                  <button
                    key={finding.id}
                    type="button"
                    onClick={() => setSelectedFindingId(finding.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                      isSelected
                        ? "bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/20"
                        : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/50 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          finding.severity === "critical"
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                            : finding.severity === "high"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : finding.severity === "medium"
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {finding.severity}
                      </span>

                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                        <span>{finding.toolSource}</span>
                        {isFixed && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            FIXED
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-xs font-bold text-white line-clamp-1">
                      {finding.title}
                    </div>

                    <div className="text-[11px] font-mono text-slate-500 truncate">
                      {finding.owaspCategory}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Finding Inspection & Remediation Drawer (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-[#0B0F19] shadow-2xl p-6 sm:p-7 space-y-6 text-left">
            {activeFinding ? (
              <>
                {/* Finding Header */}
                <div className="space-y-2 border-b border-slate-800/80 pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase ${
                          activeFinding.severity === "medium"
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {activeFinding.severity}
                      </span>
                      <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                        {activeFinding.toolSource}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleFixed(activeFinding.id)}
                        className={`h-8 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          fixedFindingIds.has(activeFinding.id)
                            ? "bg-emerald-500 text-neutral-950"
                            : "bg-slate-950 border border-slate-700 text-slate-300 hover:text-white"
                        }`}
                      >
                        <IconCheck className="w-3.5 h-3.5" />
                        <span>
                          {fixedFindingIds.has(activeFinding.id)
                            ? "Marked Fixed"
                            : "Mark as Fixed"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight pt-1">
                    {activeFinding.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-1">
                    <span><strong>OWASP:</strong> {activeFinding.owaspCategory}</span>
                    <span>•</span>
                    <span className="truncate max-w-xs text-slate-300">
                      <strong>Target:</strong> {activeFinding.affectedUrl}
                    </span>
                  </div>
                </div>

                {/* Vulnerability Description & Business Impact */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Vulnerability Description
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {activeFinding.summary}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                      <IconAlertTriangle className="w-4 h-4" />
                      <span>Business & Attack Impact</span>
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeFinding.businessImpact}
                    </p>
                  </div>
                </div>

                {/* Multi-Tab Telemetry & Patch Switcher */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                    <button
                      type="button"
                      onClick={() => setActiveEvidenceTab("evidence")}
                      className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        activeEvidenceTab === "evidence"
                          ? "bg-slate-900 text-emerald-400 border border-slate-700"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Scanner Telemetry Evidence
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveEvidenceTab("curl")}
                      className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        activeEvidenceTab === "curl"
                          ? "bg-slate-900 text-emerald-400 border border-slate-700"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Replay cURL Command
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveEvidenceTab("prompt")}
                      className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        activeEvidenceTab === "prompt"
                          ? "bg-slate-900 text-emerald-400 border border-slate-700"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      AI Remediation Directive
                    </button>
                  </div>

                  {/* Tab 1: Scanner Evidence */}
                  {activeEvidenceTab === "evidence" && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-bold text-slate-200">
                          {activeFinding.evidenceTitle}
                        </span>
                        <span className="text-[10px] text-emerald-400">
                          RAW LOG CAPTURE
                        </span>
                      </div>
                      <pre className="p-3 rounded-xl bg-black border border-slate-900 text-slate-300 overflow-x-auto text-[11px] leading-relaxed whitespace-pre-wrap">
                        {activeFinding.evidenceSummary}
                      </pre>
                    </div>
                  )}

                  {/* Tab 2: Replay cURL */}
                  {activeEvidenceTab === "curl" && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-bold">
                          Terminal Verification Command
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(currentCurlCommand, "curl")}
                          className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          {copiedStatus === "curl" ? (
                            <>
                              <IconCheck className="w-3.5 h-3.5" /> Copied!
                            </>
                          ) : (
                            <>
                              <IconCopy className="w-3.5 h-3.5" /> Copy cURL
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-3 rounded-xl bg-black border border-slate-900 text-emerald-400 overflow-x-auto text-[11px] leading-relaxed whitespace-pre-wrap">
                        {currentCurlCommand}
                      </pre>
                    </div>
                  )}

                  {/* Tab 3: AI Directive & 1-Click IDE Dispatch */}
                  {activeEvidenceTab === "prompt" && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="font-mono text-slate-400 font-bold">
                          1-Click IDE Dispatch & Contextual Patch
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleIdeDispatch("cursor")}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold cursor-pointer"
                          >
                            Open in Cursor
                          </button>
                          <button
                            type="button"
                            onClick={() => handleIdeDispatch("vscode")}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-mono text-[11px] font-bold cursor-pointer"
                          >
                            VS Code
                          </button>
                          <button
                            type="button"
                            onClick={() => handleIdeDispatch("windsurf")}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-mono text-[11px] font-bold cursor-pointer"
                          >
                            Windsurf
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-[11px] font-mono text-slate-400">
                          Recommended Remediation Steps:
                        </div>
                        <ol className="list-decimal pl-5 space-y-1 text-slate-300 text-xs">
                          {activeFinding.remediation.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Ticketing Sync Actions */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500">File Ticketing Task:</span>
                        <div className="flex items-center gap-2">
                          <a
                            href={buildGitHubIssueUrl(currentTicketingContext, sampleReport.domain)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                          >
                            <IconBrandGithub className="w-3.5 h-3.5" /> GitHub Issue
                          </a>
                          <span className="text-slate-600">•</span>
                          <a
                            href={buildLinearIssueUrl(currentTicketingContext, sampleReport.domain)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                          >
                            <IconExternalLink className="w-3.5 h-3.5" /> Linear
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="py-20 text-center text-slate-500 font-mono text-xs">
                Select a finding from the left to inspect vulnerability telemetry.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Branded PDF Export Modal */}
      <BrandedPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        agencyName="Apex Cyber Advisory"
        agencyLogoUrl="https://www.mvpstudio.in/"
        primaryBrandColor="#ffffff"
        secondaryBrandColor="#3d4341"
        disclaimer="Confidential client report prepared exclusively by our cybersecurity advisory team."
        targetDomain={sampleReport.domain}
        findingsCount={sampleReport.findings.length}
      />
    </div>
  );
};
