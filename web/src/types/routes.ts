/**
 * ============================================================================
 * HACK MY WEBSITE (HMW) — APPLICATION ROUTE & NAVIGATION ARCHITECTURE
 * ============================================================================
 * Type-safe route definitions, navigational contracts, and sitemap topology.
 */

export const APP_ROUTES = {
  HOME: "/",
  HOW_IT_WORKS: "/how-it-works",
  METHODOLOGY: "/methodology",
  SAMPLE_REPORT: "/sample-report",
  CONTACT: "/contact",
  PRICING: "/#pricing",
  ARCHITECTURE: "/#architecture",
  COMPARISON: "/#comparison",
  WORKSPACE: "/workspace",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  SIGNUP: "/signup",
  TERMS: "/terms",
  PRIVACY: "/privacy-policy",
  KOTA: "/kota",
} as const;

export type AppRoute = typeof APP_ROUTES[keyof typeof APP_ROUTES];

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
  readonly isRoute?: boolean;
  readonly badge?: string;
}

export const MAIN_NAV_ITEMS: readonly NavigationItem[] = [
  { label: "How It Works", href: APP_ROUTES.HOW_IT_WORKS, isRoute: true },
  { label: "Architecture", href: APP_ROUTES.ARCHITECTURE },
  { label: "Comparison", href: APP_ROUTES.COMPARISON },
  { label: "Methodology", href: APP_ROUTES.METHODOLOGY, isRoute: true },
  { label: "Sample Report", href: APP_ROUTES.SAMPLE_REPORT, isRoute: true },
  { label: "Pricing", href: APP_ROUTES.PRICING },
  { label: "Contact", href: APP_ROUTES.CONTACT, isRoute: true },
] as const;
