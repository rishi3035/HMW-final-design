import React from "react";

interface GreenAuraBackgroundProps {
  opacity?: number;
  className?: string;
}

export const GreenAuraBackground: React.FC<GreenAuraBackgroundProps> = ({
  opacity = 100,
  className = "",
}) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden z-0 ${className}`}>
      <div className="absolute inset-0 bg-black" />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/green-aura-bg.png')`,
          opacity: opacity / 100,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
    </div>
  );
};

export default GreenAuraBackground;
