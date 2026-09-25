import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconLayoutDashboard,
  IconWorld,
  IconShieldCheck,
  IconBug,
  IconCpu,
  IconBrandGithub,
  IconPalette,
  IconReceipt,
  IconLogout,
  IconPlus,
  IconArrowLeft,
  IconActivity,
  IconSparkles,
  IconAlertTriangle,
  IconCopy,
  IconCheck,
  IconKey,
  IconPlayerPlay,
  IconMenu2,
  IconX,
  IconTerminal2,
  IconExternalLink,
  IconEdit,
  IconCode,
  IconCalendar,
  IconMessage2,
  IconChevronDown,
  IconArrowUpRight,
  IconArrowDownRight,
  IconSearch,
  IconBell,
  IconTrash,
  IconDownload,
  IconLock,
  IconRefresh,
  IconFileText,
  IconDeviceFloppy,
  IconBrandSlack,
  IconEye,
  IconFilter,
} from "@tabler/icons-react";
import { HmwLogo } from "../../design-system/src/HmwLogo";
import { BrandedPdfModal } from "./components/BrandedPdfModal";
import { cn } from "@/lib/utils";

interface DomainTarget {
  id: string;
  url: string;
  status: "verified" | "pending_dns" | "scanning";
  addedDate: string;
  lastScore?: string;
  vulnerabilities?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

interface DashboardPageProps {
  initialDomain?: string;
  onNavigateHome: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  initialDomain,
  onNavigateHome,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedIp, setCopiedIp] = useState(false);
  const [isAddDomainOpen, setIsAddDomainOpen] = useState(false);
  const [newDomainUrl, setNewDomainUrl] = useState("");
  const [verifyTarget, setVerifyTarget] = useState<DomainTarget | null>(null);
  const [copiedDns, setCopiedDns] = useState(false);
  const [isScanning, setIsScanning] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  // Time toggle for incident frequency wave chart
  const [timeRange, setTimeRange] = useState<"30days" | "12months" | "1week">("30days");

  // AI Copilot state
  const [copilotQuery, setCopilotQuery] = useState("");
  const [copilotResponse, setCopilotResponse] = useState<string | null>(null);

  // Security Audits state
  const [auditFilter, setAuditFilter] = useState<"all" | "completed" | "active" | "failed">("all");
  const [expandedTelemetryId, setExpandedTelemetryId] = useState<string | null>(null);

  // Vulnerability Matrix state
  const [matrixFilter, setMatrixFilter] = useState<"all" | "critical" | "high" | "medium" | "low">("all");
  const [copiedCursorPrompt, setCopiedCursorPrompt] = useState(false);
  const [copiedClaudePrompt, setCopiedClaudePrompt] = useState(false);
  const [isPlaybookExpanded, setIsPlaybookExpanded] = useState(false);

  // GitHub Code Scans state
  const [githubOrg, setGithubOrg] = useState("AiVi-Intelligence");
  const [githubRepo, setGithubRepo] = useState("hackmywebsite");
  const [isPrivateRepo, setIsPrivateRepo] = useState(true);
  const [isGithubConnected, setIsGithubConnected] = useState(true);
  const [sastMode, setSastMode] = useState<"live" | "snapshot">("live");
  const [isSastScanning, setIsSastScanning] = useState(false);
  const [sastProgress, setSastProgress] = useState(0);

  // Agency Branding state
  const [agencyName, setAgencyName] = useState("Apex Cyber Advisory");
  const [agencyLogoUrl, setAgencyLogoUrl] = useState("https://www.mvpstudio.in/");
  const [primaryBrandAccent, setPrimaryBrandAccent] = useState("#ffffff");
  const [secondaryBrandAccent, setSecondaryBrandAccent] = useState("#3d4341");
  const [reportDisclaimer, setReportDisclaimer] = useState(
    "Confidential client report prepared exclusively by our cybersecurity advisory team."
  );
  const [selectedPresetPalette, setSelectedPresetPalette] = useState("emerald");
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isSavedBrandingToast, setIsSavedBrandingToast] = useState(false);

  // Plan & Billing state
  const [selectedBillingTier, setSelectedBillingTier] = useState<"starter" | "starter_pro" | "founder_pro" | "agency">("agency");

  // Automation Hub state
  const [isDailyDastEnabled, setIsDailyDastEnabled] = useState(true);
  const [isSlackAlertsEnabled, setIsSlackAlertsEnabled] = useState(true);

  // Seed with default domains + any domain entered on the landing page
  const [domains, setDomains] = useState<DomainTarget[]>(() => {
    const list: DomainTarget[] = [
      {
        id: "target-1",
        url: "https://www.mvpstudio.in",
        status: "pending_dns",
        addedDate: "Sep 5, 2026",
      },
    ];
    if (initialDomain && !initialDomain.includes("mvpstudio")) {
      const formatted = initialDomain.startsWith("http")
        ? initialDomain
        : `https://${initialDomain}`;
      list.unshift({
        id: "target-initial",
        url: formatted,
        status: "verified",
        addedDate: "Sep 24, 2026",
        lastScore: "98/100 A+",
      });
    }
    return list;
  });

  const handleCopyIp = () => {
    navigator.clipboard.writeText("168.144.94.35");
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  const handleCopyDns = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedDns(true);
    setTimeout(() => setCopiedDns(false), 2000);
  };

  const handleConfirmVerification = (id: string) => {
    setDomains((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "verified" as const, lastScore: "Ready" } : d))
    );
    setVerifyTarget(null);
  };

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomainUrl) return;
    const formatted = newDomainUrl.startsWith("http")
      ? newDomainUrl
      : `https://${newDomainUrl}`;
    const newEntry: DomainTarget = {
      id: `target-${Date.now()}`,
      url: formatted,
      status: "pending_dns",
      addedDate: "Just now",
    };
    setDomains([newEntry, ...domains]);
    setNewDomainUrl("");
    setIsAddDomainOpen(false);
  };

  const handleTriggerScan = (id: string) => {
    setIsScanning(id);
    setScanProgress(15);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(null);
            setScanProgress(0);
            setDomains((prevDomains) =>
              prevDomains.map((d) =>
                d.id === id ? { ...d, status: "verified", lastScore: "98/100 A+" } : d
              )
            );
          }, 600);
          return 100;
        }
        return prev + 25;
      });
    }, 450);
  };

  const handleDeleteDomain = (id: string) => {
    setDomains((prev) => prev.filter((d) => d.id !== id));
  };

  const handleRunSastScan = () => {
    setIsSastScanning(true);
    setSastProgress(10);
    const interval = setInterval(() => {
      setSastProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSastScanning(false);
            setSastProgress(0);
          }, 600);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  const handleCopyCursorPrompt = () => {
    const prompt = `Fix CWE-693: In the HTTP response headers config, configure Strict-Transport-Security with max-age=63072000; includeSubDomains; preload. For Next.js in next.config.js headers(), add { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }.`;
    navigator.clipboard.writeText(prompt);
    setCopiedCursorPrompt(true);
    setTimeout(() => setCopiedCursorPrompt(false), 2000);
  };

  const handleCopyClaudePrompt = () => {
    const prompt = `Analyze the project server configuration and add the HSTS header (Strict-Transport-Security: max-age=63072000; includeSubDomains; preload) across all HTTPS reverse proxy or middleware routes to comply with OWASP A05 and CWE-693.`;
    navigator.clipboard.writeText(prompt);
    setCopiedClaudePrompt(true);
    setTimeout(() => setCopiedClaudePrompt(false), 2000);
  };

  const handleSelectPalette = (palette: string) => {
    setSelectedPresetPalette(palette);
    if (palette === "emerald") {
      setPrimaryBrandAccent("#10B981");
      setSecondaryBrandAccent("#064E3B");
    } else if (palette === "cobalt") {
      setPrimaryBrandAccent("#3B82F6");
      setSecondaryBrandAccent("#1E3A8A");
    } else if (palette === "violet") {
      setPrimaryBrandAccent("#8B5CF6");
      setSecondaryBrandAccent("#4C1D95");
    } else if (palette === "slate") {
      setPrimaryBrandAccent("#64748B");
      setSecondaryBrandAccent("#1E293B");
    } else if (palette === "amber") {
      setPrimaryBrandAccent("#F59E0B");
      setSecondaryBrandAccent("#78350F");
    }
  };

  const handleSaveBranding = () => {
    setIsSavedBrandingToast(true);
    setTimeout(() => setIsSavedBrandingToast(false), 2500);
  };

  const handleCopilotAction = (action: string) => {
    if (action === "Quick DAST Audit") {
      if (domains.length > 0) handleTriggerScan(domains[0].id);
      setCopilotResponse("Executing automated 200+ DAST and CVE Nuclei scans across verified targets.");
    } else if (action === "Verify DNS TXT") {
      if (domains[0]) setVerifyTarget(domains[0]);
    } else if (action === "Add Target Domain") {
      setIsAddDomainOpen(true);
    } else if (action === "Copy Static IP") {
      handleCopyIp();
      setCopiedIp(true);
      setCopilotResponse("Static IP 168.144.94.35 copied to clipboard for Cloudflare/AWS WAF whitelisting.");
    }
  };

  const handleCopilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotQuery.trim()) return;
    const query = copilotQuery.toLowerCase();
    if (query.includes("scan") || query.includes("audit")) {
      if (domains.length > 0) handleTriggerScan(domains[0].id);
      setCopilotResponse("Triggered autonomous DAST penetration scan. Telemetry streaming to console.");
    } else if (query.includes("verify") || query.includes("dns")) {
      if (domains[0]) setVerifyTarget(domains[0]);
      setCopilotResponse("Opened Safe Harbor DNS TXT verification token modal.");
    } else if (query.includes("ip") || query.includes("whitelist")) {
      handleCopyIp();
      setCopilotResponse("Scanner static IP 168.144.94.35 copied. Whitelist in Cloudflare WAF.");
    } else {
      setCopilotResponse(`Autonomous Copilot: Evaluated "${copilotQuery}". Fleet security score is 98/100 (A+). 0 Advisories across OWASP ZAP, Nuclei, and Semgrep.`);
    }
    setCopilotQuery("");
  };

  const navMenuItems = [
    { id: "overview", label: "Dashboard Overview", icon: IconLayoutDashboard },
    { id: "domains", label: "Target Domains", icon: IconWorld, badge: domains.length.toString() },
    { id: "audits", label: "Security Audits", icon: IconActivity },
    { id: "matrix", label: "Vulnerability Matrix", icon: IconBug },
    { id: "automation", label: "Automation Hub", icon: IconCpu, badge: "v2" },
    { id: "github", label: "GitHub Code Scans", icon: IconBrandGithub },
    { id: "branding", label: "Agency Branding", icon: IconPalette },
    { id: "billing", label: "Plan & Billing", icon: IconReceipt },
  ];

  const verifiedDomainsCount = domains.filter((d) => d.status === "verified").length;

  return (
    <div className="min-h-screen w-full bg-black text-slate-100 font-sans flex antialiased selection:bg-emerald-500 selection:text-neutral-950">
      
      {/* ===================== SIDEBAR (DESKTOP) ===================== */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-neutral-800/80 bg-neutral-950 p-5 shrink-0 z-30 min-h-screen sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Logo */}
          <div className="cursor-pointer" onClick={onNavigateHome}>
            <HmwLogo size="sm" showText={true} />
          </div>
          
          {/* Engines Active Pill Beacon */}
          <div className="mt-4 flex items-center justify-between px-3 py-2 rounded-full bg-[#0e121d] border border-neutral-800 text-xs ">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-medium">Engines Active</span>
            </div>
            <span className="text-neutral-500 text-xs">v2.4</span>
          </div>

          {/* Navigation Menu Items */}
          <nav className="space-y-1.5 mt-5">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-medium transition-all duration-200 cursor-pointer group text-left",
                    isActive
                      ? "bg-[#0e1f18] border border-emerald-500/40 text-emerald-400 shadow-sm font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-neutral-900/60 border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-colors",
                        isActive ? "text-emerald-400" : "text-neutral-400 group-hover:text-slate-200"
                      )}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-xs  px-2 py-0.5 rounded-full font-semibold",
                        isActive || item.badge === "v2"
                          ? "bg-[#0e2720] text-emerald-400 border border-emerald-500/30"
                          : "bg-[#131b2e] text-slate-300"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout */}
        <div className="pt-4 border-t border-neutral-800/80">
          <div className="flex items-center justify-between p-2 rounded-2xl bg-neutral-950 border border-neutral-800/90">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#16222f] border border-neutral-700/60 flex items-center justify-center text-teal-300 font-bold text-xs  shrink-0">
                R
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate leading-none">
                  rishi3035singh@g...
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs  font-bold text-emerald-400 uppercase tracking-wider">
                    AGENCY
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onNavigateHome}
              title="Return to Landing Page"
              className="p-1.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
            >
              <IconLogout className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ===================== MOBILE HEADER ===================== */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
        <div className="cursor-pointer" onClick={onNavigateHome}>
          <HmwLogo size="sm" showText={true} />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddDomainOpen(true)}
            className="p-2 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <IconPlus className="w-3.5 h-3.5" />
            <span>Target</span>
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <IconX className="w-5 h-5" /> : <IconMenu2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed inset-x-0 top-14 z-30 bg-neutral-950 border-b border-neutral-800 p-5 space-y-2 shadow-2xl"
          >
            {navMenuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold",
                  activeTab === item.id ? "bg-neutral-900 text-emerald-400" : "text-neutral-400"
                )}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-xs  px-2 py-0.5 rounded bg-emerald-950 text-emerald-400">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            <div className="pt-3 border-t border-neutral-800 flex justify-between items-center">
              <span className="text-xs text-neutral-400">rishi3035singh@gmail.com</span>
              <button
                type="button"
                onClick={onNavigateHome}
                className="text-xs text-emerald-400 flex items-center gap-1"
              >
                <IconLogout className="w-3.5 h-3.5" /> Landing
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== MAIN CONSOLE AREA (RIGHT SIDE) ===================== */}
      <main className="flex-1 min-w-0 overflow-y-auto px-4 sm:px-8 py-6 pt-20 lg:pt-8 bg-black">
        
        {/* Top Header & Breadcrumbs (From HMW Screen) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs  text-neutral-400 uppercase tracking-widest mb-1">
              <span>Security Workspace</span>
              <span>/</span>
              <span className="text-emerald-400">Console</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {activeTab === "overview" && "Dashboard Overview & Security Health"}
              {activeTab === "domains" && "Target Domains Management"}
              {activeTab === "audits" && "Security Audits & Telemetry"}
              {activeTab === "matrix" && "Vulnerability Classification Matrix"}
              {activeTab === "automation" && "Automation Hub & Webhooks"}
              {activeTab === "github" && "GitHub PR Security Gateway"}
              {activeTab === "branding" && "Agency White-Label Branding"}
              {activeTab === "billing" && "Plan Quota & Invoicing"}
            </h1>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsAddDomainOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <IconPlus className="w-4 h-4" />
              <span>Add Target Domain</span>
            </button>

            <button
              type="button"
              onClick={onNavigateHome}
              className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-slate-300 hover:text-white font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <IconArrowLeft className="w-3.5 h-3.5" />
              <span>Landing page</span>
            </button>
          </div>
        </div>

                {/* ===================== OVERVIEW TAB: FOCUSED SECURITY COMMAND CENTER ===================== */}
        {activeTab === "overview" && (
          <div className="space-y-6 mb-10">

            {/* 1. TOP KPI SECTION: 4 COMPACT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* CARD 1: Monthly Audit Quota */}
              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">Monthly Audit Quota</span>
                  <div className="w-7 h-7 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
                    <IconReceipt className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {isScanning ? "1 / 1" : "0 / 1"}
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    Scans available for live DAST audits
                  </p>
                </div>
              </div>

              {/* CARD 2: Monitored Domains */}
              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">Monitored Domains</span>
                  <div className="w-7 h-7 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
                    <IconWorld className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {domains.length} / 1
                  </div>
                  <p className="text-xs text-emerald-400 font-medium mt-1">
                    {verifiedDomainsCount} domain verified
                  </p>
                </div>
              </div>

              {/* CARD 3: Avg Launch Score */}
              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">Avg Launch Score</span>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                    <IconArrowUpRight className="w-3 h-3" />
                    <span>+12%</span>
                  </span>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">
                    98 A+
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    Continuous perimeter evaluation
                  </p>
                </div>
              </div>

              {/* CARD 4: Active Findings */}
              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">Active Findings</span>
                  <div className="w-7 h-7 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <IconShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    0 Advisories
                  </div>
                  <p className="text-xs text-emerald-400 font-medium mt-1">
                    0 Critical • Clean perimeter status
                  </p>
                </div>
              </div>
            </div>

            {/* 2 & 3. VULNERABILITY BREAKDOWN & QUICK PENETRATION AUDIT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* 2. VULNERABILITY BREAKDOWN SPECTRUM (6 COLS) */}
              <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">Vulnerability Breakdown</h3>
                      <p className="text-xs text-neutral-400 mt-0.5">Real-time CVE & OWASP severity distribution</p>
                    </div>
                    <span className="text-xs text-neutral-400 px-2.5 py-1 rounded-full bg-black border border-neutral-800">
                      0 Total Active
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Critical Severity */}
                    <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          <span className="text-xs font-semibold text-slate-200">Critical Severity</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-black text-rose-400 text-xs font-bold border border-neutral-800">
                          0
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full transition-all duration-300" style={{ width: "0%" }} />
                      </div>
                    </div>

                    {/* High Severity */}
                    <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span className="text-xs font-semibold text-slate-200">High Severity</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-black text-amber-400 text-xs font-bold border border-neutral-800">
                          0
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: "0%" }} />
                      </div>
                    </div>

                    {/* Medium Severity */}
                    <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                          <span className="text-xs font-semibold text-slate-200">Medium Severity</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-black text-yellow-400 text-xs font-bold border border-neutral-800">
                          0
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full transition-all duration-300" style={{ width: "0%" }} />
                      </div>
                    </div>

                    {/* Low & Informational */}
                    <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                          <span className="text-xs font-semibold text-slate-200">Low & Informational</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-black text-cyan-400 text-xs font-bold border border-neutral-800">
                          0
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full transition-all duration-300" style={{ width: "0%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Status Callout */}
                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Deterministic zero-bluff telemetry</span>
                  </div>
                  <span className="text-emerald-400 font-medium">Fleet Guard Active</span>
                </div>
              </div>

              {/* 3. QUICK PENETRATION AUDIT (6 COLS) */}
              <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white tracking-tight">Quick Penetration Audit</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                      Automated Pipeline
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    Launch automated DAST, CVE, and secret scans across your verified targets.
                  </p>

                  {/* Scanner Static IP Box */}
                  <div className="p-3.5 rounded-xl bg-black border border-neutral-800 mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-neutral-400 font-medium">Scanner Static IP</div>
                      <div className="text-sm font-bold text-white tracking-wide mt-0.5">168.144.94.35</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyIp}
                      className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs text-slate-300 hover:text-emerald-400 border border-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <IconCopy className="w-3.5 h-3.5" />
                      <span>{copiedIp ? "Copied!" : "Copy IP"}</span>
                    </button>
                  </div>

                  {/* Scan Progress Bar if Active */}
                  {isScanning && (
                    <div className="p-3 rounded-xl bg-black border border-emerald-500/40 mb-4 space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-emerald-400">
                        <span className="flex items-center gap-1.5 font-medium">
                          <IconTerminal2 className="w-3.5 h-3.5 animate-spin" />
                          DAST Pipeline Executing: Nuclei CVE + OWASP ZAP...
                        </span>
                        <span className="font-bold">{scanProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary & Secondary Action CTAs */}
                <div className="space-y-2 pt-2 border-t border-neutral-800/80">
                  <div className="flex flex-col sm:flex-row items-center gap-2.5">
                    {/* Primary Standout CTA: MANAGE TARGET WEBSITES */}
                    <button
                      type="button"
                      onClick={() => setActiveTab("domains")}
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <span>MANAGE TARGET WEBSITES</span>
                      <IconArrowUpRight className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
                    </button>

                    {/* Clear action to launch/run audit if verified target exists */}
                    <button
                      type="button"
                      disabled={Boolean(isScanning)}
                      onClick={() => {
                        const verifiedDomain = domains.find((d) => d.status === "verified");
                        if (verifiedDomain) handleTriggerScan(verifiedDomain.id);
                        else if (domains.length > 0) handleTriggerScan(domains[0].id);
                      }}
                      className={cn(
                        "w-full sm:w-auto py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border",
                        isScanning
                          ? "bg-neutral-800 text-neutral-500 border-neutral-800 cursor-not-allowed"
                          : "bg-neutral-900 hover:bg-neutral-800 text-emerald-400 hover:text-emerald-300 border-emerald-500/40"
                      )}
                    >
                      <IconPlayerPlay className="w-4 h-4 fill-current" />
                      <span>{isScanning ? `SCANNING (${scanProgress}%)` : "RUN SECURITY AUDIT"}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* 4. MONITORED TARGET DOMAINS */}
            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Monitored Target Domains ({domains.length})
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Continuous monitoring, ownership verification, and security re-tests
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddDomainOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-slate-300 hover:text-white border border-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <IconPlus className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Add Website</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("domains")}
                    className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-slate-300 hover:text-white border border-neutral-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    View All
                  </button>
                </div>
              </div>

              {/* Clean Domain Cards Grid - Essential Information Only */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {domains.map((d) => {
                  const isVer = d.status === "verified";
                  const isThisScanning = isScanning === d.id;
                  return (
                    <div
                      key={d.id}
                      className="p-4 rounded-xl bg-black border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-3"
                    >
                      <div>
                        {/* Domain URL & Status Badge */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <IconWorld className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span className="text-xs font-bold text-white truncate">{d.url}</span>
                          </div>
                          <span
                            className={cn(
                              "text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider shrink-0",
                              isVer
                                ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
                                : "bg-amber-950/80 text-amber-400 border border-amber-500/30"
                            )}
                          >
                            {isVer ? "SAFE HARBOR VERIFIED" : "PENDING DNS"}
                          </span>
                        </div>

                        {/* Status / Date Line */}
                        <div className="flex items-center justify-between text-xs text-neutral-400 mt-1">
                          {isVer ? (
                            <span className="text-emerald-400 font-medium">
                              Score: {d.lastScore || "98/100"} • Continuous DAST active
                            </span>
                          ) : (
                            <span className="text-neutral-500">
                              Added {d.addedDate} • DNS TXT verification pending
                            </span>
                          )}
                        </div>
                      </div>

                      {/* In-flight Scan Progress */}
                      {isThisScanning && (
                        <div className="p-2.5 rounded-lg bg-neutral-900 border border-emerald-500/30 text-xs space-y-1">
                          <div className="flex justify-between text-emerald-400 font-medium">
                            <span>Scanning...</span>
                            <span>{scanProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-black overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 transition-all duration-300"
                              style={{ width: `${scanProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Primary Actions */}
                      <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/80">
                        {isVer ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleTriggerScan(d.id)}
                              className="flex-1 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-emerald-400 hover:text-emerald-300 border border-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <IconPlayerPlay className="w-3.5 h-3.5 fill-current" />
                              <span>Re-Run Audit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveTab("audits")}
                              className="py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-slate-300 hover:text-white border border-neutral-800 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                            >
                              <span>Analytics</span>
                              <IconArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setVerifyTarget(d)}
                            className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                          >
                            <IconKey className="w-3.5 h-3.5 text-neutral-950" />
                            <span>Verify Domain</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. COMPACT COPILOT / QUICK ACTIONS */}
            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    <span>Quick Actions & Security Copilot</span>
                    <span className="text-base">⚡</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Instant shortcuts for fleet management and telemetry checks
                  </p>
                </div>
              </div>

              {/* 4 Useful Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Quick DAST Audit", icon: IconPlayerPlay, color: "text-emerald-400", action: () => handleCopilotAction("Quick DAST Audit") },
                  { label: "Verify DNS TXT", icon: IconKey, color: "text-amber-400", action: () => handleCopilotAction("Verify DNS TXT") },
                  { label: "Add Target Domain", icon: IconWorld, color: "text-cyan-400", action: () => handleCopilotAction("Add Target Domain") },
                  { label: "Copy Static IP", icon: IconCopy, color: "text-teal-300", action: () => handleCopilotAction("Copy Static IP") },
                ].map((btn, idx) => {
                  const Icon = btn.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={btn.action}
                      className="p-3 rounded-xl bg-black hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 flex items-center gap-2 text-xs font-semibold text-slate-200 transition-colors cursor-pointer text-left"
                    >
                      <Icon className={cn("w-3.5 h-3.5 shrink-0", btn.color)} />
                      <span className="truncate">{btn.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Copilot feedback banner if present */}
              {copilotResponse && (
                <div className="p-3 rounded-xl bg-black border border-emerald-500/30 text-xs text-emerald-400 flex items-start justify-between gap-2 mt-3">
                  <span>{copilotResponse}</span>
                  <button
                    type="button"
                    onClick={() => setCopilotResponse(null)}
                    className="text-neutral-500 hover:text-white"
                  >
                    <IconX className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ===================== OTHER TABS ===================== */}
        {activeTab === "domains" && (
          <div className="space-y-6 mb-10">
            {/* Top Card: Register & Verify New Website matching media_1790272212696.png */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Register & Verify New Website
              </h3>
              <p className="text-xs text-neutral-400 ">
                Paste the exact HTTPS origin you own. Safe Harbor verification is required before initiating penetration scans.
              </p>
              <form onSubmit={handleAddDomain} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl bg-black border border-neutral-800 focus-within:border-emerald-500/50">
                  <span className="text-neutral-500  text-xs">https://</span>
                  <input
                    type="text"
                    required
                    placeholder="yourwebsite.com"
                    value={newDomainUrl.replace(/^https?:\/\//, "")}
                    onChange={(e) => setNewDomainUrl(e.target.value)}
                    className="w-full bg-transparent text-xs text-white  focus:outline-none placeholder-neutral-600"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shadow-lg shadow-emerald-500/20 cursor-pointer transition-colors uppercase tracking-wider"
                >
                  ADD DOMAIN
                </button>
              </form>
            </div>

            {/* Bottom Card: Monitored Target Websites matching media_1790272212696.png */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Monitored Target Websites ({domains.length})
                  </h3>
                  <p className="text-xs text-neutral-400  mt-1">
                    Click any domain card for deep analytics, vulnerability history, and multi-mode scan controls.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs ">
                  <IconShieldCheck className="w-4 h-4" />
                  <span>{verifiedDomainsCount} / {domains.length} Verified Safe Harbor</span>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                {domains.map((d) => {
                  const isVer = d.status === "verified";
                  const isThisScanning = isScanning === d.id;
                  return (
                    <div
                      key={d.id}
                      className="p-5 rounded-2xl bg-black border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
                    >
                      {/* Top Header of Card */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                            <IconWorld className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs  font-bold text-white truncate">
                              {d.url}
                            </div>
                            <div className="text-xs text-neutral-500 ">
                              Added {d.addedDate}
                            </div>
                          </div>
                        </div>

                        <span
                          className={cn(
                            "text-xs  px-2 py-0.5 rounded-md uppercase font-bold shrink-0",
                            isVer
                              ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-950/80 text-amber-400 border border-amber-500/30"
                          )}
                        >
                          {isVer ? "Verified" : "Unverified"}
                        </span>
                      </div>

                      {/* Inset Metric Block */}
                      <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/90  space-y-2 text-xs">
                        <div className="flex justify-between items-center text-neutral-400 text-xs uppercase">
                          <span>LAUNCH SCORE</span>
                          <span>AI MONITOR</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className={cn("text-base font-bold", isVer ? "text-emerald-400" : "text-white")}>
                            {d.lastScore || (isVer ? "98/100 A+" : "Not Scanned")}
                          </span>
                          <span className="text-xs text-slate-300">
                            {isVer ? "Continuous 24/7" : "Manual Only"}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-slate-300 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{isVer ? "3 Audits" : "0 Audits"}</span>
                          </span>
                          <span className="text-neutral-500">Safe Harbor Auth</span>
                        </div>
                      </div>

                      {/* In-flight Scan Progress */}
                      {isThisScanning && (
                        <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-emerald-500/30  text-xs space-y-1.5">
                          <div className="flex justify-between text-emerald-400">
                            <span>Scanning DAST Probes...</span>
                            <span>{scanProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-black overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 transition-all duration-300"
                              style={{ width: `${scanProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            if (!isVer) setVerifyTarget(d);
                            else setActiveTab("audits");
                          }}
                          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>MANAGE & DEEP DIVE</span>
                          <IconArrowUpRight className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => (isVer ? handleTriggerScan(d.id) : setVerifyTarget(d))}
                            className="flex-1 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-slate-200 hover:text-white border border-neutral-800 text-xs  font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <IconPlayerPlay className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{isVer ? "Quick Scan" : "Verify DNS"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteDomain(d.id)}
                            title="Delete Target"
                            className="p-2 rounded-xl bg-neutral-900 hover:bg-red-950/80 text-neutral-400 hover:text-red-400 border border-neutral-800 hover:border-red-500/30 transition-colors cursor-pointer"
                          >
                            <IconTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

                {activeTab === "audits" && (
          <div className="space-y-6 mb-10">
            {/* Relocated Analytics: DAST Risk Velocity & Fleet Telemetry */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* DAST Risk Velocity Wave Chart (8 Cols) */}
              <div className="lg:col-span-8 p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between relative overflow-hidden shadow-xl">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">DAST Risk Velocity</h3>
                      <p className="text-xs text-neutral-400 mt-0.5">Clean scan execution telemetry across fleet</p>
                    </div>

                    <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-full border border-neutral-800 text-xs">
                      <button
                        type="button"
                        onClick={() => setTimeRange("12months")}
                        className={cn(
                          "px-3 py-1 rounded-full transition-colors cursor-pointer",
                          timeRange === "12months" ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold" : "text-neutral-400 hover:text-white"
                        )}
                      >
                        12 months
                      </button>
                      <button
                        type="button"
                        onClick={() => setTimeRange("30days")}
                        className={cn(
                          "px-3 py-1 rounded-full transition-colors cursor-pointer",
                          timeRange === "30days" ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold" : "text-neutral-400 hover:text-white"
                        )}
                      >
                        30 days
                      </button>
                      <button
                        type="button"
                        onClick={() => setTimeRange("1week")}
                        className={cn(
                          "px-3 py-1 rounded-full transition-colors cursor-pointer",
                          timeRange === "1week" ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold" : "text-neutral-400 hover:text-white"
                        )}
                      >
                        1 week
                      </button>
                    </div>
                  </div>

                  {/* Chart Canvas with SVG Dual Smooth Curves & Floating Tooltip */}
                  <div className="relative pt-6 pb-2">
                    <div className="absolute top-1 left-[52%] -translate-x-1/2 px-3 py-1.5 rounded-xl bg-neutral-900/95 border border-emerald-500/40 shadow-2xl backdrop-blur-md text-center pointer-events-none z-20">
                      <div className="text-xs text-neutral-400">7 September</div>
                      <div className="text-xs font-bold text-emerald-400">318 Scans Passed (0 Advisories)</div>
                    </div>

                    <div className="flex items-stretch gap-3">
                      <div className="flex flex-col justify-between text-xs text-neutral-500 py-1 shrink-0 h-44">
                        <span>400</span>
                        <span>300</span>
                        <span>200</span>
                        <span>100</span>
                      </div>

                      <div className="flex-1 relative">
                        <svg viewBox="0 0 600 180" className="w-full h-44 overflow-visible" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="emeraldWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#10B981" />
                              <stop offset="50%" stopColor="#34D399" />
                              <stop offset="100%" stopColor="#059669" />
                            </linearGradient>
                            <linearGradient id="cyanWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#06B6D4" />
                              <stop offset="50%" stopColor="#2DD4BF" />
                              <stop offset="100%" stopColor="#14B8A6" />
                            </linearGradient>
                          </defs>

                          <line x1="0" y1="20" x2="600" y2="20" stroke="#1c1f2e" strokeDasharray="3 3" />
                          <line x1="0" y1="70" x2="600" y2="70" stroke="#1c1f2e" strokeDasharray="3 3" />
                          <line x1="0" y1="120" x2="600" y2="120" stroke="#1c1f2e" strokeDasharray="3 3" />
                          <line x1="0" y1="170" x2="600" y2="170" stroke="#1c1f2e" strokeDasharray="3 3" />

                          <motion.path
                            d="M 0 160 C 40 170, 70 135, 110 130 C 150 125, 175 45, 215 45 C 255 45, 275 165, 315 165 C 355 165, 375 65, 415 65 C 455 65, 495 140, 545 130 C 575 125, 590 140, 600 145"
                            fill="none"
                            stroke="url(#emeraldWaveGrad)"
                            strokeWidth="2.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                          />

                          <motion.path
                            d="M 0 80 C 40 55, 80 140, 130 140 C 180 140, 230 95, 270 90 C 305 85, 315 48, 335 45 C 360 42, 385 135, 430 135 C 475 135, 510 60, 555 55 C 580 50, 590 65, 600 70"
                            fill="none"
                            stroke="url(#cyanWaveGrad)"
                            strokeWidth="2.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.4, ease: "easeInOut" }}
                          />

                          <circle cx="335" cy="45" r="7" fill="#10B981" className="animate-ping opacity-60" />
                          <circle cx="335" cy="45" r="5" fill="#34D399" />
                          <circle cx="335" cy="45" r="2.5" fill="#ffffff" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-neutral-500 pl-8 pt-2">
                      <span>24 Aug</span>
                      <span>31 Aug</span>
                      <span className="text-emerald-400 font-bold">7 Sept</span>
                      <span>14 Sept</span>
                      <span>21 Sept</span>
                      <span>28 Sept</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fleet Telemetry (4 Cols) */}
              <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all relative overflow-hidden flex flex-col justify-between shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">Fleet Telemetry</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">Safe Harbor & quota coverage</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-center py-6 my-auto">
                  <div className="w-28 h-28 rounded-full bg-emerald-500 flex flex-col items-center justify-center text-neutral-950 shadow-2xl shadow-emerald-500/25 relative z-10">
                    <span className="text-2xl font-bold leading-none mb-0.5">100%</span>
                    <span className="text-xs font-semibold text-neutral-900">Safe Harbor</span>
                  </div>

                  <div className="w-20 h-20 rounded-full bg-cyan-500 flex flex-col items-center justify-center text-neutral-950 shadow-xl shadow-cyan-500/20 -ml-5 mt-6 relative z-20">
                    <span className="text-base font-bold leading-none mb-0.5">0 CVE</span>
                    <span className="text-xs font-medium text-neutral-900">Advisories</span>
                  </div>

                  <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-center text-emerald-400 -mt-14 -ml-3 relative z-30 [background-image:repeating-linear-gradient(45deg,#1f2937_0,#1f2937_2px,transparent_0,transparent_6px)] shadow-lg">
                    <span className="text-xs font-bold leading-none mb-0.5">150</span>
                    <span className="text-xs text-neutral-400">Quota</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <span>Coverage Status:</span>
                  <span className="text-emerald-400 font-semibold">100% Monitored</span>
                </div>
              </div>

            </div>
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
              {/* Header with Title and Filter Pills from media_1790272244432.png */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Security Audits & Scan Stream
                  </h3>
                  <p className="text-xs text-neutral-400  mt-1">
                    Real-time audit history, multi-engine progress, AI Launch Scores, and PDF reports.
                  </p>
                </div>

                {/* Filter Pills from media_1790272244432.png */}
                <div className="flex items-center bg-black border border-neutral-800 rounded-full p-1 text-xs ">
                  {(["all", "completed", "active", "failed"] as const).map((mode) => {
                    const countMap = { all: 3, completed: 2, active: 1, failed: 0 };
                    const isActive = auditFilter === mode;
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setAuditFilter(mode)}
                        className={cn(
                          "px-3 py-1 rounded-full capitalize transition-colors cursor-pointer",
                          isActive
                            ? "bg-emerald-500 text-neutral-950 font-bold shadow-sm"
                            : "text-neutral-400 hover:text-white"
                        )}
                      >
                        {mode === "all" ? `All (${countMap.all})` : mode === "failed" ? `Failed (${countMap.failed})` : mode}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* When Failed filter selected -> Exact UI from media_1790272244432.png */}
              {auditFilter === "failed" ? (
                <div className="p-12 rounded-2xl bg-black/60 border border-neutral-800/80 text-center  text-xs text-neutral-500">
                  No scans match the selected filter.
                </div>
              ) : (
                /* Rich Populated Audit Stream */
                <div className="space-y-4">
                  {/* Audit 1 */}
                  {(auditFilter === "all" || auditFilter === "completed") && (
                    <div className="p-5 rounded-2xl bg-black border border-neutral-800 hover:border-neutral-700 transition-colors space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
                        <div className="flex items-center gap-3">
                          <span className="text-xs  font-bold text-emerald-400">
                            AUD-2026-0924-01
                          </span>
                          <span className="text-white  font-semibold text-xs truncate max-w-xs">
                            https://www.mvpstudio.in
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs  font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                            COMPLETED
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsPdfModalOpen(true)}
                            className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-slate-200 hover:text-white border border-neutral-800 text-xs  flex items-center gap-1.5 cursor-pointer"
                          >
                            <IconDownload className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Download PDF</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedTelemetryId(
                                expandedTelemetryId === "aud-1" ? null : "aud-1"
                              )
                            }
                            className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-slate-200 hover:text-white border border-neutral-800 text-xs  flex items-center gap-1.5 cursor-pointer"
                          >
                            <IconTerminal2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{expandedTelemetryId === "aud-1" ? "Hide Logs" : "Telemetry"}</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs ">
                        <div>
                          <span className="text-xs text-neutral-500 uppercase block">LAUNCH SCORE</span>
                          <span className="text-base font-bold text-emerald-400">98 / 100 A+</span>
                        </div>
                        <div>
                          <span className="text-xs text-neutral-500 uppercase block">ENGINES EXECUTED</span>
                          <span className="text-slate-200">OWASP ZAP + Nuclei v3.2</span>
                        </div>
                        <div>
                          <span className="text-xs text-neutral-500 uppercase block">DURATION</span>
                          <span className="text-slate-200">4m 12s</span>
                        </div>
                        <div>
                          <span className="text-xs text-neutral-500 uppercase block">ADVISORIES</span>
                          <span className="text-emerald-400 font-bold">0 CVEs (Clean Pass)</span>
                        </div>
                      </div>

                      {/* Expandable Telemetry Box */}
                      {expandedTelemetryId === "aud-1" && (
                        <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800  text-xs text-neutral-400 space-y-1">
                          <p className="text-emerald-400 font-bold">✓ [PERIMETER] Resolved host 168.144.94.35 — TLS 1.3 negotiated.</p>
                          <p className="text-slate-300">✓ [DAST] 200+ non-destructive payload injections passed cleanly.</p>
                          <p className="text-slate-300">✓ [NUCLEI] 4,812 CVE templates evaluated — 0 matches.</p>
                          <p className="text-emerald-400 font-bold">✓ [TRUST SCORE] Launch score verified at 98/100 Grade A+.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Audit 2 */}
                  {(auditFilter === "all" || auditFilter === "completed") && (
                    <div className="p-5 rounded-2xl bg-black border border-neutral-800 hover:border-neutral-700 transition-colors space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
                        <div className="flex items-center gap-3">
                          <span className="text-xs  font-bold text-emerald-400">
                            AUD-2026-0924-02
                          </span>
                          <span className="text-white  font-semibold text-xs truncate max-w-xs">
                            https://api.your-startup.com
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs  font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                            COMPLETED
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsPdfModalOpen(true)}
                          className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-slate-200 hover:text-white border border-neutral-800 text-xs  flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
                        >
                          <IconDownload className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Download PDF</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs ">
                        <div>
                          <span className="text-xs text-neutral-500 uppercase block">LAUNCH SCORE</span>
                          <span className="text-base font-bold text-emerald-400">96 / 100 A</span>
                        </div>
                        <div>
                          <span className="text-xs text-neutral-500 uppercase block">ENGINES EXECUTED</span>
                          <span className="text-slate-200">Semgrep AST + Secret Scan</span>
                        </div>
                        <div>
                          <span className="text-xs text-neutral-500 uppercase block">DURATION</span>
                          <span className="text-slate-200">2m 45s</span>
                        </div>
                        <div>
                          <span className="text-xs text-neutral-500 uppercase block">ADVISORIES</span>
                          <span className="text-amber-400 font-bold">1 Low (Header Notice)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Audit 3 (Active) */}
                  {(auditFilter === "all" || auditFilter === "active") && (
                    <div className="p-5 rounded-2xl bg-black border border-emerald-500/40 space-y-4 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
                        <div className="flex items-center gap-3">
                          <span className="text-xs  font-bold text-cyan-400">
                            AUD-2026-0924-03
                          </span>
                          <span className="text-white  font-semibold text-xs truncate max-w-xs">
                            https://auth.your-startup.com
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs  font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>RUNNING STAGE 3</span>
                          </span>
                        </div>
                        <span className="text-xs  text-neutral-400">Elapsed: 1m 20s</span>
                      </div>

                      <div className="space-y-2  text-xs">
                        <div className="flex justify-between text-neutral-400 text-xs">
                          <span>Active Payload Fuzzing (OWASP ZAP 2.14)</span>
                          <span className="text-emerald-400 font-bold">68% Complete</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 w-[68%] transition-all" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "matrix" && (
          <div className="space-y-6 mb-10">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
              {/* Header with Severity Filter Pills from media_1790272274587.png */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Vulnerability Matrix & AI Remediation
                  </h3>
                  <p className="text-xs text-neutral-400  mt-1">
                    Unified inventory of all security advisories with copyable Claude & Cursor fix prompts.
                  </p>
                </div>

                <div className="flex flex-wrap items-center bg-black border border-neutral-800 rounded-full p-1 text-xs ">
                  {(["all", "critical", "high", "medium", "low"] as const).map((sev) => {
                    const sevCount = { all: 1, critical: 0, high: 0, medium: 1, low: 0 };
                    const isSelected = matrixFilter === sev;
                    return (
                      <button
                        key={sev}
                        type="button"
                        onClick={() => setMatrixFilter(sev)}
                        className={cn(
                          "px-3 py-1 rounded-full capitalize transition-colors cursor-pointer",
                          isSelected
                            ? "bg-emerald-500 text-neutral-950 font-bold shadow-sm"
                            : "text-neutral-400 hover:text-white"
                        )}
                      >
                        {sev} ({sevCount[sev]})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Callout from media_1790272274587.png with Green Sparkle */}
              <div className="p-4 rounded-2xl bg-[#091b16] border border-emerald-500/30 flex items-start gap-3">
                <IconSparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs  text-emerald-200/90 leading-relaxed">
                  Consolidated SOC repository across DAST, Nuclei CVEs, and Semgrep SAST scans. Click any audit below to inspect vulnerable endpoints, view remediation playbooks, and copy tailored AI Fix Prompts for <strong className="text-white">Cursor</strong> & <strong className="text-white">Claude Code</strong>.
                </p>
              </div>

              {/* Zero Vulnerabilities State matching media_1790272274587.png */}
              {matrixFilter === "critical" || matrixFilter === "high" || matrixFilter === "low" ? (
                <div className="py-16 text-center space-y-3 ">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <IconCheck className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-base font-bold text-white">No Open Vulnerabilities Detected</h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    All your scanned websites are currently clean with zero outstanding findings. Run new audits from the Target Domains tab to keep them secure.
                  </p>
                </div>
              ) : (
                /* Active Finding Card with Copyable Prompts */
                <div className="p-6 rounded-2xl bg-black border border-neutral-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-md text-xs  font-bold bg-amber-950/80 text-amber-400 border border-amber-500/30">
                        MEDIUM • CVSS 5.3
                      </span>
                      <h4 className="text-sm  font-bold text-white">
                        CWE-693: Missing Strict-Transport-Security (HSTS) Header
                      </h4>
                    </div>
                    <span className="text-xs  text-neutral-400">
                      Engine: OWASP ZAP 2.14 Passive (Rule 10038)
                    </span>
                  </div>

                  <p className="text-xs  text-neutral-300 leading-relaxed">
                    The web application response for <code className="text-emerald-400">https://www.mvpstudio.in/api/v1/auth</code> did not enforce the Strict-Transport-Security header. Browsers could be tricked into sending unencrypted HTTP traffic via SSL stripping.
                  </p>

                  {/* 1-Click Action Buttons for Cursor & Claude Code */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCopyCursorPrompt}
                      className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-emerald-500/50 text-white  text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                    >
                      {copiedCursorPrompt ? (
                        <>
                          <IconCheck className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">Prompt Copied!</span>
                        </>
                      ) : (
                        <>
                          <IconCopy className="w-4 h-4 text-emerald-400" />
                          <span>Copy Cursor Fix Prompt</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyClaudePrompt}
                      className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-cyan-500/50 text-white  text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                    >
                      {copiedClaudePrompt ? (
                        <>
                          <IconCheck className="w-4 h-4 text-cyan-400" />
                          <span className="text-cyan-400">Prompt Copied!</span>
                        </>
                      ) : (
                        <>
                          <IconCopy className="w-4 h-4 text-cyan-400" />
                          <span>Copy Claude Code Prompt</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsPlaybookExpanded(!isPlaybookExpanded)}
                      className="px-3.5 py-2 rounded-xl bg-black border border-neutral-800 text-neutral-400 hover:text-white  text-xs flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <IconCode className="w-4 h-4" />
                      <span>{isPlaybookExpanded ? "Hide Playbook" : "View Playbook"}</span>
                    </button>
                  </div>

                  {/* Expandable Remediation Playbook */}
                  {isPlaybookExpanded && (
                    <div className="mt-3 p-4 rounded-xl bg-neutral-950 border border-neutral-800  text-xs space-y-2">
                      <span className="text-xs text-neutral-500 uppercase block font-bold">
                        Next.js next.config.js Headers Playbook
                      </span>
                      <pre className="text-emerald-400 text-xs overflow-x-auto p-3 rounded-lg bg-black border border-neutral-900">
{`async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ],
    },
  ];
}`}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "github" && (
          <div className="space-y-6 mb-10">
            {/* Top Card: Connect Repository matching media_1790272284886.png */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-5">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="max-w-xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400  text-xs font-bold uppercase tracking-wider">
                    <IconBrandGithub className="w-3.5 h-3.5" />
                    <span>GITHUB EPHEMERAL SAST SCANNER •</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Connect a repository for code-level Trust Score audits
                  </h3>
                  <p className="text-xs text-neutral-400  leading-relaxed">
                    Perform read-only code snapshot scanning for secrets, API vulnerabilities, and dependency risks. Raw source and credentials are never stored; evidence is automatically masked before telemetry is saved.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1  text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-black border border-neutral-800 text-slate-300 flex items-center gap-1.5">
                      <IconShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Zero Source Storage</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black border border-neutral-800 text-slate-300 flex items-center gap-1.5">
                      <IconLock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Masked Secrets</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black border border-neutral-800 text-slate-300 flex items-center gap-1.5">
                      <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Read-Only Scope</span>
                    </span>
                  </div>
                </div>

                {/* Right Sub-Card: Repository Authentication */}
                <div className="w-full lg:w-96 p-5 rounded-2xl bg-black border border-neutral-800 space-y-3 shrink-0">
                  <div className="flex items-center justify-between text-xs ">
                    <span className="text-neutral-400 uppercase tracking-wider font-bold">REPOSITORY AUTHENTICATION</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold text-xs">
                      Connected
                    </span>
                  </div>
                  <div className="space-y-2  text-xs">
                    <input
                      type="text"
                      placeholder="github-username or org"
                      value={githubOrg}
                      onChange={(e) => setGithubOrg(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50"
                    />
                    <input
                      type="text"
                      placeholder="owner/repository"
                      value={githubRepo}
                      onChange={(e) => setGithubRepo(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50"
                    />
                    <label className="flex items-center gap-2 pt-1 text-xs text-neutral-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPrivateRepo}
                        onChange={(e) => setIsPrivateRepo(e.target.checked)}
                        className="rounded border-neutral-700 text-emerald-500 focus:ring-0"
                      />
                      <span>Private repository (read-only token)</span>
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsGithubConnected(true)}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs  uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <IconBrandGithub className="w-4 h-4" />
                    <span>Connect & Test</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Read-Only Permission Model & Repository Inventory */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Read-Only Permission Model */}
              <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div>
                  <span className="text-xs  uppercase tracking-wider text-neutral-500 font-bold block">
                    SECURITY PROTOCOL
                  </span>
                  <h4 className="text-base font-bold text-white tracking-tight mt-0.5">
                    Read-Only Permission Model
                  </h4>
                  <p className="text-xs text-neutral-400  mt-1">
                    We enforce strict zero-write isolation. No commits, pull requests, or branch writes are ever requested.
                  </p>
                </div>

                <div className="space-y-2 text-xs ">
                  {[
                    { label: "Repository Contents", badge: "Read-Only Analysis", active: true },
                    { label: "Repository Metadata", badge: "Read-Only Tags", active: true },
                    { label: "Pull Requests", badge: "Blocked / None", active: false },
                    { label: "Issues & Discussions", badge: "Blocked / None", active: false },
                    { label: "Branch Write & Admin", badge: "Blocked / None", active: false },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-black border border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className={cn("size-2 rounded-full", item.active ? "bg-emerald-400" : "bg-neutral-600")} />
                        <span className="text-slate-200">{item.label}</span>
                      </div>
                      <span className={cn("text-xs font-bold px-2 py-0.5 rounded", item.active ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30" : "bg-neutral-900 text-neutral-400 border border-neutral-800")}>
                        {item.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Select Active Audit Target */}
              <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs  uppercase tracking-wider text-neutral-500 font-bold block">
                      REPOSITORY INVENTORY
                    </span>
                    <h4 className="text-base font-bold text-white tracking-tight mt-0.5">
                      Select Active Audit Target
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs  font-bold">
                    1 Active Repo
                  </span>
                </div>
                <p className="text-xs text-neutral-400 ">
                  Choose which connected repository to synchronize with your workspace Trust Score.
                </p>

                <div className="p-4 rounded-2xl bg-black border border-emerald-500/40 space-y-3  text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconBrandGithub className="w-5 h-5 text-emerald-400" />
                      <span className="font-bold text-white">{githubOrg}/{githubRepo}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
                      TRUST SCORE: 98 A+
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-400 text-xs">
                    <span>Branch: <code className="text-white">main</code></span>
                    <span>Commit: <code className="text-neutral-300">a92f81c</code></span>
                  </div>
                  <p className="text-xs text-neutral-500 pt-1 border-t border-neutral-900">
                    Ephemeral isolation verified. Zero raw source code persisted to disks.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 3: Live SAST Audit Pipeline & Code Vulnerability Evidence matching media_1790272290172.png & media_1790272318110.png */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Card: Live SAST Audit Pipeline */}
              <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center bg-black border border-neutral-800 rounded-full p-1 text-xs  self-start w-fit">
                  <button
                    type="button"
                    onClick={() => setSastMode("live")}
                    className={cn(
                      "px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer",
                      sastMode === "live"
                        ? "bg-emerald-500 text-neutral-950 font-bold"
                        : "text-neutral-400 hover:text-white"
                    )}
                  >
                    <IconActivity className="w-3.5 h-3.5" />
                    <span>Live Ephemeral SAST</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSastMode("snapshot")}
                    className={cn(
                      "px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer",
                      sastMode === "snapshot"
                        ? "bg-emerald-500 text-neutral-950 font-bold"
                        : "text-neutral-400 hover:text-white"
                    )}
                  >
                    <IconFileText className="w-3.5 h-3.5" />
                    <span>File Snapshot Mode</span>
                  </button>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    Live SAST Audit Pipeline
                  </h4>
                  <p className="text-xs text-neutral-400  mt-1 leading-relaxed">
                    Clones the latest commit from your selected repository into an isolated memory sandbox, runs static code analysis (Semgrep AST + secret pattern matching), and destroys the cloned code immediately.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black border border-neutral-800  text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <IconSparkles className="w-4 h-4" />
                    <span>Ephemeral Isolation Engine</span>
                  </div>
                  <div className="space-y-1 text-xs text-neutral-400">
                    <div>Target: <span className="text-white font-semibold">{githubOrg}/{githubRepo}:main</span></div>
                    <div>Execution: <span className="text-slate-200">Automated Semgrep AST + Secret Scanner</span></div>
                    <div>Persistence: <span className="text-emerald-400 font-bold">Zero raw code stored</span></div>
                  </div>
                </div>

                {isSastScanning && (
                  <div className="p-3 rounded-xl bg-neutral-900 border border-emerald-500/40  text-xs space-y-2">
                    <div className="flex justify-between text-emerald-400 text-xs">
                      <span>Ephemeral Memory Sandbox Running...</span>
                      <span>{sastProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-black overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${sastProgress}%` }} />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleRunSastScan}
                  disabled={isSastScanning}
                  className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs  uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <IconPlayerPlay className="w-4 h-4" />
                  <span>{isSastScanning ? "RUNNING EPHEMERAL AUDIT..." : "RUN LIVE EPHEMERAL AUDIT"}</span>
                </button>
              </div>

              {/* Right Card: Code Vulnerability Evidence */}
              <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs  uppercase tracking-wider text-neutral-500 font-bold block">
                      AUDIT TELEMETRY
                    </span>
                    <h4 className="text-base font-bold text-white tracking-tight mt-0.5">
                      Code Vulnerability Evidence
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs  font-bold">
                    Telemetry In Sync
                  </span>
                </div>
                <p className="text-xs text-neutral-400 ">
                  Static analysis findings synced with your workspace Launch Trust Score.
                </p>

                <div className="space-y-3  text-xs">
                  <div className="p-3.5 rounded-2xl bg-black border border-neutral-800 space-y-1">
                    <div className="flex justify-between text-slate-200">
                      <span>Masked Secrets Scanner</span>
                      <span className="text-emerald-400 font-bold">0 Leaks</span>
                    </div>
                    <p className="text-xs text-neutral-500">41 files checked across JavaScript, TypeScript, and JSON configs.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black border border-neutral-800 space-y-1">
                    <div className="flex justify-between text-slate-200">
                      <span>Dependency CVE Heuristics</span>
                      <span className="text-emerald-400 font-bold">0 Critical / High</span>
                    </div>
                    <p className="text-xs text-neutral-500">142 npm packages mapped against GitHub Security Advisory database.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black border border-neutral-800 space-y-1">
                    <div className="flex justify-between text-slate-200">
                      <span>AST Code Hygiene (Semgrep)</span>
                      <span className="text-emerald-400 font-bold">98.8% Score</span>
                    </div>
                    <p className="text-xs text-neutral-500">Zero arbitrary code execution or unvalidated deserialization vectors.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "branding" && (
          <div className="space-y-6 mb-10">
            {/* Top Form Card matching media_1790272328285.png */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400  text-xs font-bold uppercase tracking-wider">
                    <IconPalette className="w-3.5 h-3.5" />
                    <span>Agency White-Label Suite</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Client Deliverable PDF & Report Branding
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-xs  font-bold self-start sm:self-auto">
                  Agency Tier Active
                </span>
              </div>

              <p className="text-xs text-neutral-400 ">
                Fully white-label executive PDF security audits with your custom agency name, transparent logo, color scheme, and confidential client notices.
              </p>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4  text-xs">
                {/* Agency Name */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-neutral-400 tracking-wider font-bold">
                    AGENCY / COMPANY NAME
                  </label>
                  <input
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                  <span className="text-xs text-neutral-500 block">
                    Displayed as the delivering entity on report cover pages, headers, and certifications.
                  </span>
                </div>

                {/* Logo URL */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-neutral-400 tracking-wider font-bold">
                    AGENCY LOGO URL
                  </label>
                  <input
                    type="text"
                    value={agencyLogoUrl}
                    onChange={(e) => setAgencyLogoUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                  <span className="text-xs text-neutral-500 block">
                    Transparent PNG or SVG URL placed in the top-left of every report page.
                  </span>
                </div>

                {/* Primary Color */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-neutral-400 tracking-wider font-bold">
                    PRIMARY BRAND ACCENT (HEX)
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-black border border-neutral-800">
                    <input
                      type="color"
                      value={primaryBrandAccent}
                      onChange={(e) => setPrimaryBrandAccent(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={primaryBrandAccent}
                      onChange={(e) => setPrimaryBrandAccent(e.target.value)}
                      className="w-full bg-transparent text-white focus:outline-none"
                    />
                  </div>
                  <span className="text-xs text-neutral-500 block">
                    Applied to report headers, score meters, and callout borders.
                  </span>
                </div>

                {/* Secondary Color */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-neutral-400 tracking-wider font-bold">
                    SECONDARY BRAND ACCENT (HEX)
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-black border border-neutral-800">
                    <input
                      type="color"
                      value={secondaryBrandAccent}
                      onChange={(e) => setSecondaryBrandAccent(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={secondaryBrandAccent}
                      onChange={(e) => setSecondaryBrandAccent(e.target.value)}
                      className="w-full bg-transparent text-white focus:outline-none"
                    />
                  </div>
                  <span className="text-xs text-neutral-500 block">
                    Applied to table headers and metric backgrounds.
                  </span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="space-y-1.5  text-xs">
                <label className="text-xs uppercase text-neutral-400 tracking-wider font-bold">
                  CUSTOM REPORT DISCLAIMER & CLIENT NOTICE
                </label>
                <textarea
                  rows={2}
                  value={reportDisclaimer}
                  onChange={(e) => setReportDisclaimer(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-emerald-500/50 resize-none"
                />
                <span className="text-xs text-neutral-500 block">
                  Printed at the bottom of the executive summary and findings annexes.
                </span>
              </div>

              {/* Quick Select Preset Palettes from media_1790272328285.png */}
              <div className="space-y-2  text-xs">
                <span className="text-xs uppercase text-neutral-400 tracking-wider font-bold block">
                  QUICK-SELECT PRESET SECURITY PALETTES:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: "emerald", label: "Emerald Security", dot: "bg-emerald-400" },
                    { id: "cobalt", label: "Cobalt Blue", dot: "bg-blue-500" },
                    { id: "violet", label: "Cyber Violet", dot: "bg-purple-500" },
                    { id: "slate", label: "Slate Enterprise", dot: "bg-slate-400" },
                    { id: "amber", label: "Amber Shield", dot: "bg-amber-400" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPalette(p.id)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full border text-xs flex items-center gap-2 cursor-pointer transition-colors",
                        selectedPresetPalette === p.id
                          ? "bg-neutral-900 border-white text-white font-bold"
                          : "bg-black border-neutral-800 text-neutral-400 hover:text-white"
                      )}
                    >
                      <span className={cn("size-2 rounded-full", p.dot)} />
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live PDF Deliverable Preview Card matching media_1790272335132.png & media_1790272340091.png */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs  font-bold text-white uppercase tracking-wider">
                  LIVE PDF DELIVERABLE PREVIEW
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs  font-bold flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>• Live Dynamic Render</span>
                </span>
              </div>

              {/* Inset Render Box */}
              <div className="p-6 rounded-2xl bg-black border border-neutral-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-neutral-800/80">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white">
                      Executive Security Audit & Vulnerability Assessment
                    </h4>
                    <p className="text-xs  text-neutral-400">
                      Prepared by <strong className="text-white">{agencyName}</strong> for <span className="text-cyan-400">Client Target ({domains[0]?.url || "https://example.com"})</span>
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs  text-slate-300 font-bold self-start">
                    Safe Harbor Certified
                  </span>
                </div>

                {/* 4 Metric Boxes from screenshot */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3  text-xs">
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-500 uppercase block">AI LAUNCH SCORE</span>
                    <span className="text-lg font-bold text-white">96 / 100</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-500 uppercase block">DAST CHECKS</span>
                    <span className="text-lg font-bold text-white">200+ Passed</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-500 uppercase block">CRITICAL RISKS</span>
                    <span className="text-lg font-bold text-emerald-400">0 Detected</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-500 uppercase block">AUDIT STANDARD</span>
                    <span className="text-lg font-bold text-white">OWASP Top 10</span>
                  </div>
                </div>

                <p className="text-xs  text-neutral-500 italic">
                  Notice: {reportDisclaimer}
                </p>
              </div>

              {/* Bottom Buttons Row with GENERATE BRANDING DUMMY 1 PDF */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveBranding}
                    className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs  uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <IconDeviceFloppy className="w-4 h-4" />
                    <span>{isSavedBrandingToast ? "BRANDING SAVED!" : "SAVE AGENCY BRANDING"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPdfModalOpen(true)}
                    className="px-6 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-emerald-500/50 text-emerald-400 hover:text-emerald-300 font-bold text-xs  uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
                  >
                    <IconEye className="w-4 h-4" />
                    <span>GENERATE BRANDING DUMMY 1 (PDF)</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-xs  text-neutral-500">
                  <IconLock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Encrypted at rest using AES-256-GCM enterprise vault.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="space-y-6 mb-10">
            {/* Card 1: Active Subscription from media_1790272350143.png */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs  uppercase tracking-wider text-emerald-400 font-bold">
                    ACTIVE SUBSCRIPTION
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Agency Plan
                  </h3>
                  <p className="text-xs text-neutral-400 ">
                    Your account follows the verified quota limits configured for this billing cycle.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-xs  font-bold self-start sm:self-auto">
                  ACTIVE ACCOUNT
                </span>
              </div>

              {/* 4 Metric Boxes */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3  text-xs">
                <div className="p-4 rounded-2xl bg-black border border-neutral-800 space-y-1">
                  <span className="text-xs text-neutral-500 uppercase block">Websites Allowed</span>
                  <span className="text-xl font-bold text-white">1 / 10</span>
                </div>
                <div className="p-4 rounded-2xl bg-black border border-neutral-800 space-y-1">
                  <span className="text-xs text-neutral-500 uppercase block">Monthly Scans</span>
                  <span className="text-xl font-bold text-white">0 / 150</span>
                </div>
                <div className="p-4 rounded-2xl bg-black border border-neutral-800 space-y-1">
                  <span className="text-xs text-neutral-500 uppercase block">PDF Report Export</span>
                  <span className="text-xl font-bold text-emerald-400">Included</span>
                </div>
                <div className="p-4 rounded-2xl bg-black border border-neutral-800 space-y-1">
                  <span className="text-xs text-neutral-500 uppercase block">AI Trust Monitor</span>
                  <span className="text-xl font-bold text-amber-400">Weekly-Ready</span>
                </div>
              </div>
            </div>

            {/* Section 2: Upgrade or Switch Commercial Tier matching media_1790272350143.png */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Upgrade or Switch Commercial Tier
                </h3>
                <p className="text-xs text-neutral-400  mt-0.5">
                  Instant in-app checkout via Razorpay (UPI, Credit Cards, NetBanking)
                </p>
              </div>

              {/* 4 Pricing Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Starter (Free) */}
                <div className="p-5 rounded-3xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-5">
                  <div className="space-y-3 ">
                    <h4 className="text-base font-bold text-white">Starter (Free)</h4>
                    <div>
                      <span className="text-2xl font-bold text-white">₹0</span>
                      <span className="text-xs text-neutral-500"> /forever free</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-snug">
                      For individual builders testing single projects.
                    </p>
                    <div className="p-2.5 rounded-xl bg-black border border-neutral-800 text-xs text-emerald-400 font-bold space-y-0.5">
                      <div>1 Monitored Website</div>
                      <div className="text-neutral-400 font-normal">3 Scans / Month</div>
                    </div>
                    <div className="space-y-2 text-xs text-neutral-300 pt-2 border-t border-neutral-900">
                      <div className="text-xs uppercase text-neutral-500 font-bold">FEATURES:</div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>200+ DAST & Nuclei CVE Scans</span></div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>AI Launch Score Assessment</span></div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>Public PDF Summary Report</span></div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>Standard Speed Queue</span></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedBillingTier("starter")}
                    className={cn(
                      "w-full py-2.5 rounded-xl  text-xs font-bold transition-colors cursor-pointer",
                      selectedBillingTier === "starter"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                        : "bg-neutral-900 hover:bg-neutral-800 text-neutral-300"
                    )}
                  >
                    {selectedBillingTier === "starter" ? "Active Selection" : "Select Starter"}
                  </button>
                </div>

                {/* 2. Starter Pro */}
                <div className="p-5 rounded-3xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-5">
                  <div className="space-y-3 ">
                    <h4 className="text-base font-bold text-white">Starter Pro</h4>
                    <div>
                      <span className="text-2xl font-bold text-white">₹1,999</span>
                      <span className="text-xs text-neutral-500"> /per month</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-snug">
                      For active builders launching production products.
                    </p>
                    <div className="p-2.5 rounded-xl bg-black border border-neutral-800 text-xs text-emerald-400 font-bold space-y-0.5">
                      <div>2 Monitored Websites</div>
                      <div className="text-neutral-400 font-normal">10 Scans / Month</div>
                    </div>
                    <div className="space-y-2 text-xs text-neutral-300 pt-2 border-t border-neutral-900">
                      <div className="text-xs uppercase text-neutral-500 font-bold">FEATURES:</div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>All Free Features Included</span></div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>Full Unblurred Vulnerability Dossier</span></div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>Detailed Executive PDF Deliverables</span></div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>Automated Retest Engine</span></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedBillingTier("starter_pro")}
                    className={cn(
                      "w-full py-2.5 rounded-xl  text-xs font-bold transition-colors cursor-pointer",
                      selectedBillingTier === "starter_pro"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                        : "bg-neutral-900 hover:bg-neutral-800 text-neutral-300"
                    )}
                  >
                    {selectedBillingTier === "starter_pro" ? "Active Selection" : "Upgrade Pro"}
                  </button>
                </div>

                {/* 3. Founder Pro (Most Popular) */}
                <div className="p-5 rounded-3xl bg-neutral-950 border border-emerald-500/50 flex flex-col justify-between space-y-5 relative shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-neutral-950 text-xs  font-bold uppercase tracking-wider">
                    MOST POPULAR
                  </span>
                  <div className="space-y-3 ">
                    <h4 className="text-base font-bold text-white">Founder Pro</h4>
                    <div>
                      <span className="text-2xl font-bold text-white">₹2,999</span>
                      <span className="text-xs text-neutral-500"> /per month</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-snug">
                      For growing startups with multi-domain portfolios.
                    </p>
                    <div className="p-2.5 rounded-xl bg-black border border-neutral-800 text-xs text-emerald-400 font-bold space-y-0.5">
                      <div>5 Monitored Websites</div>
                      <div className="text-neutral-400 font-normal">40 Scans / Month</div>
                    </div>
                    <div className="space-y-2 text-xs text-neutral-300 pt-2 border-t border-neutral-900">
                      <div className="text-xs uppercase text-neutral-500 font-bold">FEATURES:</div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>All Starter Pro Features</span></div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>CI/CD GitHub App Merge Gate</span></div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>AI IDE Issue Sync (Cursor/Claude)</span></div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>Priority Telemetry Pipeline</span></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedBillingTier("founder_pro")}
                    className={cn(
                      "w-full py-2.5 rounded-xl  text-xs font-bold transition-colors cursor-pointer",
                      selectedBillingTier === "founder_pro"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                        : "bg-emerald-500 hover:bg-emerald-400 text-neutral-950"
                    )}
                  >
                    {selectedBillingTier === "founder_pro" ? "Active Selection" : "Upgrade Founder"}
                  </button>
                </div>

                {/* 4. Agency & Studio (Current) */}
                <div className="p-5 rounded-3xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-5 relative">
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs  font-bold">
                    Current
                  </span>
                  <div className="space-y-3 ">
                    <h4 className="text-base font-bold text-white">Agency & Studio</h4>
                    <div>
                      <span className="text-2xl font-bold text-white">₹4,999</span>
                      <span className="text-xs text-neutral-500"> /per month</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-snug">
                      For web agencies, dev shops, and audit consultancies.
                    </p>
                    <div className="p-2.5 rounded-xl bg-black border border-neutral-800 text-xs text-emerald-400 font-bold space-y-0.5">
                      <div>15 Monitored Websites</div>
                      <div className="text-neutral-400 font-normal">150 Scans / Month</div>
                    </div>
                    <div className="space-y-2 text-xs text-neutral-300 pt-2 border-t border-neutral-900">
                      <div className="text-xs uppercase text-neutral-500 font-bold">FEATURES:</div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>All Founder Pro Features</span></div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>100% Custom White-Label PDF Branding</span></div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>Custom Logo & Brand Palette</span></div>
                      <div className="flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-emerald-400" /><span>Dedicated Scanner Static IP Whitelist</span></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedBillingTier("agency")}
                    className="w-full py-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30  text-xs font-bold"
                  >
                    Active Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "automation" && (
          <div className="space-y-6 mb-10">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Continuous DAST Scheduler & Webhook Gateways
                </h3>
                <p className="text-xs text-neutral-400  mt-1">
                  Automate perimeter audits and route zero-false-positive alerts to your team.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5  text-xs">
                {/* DAST Scheduler */}
                <div className="p-5 rounded-2xl bg-black border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Daily Midnight DAST Audit</span>
                    <button
                      type="button"
                      onClick={() => setIsDailyDastEnabled(!isDailyDastEnabled)}
                      className={cn(
                        "px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer transition-colors",
                        isDailyDastEnabled
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                          : "bg-neutral-900 text-neutral-500"
                      )}
                    >
                      {isDailyDastEnabled ? "ENABLED" : "PAUSED"}
                    </button>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Executes automated 200+ DAST and Nuclei checks every night at 00:00 UTC across verified targets.
                  </p>
                </div>

                {/* Slack Incident Dispatch */}
                <div className="p-5 rounded-2xl bg-black border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Slack Incident Gateway</span>
                    <button
                      type="button"
                      onClick={() => setIsSlackAlertsEnabled(!isSlackAlertsEnabled)}
                      className={cn(
                        "px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer transition-colors",
                        isSlackAlertsEnabled
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                          : "bg-neutral-900 text-neutral-500"
                      )}
                    >
                      {isSlackAlertsEnabled ? "ACTIVE" : "OFF"}
                    </button>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Immediate notification dispatched to <code className="text-white">#security-alerts</code> on any verified critical advisory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ===================== ADD TARGET DOMAIN MODAL ===================== */}
      <AnimatePresence>
        {isAddDomainOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddDomainOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-7 shadow-2xl text-white z-10"
            >
              <button
                type="button"
                onClick={() => setIsAddDomainOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <IconX className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                  <IconWorld className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Add Target Domain</h3>
                  <p className="text-xs text-neutral-400">Configure continuous penetration audit</p>
                </div>
              </div>

              <form onSubmit={handleAddDomain} className="space-y-4">
                <div>
                  <label className="block text-xs  text-neutral-400 mb-1.5">
                    Root or Subdomain URL
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-black border border-neutral-800 focus-within:border-emerald-500/50">
                    <span className="text-neutral-500  text-xs">https://</span>
                    <input
                      type="text"
                      required
                      placeholder="api.startup.com"
                      value={newDomainUrl.replace(/^https?:\/\//, "")}
                      onChange={(e) => setNewDomainUrl(e.target.value)}
                      className="w-full bg-transparent text-xs text-white  focus:outline-none placeholder-neutral-600"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-black border border-neutral-800 text-xs text-neutral-400  space-y-1">
                  <p className="text-emerald-400 font-bold flex items-center gap-1">
                    <IconAlertTriangle className="w-3.5 h-3.5" /> Safe Harbor Guarantee
                  </p>
                  <p className="text-neutral-500 text-xs">
                    100% non-destructive payload testing. Zero database mutations or customer downtime.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddDomainOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    Add & Verify
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================== DNS VERIFICATION MODAL ===================== */}
      <AnimatePresence>
        {verifyTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVerifyTarget(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-7 shadow-2xl text-white z-10"
            >
              <button
                type="button"
                onClick={() => setVerifyTarget(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <IconX className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 rounded-xl bg-amber-950 border border-amber-500/30 text-amber-400">
                  <IconKey className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">DNS Ownership Verification</h3>
                  <p className="text-xs text-neutral-400  truncate max-w-xs">{verifyTarget.url}</p>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                To guarantee Safe Harbor authorization and prevent unauthenticated penetration audits, add the following TXT record to your DNS provider (Cloudflare, Route53, GoDaddy, etc.):
              </p>

              <div className="space-y-3 mb-5">
                <div className="p-3 rounded-2xl bg-black border border-neutral-800 space-y-1">
                  <div className="flex justify-between text-xs  text-neutral-400">
                    <span>Record Type:</span>
                    <span className="text-emerald-400 font-bold">TXT</span>
                  </div>
                  <div className="flex justify-between text-xs  text-neutral-400">
                    <span>Host / Name:</span>
                    <span className="text-white font-bold">_hackmywebsite-challenge</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-black border border-neutral-800">
                  <div className="flex items-center justify-between text-xs  text-neutral-400 mb-1">
                    <span>TXT Value / Token:</span>
                    <button
                      type="button"
                      onClick={() => handleCopyDns("hmw-verify=9a8f27e103ab47dc839f992")}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedDns ? <IconCheck className="w-3.5 h-3.5" /> : <IconCopy className="w-3.5 h-3.5" />}
                      <span>{copiedDns ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <code className="text-xs  text-emerald-400 break-all select-all">
                    hmw-verify=9a8f27e103ab47dc839f992
                  </code>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVerifyTarget(null)}
                  className="flex-1 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmVerification(verifyTarget.id)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <IconCheck className="w-4 h-4" />
                  <span>Verify DNS Record</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================== BRANDED PDF MODAL ===================== */}
      <BrandedPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        agencyName={agencyName}
        agencyLogoUrl={agencyLogoUrl}
        primaryAccent={primaryBrandAccent}
        secondaryAccent={secondaryBrandAccent}
        disclaimer={reportDisclaimer}
        targetDomain={domains[0]?.url || "https://www.mvpstudio.in"}
        score={96}
      />

    </div>
  );
};
export default DashboardPage;

