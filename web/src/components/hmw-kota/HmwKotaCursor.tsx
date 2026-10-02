import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const HmwKotaCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only run on non-touch screens
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest("[data-cursor-text]");
      if (cursorAttr) {
        setCursorText(cursorAttr.getAttribute("data-cursor-text"));
      } else {
        setCursorText(null);
      }

      const isInteractive = target.closest("a, button, [data-cursor='pointer'], input, [role='button']");
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] top-0 left-0 hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {cursorText ? (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="px-3.5 py-1.5 rounded-full bg-black/90 text-white text-[11px] tracking-wider font-semibold shadow-2xl flex items-center gap-2 border border-emerald-500/40 backdrop-blur-md whitespace-nowrap"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-bold">{cursorText}</span>
        </motion.div>
      ) : (
        <motion.div
          animate={{
            width: isHovered ? 44 : 12,
            height: isHovered ? 44 : 12,
            backgroundColor: isHovered ? "rgba(85, 127, 27, 0.20)" : "#557F1B",
            border: isHovered ? "1.5px solid rgba(85, 127, 27, 0.85)" : "none",
          }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          className="rounded-full backdrop-blur-[2px]"
        />
      )}
    </motion.div>
  );
};
