import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconShieldLock,
  IconArrowRight,
  IconX,
  IconCheck,
  IconKey,
} from "@tabler/icons-react";
import { HmwLogo } from "../../../design-system/src/HmwLogo";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
  initialDomain?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialDomain = "app.your-startup.com",
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      setTimeout(() => {
        onSuccess(email);
      }, 700);
    }, 800);
  };

  const handleQuickDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess("rishi3035singh@gmail.com");
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl ring-1 ring-white/10 text-white z-10"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              <IconX className="w-4 h-4" />
            </button>

            {/* Logo & Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="mb-3">
                <HmwLogo size="sm" showText={true} />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white mt-1">
                Enter Security Workspace
              </h2>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                Authenticate to run real-time DAST, CVE audits, and auto-generate patches for{" "}
                <span className="font-mono text-emerald-400 font-medium">
                  {initialDomain.replace(/^https?:\/\//, "")}
                </span>
              </p>
            </div>

            {/* 1-Click Fast Auth Providers */}
            <div className="space-y-2.5 mb-5">
              <button
                type="button"
                onClick={handleQuickDemo}
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-xs font-semibold text-white flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer group"
              >
                <IconBrandGithub className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Continue with GitHub</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-1.5 py-0.5 rounded ml-auto">
                  Instant
                </span>
              </button>

              <button
                type="button"
                onClick={handleQuickDemo}
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-xs font-semibold text-white flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer group"
              >
                <IconBrandGoogle className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-5">
              <div className="border-t border-neutral-800/80 w-full" />
              <span className="bg-neutral-950 px-3 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                Or with work email
              </span>
              <div className="border-t border-neutral-800/80 w-full" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 mb-1.5 text-left">
                  Corporate Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="founder@your-startup.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                ) : isSent ? (
                  <>
                    <IconCheck className="w-4 h-4" />
                    <span>Workspace Authenticated</span>
                  </>
                ) : (
                  <>
                    <span>Enter Workspace Console</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Access Bypass */}
            <div className="mt-5 pt-4 border-t border-neutral-800/70 text-center">
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-[11px] text-neutral-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 font-mono cursor-pointer"
              >
                <IconKey className="w-3.5 h-3.5 text-emerald-400" />
                <span>Demo Bypass: Enter as Rishi (Agency Admin)</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
