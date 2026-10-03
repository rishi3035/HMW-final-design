/**
 * ============================================================================
 * HACK MY WEBSITE (HMW) — ENTERPRISE BRAND DESIGN TOKENS
 * ============================================================================
 * Single Source of Truth (SSOT) for application color systems, telemetry
 * palette, typography scales, elevation shadows, and component contracts.
 * 
 * Strict architectural adherence to WCAG AAA contrast and high-density telemetry.
 */

export const HMW_BRAND_TOKENS = {
  /** Core brand color matrix */
  colors: {
    /** Primary Action Green — Certified #1A220F */
    primary: "#1A220F",
    /** Interactive Hover Green */
    primaryHover: "#253317",
    /** Deep Accent Shade */
    primaryDeep: "#151C0C",
    /** Ambient Glow RGBA */
    primaryGlow: "rgba(26, 34, 15, 0.45)",
    primaryGlowSubtle: "rgba(26, 34, 15, 0.20)",

    /** Canvas & Background Layers */
    canvasDark: "#000000",
    canvasSurface: "#0B0F19",
    canvasElevated: "#121826",

    /** Contrast Typography */
    textPure: "#FFFFFF",
    textMuted: "#A3A3A3",
    textSubtle: "#737373",

    /** Border Matrices */
    borderSubtle: "rgba(255, 255, 255, 0.10)",
    borderMedium: "rgba(255, 255, 255, 0.15)",
    borderActive: "rgba(26, 34, 15, 0.60)",
  },

  /** Elevation, Glows, and Depth Matrices */
  shadows: {
    buttonPrimary: "0 8px 28px rgba(26, 34, 15, 0.35)",
    buttonPrimaryHover: "0 10px 35px rgba(26, 34, 15, 0.50)",
    navbarPill: "0 4px 22px rgba(26, 34, 15, 0.40)",
    navbarPillHover: "0 6px 28px rgba(26, 34, 15, 0.55)",
    cardAmbient: "0 20px 50px rgba(0, 0, 0, 0.60), 0 0 30px rgba(26, 34, 15, 0.15)",
  },

  /** Standard Transitions & Motion Curves */
  transitions: {
    default: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    spring: {
      type: "spring",
      stiffness: 380,
      damping: 30,
    },
  },
} as const;

export type HmwBrandTokens = typeof HMW_BRAND_TOKENS;
export default HMW_BRAND_TOKENS;
