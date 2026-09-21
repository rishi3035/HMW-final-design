import React from "react";
import {
  FileText,
  Award,
  Download,
  CheckCircle2,
  Sparkles,
  Shield,
  ArrowRight,
  Building2,
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export const WhiteLabelReporting: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#04060A] border-t border-slate-800/80 overflow-hidden text-left">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05),transparent_70%)]" />
      <div className="pointer-events-none absolute top-10 right-10 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.04),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Two-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT SIDE (6 Columns): Large Realistic Report/PDF Preview */}
          <div className="lg:col-span-6 relative">
            {/* Document Decorative Backing for Multi-Page Depth */}
            <div className="absolute -top-3 -left-3 w-full h-full rounded-3xl bg-slate-800/30 border border-slate-800/50 pointer-events-none transform -rotate-1 hidden sm:block" />

            {/* Main Executive Document Card */}
            <div className="relative rounded-3xl bg-[#090D16] border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
              {/* Agency Brand Header & Statutory Watermark */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md font-bold text-sm">
                    A
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white tracking-wide block">
                      APEX DIGITAL CONSULTING
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      Enterprise Technology & Cybersecurity Partner
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono text-[10px] text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-semibold inline-block mb-0.5">
                    CONFIDENTIAL AUDIT
                  </span>
                  <div>ID: HMW-2026-8842</div>
                </div>
              </div>

              {/* Title & Metadata Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider block">
                    CLIENT AUDIT DELIVERABLE
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    SECURITY ASSESSMENT
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Prepared for: <strong className="text-slate-200">Acme Technologies</strong>
                  </p>
                </div>

                {/* Score Widget */}
                <div className="flex items-center gap-3 bg-[#06080F] p-2.5 px-4 rounded-xl border border-emerald-500/40 shadow-inner">
                  <div className="text-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">
                      SECURITY SCORE
                    </span>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl font-black text-emerald-400">82</span>
                      <span className="text-xs font-mono text-slate-500">/ 100</span>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-slate-800" />
                  <span className="text-[11px] font-bold text-amber-400 font-mono">
                    Action<br />Required
                  </span>
                </div>
              </div>

              {/* Document Table of Contents / Key Assessment Sections */}
              <div className="space-y-2.5 font-sans text-xs">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-1">
                  REPORT SECTIONS INCLUDED
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Section 1 */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-slate-200">Executive Summary</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">Section 01</span>
                  </div>

                  {/* Section 2 */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-slate-200">Risk Overview</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">Section 02</span>
                  </div>

                  {/* Section 3 */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-slate-200">Critical Findings (0)</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">Clear</span>
                  </div>

                  {/* Section 4 */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-amber-400" />
                      <span className="font-semibold text-slate-200">High-Risk Findings (2)</span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold">Action</span>
                  </div>

                  {/* Section 5 */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-cyan-400" />
                      <span className="font-semibold text-slate-200">Remediation Guidance</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">Fixes</span>
                  </div>

                  {/* Section 6 */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-slate-200">Verification Results</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Retest</span>
                  </div>
                </div>
              </div>

              {/* Bottom Verification Seal */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield className="size-3.5 text-emerald-400" />
                  <span>Verified Sovereign Multi-Engine Audit</span>
                </div>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <Download className="size-3" /> Client-Ready PDF
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (6 Columns): Copy, Features & B2B2C Positioning */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider backdrop-blur-md shadow-sm">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>CLIENT SECURITY REPORTING</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.15]">
                Deliver Security Assessments Under Your Brand.
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                For agencies, development partners, and technology providers, turn automated security findings into professional, client-ready security assessments.
              </p>
            </div>

            {/* Four Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Feature 1 */}
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Building2 className="size-4 shrink-0" />
                  <h4 className="text-xs font-bold text-white">
                    White-Label Branding
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Present security assessments using your own brand identity.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <FileText className="size-4 shrink-0" />
                  <h4 className="text-xs font-bold text-white">
                    Executive Summary
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Translate technical findings into a format decision-makers can understand.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Layers className="size-4 shrink-0" />
                  <h4 className="text-xs font-bold text-white">
                    Technical Evidence
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Show severity, affected assets, evidence, and remediation details.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="size-4 shrink-0" />
                  <h4 className="text-xs font-bold text-white">
                    Remediation Tracking
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Show which findings were identified, addressed, and verified.
                </p>
              </div>
            </div>

            {/* B2B2C Positioning & Secondary Text */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Sparkles className="size-3.5 text-emerald-400" />
                <span>Automated Assessment → Professional Client Deliverable</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Designed for agencies, technology partners, and teams managing security assessments across multiple client environments.
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <a
                href="#sample-report"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-700 hover:border-slate-600 transition-all shadow-sm group"
              >
                <span>View Sample Security Report</span>
                <ArrowRight className="size-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
