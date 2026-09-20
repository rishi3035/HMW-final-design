import React, { useState } from "react";
import { getScoreTier } from "../../design-system/src/ScoreGauge";

export interface MobileScanCompanionProps {
  appName?: string;
  domain?: string;
  currentScore?: number;
}

export const MobileScanCompanion: React.FC<MobileScanCompanionProps> = ({
  appName = "Production SaaS",
  domain = "app.my-startup.com",
  currentScore = 91
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [score, setScore] = useState(currentScore);
  const meta = getScoreTier(score);

  const triggerMobileScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScore(94);
    }, 2500);
  };

  return (
    <div className="max-w-xs mx-auto rounded-[36px] bg-[#06080F] border-4 border-slate-800 p-4 shadow-2xl text-slate-100 font-sans space-y-4">
      {/* Mobile Status Bar */}
      <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-400 font-mono">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>HMW LIVE</span>
        </div>
      </div>

      {/* App Header */}
      <div className="flex items-center justify-between px-2">
        <div className="text-left">
          <h4 className="text-sm font-bold text-white leading-tight">{appName}</h4>
          <p className="text-[10px] font-mono text-slate-400 truncate">{domain}</p>
        </div>
        <span className="size-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs">
          🛡️
        </span>
      </div>

      {/* Center Radar / Score Card */}
      <div className="p-4 rounded-2xl bg-[#0B0F19] border border-slate-800/80 text-center space-y-2">
        {isScanning ? (
          <div className="py-6 space-y-2">
            <div className="size-16 mx-auto rounded-full border-2 border-dashed border-emerald-400 animate-spin flex items-center justify-center">
              <span className="text-xs font-mono text-emerald-400">SCAN</span>
            </div>
            <p className="text-[11px] font-mono text-slate-300">Evaluating 200+ checks...</p>
          </div>
        ) : (
          <>
            <div className="size-20 mx-auto rounded-full border-4 border-emerald-500/80 flex flex-col items-center justify-center bg-emerald-500/5">
              <span className="text-2xl font-black font-mono text-white">{score}</span>
              <span className="text-[7px] font-mono text-slate-400 uppercase">/100 PTS</span>
            </div>
            <div>
              <span
                className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                style={{ color: meta.color, backgroundColor: meta.bg, borderColor: meta.color + "40" }}
              >
                {meta.label.toUpperCase()}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Push Alerts Feed */}
      <div className="space-y-2 text-left">
        <div className="text-[10px] font-mono uppercase text-slate-400 font-bold px-1">
          Recent Security Signals
        </div>
        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-emerald-400 font-bold">DAST PASS</span>
            <span className="text-slate-500">2m ago</span>
          </div>
          <p className="text-[11px] text-slate-300">All authenticated API routes passed SQLi &amp; XSS probes.</p>
        </div>
      </div>

      {/* Instant Action CTA */}
      <button
        type="button"
        disabled={isScanning}
        onClick={triggerMobileScan}
        className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs tracking-tight transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
      >
        {isScanning ? "Scanning in Background..." : "⚡ Trigger Instant Scan"}
      </button>
    </div>
  );
};
