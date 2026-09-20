import React from "react";

export const AuditComparisonTable: React.FC = () => {
  const comparisonItems = [
    {
      feature: "Turnaround Time",
      traditional: "2–4 Weeks (Manual Consult)",
      hmw: "3–8 Minutes (Instant Multi-Engine)",
      winner: "hmw"
    },
    {
      feature: "Cost per Audit",
      traditional: "$4,000 – $15,000 / audit",
      hmw: "Free Tier / Self-Serve Subscriptions",
      winner: "hmw"
    },
    {
      feature: "Scanning Methodology",
      traditional: "Manual checklists (human error prone)",
      hmw: "OWASP ZAP (DAST) + Nuclei (CVEs) + Semgrep (SAST)",
      winner: "hmw"
    },
    {
      feature: "Developer Code Fixes",
      traditional: "100-page static PDF (No code prompts)",
      hmw: "1-Click AI Prompts for Cursor & Claude Code",
      winner: "hmw"
    },
    {
      feature: "Retest Verification",
      traditional: "Requires scheduling secondary audit quote",
      hmw: "1-Click 'FIX → RETEST' instant re-verification",
      winner: "hmw"
    },
    {
      feature: "Continuous CI/CD",
      traditional: "Not possible (manual engagement)",
      hmw: "Automated pre-deployment API hooks",
      winner: "hmw"
    }
  ];

  return (
    <div className="rounded-3xl bg-[#0B0F19] border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl space-y-6 text-left">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
          <span>⚡ TRADITIONAL VS HACKMYWEBSITE</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Why Modern Teams Choose Automated Audits</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
              <th className="py-3 px-4">Evaluation Criteria</th>
              <th className="py-3 px-4 text-slate-400">Traditional Pen-Testing</th>
              <th className="py-3 px-4 text-emerald-400 font-bold bg-emerald-500/5 rounded-t-xl">
                HackMyWebsite v2.5
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {comparisonItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-white">{item.feature}</td>
                <td className="py-3.5 px-4 text-slate-400">{item.traditional}</td>
                <td className="py-3.5 px-4 text-emerald-300 font-semibold bg-emerald-500/5 flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> {item.hmw}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
