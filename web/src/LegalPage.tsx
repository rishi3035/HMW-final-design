import React, { useState } from "react";
import { LockKeyhole, FileText, ShieldCheck, CheckCircle2 } from "lucide-react";
import { HmwLogo } from "../../design-system/src/HmwLogo";
import { HmwKotaNavbar, HmwKotaFooter, HmwKotaCursor } from "./components/hmw-kota";
import { GreenAuraBackground } from "./components/ui/GreenAuraBackground";
import { WavesShader } from "@/components/ui/waves-shader";

interface LegalPageProps {
  initialTab?: "privacy" | "terms";
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = "privacy" }) => {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">(initialTab);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950 font-sans antialiased relative">
      {/* 1. Fluid Follower Magnetic Cursor */}
      <HmwKotaCursor />

      {/* 2. Floating Glass Pill Navigation with Live Telemetry */}
      <HmwKotaNavbar
        onStartScan={() => navigateTo("/workspace")}
        onBookDemo={() => navigateTo("/contact")}
      />

      {/* SECTION 01: Statutory Header & Interactive Document Switcher (Landing Page Waves Shader Theme) */}
      <section className="relative w-full min-h-screen flex flex-col justify-center pt-28 pb-20 sm:py-28 md:py-32 border-b border-white/10 overflow-hidden text-center">
        {/* Animated WebGL Waves Flow Shader Background matching landing page */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <WavesShader className="w-full h-full" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px] pointer-events-none" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-800 text-xs font-mono text-emerald-400">
            <ShieldCheck className="size-3.5" />
            <span>Statutory Legal & Security Agreements</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {activeTab === "privacy" ? "Privacy & Data Protection Policy" : "Terms & Conditions"}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Operated by <strong>AIVI Intelligence Private Limited</strong> (CIN: U62099UP2026PTC249169).
          </p>

          {/* Legal Document Tab Switcher */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 mt-4">
            <button
              type="button"
              onClick={() => setActiveTab("privacy")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === "privacy"
                  ? "bg-emerald-500 text-neutral-950 shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <LockKeyhole className="size-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("terms")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === "terms"
                  ? "bg-emerald-500 text-neutral-950 shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <FileText className="size-3.5" />
              <span>Terms of Service</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 02: Statutory Legal Body & Sovereign DPDP Clauses (Full Screen 100vh Deep Black Theme) */}
      <section className="relative w-full min-h-screen flex flex-col justify-center py-20 sm:py-28 md:py-32 border-b border-neutral-800 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-10 text-left">
          {/* Legal Document Body */}
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/80 backdrop-blur-md border border-neutral-800 space-y-8 shadow-2xl text-xs sm:text-sm text-slate-300 leading-relaxed">
            
            {activeTab === "privacy" ? (
              <>
                <LegalSection
                  title="1. Scope & Sovereign Data Protection"
                  body="AIVI Intelligence Private Limited ('Company', 'we', 'our') operates Hack My Website in strict alignment with India's Digital Personal Data Protection (DPDP) Act 2023, EU GDPR guidelines, and OWASP cybersecurity standards. All persistent platform metadata and telemetry reside in sovereign cloud datacenters (AWS Mumbai, ap-south-1)."
                />

                <LegalSection
                  title="2. Ephemeral In-Memory Code Analysis Guarantee"
                  body="For GitHub repository scans, our background workers clone the specified repository branch ephemerally into volatile memory solely for static analysis (Semgrep). Absolutely no source code, repository files, or access tokens are permanently written to disk or retained in our databases; all cloned assets are completely purged immediately upon scan completion."
                />

                <LegalSection
                  title="3. Mandatory Domain Authorization & Safe Harbor"
                  body="Hack My Website is designed exclusively to audit domains verified and controlled by the customer. The platform strictly requires DNS TXT or .well-known token ownership verification before initiating any active DAST fuzzing or vulnerability testing."
                />

                <LegalSection
                  title="4. Masking of Sensitive Detected Data"
                  body="Our scanning engine automatically masks and scrubs raw detected secrets, leaked .env values, and production credentials before storing them in database records or rendering them in final report artifacts."
                />

                <LegalSection
                  title="5. Data Retention & Account Deletion"
                  body="Customers retain full ownership of their scan history and reports. Users can request immediate deletion of their account records and scan archives at any time by contacting support@hackmywebsite.io."
                />
              </>
            ) : (
              <>
                <LegalSection
                  title="1. Authorized Use & Target Ownership"
                  body="You may only register and scan web domains that you directly own or are explicitly authorized in writing to test. Scanning external infrastructure without authorization is strictly prohibited and constitutes a material breach of these terms."
                />

                <LegalSection
                  title="2. Non-Destructive Scanning Model"
                  body="Our scanning engines (OWASP ZAP, Nuclei, Semgrep) execute non-destructive, non-DoS vulnerability checks. While the scanner is designed to avoid downtime, customers are advised to run scans during maintenance windows or staging environments for mission-critical systems."
                />

                <LegalSection
                  title="3. Ephemeral GitHub Code Audits"
                  body="When connecting a GitHub repository for SAST and secret scanning, repository contents are processed ephemerally in memory solely for the duration of the scan. No source code files are permanently saved to our persistent storage."
                />

                <LegalSection
                  title="4. Subscription Tiers & Invoicing"
                  body="Subscription plans (Free, Starter, Pro, Agency) are billed monthly. Paid plans can be managed or canceled at any time via the customer workspace portal. Quotas reset automatically at the beginning of each billing cycle."
                />

                <LegalSection
                  title="5. Agency White-Label Distribution"
                  body="Agency tier subscribers may distribute white-labeled PDF reports to third-party clients. The agency subscriber remains responsible for explaining the findings to their clients."
                />

                <LegalSection
                  title="6. Limitation of Liability"
                  body="Hack My Website provides automated security assessments to help identify vulnerabilities before production launch. Automated scanning does not guarantee total absence of security vulnerabilities and should complement standard code review practices."
                />
              </>
            )}

            <div className="pt-6 border-t border-neutral-800 text-neutral-400 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span>Last Audited: August 2026</span>
              <span className="text-emerald-400 font-semibold">AIVI Intelligence Private Limited • CIN: U62099UP2026PTC249169</span>
            </div>

          </div>

        </div>
      </section>

      {/* Global Footer */}
      <HmwKotaFooter onStartScan={() => navigateTo("/workspace")} />
    </div>
  );
};

function LegalSection({ title, body }: { title: string; body: string }) {
  return (
    <div className="space-y-2">
      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">{title}</h2>
      <p className="text-slate-300 leading-relaxed">{body}</p>
    </div>
  );
}

export default LegalPage;
