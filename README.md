# HMW — Hack My Web Security Platform (Final Design)

Autonomous security intelligence platform with live continuous attack surface discovery, DAST, SAST, and remediation workflows.

## Features

- **Dynamic Resizable Navbar**: Includes branded HMW logo, navigation tabs, and **Book Enterprise Demo** CTA with fluid transitions.
- **Section 2 — Velaris Hero (`100vh`)**: Full-screen cybernetic grid hero with ambient glow, interactive cyber-badge, and "Initiate Deep Scan" action.
- **Section 3 — Security Technology Matrix (`100vh`)**: Full-screen bidirectional Animated Beam network connecting battle-tested security engines (OWASP ZAP, Nuclei, Semgrep, GitHub Gate, BashCraft) to the central HMW Core.
  - Interactive hover popovers with outward displacement (left pods pop outward to the left, right pods pop outward to the right).
  - Real-time status indicators, engine specifications, and throughput metrics.
- **Footer**: Enterprise-grade security compliance and navigation footer.

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + Magic UI Animated Beam
- **Icons**: Lucide React

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
