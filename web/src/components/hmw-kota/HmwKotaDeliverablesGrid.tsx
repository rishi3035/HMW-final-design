import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  ShieldCheck,
  Terminal,
  Search,
  Sparkles,
  GitPullRequest,
  GitBranch,
  Bot,
  Layers,
  Code2,
  Lock,
  Globe,
  Check,
  CheckCircle2,
  Mic,
  Sliders,
  X,
  FileCode,
  Workflow,
  Radio,
} from "lucide-react";

interface HmwKotaDeliverablesGridProps {
  onSelectDeliverable?: (name: string) => void;
}

export const HmwKotaDeliverablesGrid: React.FC<HmwKotaDeliverablesGridProps> = ({
  onSelectDeliverable,
}) => {
  return (
    <section
      id="deliverables"
      className="relative w-full bg-black text-white py-24 sm:py-36 px-4 sm:px-8 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              [ Verified Outputs ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
              Security <span className="text-emerald-400">Deliverables.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-neutral-400">Zero false positives guarantee</span>
            <a
              href="#pricing"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold tracking-wide border border-white/15 transition-colors"
            >
              <span>View subscription tiers</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ================= 3-COLUMN BENTO GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12 items-stretch">
          {/* ================= COLUMN 1 (LEFT): TALL TOP + COMPACT BOTTOM ================= */}
          <div className="flex flex-col gap-6">
            {/* CARD 1: DAST Runtime Simulation (Tall) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative rounded-[32px] bg-[#0A0D14]/90 border border-white/10 hover:border-emerald-500/40 p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              {/* Card Header */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  DAST Runtime Scanner
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed font-normal">
                  Simulate external attacker probes on live endpoints, API routes, and auth gates with 100% non-destructive telemetry.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectDeliverable?.("DAST Runtime Scanner")}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-emerald-400 mt-4 group/btn transition-colors cursor-pointer"
                >
                  <span>See More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* In-Card Visual: Terminal / Live HTTP Probe Window */}
              <div className="relative mt-8 pt-4">
                {/* Ambient purple/moss backlight */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-purple-900/30 via-emerald-500/15 to-transparent rounded-3xl blur-xl pointer-events-none" />

                <div className="relative rounded-2xl bg-black/90 border border-white/15 p-4 sm:p-5 shadow-2xl font-mono text-[11px] sm:text-xs overflow-hidden">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
                      <span className="size-2.5 rounded-full bg-amber-500/80" />
                      <span className="size-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[10px] text-neutral-500 ml-2">probe_session.http</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      LIVE RADAR
                    </span>
                  </div>

                  {/* Code snippet */}
                  <div className="space-y-1.5 text-neutral-300">
                    <div className="text-neutral-500">
                      &lt;!DOCTYPE runtime_probe&gt;
                    </div>
                    <div>
                      <span className="text-purple-400">POST</span>{" "}
                      <span className="text-emerald-300">/api/v1/auth/session</span>{" "}
                      <span className="text-neutral-500">HTTP/2</span>
                    </div>
                    <div className="text-neutral-400">
                      Host: <span className="text-neutral-200">api.platform.io</span>
                    </div>
                    <div className="text-neutral-400">
                      Payload: <span className="text-rose-200 font-bold bg-rose-500/25 px-2 py-0.5 rounded border border-rose-500/40">' OR '1'='1' -- [NEUTRALIZED]</span>
                    </div>
                    <div className="pt-2 text-neutral-400">
                      <span className="text-emerald-400">HTTP/2 200 OK</span>
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      TLS: TLSv1.3 · ECDHE-RSA-AES256-GCM · 0 CVEs
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: Zero-Friction Integrations / Migrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative rounded-[32px] bg-[#0A0D14]/90 border border-white/10 hover:border-emerald-500/40 p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  Pipeline & CI/CD Gateways
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed font-normal">
                  Connect Hack My Website into GitHub, GitLab, and Vercel workflows without breaking sprint velocity.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectDeliverable?.("Pipeline & CI/CD Gateways")}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-emerald-400 mt-4 group/btn transition-colors cursor-pointer"
                >
                  <span>See More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* In-Card Visual: Interconnected Capsule / Node Graphic */}
              <div className="relative mt-8 py-4 flex items-center justify-center">
                {/* Radial ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-emerald-500/20 to-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

                {/* Capsule Node Connector */}
                <div className="relative flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-full bg-black/80 border border-white/15 backdrop-blur-xl shadow-2xl">
                  {/* Left Node (GitHub) */}
                  <div className="size-11 sm:size-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-300 shadow-inner group-hover:border-white/30 transition-colors">
                    <GitBranch className="w-5 h-5 text-neutral-200" />
                  </div>

                  {/* Connecting Line */}
                  <div className="w-4 sm:w-6 h-[2px] bg-gradient-to-r from-white/20 to-emerald-400" />

                  {/* Center Node (Glowing HMW Shield) */}
                  <div className="relative size-14 sm:size-16 rounded-full bg-gradient-to-br from-emerald-400 to-[#5F7F29] p-[2px] shadow-[0_0_24px_rgba(120,156,54,0.6)]">
                    <div className="size-full rounded-full bg-black flex items-center justify-center">
                      <Shield className="w-7 h-7 text-emerald-400" />
                    </div>
                  </div>

                  {/* Connecting Line */}
                  <div className="w-4 sm:w-6 h-[2px] bg-gradient-to-r from-emerald-400 to-white/20" />

                  {/* Right Node (Vercel / Cloud) */}
                  <div className="size-11 sm:size-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-300 shadow-inner group-hover:border-white/30 transition-colors">
                    <Workflow className="w-5 h-5 text-neutral-200" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= COLUMN 2 (CENTER): SEARCH + HERO STATEMENT + COMPLIANCE ================= */}
          <div className="flex flex-col gap-6">
            {/* CARD 3: API & Surface Discovery (Top) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group relative rounded-[32px] bg-[#0A0D14]/90 border border-white/10 hover:border-emerald-500/40 p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  API & Surface Discovery
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed font-normal">
                  Uncover hidden API endpoints, GraphQL schemas, and broken object authorizations.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectDeliverable?.("API & Surface Discovery")}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-emerald-400 mt-4 group/btn transition-colors cursor-pointer"
                >
                  <span>See More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* In-Card Visual: Search Bar Mockup */}
              <div className="relative mt-8 pt-4 pb-2">
                {/* Purple/Moss ambient backlight behind bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/25 via-emerald-500/20 to-purple-600/25 rounded-full blur-xl pointer-events-none" />

                <div className="relative flex items-center justify-between px-4 py-3 rounded-full bg-black/90 border border-white/15 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center gap-2 text-xs text-neutral-200 font-mono overflow-hidden">
                    <span className="text-emerald-400 font-bold">POST</span>
                    <span className="text-white tracking-wide">/graphql/v2/user</span>
                    <span className="w-1.5 h-3.5 bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <X className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                    <Mic className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                    <div className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <Search className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 4: FOCAL CENTER HERO STATEMENT CARD ("Everything in One Engine") */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="group relative rounded-[32px] bg-gradient-to-b from-[#101622] via-[#0B0E16] to-[#06080D] border border-white/15 hover:border-emerald-500/50 p-8 sm:p-10 transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden shadow-2xl min-h-[220px]"
            >
              {/* Radial moss ambient core */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(120,156,54,0.22),transparent_70%)] pointer-events-none" />

              {/* Logo / Badge */}
              <div className="relative flex items-center gap-2 mb-3">
                <div className="size-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shadow-lg">
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-extrabold text-xs tracking-wider uppercase text-neutral-200">
                  HACK MY WEBSITE
                </span>
              </div>

              {/* Big Bold Statement */}
              <h3 className="relative text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Everything in <br />
                <span className="text-emerald-400">One Engine.</span>
              </h3>

              <p className="relative text-[11px] sm:text-xs text-neutral-400 mt-3 max-w-xs font-mono uppercase tracking-wider">
                DAST · SAST · AI Remediation · Seals
              </p>
            </motion.div>

            {/* CARD 5: Compliance & Governance (Bottom) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="group relative rounded-[32px] bg-[#0A0D14]/90 border border-white/10 hover:border-emerald-500/40 p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  Compliance & Governance
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed font-normal">
                  Auto-map discovered telemetry to SOC 2 Type II, ISO 27001, HIPAA, and DPDP mandates.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectDeliverable?.("Compliance & Governance")}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-emerald-400 mt-4 group/btn transition-colors cursor-pointer"
                >
                  <span>See More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* In-Card Visual: Compliance Chips Row */}
              <div className="relative mt-8 pt-2">
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-2xl bg-neutral-900/80 border border-white/10 text-center flex flex-col items-center justify-center">
                    <span className="text-[10px] text-neutral-400 font-mono">SOC 2</span>
                    <span className="text-xs font-bold text-emerald-400 mt-0.5">CC6.8</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-950/80 to-[#121C07] border border-emerald-500/40 text-center flex flex-col items-center justify-center shadow-lg shadow-emerald-950/50">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-bold text-white mt-0.5">ISO</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-neutral-900/80 border border-white/10 text-center flex flex-col items-center justify-center">
                    <span className="text-[10px] text-neutral-400 font-mono">DPDP</span>
                    <span className="text-xs font-bold text-neutral-200 mt-0.5">2023</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-neutral-900/80 border border-white/10 text-center flex flex-col items-center justify-center">
                    <span className="text-[10px] text-neutral-400 font-mono">HIPAA</span>
                    <span className="text-xs font-bold text-neutral-200 mt-0.5">§164</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= COLUMN 3 (RIGHT): INTEGRATIONS + TALL BOTTOM STUDIO ================= */}
          <div className="flex flex-col gap-6">
            {/* CARD 6: Security Integrations Mesh (Top) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative rounded-[32px] bg-[#0A0D14]/90 border border-white/10 hover:border-emerald-500/40 p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  Security Integrations
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed font-normal">
                  Synchronize OWASP ZAP, Nuclei CVE spiders, Semgrep AST, and alert webhooks.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectDeliverable?.("Security Integrations")}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-emerald-400 mt-4 group/btn transition-colors cursor-pointer"
                >
                  <span>See More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* In-Card Visual: Orbiting Integration Nodes */}
              <div className="relative mt-8 py-6 flex items-center justify-center">
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-purple-900/15 rounded-full blur-2xl pointer-events-none" />

                {/* Orbit System */}
                <div className="relative w-48 h-28 flex items-center justify-center">
                  {/* Concentric dashed ellipse */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
                  <div className="absolute inset-3 rounded-full border border-white/10" />

                  {/* Center Node (Shield) */}
                  <div className="relative size-12 rounded-full bg-gradient-to-tr from-emerald-500 to-[#9BC44D] p-0.5 shadow-[0_0_20px_rgba(120,156,54,0.5)] z-10">
                    <div className="size-full rounded-full bg-black flex items-center justify-center">
                      <Shield className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>

                  {/* Orbiting Satellite Pills */}
                  <div className="absolute top-0 left-6 size-7 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center shadow-lg text-[10px] font-bold text-white">
                    ZAP
                  </div>
                  <div className="absolute bottom-1 right-6 size-7 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center shadow-lg text-[10px] font-bold text-emerald-400">
                    AST
                  </div>
                  <div className="absolute top-4 right-0 size-6 rounded-full bg-purple-900/60 border border-purple-400/40 flex items-center justify-center shadow-lg text-[9px] font-bold text-purple-200">
                    PR
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 7: 1-Click AI Fix Studio (Tall Bottom) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="group relative rounded-[32px] bg-[#0A0D14]/90 border border-white/10 hover:border-emerald-500/40 p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  1-Click AI Fix Studio
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed font-normal">
                  Synthesize ready-to-merge markdown diffs formatted specifically for Cursor AI, Claude Code, and Copilot.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectDeliverable?.("1-Click AI Fix Studio")}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-emerald-400 mt-4 group/btn transition-colors cursor-pointer"
                >
                  <span>See More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* In-Card Visual: Studio UI / AST Code Diff Window */}
              <div className="relative mt-8 pt-4">
                {/* Purple/Moss backlight */}
                <div className="absolute -inset-2 bg-gradient-to-br from-purple-900/25 via-emerald-500/15 to-transparent rounded-3xl blur-xl pointer-events-none" />

                <div className="relative rounded-2xl bg-black/90 border border-white/15 p-4 sm:p-5 shadow-2xl font-mono text-[11px] overflow-hidden">
                  {/* Studio Tabs */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-neutral-400">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold tracking-tight">Layers</span>
                      <span className="text-neutral-500">Assets</span>
                      <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                        Cursor Diff
                      </span>
                    </div>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  </div>

                  {/* Diff Editor Preview */}
                  <div className="space-y-2">
                    <div className="text-[10px] text-neutral-500">
                      // File: src/api/handlers/auth.ts#L42
                    </div>

                    <div className="p-2.5 rounded-lg bg-rose-500/25 border border-rose-500/50 text-rose-100 font-medium leading-snug shadow-sm">
                      <span className="text-rose-300 font-extrabold mr-1.5">-</span> {"const query = `SELECT * FROM users WHERE id = ${reqId}`;"}
                    </div>

                    <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 leading-snug">
                      <span className="text-emerald-400 font-bold">+</span> const query = await db.query(sql, [id]);
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-400">SQL Injection Remediation</span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <Check className="w-3 h-3 stroke-[3]" />
                        Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
