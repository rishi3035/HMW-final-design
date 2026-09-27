"use client";

import React, { useState } from "react";
import {
  IconX,
  IconCopy,
  IconCheck,
  IconShare,
  IconMail,
  IconLock,
  IconEye,
  IconClock,
  IconShieldCheck,
} from "@tabler/icons-react";

export interface ShareReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  scanId?: string;
  targetUrl?: string;
  score?: number;
}

export const ShareReportModal: React.FC<ShareReportModalProps> = ({
  isOpen,
  onClose,
  scanId = "scan-8942-mvpstudio",
  targetUrl = "https://my-startup.com",
  score = 78,
}) => {
  const [expiration, setExpiration] = useState<"24h" | "7d" | "30d" | "never">("7d");
  const [maskSecrets, setMaskSecrets] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const origin = typeof window !== "undefined" ? window.location.origin : "https://hackmywebsite.io";
  const shareUrl = `${origin}/dashboard/scan/${scanId}?share=read_only&exp=${expiration}&masked=${maskSecrets ? "1" : "0"}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Security Assessment Report: ${targetUrl} (Score: ${score}/100)`);
    const body = encodeURIComponent(
      `Hi,\n\nPlease find the live read-only security assessment report for ${targetUrl} (Current Score: ${score}/100):\n\n${shareUrl}\n\nThis link contains categorized findings, evidence cURLs, and AI remediation steps.\n\nBest,\n`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 shadow-2xl text-left text-neutral-100 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1.5">
                <IconShare className="size-3.5 text-emerald-400" />
                <span>Secure Client Share</span>
              </span>
              <span className="text-xs text-neutral-400">Read-Only Link</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Share Audit Report
            </h2>
            <p className="text-xs text-neutral-400">
              Generate a shareable, client-ready security audit snapshot for {targetUrl}.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer border border-neutral-800"
          >
            <IconX className="size-5" />
          </button>
        </div>

        {/* Link Input & Copy */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider font-semibold text-neutral-300 block">
            Generated Read-Only Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              {copied ? <IconCheck className="size-4" /> : <IconCopy className="size-4" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Expiration Controls */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider font-semibold text-neutral-300 flex items-center gap-1.5">
            <IconClock className="size-3.5 text-emerald-400" />
            <span>Link Expiration</span>
          </label>
          <div className="grid grid-cols-4 gap-2 text-xs font-mono">
            {(["24h", "7d", "30d", "never"] as const).map((exp) => (
              <button
                key={exp}
                type="button"
                onClick={() => setExpiration(exp)}
                className={`py-2 rounded-xl border font-bold transition-all cursor-pointer ${
                  expiration === exp
                    ? "bg-neutral-800 border-emerald-500/50 text-emerald-300"
                    : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {exp === "24h" ? "24 Hours" : exp === "7d" ? "7 Days" : exp === "30d" ? "30 Days" : "Never"}
              </button>
            ))}
          </div>
        </div>

        {/* Security Options */}
        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <IconLock className="size-3.5 text-emerald-400" />
                <span>Mask Raw API Secrets</span>
              </div>
              <div className="text-[11px] text-neutral-400">
                Redacts discovered tokens, auth bearer headers, and environment values in reproduction cURLs.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMaskSecrets(!maskSecrets)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                maskSecrets ? "bg-emerald-500" : "bg-neutral-700"
              }`}
            >
              <span
                className={`absolute top-1 left-1 size-4 rounded-full bg-neutral-950 transition-transform ${
                  maskSecrets ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleEmailShare}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <IconMail className="size-4 text-emerald-400" />
            <span>Send via Email</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
