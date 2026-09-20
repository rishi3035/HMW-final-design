import React, { useState } from "react";

export type SupportedIde = "cursor" | "claude" | "windsurf" | "aider";

export interface IdePromptBoxProps {
  initialIde?: SupportedIde;
  prompts: Record<SupportedIde, string>;
  fileName?: string;
}

export const IdePromptBox: React.FC<IdePromptBoxProps> = ({
  initialIde = "cursor",
  prompts,
  fileName = "next.config.js"
}) => {
  const [activeIde, setActiveIde] = useState<SupportedIde>(initialIde);
  const [copied, setCopied] = useState(false);

  const currentPrompt = prompts[activeIde] || Object.values(prompts)[0];

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ides: { key: SupportedIde; label: string; icon: string }[] = [
    { key: "cursor", label: "Cursor Composer", icon: "⚡" },
    { key: "claude", label: "Claude Code", icon: "🤖" },
    { key: "windsurf", label: "Windsurf Cascade", icon: "🏄" },
    { key: "aider", label: "Aider / Terminal", icon: "💻" }
  ];

  return (
    <div className="rounded-2xl bg-[#0B0F19] border border-slate-800 overflow-hidden shadow-xl text-left">
      {/* Tab Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {ides.map((ide) => (
            <button
              key={ide.key}
              type="button"
              onClick={() => setActiveIde(ide.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeIde === ide.key
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <span>{ide.icon}</span>
              <span>{ide.label}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-transform active:scale-95 flex items-center gap-1"
        >
          {copied ? "✓ Copied!" : "📋 Copy Prompt"}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 bg-black/80 font-mono text-xs text-slate-200 space-y-2">
        <div className="text-[11px] text-slate-500 flex items-center justify-between">
          <span>Target context: <code className="text-emerald-400">{fileName}</code></span>
          <span className="text-[10px] text-slate-500 uppercase">Ready for 1-Click Paste</span>
        </div>
        <pre className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-emerald-300 whitespace-pre-wrap overflow-x-auto leading-relaxed">
          {currentPrompt}
        </pre>
      </div>
    </div>
  );
};
