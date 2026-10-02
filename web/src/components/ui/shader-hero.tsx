"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MeshGradient } from "@paper-design/shaders-react";
import { ArrowRight, Sparkles } from "lucide-react";

const letterAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerAnimation = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

export interface ShaderHeroProps {
  title?: string;
  badgeText?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  children?: React.ReactNode;
}

export const Component: React.FC<ShaderHeroProps> = ({
  title = "Detect Security Risk Before It Reaches Production.",
  badgeText = "Continuous DevSecOps Platform",
  description = "Continuous application security engineered for enterprise platforms, development agencies, SaaS companies, and mission-critical web applications.",
  ctaText = "Start Free Security Scan",
  onCtaClick,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden w-full"
    >
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.004" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.25" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  
  0 1 0 0 0
  0 0 1 0 0
  0 0 0 0.9 0"
              result="tint"
            />
          </filter>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#000000", "#121c07", "#334615", "#5f7f29", "#789c36", "#9bc44d"]}
        speed={0.25}
        backgroundColor="#000000"
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-40"
        colors={["#000000", "#789c36", "#5f7f29", "#121c07"]}
        speed={0.15}
        wireframe={true as any}
        backgroundColor="transparent"
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4">
        {badgeText && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium flex items-center gap-2 backdrop-blur-lg border border-emerald-500/30"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            {badgeText}
          </motion.div>
        )}

        <motion.h1
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg flex flex-wrap justify-center"
        >
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterAnimation}
              className={char === " " ? "w-2" : ""}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300"
          >
            {description}
          </motion.p>
        )}

        {children}

        {ctaText && !children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-10 flex gap-4"
          >
            <Button
              size="lg"
              onClick={onCtaClick}
              className="rounded-2xl px-6 py-6 text-lg bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
            >
              {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const ShaderHero = Component;
export default Component;
