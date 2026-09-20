import React, { useState } from "react";

export const EngineFlowDiagram: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<"zap" | "nuclei" | "semgrep">("zap");

  const engineDetails = {
    zap: {
      name: "OWASP ZAP 2.15 (DAST)",
      role: "Dynamic Application Security Testing",
      badge: "ACTIVE RUNTIME SPIDER",
      color: "#10B981",
      desc: "Simulates real-world threat actors attacking your live URLs, forms, and API routes. Tests for SQL injection, Cross-Site Scripting (XSS), Broken Access Control, and session hijacking.",
      metrics: "200+ Active Payload Probes • Smart Route Crawling • Token Replay Detection"
    },
    nuclei: {
      name: "Nuclei Engine v3.3 (CVEs)",
      role: "Vulnerability & Misconfiguration Scanning",
      badge: "COMMUNITY CVE FEED",
      color: "#06B6D4",
      desc: "Fast, template-based vulnerability scanning covering zero-days, unpatched CVEs, open admin panels, exposed environment variables (.env), and misconfigured SSL/TLS ciphers.",
      metrics: "5,000+ Fast Templates • Zero False-Positive Bias • SSL/TLS Cipher Analysis"
    },
    semgrep: {
      name: "Semgrep Hybrid (SAST)",
      role: "Static Application Security Testing",
      badge: "SYNTAX-TREE CODE ANALYSIS",
      color: "#F59E0B",
      desc: "Analyzes client-side bundles and public scripts to detect leaked API secrets, insecure JWT decoding logic, unsafe DOM manipulations, and outdated vulnerable dependencies.",
      metrics: "AST Pattern Matching • Framework-Specific Next.js/React Rules • Secret Leak Traps"
    }
  };

  const selected = engineDetails[activeEngine];

  return (
    <div className="rounded-3xl bg-[#0B0F19] border border-slate-800 p-6 sm:p-8 space-y-6 text-left shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <span>⚡ MULTI-ENGINE HYBRID PIPELINE</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight mt-1">
            Tri-Engine Synchronized Security Audit
          </h3>
        </div>

        {/* Engine Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveEngine("zap")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeEngine === "zap" ? "bg-emerald-500 text-neutral-950" : "text-slate-400 hover:text-white"
            }`}
          >
            OWASP ZAP
          </button>
          <button
            type="button"
            onClick={() => setActiveEngine("nuclei")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeEngine === "nuclei" ? "bg-cyan-500 text-neutral-950" : "text-slate-400 hover:text-white"
            }`}
          >
            Nuclei CVEs
          </button>
          <button
            type="button"
            onClick={() => setActiveEngine("semgrep")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeEngine === "semgrep" ? "bg-amber-500 text-neutral-950" : "text-slate-400 hover:text-white"
            }`}
          >
            Semgrep SAST
          </button>
        </div>
      </div>

      {/* Selected Engine Visualizer Card */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-white font-sans">{selected.name}</span>
          <span
            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
            style={{ color: selected.color, borderColor: selected.color + "40", backgroundColor: selected.color + "15" }}
          >
            {selected.badge}
          </span>
        </div>
        <p className="text-slate-300 font-sans text-xs leading-relaxed">{selected.desc}</p>
        <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400">
          <strong>Coverage: </strong>{selected.metrics}
        </div>
      </div>
    </div>
  );
};
