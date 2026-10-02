/**
 * KOTA Studio Design System Tokens
 * Extracted directly from https://madebykota.com/
 */

export const kotaTokens = {
  colors: {
    // Base surfaces
    porcelain: "#EFEFEF", // --token-1e7e0639-1d40-4329-b18e-fa8b9d677820
    obsidian: "#000000",  // --token-108c6f59-1499-42b0-b48f-163362335342
    studioDark: "#0A0A0A",
    pureWhite: "#FFFFFF", // --token-141149f5-f5ff-460a-8da8-3e30ed915293

    // Brand accents
    electricBlue: "#042DB4", // --token-f574245c-16d0-471d-8f94-d3795c30a7c3
    electricBlueTint: "#042DB433",
    cyanAccent: "#2081AA",   // --token-d52e9694-6cf7-429a-97a2-dae93ed11156
    emeraldStatus: "#789C36",

    // Translucency & hairlines
    borderLight: "rgba(0, 0, 0, 0.08)",
    borderDark: "rgba(255, 255, 255, 0.12)",
    glassSurfaceLight: "rgba(255, 255, 255, 0.65)",
    glassSurfaceDark: "rgba(0, 0, 0, 0.65)",
    textMuted: "#656565",
  },
  typography: {
    fontDisplay: '"TWK Lausanne", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontBody: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontMono: '"SF Mono", "Fira Code", monospace',
  },
  radii: {
    pill: "9999px",
    badge: "12px",
    cardSm: "24px",
    cardMd: "32px",
    cardLg: "40px", // Signature Kota 40px rounded corners
  },
  springs: {
    snappy: { type: "spring", stiffness: 400, damping: 30 },
    smooth: { type: "spring", stiffness: 200, damping: 24, mass: 0.8 },
    fluid: { type: "spring", stiffness: 120, damping: 18, mass: 1 },
    bouncy: { type: "spring", stiffness: 500, damping: 20 },
  },
};
