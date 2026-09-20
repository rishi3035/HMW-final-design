import React from "react";

export type ScoreTier = "ready" | "review" | "risk" | "blocker";

export interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showSubMetrics?: boolean;
  subMetrics?: {
    dast: number;
    sast: number;
    secrets: number;
    headers: number;
  };
}

export function getScoreTier(score: number): { tier: ScoreTier; label: string; color: string; bg: string } {
  if (score >= 85) {
    return { tier: "ready", label: "Launch Ready", color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" };
  } else if (score >= 70) {
    return { tier: "review", label: "Action Recommended", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)" };
  } else if (score >= 50) {
    return { tier: "risk", label: "High Risk", color: "#F97316", bg: "rgba(249, 115, 22, 0.1)" };
  } else {
    return { tier: "blocker", label: "Launch Blocker", color: "#EF4444", bg: "rgba(239, 68, 68, 0.1)" };
  }
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 180,
  strokeWidth = 12,
  showSubMetrics = true,
  subMetrics = { dast: 98, sast: 95, secrets: 100, headers: 90 }
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const meta = getScoreTier(score);

  return (
    <div className="flex flex-col items-center p-6 rounded-3xl bg-[#0B0F19]/90 border border-slate-800/80 backdrop-blur-xl shadow-2xl text-slate-100">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1E293B"
            strokeWidth={strokeWidth}
          />
          {/* Progress fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={meta.color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">{score}</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">/ 100 PTS</span>
        </div>
      </div>

      <div className="mt-4 text-center space-y-1">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border"
          style={{ color: meta.color, backgroundColor: meta.bg, borderColor: meta.color + "40" }}
        >
          {meta.label.toUpperCase()}
        </span>
        <p className="text-xs text-slate-400">AI Launch Scorecard</p>
      </div>

      {showSubMetrics && (
        <div className="w-full mt-6 pt-5 border-t border-slate-800/80 space-y-2.5">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">DAST Endpoints (ZAP)</span>
              <span className="font-mono text-emerald-400 font-bold">{subMetrics.dast}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${subMetrics.dast}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">CVE &amp; Misconfigs (Nuclei)</span>
              <span className="font-mono text-emerald-400 font-bold">{subMetrics.secrets}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${subMetrics.secrets}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">SAST Code Logic (Semgrep)</span>
              <span className="font-mono text-emerald-400 font-bold">{subMetrics.sast}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${subMetrics.sast}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
