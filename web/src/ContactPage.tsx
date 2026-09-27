import React, { useState } from "react";
import {
  ArrowRight,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Building2,
  CheckCircle2,
  Send,
  Zap,
} from "lucide-react";
import { HmwLogo } from "../../design-system/src/HmwLogo";
import { EnterpriseFooter } from "./components/EnterpriseFooter";
import { GlobalNavbar } from "./components/GlobalNavbar";
import { Velaris } from "@/components/ui/velaris";

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState<"agency" | "enterprise" | "support">("agency");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "",
    message: "",
  });

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950 font-sans antialiased relative">
      {/* Background ambient depth glow & cybernetic grid */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(0,0,0,0))]" />
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Enterprise Static Global Navbar */}
      <GlobalNavbar />

      {/* Hero with Velaris Shader */}
      <Velaris
        bg="#000000"
        colors={["#10B981", "#34D399", "#059669", "#022C22"]}
        speed={1.0}
        grain={0.25}
        height="auto"
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 border-b border-neutral-800 overflow-hidden text-center"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-800 text-xs font-mono text-emerald-400">
            <MessageSquare className="size-3.5" />
            <span>Direct Security & Agency Support</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Contact Hack My Website
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Have questions regarding custom scanning quotas, agency white-label reports, or specific framework vulnerability rules? Our engineering team is here to assist.
          </p>
        </div>
      </Velaris>

      <main className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Contact & Inquiry Grid */}
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/80 backdrop-blur-md border border-neutral-800 shadow-2xl text-left">
            <div className="grid gap-10 lg:grid-cols-12 items-start">
              
              {/* Left Column: Information */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                    Enterprise Communication
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    How Can We Help Your Team?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Tell us what you are building, how many domains you need to audit, and whether you require custom white-label reports or CI/CD webhook integrations.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Building2 className="size-4 text-emerald-400" />
                    <span>Corporate Headquarters</span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">
                    <strong className="text-slate-200">AIVI Intelligence Private Limited</strong><br />
                    Security Engineering & Research Labs<br />
                    CIN: U62099UP2026PTC249169<br />
                    support@hackmywebsite.io
                  </p>
                  <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
                    Average response turnaround: &lt; 4 business hours.
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href="mailto:support@hackmywebsite.io?subject=Security%20Inquiry%20-%20Hack%20My%20Website"
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all text-left"
                  >
                    <div className="size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Mail className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        Direct Engineering Email
                      </div>
                      <div className="text-xs text-neutral-400 leading-relaxed">Best for API queries, custom quotas, and billing support.</div>
                      <div className="pt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                        <span>support@hackmywebsite.io</span>
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:support@hackmywebsite.io?subject=Agency%20Retainer%20Inquiry"
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all text-left"
                  >
                    <div className="size-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                      <ShieldCheck className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                        Agency White-Label Retainers
                      </div>
                      <div className="text-xs text-neutral-400 leading-relaxed">Custom white-label PDF branding for dev agencies and studios.</div>
                      <div className="pt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400">
                        <span>Request Agency Rollout</span>
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-5">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="size-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                      <CheckCircle2 className="size-7" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Inquiry Received</h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Hack My Website. Our security engineering team will review your target scope and reply to <strong className="text-emerald-400">{formData.email || "your email"}</strong> within 4 business hours.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({ name: "", email: "", domain: "", message: "" });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-mono font-semibold text-slate-200 hover:text-white transition-colors"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                        Inquiry Scope
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "agency", label: "Agency Retainer" },
                          { id: "enterprise", label: "Enterprise Volume" },
                          { id: "support", label: "Tech Support" },
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setInquiryType(cat.id as any)}
                            className={`py-2 px-2.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                              inquiryType === cat.id
                                ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-sm"
                                : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Sarah Connor"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs font-sans focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs font-sans focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                        Primary Target Website / Domain
                      </label>
                      <input
                        type="text"
                        value={formData.domain}
                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                        placeholder="https://app.yourcompany.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                        Project Details / Inquiry
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Briefly describe your auditing needs, target frameworks, or agency volume requirements..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs font-sans focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] cursor-pointer"
                      >
                        <Send className="size-3.5" />
                        <span>Submit Security Inquiry</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      <EnterpriseFooter />
    </div>
  );
};

export default ContactPage;
