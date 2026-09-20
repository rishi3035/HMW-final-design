import React, { useState, useEffect } from "react";

export interface LogEntry {
  timestamp: string;
  engine: "ZAP" | "NUCLEI" | "SEMGREP" | "SYSTEM";
  level: "INFO" | "PASS" | "WARN" | "FAIL";
  message: string;
}

const mockLogs: LogEntry[] = [
  { timestamp: "00:01", engine: "SYSTEM", level: "INFO", message: "Resolving DNS TXT ownership challenge for target domain..." },
  { timestamp: "00:02", engine: "SYSTEM", level: "PASS", message: "Domain verified. Authorization confirmed (100% legal scan initiated)." },
  { timestamp: "00:04", engine: "ZAP", level: "INFO", message: "OWASP ZAP 2.15 active spidering started on 42 routes..." },
  { timestamp: "00:08", engine: "NUCLEI", level: "INFO", message: "Nuclei v3.3 testing 200+ CVE & misconfiguration templates..." },
  { timestamp: "00:12", engine: "NUCLEI", level: "WARN", message: "Missing HSTS header detected on HTTPS listener (CVSS 5.3)." },
  { timestamp: "00:15", engine: "SEMGREP", level: "INFO", message: "Semgrep SAST validating API route authorization guards..." },
  { timestamp: "00:18", engine: "SEMGREP", level: "PASS", message: "Zero exposed database connection strings in public chunks." },
  { timestamp: "00:22", engine: "ZAP", level: "PASS", message: "CORS configuration verified: no wildcard origins on authenticated endpoints." },
  { timestamp: "00:26", engine: "SYSTEM", level: "PASS", message: "Audit complete in 26s. Calculating AI Launch Score: 92/100 (Launch Ready)." }
];

export const ScannerTerminal: React.FC<{ targetUrl?: string }> = ({ targetUrl = "https://app.verified-domain.com" }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < mockLogs.length) {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, mockLogs[currentIndex]]);
        setCurrentIndex((i) => i + 1);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const getLevelColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "PASS": return "text-emerald-400";
      case "WARN": return "text-amber-400";
      case "FAIL": return "text-rose-400";
      default: return "text-cyan-400";
    }
  };

  return (
    <div className="rounded-2xl bg-[#070A10] border border-slate-800 font-mono text-xs overflow-hidden shadow-2xl">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-rose-500/80" />
          <span className="size-2.5 rounded-full bg-amber-500/80" />
          <span className="size-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] text-slate-400 ml-2 font-medium">hmw-audit-engine // {targetUrl}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] text-emerald-400 uppercase font-bold">LIVE DAST/SAST STREAM</span>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="p-4 space-y-2 h-64 overflow-y-auto bg-black/70 text-slate-300">
        {logs.map((log, i) => (
          <div key={i} className="flex items-start gap-2 leading-relaxed animate-in fade-in slide-in-from-bottom-1">
            <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
            <span className="text-slate-400 font-bold shrink-0">[{log.engine}]</span>
            <span className={`font-bold shrink-0 ${getLevelColor(log.level)}`}>[{log.level}]</span>
            <span className="text-slate-200">{log.message}</span>
          </div>
        ))}
        {currentIndex < mockLogs.length && (
          <div className="flex items-center gap-1 text-emerald-400">
            <span>&gt; scanning active vectors</span>
            <span className="animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  );
};
