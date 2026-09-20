import React from "react";

export interface HmwLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showSubtitle?: boolean;
  variant?: "dark" | "light";
}

export const HmwLogoIcon: React.FC<{ className?: string; size?: number | string }> = ({
  className = "h-8 w-8",
  size
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* Left Vertical Pillar */}
      <path
        d="M14 14 H36 V42 L30 46 V58 L36 62 V86 H14 V14 Z"
        fill="currentColor"
      />
      {/* Right Vertical Pillar */}
      <path
        d="M64 14 H86 V86 H64 V58 L70 54 V42 L64 38 V14 Z"
        fill="currentColor"
      />
      {/* Middle Diagonal Emerald Slash */}
      <polygon
        points="30,62 30,46 70,22 70,38"
        fill="#10B981"
      />
    </svg>
  );
};

export const HmwLogo: React.FC<HmwLogoProps> = ({
  className = "",
  size = "md",
  showText = true,
  showSubtitle = false,
  variant = "dark"
}) => {
  const isDark = variant === "dark";
  const pillarColor = isDark ? "text-white" : "text-neutral-900";

  const sizeMap = {
    sm: { icon: "h-6 w-6", title: "text-xs", sub: "text-[8px]" },
    md: { icon: "h-7 w-7", title: "text-sm", sub: "text-[9px]" },
    lg: { icon: "h-9 w-9", title: "text-lg", sub: "text-[10px]" },
    xl: { icon: "h-12 w-12", title: "text-2xl", sub: "text-xs" }
  };

  const { icon, title, sub } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className={`${pillarColor} shrink-0 drop-shadow-[0_2px_10px_rgba(16,185,129,0.3)]`}>
        <HmwLogoIcon className={icon} />
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-none">
          <div className={`font-black tracking-tight font-sans ${title} flex items-center gap-1.5`}>
            <span className={isDark ? "text-white" : "text-neutral-900"}>HACK MY</span>
            <span className="text-[#10B981]">WEBSITE</span>
          </div>
          {showSubtitle && (
            <span className={`font-mono uppercase tracking-widest text-slate-400 mt-1 font-semibold ${sub}`}>
              AUTOMATED WEB SECURITY &amp; AI REMEDIATION PLATFORM
            </span>
          )}
        </div>
      )}
    </div>
  );
};
