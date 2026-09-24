import React from "react";
import {
  IconTerminal,
  IconCpu,
  IconBrandGithub,
  IconCloudCheck,
  IconBolt,
  IconCheck,
} from "@tabler/icons-react";

export const AiAssistantDemo = () => (
  <div className="p-3.5 rounded-xl bg-black border border-neutral-800/80 font-mono text-[11px] space-y-1.5 text-neutral-300">
    <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
      <IconCpu className="w-3.5 h-3.5" />
      <span>Autonomous Cyber Agent initialized</span>
    </div>
    <p className="text-slate-400">
      &gt; Scanning AST code tree for unauthenticated privilege escalations...
    </p>
    <div className="text-cyan-400 flex items-center gap-1 text-[10px]">
      <IconCheck className="w-3 h-3 text-emerald-400" />
      <span>Safe canary replay verified in 3.4ms</span>
    </div>
  </div>
);

export const AnalyticsDemo = () => (
  <div className="space-y-2">
    <div className="flex items-baseline justify-between font-mono">
      <span className="text-2xl font-bold text-white">99.2%</span>
      <span className="text-xs text-emerald-400 font-semibold">+4.2% Verified</span>
    </div>
    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
      <div className="h-full bg-emerald-500 rounded-full w-[92%]" />
    </div>
  </div>
);

export const MusicPlayerDemo = () => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-black border border-neutral-800/80">
    <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
      <IconBolt className="w-4 h-4" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-semibold text-white truncate">Live Stream Pulse</p>
      <p className="text-[10px] text-neutral-400 font-mono">24/7 DAST Canary</p>
    </div>
  </div>
);

export const NotificationsDemo = () => (
  <div className="space-y-1.5">
    <div className="p-2 rounded-lg bg-black border border-neutral-800/80 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
      <span>0 Critical CVEs</span>
      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-500/20 text-emerald-400">
        Safe
      </span>
    </div>
  </div>
);

export const TerminalDemo = () => (
  <div className="p-3.5 rounded-xl bg-black border border-neutral-800/80 font-mono text-[11px] leading-relaxed text-slate-300">
    <div className="text-slate-500">// Autonomous Security Execution Pipeline</div>
    <div className="text-cyan-400">const scan = await hmw.scan("https://startup.com");</div>
    <div className="text-emerald-400 font-bold">✓ 84 endpoints mapped • 0 mutations</div>
  </div>
);

export const TeamMembersDemo = () => (
  <div className="flex items-center gap-2">
    <div className="flex -space-x-2">
      {["R", "A", "H"].map((init, i) => (
        <div
          key={i}
          className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-xs font-bold text-white font-mono"
        >
          {init}
        </div>
      ))}
    </div>
    <span className="text-[11px] font-mono text-neutral-400">+4 DevSecOps seats</span>
  </div>
);

export const StorageDemo = () => (
  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black border border-neutral-800/80 font-mono text-xs">
    <span className="text-slate-300">Sovereign Vault</span>
    <span className="text-emerald-400 font-bold">AWS Mumbai</span>
  </div>
);

export const ProgressDemo = () => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[11px] font-mono">
      <span className="text-neutral-400">Edge Latency</span>
      <span className="text-emerald-400 font-bold">3.4ms</span>
    </div>
    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
      <div className="h-full bg-cyan-400 rounded-full w-[85%]" />
    </div>
  </div>
);

export const CalendarDemo = () => (
  <div className="p-3 rounded-xl bg-black border border-neutral-800/80 text-xs font-mono text-neutral-300 flex items-center justify-between">
    <span>Automated Daily Cron</span>
    <span className="text-emerald-400 font-bold">02:00 AM UTC</span>
  </div>
);
