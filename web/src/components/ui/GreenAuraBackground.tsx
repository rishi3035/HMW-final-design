import React from "react";

interface GreenAuraBackgroundProps {
  opacity?: number;
  className?: string;
}

/**
 * Clean Sovereign Background matching the smooth landing page design system.
 * Replaced raster PNG background with deep black canvas and subtle ambient radial illumination.
 */
export const GreenAuraBackground: React.FC<GreenAuraBackgroundProps> = ({
  opacity = 100,
  className = "",
}) => {
  const scaledOpacity = (opacity / 100) * 0.7;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden z-0 ${className}`}>
      {/* Deep Obsidian Black Base */}
      <div className="absolute inset-0 bg-[#07090E]" />

      {/* Smooth Ambient Emerald Radial Glows (Inspired by Landing Page Architecture) */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none transition-opacity duration-700"
        style={{ opacity: scaledOpacity }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"
        style={{ opacity: scaledOpacity }}
      />

      {/* Subtle Hairline Grid Pattern with Smooth Radial Vignette */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_60%,transparent_100%)] pointer-events-none"
      />

      {/* Gradient Vignette to blend seamlessly with adjacent sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
    </div>
  );
};

export default GreenAuraBackground;
