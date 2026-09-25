import React, { useState, useEffect } from "react";
import {
  IconRadar,
  IconFlame,
  IconFileCode,
  IconWorld,
  IconSparkles,
  IconKey,
  IconShieldCheck,
  IconArrowLeft,
  IconArrowRight,
  IconBrandGoogle,
  IconBrandGithub,
  IconCheck,
  IconEye,
  IconEyeOff,
  IconAlertCircle,
  IconLock,
  IconMail,
  IconUser,
} from "@tabler/icons-react";
import { HmwLogo } from "../../design-system/src/HmwLogo";

interface OrbitItem {
  name: string;
  badge: string;
  icon: React.ReactNode;
  ring: "inner" | "middle" | "outer";
  angle: number;
  color: string;
}

const orbitItems: OrbitItem[] = [
  {
    name: "OWASP ZAP",
    badge: "DAST",
    icon: <IconRadar className="w-4 h-4" />,
    ring: "outer",
    angle: 0,
    color: "text-emerald-400 border-emerald-500/40 bg-emerald-950/80",
  },
  {
    name: "Nuclei CVEs",
    badge: "200+ CVEs",
    icon: <IconFlame className="w-4 h-4" />,
    ring: "outer",
    angle: 120,
    color: "text-amber-400 border-amber-500/40 bg-amber-950/80",
  },
  {
    name: "Semgrep SAST",
    badge: "Secrets",
    icon: <IconFileCode className="w-4 h-4" />,
    ring: "outer",
    angle: 240,
    color: "text-orange-400 border-orange-500/40 bg-orange-950/80",
  },
  {
    name: "DNS Gate",
    badge: "Safe Harbor",
    icon: <IconWorld className="w-4 h-4" />,
    ring: "middle",
    angle: 45,
    color: "text-emerald-400 border-emerald-500/40 bg-slate-900/90",
  },
  {
    name: "AI Fix Prompts",
    badge: "Claude/Cursor",
    icon: <IconSparkles className="w-4 h-4" />,
    ring: "middle",
    angle: 165,
    color: "text-amber-400 border-amber-500/40 bg-slate-900/90",
  },
  {
    name: "Secrets Mask",
    badge: "Scrubbed",
    icon: <IconKey className="w-4 h-4" />,
    ring: "middle",
    angle: 285,
    color: "text-orange-400 border-orange-500/40 bg-slate-900/90",
  },
];

const slides = [
  {
    title: "Multi-Engine DAST & CVE Audits",
    subtitle:
      "Run 200+ vulnerability checks across OWASP ZAP, Nuclei, and Semgrep in under 8 minutes without downtime.",
    tag: "Runtime Security",
  },
  {
    title: "Ephemeral GitHub Code & Secret Scans",
    subtitle:
      "Detect leaked Stripe, AWS, and database credentials in source maps and repositories with zero persistent code storage.",
    tag: "Zero-Storage Guarantee",
  },
  {
    title: "AI Launch Score & 1-Click Fix Prompts",
    subtitle:
      "Translate technical findings into an objective 0–100 score and copy-paste ready Cursor/Claude code patches.",
    tag: "Instant Remediation",
  },
];

interface AuthPageProps {
  initialMode?: "login" | "signup";
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = "login" }) => {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleModeSwitch = (login: boolean) => {
    setIsLogin(login);
    setError(null);
    setNotice(null);
    const newPath = login ? "/login" : "/signup";
    window.history.replaceState(null, "", newPath);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setIsLoading(true);

    if (!email) {
      setError("Please provide a valid corporate email address.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("hmw_user_email", email);
        if (name) window.sessionStorage.setItem("hmw_user_name", name);
      }
      navigateTo("/workspace");
    }, 700);
  };

  const handleDemoSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("hmw_user_email", "rishi@aiviintelligence.com");
        window.sessionStorage.setItem("hmw_user_name", "Rishikesh Raj");
      }
      navigateTo("/workspace");
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-[#030712] text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950 font-sans flex flex-col lg:flex-row antialiased overflow-x-hidden">
      {/* ========================================================================= */}
      {/* LEFT COLUMN: ANIMATED SECURITY ORBIT & CAPABILITY SHOWCASE (DESKTOP)     */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-gradient-to-br from-[#0B0F19]/90 via-[#070A10]/80 to-[#04060A]/95 backdrop-blur-xl border-r border-slate-800/80 overflow-hidden">
        {/* Subtle Cyber Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 size-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 size-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/");
            }}
            className="inline-flex items-center gap-3 group"
          >
            <HmwLogo size="sm" showText={true} />
          </a>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/70 text-[11px] font-mono text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Engines Active • v2.4</span>
          </div>
        </div>

        {/* Centerpiece: Animated Security Orbit System */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center py-6">
          <div className="relative size-80 sm:size-96 flex items-center justify-center">
            {/* Outer Orbit Track */}
            <div className="absolute size-72 sm:size-84 rounded-full border border-dashed border-slate-700/60 animate-[spin_60s_linear_infinite]" />

            {/* Middle Orbit Track */}
            <div className="absolute size-52 sm:size-60 rounded-full border border-slate-800 animate-[spin_40s_linear_infinite_reverse]" />

            {/* Inner Ripple Rings */}
            <div className="absolute size-36 rounded-full border border-emerald-500/20 animate-ping opacity-30" />
            <div className="absolute size-28 rounded-full border border-emerald-500/40 bg-emerald-500/5 shadow-2xl shadow-emerald-500/20" />

            {/* Orbit Center Hub: Hack My Website Core */}
            <div className="relative z-20 size-20 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-emerald-500 flex flex-col items-center justify-center text-center p-2 shadow-2xl shadow-emerald-500/30">
              <IconShieldCheck className="size-8 text-emerald-400" />
              <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider mt-0.5">
                HMW Core
              </span>
            </div>

            {/* Orbiting Satellite Nodes (Outer Ring) */}
            <div className="absolute inset-0 animate-[spin_50s_linear_infinite]">
              {orbitItems
                .filter((i) => i.ring === "outer")
                .map((item) => (
                  <div
                    key={item.name}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotate(${item.angle}deg) translate(145px) rotate(-${item.angle}deg)`,
                    }}
                  >
                    <div
                      className={`p-2 rounded-xl border flex items-center gap-1.5 backdrop-blur-md shadow-xl ${item.color}`}
                    >
                      {item.icon}
                      <span className="text-[10px] font-mono font-bold text-white whitespace-nowrap">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Orbiting Satellite Nodes (Middle Ring - Reverse) */}
            <div className="absolute inset-0 animate-[spin_35s_linear_infinite_reverse]">
              {orbitItems
                .filter((i) => i.ring === "middle")
                .map((item) => (
                  <div
                    key={item.name}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotate(${item.angle}deg) translate(100px) rotate(-${item.angle}deg)`,
                    }}
                  >
                    <div
                      className={`p-1.5 rounded-lg border flex items-center gap-1 backdrop-blur-md shadow-lg ${item.color}`}
                    >
                      {item.icon}
                      <span className="text-[9px] font-mono font-bold text-slate-200 whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Dynamic Feature Carousel Below Orbit */}
          <div className="w-full max-w-md mt-6 text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-emerald-400">
              <IconSparkles className="size-3" />
              <span>{slides[activeSlide].tag}</span>
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight min-h-[28px] transition-all">
              {slides[activeSlide].title}
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed min-h-[40px] transition-all">
              {slides[activeSlide].subtitle}
            </p>

            {/* Carousel Navigation Dots */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeSlide === idx
                      ? "w-6 bg-emerald-400"
                      : "w-1.5 bg-slate-700 hover:bg-slate-600"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Left Bottom Metrics Bar */}
        <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <IconCheck className="size-4 text-emerald-400" />
            <span>200+ Automated Security Checks</span>
          </div>
          <div className="flex items-center gap-2">
            <IconCheck className="size-4 text-emerald-400" />
            <span>Non-Destructive Safe Harbor</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: MODERN AUTH FORM & TABS                                     */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative z-10">
        {/* Top Back Link & Mobile Logo */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto mb-8">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/");
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <IconArrowLeft className="size-4" />
            <span>Back to Home</span>
          </a>

          <div className="lg:hidden">
            <HmwLogo size="sm" showText={false} />
          </div>
        </div>

        {/* Center Auth Card */}
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* Header & Tabs */}
          <div className="space-y-4 text-left">
            {/* Pill Tab Switcher */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleModeSwitch(true)}
                className={`py-2.5 rounded-xl transition-all cursor-pointer ${
                  isLogin
                    ? "bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch(false)}
                className={`py-2.5 rounded-xl transition-all cursor-pointer ${
                  !isLogin
                    ? "bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isLogin ? "Welcome Back to Workspace" : "Start Your Free Security Audit"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {isLogin
                  ? "Access your registered domains, active vulnerability scans, and client PDF reports."
                  : "Scan your website before launch. 1 free domain audit included every month."}
              </p>
            </div>
          </div>

          {/* Social Auth Providers */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDemoSignIn}
              disabled={isLoading}
              className="h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-200 font-semibold text-xs border border-slate-800 transition-all hover:border-slate-700 shadow-sm cursor-pointer disabled:opacity-60"
            >
              <IconBrandGoogle className="w-4 h-4 text-white" />
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleDemoSignIn}
              disabled={isLoading}
              className="h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-200 font-semibold text-xs border border-slate-800 transition-all hover:border-slate-700 shadow-sm cursor-pointer disabled:opacity-60"
            >
              <IconBrandGithub className="w-4 h-4 text-white" />
              <span>GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800/80 w-full" />
            <span className="bg-[#030712] px-3 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              Or with work email
            </span>
            <div className="border-t border-slate-800/80 w-full" />
          </div>

          {/* Error & Notice Banners */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300 font-mono">
              <IconAlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {notice && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300 font-mono">
              <IconCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{notice}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 text-left">
                  Full Name / Organization
                </label>
                <div className="relative">
                  <IconUser className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Rishikesh Raj"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all font-sans"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 text-left">
                Work Email Address
              </label>
              <div className="relative">
                <IconMail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="founder@your-startup.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono font-medium text-slate-300">
                  Password
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() =>
                      setNotice(
                        "Password reset instructions have been dispatched to your email address."
                      )
                    }
                    className="text-[11px] font-mono text-emerald-400 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <IconLock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? (
                    <IconEyeOff className="w-4 h-4" />
                  ) : (
                    <IconEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <div className="size-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? "Sign In to Workspace" : "Create Security Account"}</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Bypass */}
          <div className="pt-4 border-t border-slate-800/80 text-center space-y-2">
            <button
              type="button"
              onClick={handleDemoSignIn}
              className="text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 font-mono cursor-pointer"
            >
              <IconKey className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fast Demo Bypass: Enter as Agency Admin</span>
            </button>
            <p className="text-[11px] text-slate-500">
              Sovereign cloud infrastructure hosted in Mumbai, India (DPDP Act 2023 compliant).
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="w-full max-w-md mx-auto pt-6 text-center text-[11px] text-slate-500">
          <span>By signing in, you agree to our </span>
          <a
            href="/terms"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/terms");
            }}
            className="text-slate-400 hover:text-white underline cursor-pointer"
          >
            Terms of Service
          </a>
          <span> and </span>
          <a
            href="/privacy-policy"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/privacy-policy");
            }}
            className="text-slate-400 hover:text-white underline cursor-pointer"
          >
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
};
