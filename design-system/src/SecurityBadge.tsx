import React from "react";
import { getScoreTier } from "./ScoreGauge";

export interface SecurityBadgeProps {
  score: number;
  domain?: string;
  verifiedAt?: string;
  size?: "sm" | "md" | "lg";
}

export const SecurityBadge: React.FC<SecurityBadgeProps> = ({
  score,
  domain = "verified-domain.com",
  verifiedAt = "Today",
  size = "md"
}) => {
  const meta = getScoreTier(score);

  return (
    <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-[#0B0F19] border border-slate-800 shadow-xl backdrop-blur-md">
      <div className="size-8 rounded-xl flex items-center justify-center font-bold text-xs" style={{ backgroundColor: meta.bg, color: meta.color }}>
        🛡️
      </div>
      <div className="text-left font-mono">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <span>AI Launch Score</span>
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
          <span style={{ color: meta.color }}>{score}/100</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300 font-sans font-medium text-[11px] truncate max-w-[120px]">{domain}</span>
        </div>
      </div>
    </div>
  );
};
