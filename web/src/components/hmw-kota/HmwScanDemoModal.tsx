"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  Terminal,
  AlertTriangle,
  CheckCircle2,
  Code2,
  Copy,
  Check,
  Zap,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface HmwScanDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartRealScan?: () => void;
}

export const HmwScanDemoModal: React.FC<HmwScanDemoModalProps> = ({
  isOpen,
  onClose,
  onStartRealScan,
}) => {
  const [activeTab, setActiveTab] = useState<"dast" | "sast" | "diff">("dast");
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(
      `// Hack My Website Automated Patch\n// Vulnerability: CVE-2024-38077 Weak JWT Algorithm\n// File: src/api/v1/auth/jwt.ts#L38\n\n- const decoded = jwt.decode(token, { algorithms: ['HS256', 'none'] });\n+ const decoded = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: ['HS256'] });`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6"
        >
          {/* Top Bar */}
          <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-12 flex items-center justify-between text-white z-20">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                LIVE SECURITY SANDBOX
              </span>
              <span className="hidden sm:inline-block text-neutral-400 text-xs font-medium">
                Autonomous DevSecOps Telemetry Simulation
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer border border-white/10"
              title="Close Sandbox"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Viewport Container */}
          <motion.div
            initial={{ scale: 0.94, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="relative w-full max-w-5xl rounded-[32px] sm:rounded-[36px] overflow-hidden bg-[#0A0D14] border border-white/15 shadow-2xl flex flex-col justify-between p-5 sm:p-8 mt-12 sm:mt-10 max-h-[85vh] overflow-y-auto"
          >
            {/* Background scanner pulse */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-black to-neutral-950 opacity-90 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Content Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column: Interactive Terminal Stream */}
              <div className="lg:col-span-7 bg-black/90 rounded-2xl p-5 border border-white/10 flex flex-col justify-between shadow-2xl">
                <div>
                  {/* Terminal Header & Mode Switcher */}
                  <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-white/10 gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full bg-rose-500" />
                      <span className="size-2.5 rounded-full bg-amber-500" />
                      <span className="size-2.5 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-mono text-neutral-400 ml-2">
                        scanner_engine.sh
                      </span>
                    </div>

                    {/* Interactive Tab Selectors */}
                    <div className="inline-flex items-center p-1 rounded-xl bg-neutral-900 border border-white/10 text-[10px] font-mono">
                      <button
                        onClick={() => setActiveTab("dast")}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          activeTab === "dast"
                            ? "bg-emerald-500 text-white font-bold"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        DAST Runtime
                      </button>
                      <button
                        onClick={() => setActiveTab("sast")}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          activeTab === "sast"
                            ? "bg-emerald-500 text-white font-bold"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        SAST Logic
                      </button>
                      <button
                        onClick={() => setActiveTab("diff")}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          activeTab === "diff"
                            ? "bg-emerald-500 text-white font-bold"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Cursor Diff
                      </button>
                    </div>
                  </div>

                  {/* TAB 1: DAST TELEMETRY STREAM */}
                  {activeTab === "dast" && (
                    <div className="space-y-2 font-mono text-[11px] sm:text-xs text-neutral-300">
                      <div className="text-neutral-500">
                        &gt; Target: <span className="text-white">https://app.production-saas.com</span>
                      </div>
                      <div className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>SSL/TLS Cipher Suites: TLSv1.3 Verified (Zero Weak Ciphers)</span>
                      </div>
                      <div className="text-neutral-400">
                        &gt; Enumerating 48 API routes, auth gates &amp; webhooks...
                      </div>
                      <div className="text-neutral-300">
                        &gt; SQLi Fuzzing: <span className="text-emerald-400">[NEUTRALIZED via parameterized queries]</span>
                      </div>
                      <div className="text-neutral-300">
                        &gt; SSRF Fuzzing: <span className="text-emerald-400">[BLOCKED by sovereign cloud filter]</span>
                      </div>
                      <div className="text-amber-400 flex items-center gap-1.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 my-2">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>CVE-2024-38077: Weak JWT algorithm allowed in /api/v1/auth/jwt.ts</span>
                      </div>
                      <div className="text-emerald-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>Deterministic AI Fix Prompt Synthesized (Ready for Cursor &amp; Claude)</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: SAST AST CODE PARSER */}
                  {activeTab === "sast" && (
                    <div className="space-y-2 font-mono text-[11px] sm:text-xs text-neutral-300">
                      <div className="text-neutral-500">
                        &gt; Repository: <span className="text-white">production-saas / main</span>
                      </div>
                      <div className="text-neutral-400">
                        &gt; AST Engine: Traversed 142 source files in 2.14s
                      </div>
                      <div className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>0 Hardcoded Secrets (AWS Keys, Stripe Secrets, Private Keys)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-neutral-900 border border-white/10 text-neutral-300 space-y-1">
                        <div className="text-rose-400 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>CWE-347: Improper Verification of Cryptographic Signature</span>
                        </div>
                        <div className="text-neutral-400 text-[10px]">
                          Location: src/api/v1/auth/jwt.ts:38
                        </div>
                        <div className="text-neutral-500 text-[10px]">
                          Risk: Attacker could bypass token verification by supplying 'none' algorithm.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: CURSOR AI REMEDIATION DIFF */}
                  {activeTab === "diff" && (
                    <div className="space-y-2 font-mono text-[11px] sm:text-xs">
                      <div className="flex items-center justify-between text-[10px] text-neutral-400 pb-1">
                        <span>File: src/api/v1/auth/jwt.ts#L38</span>
                        <button
                          onClick={handleCopyPrompt}
                          className="flex items-center gap-1 text-emerald-400 hover:underline cursor-pointer"
                        >
                          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copied ? "Copied!" : "Copy Fix"}</span>
                        </button>
                      </div>

                      <div className="p-2.5 rounded-lg bg-rose-500/25 border border-rose-500/50 text-rose-100 font-medium leading-snug">
                        <span className="text-rose-300 font-bold mr-1.5">-</span>
                        {"const decoded = jwt.decode(token, { algorithms: ['HS256', 'none'] });"}
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-medium leading-snug">
                        <span className="text-emerald-400 font-bold mr-1.5">+</span>
                        {"const decoded = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: ['HS256'] });"}
                      </div>

                      <div className="pt-2 text-[10px] text-neutral-400">
                        Remediation verified by static validator. 0 breaking changes.
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Runtime: 3m 42s</span>
                  <span className="text-emerald-400 font-medium">100% Non-destructive Telemetry</span>
                </div>
              </div>

              {/* Right Column: Posture Score & Direct Scan CTA */}
              <div className="lg:col-span-5 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider block font-mono">
                      Security Launch Score
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      GRADE: A
                    </span>
                  </div>

                  <div className="text-5xl font-bold text-white mt-2 flex items-baseline gap-2">
                    94 <span className="text-lg text-neutral-500 font-normal">/ 100</span>
                  </div>

                  <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                    1 configuration finding patched automatically via 1-click Cursor prompt. Zero production vulnerabilities remaining.
                  </p>

                  {/* Audit Metric Highlights */}
                  <div className="grid grid-cols-2 gap-2 mt-5">
                    <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                      <div className="text-[10px] uppercase font-mono text-neutral-500">Endpoints</div>
                      <div className="text-lg font-bold text-white mt-0.5">48 Audited</div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                      <div className="text-[10px] uppercase font-mono text-neutral-500">Blockers</div>
                      <div className="text-lg font-bold text-emerald-400 mt-0.5">0 Critical</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-neutral-400 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Check className="size-3 text-emerald-400" />
                      <span>OWASP Top 10 &amp; CWE Automated Matrix</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="size-3 text-emerald-400" />
                      <span>India DPDP Act 2023 Sovereign Cloud Mapped</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <button
                    onClick={() => {
                      onClose();
                      onStartRealScan?.();
                    }}
                    className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Scan Your Live Domain</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 mt-6 pt-4 border-t border-white/10 gap-2">
              <div className="flex items-center gap-2 text-[11px]">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>AWS Mumbai Sovereign Node · Zero Code Retention Guarantee</span>
              </div>
              <div className="text-[11px] text-neutral-500">
                Deterministic Output · 0% False Positives
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
