import { NavItemConfig } from "@/components/ui/resizable-navbar";

export const globalNavItems: NavItemConfig[] = [
  {
    name: "Platform",
    link: "/",
    dropdown: [
      {
        name: "Overview",
        desc: "Autonomous continuous application security platform",
        icon: "🛡️",
        link: "/",
      },
      {
        name: "Security Engines",
        desc: "Multi-engine matrix: ZAP, Nuclei, Semgrep, Playwright",
        icon: "⚡",
        link: "/#security",
      },
      {
        name: "Continuous Pipeline",
        desc: "3-step automated security workflow",
        icon: "🔄",
        link: "/#how-it-works",
      },
      {
        name: "Security Console",
        desc: "Interactive workspace & command center",
        icon: "💻",
        link: "/workspace",
      },
    ],
  },
  {
    name: "How It Works",
    link: "/how-it-works",
    dropdown: [
      {
        name: "8-Step Scanning Workflow",
        desc: "From authorization to verified retesting",
        icon: "🚀",
        link: "/how-it-works",
      },
      {
        name: "Multi-Engine Matrix",
        desc: "DAST, SAST, CVE signatures & headless DOM checks",
        icon: "🔍",
        link: "/how-it-works#step-02-scan",
      },
      {
        name: "AI IDE Fix Prompts",
        desc: "Copy-paste remediation for Cursor, VS Code & Claude",
        icon: "🤖",
        link: "/how-it-works#step-05-fix",
      },
      {
        name: "3.2s Target Retesting",
        desc: "Instant isolated test against single vulnerability",
        icon: "⚡",
        link: "/how-it-works#step-06-retest",
      },
    ],
  },
  {
    name: "Methodology",
    link: "/methodology",
    dropdown: [
      {
        name: "AI Launch Score (0–100)",
        desc: "Scientific scoring formula & evaluation matrix",
        icon: "📊",
        link: "/methodology",
      },
      {
        name: "6 Readiness Dimensions",
        desc: "Weighted evaluation of runtime & code security",
        icon: "📐",
        link: "/methodology#dimensions",
      },
      {
        name: "Sample Security Report",
        desc: "Interactive audit report with executive breakdown",
        icon: "📄",
        link: "/sample-report",
      },
      {
        name: "Deep-Dive Scan Explorer",
        desc: "Live reproduction cURL & scanner telemetry",
        icon: "🔬",
        link: "/dashboard/scan/scan-8942-mvpstudio",
      },
    ],
  },
  {
    name: "Dashboard",
    link: "/workspace",
    dropdown: [
      {
        name: "Security Health Overview",
        desc: "Command center & verified targets health",
        icon: "📈",
        link: "/workspace",
      },
      {
        name: "Target Domains",
        desc: "DNS verification & ownership tokens",
        icon: "🌐",
        link: "/workspace?tab=domains",
      },
      {
        name: "Vulnerability Matrix",
        desc: "Severity filters & AI fix prompt generator",
        icon: "⚠️",
        link: "/workspace?tab=matrix",
      },
      {
        name: "Automation Hub",
        desc: "Scheduled cron audits & webhook pipelines",
        icon: "⚙️",
        link: "/workspace/automation",
      },
      {
        name: "GitHub PR Security Gate",
        desc: "Automated PR blocking & SARIF telemetry",
        icon: "🐙",
        link: "/workspace?tab=github",
      },
      {
        name: "Agency White-Labeling",
        desc: "Custom logo, palettes & branded PDF reports",
        icon: "🎨",
        link: "/workspace?tab=branding",
      },
    ],
  },
  {
    name: "Pricing",
    link: "/#pricing",
  },
  {
    name: "Contact",
    link: "/contact",
    dropdown: [
      {
        name: "Direct Security Support",
        desc: "Engineering team assistance & SLAs",
        icon: "✉️",
        link: "/contact",
      },
      {
        name: "Enterprise Inquiries",
        desc: "Custom volume quotas & multi-target setups",
        icon: "🏢",
        link: "/contact#enterprise",
      },
      {
        name: "Privacy & Compliance",
        desc: "DPDP Act 2023 & ephemeral scan guarantee",
        icon: "🔒",
        link: "/privacy-policy",
      },
      {
        name: "Terms of Service",
        desc: "Authorized scanning rules & legal standards",
        icon: "📜",
        link: "/terms",
      },
    ],
  },
];
