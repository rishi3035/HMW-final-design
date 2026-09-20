import React from "react";
import { LiquidButton, MetalButton } from "@/components/ui/liquid-glass-button";

export default function DemoOne() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8 bg-[#06080F]">
      <LiquidButton className="text-emerald-400 px-6 py-2.5">
        Liquid Glass Button
      </LiquidButton>
      <MetalButton variant="success">
        Metal Security CTA
      </MetalButton>
    </div>
  );
}
