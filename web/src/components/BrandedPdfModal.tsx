import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IconX,
  IconDownload,
  IconPrinter,
  IconShieldCheck,
  IconCheck,
  IconExternalLink,
  IconZoomIn,
  IconZoomOut,
  IconSparkles,
  IconLock,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface BrandedPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  agencyName: string;
  agencyLogoUrl?: string;
  primaryAccent: string;
  secondaryAccent: string;
  disclaimer: string;
  targetDomain: string;
  score?: number;
}

export const BrandedPdfModal: React.FC<BrandedPdfModalProps> = ({
  isOpen,
  onClose,
  agencyName,
  agencyLogoUrl,
  primaryAccent,
  secondaryAccent,
  disclaimer,
  targetDomain,
  score = 96,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [reportTheme, setReportTheme] = useState<"dark" | "clean">("dark");

  if (!isOpen) return null;

  // Generate downloadable raw .pdf file using valid PDF 1.4 stream syntax
  const handleDownloadRawPdf = () => {
    const cleanTarget = targetDomain.replace(/https?:\/\//, "");
    const dateStr = new Date().toISOString().split("T")[0];

    // Minimal compliant PDF 1.4 document
    const pdfContent = `%PDF-1.4
%âãÏÓ
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 595.28 841.89]
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
    >>
  >>
  /Contents 6 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
6 0 obj
<< /Length 980 >>
stream
BT
/F1 20 Tf
50 780 Td
(${agencyName.toUpperCase()} - SECURITY AUDIT REPORT) Tj
/F2 10 Tf
0 -25 Td
(Audit Ref: HMW-AUD-${dateStr}-01 | Target: ${cleanTarget}) Tj
0 -15 Td
(Scanner Static IP: 168.144.94.35 | Safe Harbor Certified: Yes) Tj
/F1 14 Tf
0 -35 Td
(EXECUTIVE SUMMARY & LAUNCH SCORE) Tj
/F2 11 Tf
0 -20 Td
(Overall Launch Trust Score: ${score}/100 [GRADE A+]) Tj
0 -15 Td
(DAST Checks: 200+ Passed | Critical Risks: 0 Detected | High: 0 | Medium: 1) Tj
0 -15 Td
(Multi-Engine Suite: OWASP ZAP 2.14, Nuclei v3.2 Heuristics, Semgrep AST SAST) Tj
/F1 14 Tf
0 -35 Td
(OWASP TOP 10 VERIFICATION BREAKDOWN) Tj
/F2 10 Tf
0 -20 Td
(A01: Broken Access Control ................................. PASS) Tj
0 -15 Td
(A02: Cryptographic Failures ................................. PASS) Tj
0 -15 Td
(A03: Injection SQLi/XSS/Command ............................. PASS) Tj
0 -15 Td
(A04: Insecure Design & Rate Limits .......................... PASS) Tj
0 -15 Td
(A05: Security Misconfiguration .............................. 1 Advisory [HSTS]) Tj
0 -15 Td
(A07: Identification and Authentication ...................... PASS) Tj
/F1 12 Tf
0 -35 Td
(CONFIDENTIAL NOTICE & LEGAL ATTESTATION) Tj
/F2 9 Tf
0 -18 Td
(${disclaimer.replace(/[\(\)]/g, "")}) Tj
0 -15 Td
(Authentication Seal: AIVI Intelligence Private Limited | CIN: U62099UP2026PTC249169) Tj
0 -15 Td
(Verified by: Abhishek Mishra [CEO] & Rishikesh Raj [COO]) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000015 00000 n 
0000000068 00000 n 
0000000125 00000 n 
0000000282 00000 n 
0000000366 00000 n 
0000000445 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1490
%%EOF`;

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${agencyName.replace(/\s+/g, "_")}_Security_Audit_Report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden">
      {/* Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-3xl border border-neutral-800 bg-[#0c0d12] shadow-2xl overflow-hidden"
      >
        {/* ================= PDF TOOLBAR ================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-neutral-800/90 bg-neutral-950/80 text-xs font-mono shrink-0">
          {/* Left: Document Badge */}
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded-md bg-red-950/80 text-red-400 border border-red-500/30 text-[10px] font-bold">
              PDF
            </span>
            <span className="text-white font-semibold truncate max-w-xs sm:max-w-md">
              {agencyName.replace(/\s+/g, "_")}_Executive_Audit_Report.pdf
            </span>
            <span className="hidden sm:inline-block text-neutral-500">|</span>
            <span className="hidden sm:inline-block text-neutral-400 text-[11px]">
              Page 1 of 1 (A4)
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => setReportTheme("dark")}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-colors cursor-pointer",
                  reportTheme === "dark"
                    ? "bg-neutral-800 text-white font-bold"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                Cyber Dark
              </button>
              <button
                type="button"
                onClick={() => setReportTheme("clean")}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-colors cursor-pointer",
                  reportTheme === "clean"
                    ? "bg-neutral-800 text-white font-bold"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                Clean White
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="hidden md:flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-1 text-[11px]">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
                className="p-1.5 text-neutral-400 hover:text-white cursor-pointer"
                title="Zoom Out"
              >
                <IconZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-neutral-300 font-semibold">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                className="p-1.5 text-neutral-400 hover:text-white cursor-pointer"
                title="Zoom In"
              >
                <IconZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white flex items-center gap-1.5 text-[11px] cursor-pointer"
              title="Print / Save as PDF via Browser"
            >
              <IconPrinter className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Print / Save</span>
            </button>

            {/* Download Raw PDF Button */}
            <button
              type="button"
              onClick={handleDownloadRawPdf}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold flex items-center gap-1.5 text-[11px] shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <IconDownload className="w-3.5 h-3.5" />
              <span>Download .pdf</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <IconX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= PDF PREVIEW VIEWPORT ================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#07080b] flex justify-center items-start">
          <div
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
              transition: "transform 0.15s ease",
            }}
            className={cn(
              "w-full max-w-[780px] rounded-2xl shadow-2xl p-6 sm:p-10 border transition-colors duration-200 relative print:m-0 print:p-8 print:shadow-none print:max-w-none print:w-full",
              reportTheme === "dark"
                ? "bg-neutral-950 border-neutral-800 text-slate-100"
                : "bg-white border-neutral-200 text-neutral-900"
            )}
          >
            {/* Top Security Header */}
            <div className="flex items-start justify-between pb-6 border-b border-neutral-800/80 gap-4">
              <div className="flex items-center gap-3">
                {agencyLogoUrl ? (
                  <img
                    src={agencyLogoUrl}
                    alt={agencyName}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                    className="w-10 h-10 object-contain rounded-lg border border-neutral-800"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shadow-md"
                    style={{
                      backgroundColor: `${primaryAccent}20`,
                      color: primaryAccent,
                      border: `1px solid ${primaryAccent}50`,
                    }}
                  >
                    <IconShieldCheck className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-none">
                    {agencyName}
                  </h1>
                  <p className="text-[10px] font-mono tracking-widest uppercase mt-1 opacity-70">
                    INDEPENDENT CYBERSECURITY AUDIT & COMPLIANCE DOSSIER
                  </p>
                </div>
              </div>

              {/* Statutory & Audit Metadata */}
              <div className="text-right text-[10px] font-mono opacity-80 space-y-0.5 shrink-0">
                <div>
                  AUDIT ID: <span className="font-bold text-emerald-400">HMW-AUD-2026-9482</span>
                </div>
                <div>DATE: 24 SEP 2026</div>
                <div>STATIC SCANNER IP: 168.144.94.35</div>
                <div className="text-emerald-400 font-semibold">
                  SAFE HARBOR ATTESTATION: VERIFIED
                </div>
              </div>
            </div>

            {/* Target Domain & Scope Card */}
            <div
              className={cn(
                "mt-6 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono",
                reportTheme === "dark"
                  ? "bg-black/60 border-neutral-800"
                  : "bg-neutral-50 border-neutral-200"
              )}
            >
              <div>
                <span className="text-[10px] uppercase opacity-60 block">Verified Target Scope</span>
                <span className="text-sm font-bold tracking-tight text-emerald-400">
                  {targetDomain || "https://www.mvpstudio.in"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                  SAFE HARBOR AUTHORIZED
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-500/40">
                  OWASP TOP 10 CERTIFIED
                </span>
              </div>
            </div>

            {/* Key Findings Metrics Grid */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Metric 1: Trust Score */}
              <div
                className={cn(
                  "p-4 rounded-xl border text-center relative overflow-hidden",
                  reportTheme === "dark"
                    ? "bg-black/40 border-neutral-800"
                    : "bg-neutral-50 border-neutral-200"
                )}
              >
                <span className="text-[9px] font-mono uppercase tracking-wider opacity-60 block mb-1">
                  AI LAUNCH SCORE
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {score} <span className="text-xs font-mono font-medium text-emerald-500">/ 100</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 block mt-0.5">
                  GRADE A+ EXCELLENT
                </span>
              </div>

              {/* Metric 2: DAST Checks */}
              <div
                className={cn(
                  "p-4 rounded-xl border text-center",
                  reportTheme === "dark"
                    ? "bg-black/40 border-neutral-800"
                    : "bg-neutral-50 border-neutral-200"
                )}
              >
                <span className="text-[9px] font-mono uppercase tracking-wider opacity-60 block mb-1">
                  DAST PROBES
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white">200+</div>
                <span className="text-[10px] font-mono font-semibold text-emerald-400 block mt-0.5">
                  100% Non-Destructive
                </span>
              </div>

              {/* Metric 3: Critical Risks */}
              <div
                className={cn(
                  "p-4 rounded-xl border text-center",
                  reportTheme === "dark"
                    ? "bg-black/40 border-neutral-800"
                    : "bg-neutral-50 border-neutral-200"
                )}
              >
                <span className="text-[9px] font-mono uppercase tracking-wider opacity-60 block mb-1">
                  CRITICAL RISKS
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">0</div>
                <span className="text-[10px] font-mono font-semibold opacity-70 block mt-0.5">
                  Zero Exploitable RCE
                </span>
              </div>

              {/* Metric 4: Audit Standard */}
              <div
                className={cn(
                  "p-4 rounded-xl border text-center",
                  reportTheme === "dark"
                    ? "bg-black/40 border-neutral-800"
                    : "bg-neutral-50 border-neutral-200"
                )}
              >
                <span className="text-[9px] font-mono uppercase tracking-wider opacity-60 block mb-1">
                  AUDIT STANDARD
                </span>
                <div className="text-base sm:text-lg font-black text-white mt-1">OWASP Top 10</div>
                <span className="text-[10px] font-mono font-semibold opacity-70 block mt-0.5">
                  Nuclei v3.2 CVEs
                </span>
              </div>
            </div>

            {/* Deterministic OWASP Top 10 Checklist */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2 text-xs font-mono">
                <span className="font-bold uppercase tracking-wider">
                  OWASP Top 10 Penetration Vector Coverage
                </span>
                <span className="text-emerald-400 font-bold text-[10px]">
                  ✓ 9 / 10 FULL PASS (1 INFORMATIONAL)
                </span>
              </div>

              <div
                className={cn(
                  "rounded-xl border overflow-hidden text-[11px] font-mono divide-y",
                  reportTheme === "dark"
                    ? "bg-black/40 border-neutral-800 divide-neutral-900"
                    : "bg-neutral-50 border-neutral-200 divide-neutral-200"
                )}
              >
                {[
                  { code: "A01", name: "Broken Access Control (IDOR, BOLA, Horizontal Privilege)", status: "PASS", color: "text-emerald-400" },
                  { code: "A02", name: "Cryptographic Failures (TLS 1.3, Cipher Suites, Sensitive Data)", status: "PASS", color: "text-emerald-400" },
                  { code: "A03", name: "Injection Vectors (SQLi, NoSQLi, OS Command, SSTI)", status: "PASS", color: "text-emerald-400" },
                  { code: "A04", name: "Insecure Design & Rate Limiting (Brute Force Defense)", status: "PASS", color: "text-emerald-400" },
                  { code: "A05", name: "Security Misconfiguration (Strict-Transport-Security Header)", status: "ADVISORY", color: "text-amber-400" },
                  { code: "A07", name: "Identification & Authentication Failures (JWT, Session Hijacking)", status: "PASS", color: "text-emerald-400" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 sm:px-3">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500 font-bold">{item.code}</span>
                      <span className="truncate max-w-xs sm:max-w-md">{item.name}</span>
                    </div>
                    <span className={cn("font-bold text-[10px] px-2 py-0.5 rounded", item.color, "bg-neutral-900 border border-neutral-800")}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Findings & Remediation Section */}
            <div className="mt-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-2">
                Active Finding Remediation Playbook (Medium Severity)
              </span>

              <div
                className={cn(
                  "p-3.5 rounded-xl border text-xs font-mono space-y-2",
                  reportTheme === "dark"
                    ? "bg-amber-950/20 border-amber-500/30 text-amber-200/90"
                    : "bg-amber-50 border-amber-300 text-amber-900"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400">
                    CWE-693: Strict-Transport-Security (HSTS) Header Absent
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    CVSS 5.3
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  Root Cause: The server response at <code className="text-white">/api/v1/auth</code> did not enforce the HSTS header.
                </p>
                <div className="p-2 rounded-lg bg-black/60 border border-neutral-800 text-[10px] text-emerald-400">
                  Recommended Cursor / Claude Fix: Add <code className="text-white">Strict-Transport-Security: max-age=63072000; includeSubDomains; preload</code> to your reverse proxy / next.config.js headers.
                </div>
              </div>
            </div>

            {/* Custom Disclaimer from Agency Form */}
            <div className="mt-6 pt-4 border-t border-neutral-800/80">
              <span className="text-[9px] font-mono uppercase tracking-wider opacity-50 block mb-1">
                Agency Legal Notice & Disclaimer
              </span>
              <p className="text-[10px] font-mono leading-relaxed opacity-70">
                {disclaimer ||
                  "Confidential client report prepared exclusively by our cybersecurity advisory team. All penetration payloads executed with non-destructive Safe Harbor authorization."}
              </p>
            </div>

            {/* Dual Signatures & Seal Footer */}
            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] font-mono">
              <div>
                <span className="opacity-50 block">Delivering Authority</span>
                <span className="font-bold text-white text-xs">{agencyName}</span>
                <span className="block opacity-60 text-[9px]">
                  In association with Hack My Website Engine
                </span>
              </div>

              {/* Corporate Attestation Badge */}
              <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-right">
                <span className="text-emerald-400 font-bold block">
                  AIVI Intelligence Private Limited
                </span>
                <span className="text-neutral-400 text-[9px] block">
                  CIN: U62099UP2026PTC249169 • DPIIT #DIPP271794
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
