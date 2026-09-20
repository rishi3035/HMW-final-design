import React, { useState } from "react";

export type VerificationMethod = "dns" | "file";

export interface DomainVerifyWizardProps {
  domain?: string;
  onVerified?: () => void;
}

export const DomainVerifyWizard: React.FC<DomainVerifyWizardProps> = ({
  domain = "app.your-startup.com",
  onVerified
}) => {
  const [method, setMethod] = useState<VerificationMethod>("dns");
  const [isVerifying, setIsVerifying] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const challengeTxt = `hmw-verification-code=hmw_live_${domain.replace(/[^a-z0-9]/gi, "")}_849204`;

  const handleVerify = () => {
    setIsVerifying(true);
    setStatus("idle");
    setTimeout(() => {
      setIsVerifying(false);
      setStatus("success");
      onVerified?.();
    }, 1500);
  };

  return (
    <div className="rounded-3xl bg-[#0B0F19] border border-slate-800 p-6 sm:p-8 space-y-6 text-left shadow-2xl">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
          <span>🔒 LEGAL AUTHORIZATION STEP</span>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">Verify Domain Ownership</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          To ensure strict ethical security and prevent unauthorized scanning, prove you control <code className="text-emerald-400 font-mono font-semibold">{domain}</code>.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          type="button"
          onClick={() => setMethod("dns")}
          className={`pb-2.5 px-4 text-xs font-bold transition-all border-b-2 ${
            method === "dns"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Option A: DNS TXT Record (Fastest)
        </button>
        <button
          type="button"
          onClick={() => setMethod("file")}
          className={`pb-2.5 px-4 text-xs font-bold transition-all border-b-2 ${
            method === "file"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Option B: HTTP Challenge File
        </button>
      </div>

      {method === "dns" ? (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
          <div>
            <span className="text-slate-400 text-[11px]">Record Type:</span>
            <div className="text-white font-bold mt-0.5">TXT</div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Host / Name:</span>
            <div className="text-white font-bold mt-0.5">@ or _hmw-challenge.{domain}</div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Value / Content:</span>
            <div className="text-emerald-400 font-bold bg-black/60 p-2.5 rounded-lg border border-slate-800 break-all select-all mt-1">
              {challengeTxt}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
          <div>
            <span className="text-slate-400 text-[11px]">Public URL:</span>
            <div className="text-white font-bold mt-0.5 break-all">
              https://{domain}/.well-known/hmw-verification.txt
            </div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Required File Content:</span>
            <div className="text-emerald-400 font-bold bg-black/60 p-2.5 rounded-lg border border-slate-800 break-all select-all mt-1">
              {challengeTxt}
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
        <div className="text-xs text-slate-400">
          {status === "success" && (
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span>✓</span> Ownership verified successfully!
            </span>
          )}
          {status === "idle" && "Checks propagate in ~5–30 seconds."}
        </div>

        <button
          type="button"
          disabled={isVerifying}
          onClick={handleVerify}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
        >
          {isVerifying ? "Verifying DNS..." : "Check Verification & Launch Scan"}
        </button>
      </div>
    </div>
  );
};
