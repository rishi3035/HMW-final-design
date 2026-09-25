# HMW — Hack My Web Security Platform (Final Design)

Autonomous security intelligence platform with live continuous attack surface discovery, DAST, SAST, and remediation workflows.

## Features & Route Architecture

- **`/` — Core Landing Page**: Full-screen cybernetic grid hero with ambient glow, interactive cyber-badge, animated `SecurityTechnologyBeam`, continuous security pipeline cards, official pricing tiers, high-contrast FAQs, and enterprise footer.
- **`/login` & `/signup` — Authentication Portal**: Split-screen auth with rotating Security Orbit Engine (OWASP ZAP, Nuclei CVEs, Semgrep SAST, DNS Gate, AI Prompts), live capability slideshow, and Google/GitHub/SSO workflows.
- **`/workspace` & `/dashboard` — Security Operations Center**: Complete domain management, live target health metrics, continuous telemetry logs, interactive findings table, and white-label branded PDF report generation.
- **`/dashboard/scan/:scanId` — Single Scan Deep-Dive Explorer**: 6-pillar score breakdown, findings explorer with severity filters, cURL replay terminal, and 1-click prompt dispatchers for Cursor, VS Code, and Windsurf.
- **`/how-it-works` — Security Pipeline Architecture**: Deep-dive interactive timeline and engine breakdown.
- **`/methodology` — AI Launch Score Formula**: Mathematical rubric, CVSS 3.1 penalty scale, and readiness evaluation dimensions.
- **`/sample-report` — Executive Audit Report**: Interactive audit report model with download capabilities.
- **`/contact` — Agency & Enterprise Inquiry**: Guaranteed SLAs and enterprise volume retainers.
- **`/privacy-policy` & `/terms` — Statutory & DPDP Compliance**: Ephemeral scanning policy and AWS Mumbai data residency.

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion + Magic UI Animated Beam
- **Icons**: Tabler Icons + Lucide React
- **Deployment**: Vercel CI/CD via GitHub integration

## Local Development

```bash
cd web
npm install
npm run dev
```

## Production Build

```bash
cd web
npm run build
```
