"use client";

import { motion } from "framer-motion";
import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import confetti from "canvas-confetti";
import { Check, Star as LucideStar } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITY FUNCTIONS ---

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

// --- BASE UI COMPONENTS (BUTTON) ---

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-neutral-700 bg-black text-white hover:bg-neutral-900 hover:border-neutral-500",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

// --- AMBIENT STARFIELD (STATIC / NO CURSOR MOVEMENT) ---

function Star() {
  const [initialPos] = useState({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${1 + Math.random() * 1.5}px`,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 3,
  });

  return (
    <motion.div
      className="absolute bg-emerald-400/40 rounded-full"
      style={{
        top: initialPos.top,
        left: initialPos.left,
        width: initialPos.size,
        height: initialPos.size,
      }}
      initial={{ opacity: 0.1 }}
      animate={{ opacity: [0.1, 0.55, 0.1] }}
      transition={{
        duration: initialPos.duration,
        repeat: Infinity,
        delay: initialPos.delay,
        ease: "easeInOut",
      }}
    />
  );
}

function AmbientStarfield() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {Array.from({ length: 60 }).map((_, i) => (
        <Star key={`star-${i}`} />
      ))}
    </div>
  );
}

// --- PRICING COMPONENT LOGIC ---

// Interfaces
export interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular?: boolean;
  popularBadge?: string;
}

export interface PricingSectionProps {
  plans: PricingPlan[];
  badge?: string;
  title?: string;
  description?: string;
}

// Context for state management
const PricingContext = createContext<{
  isMonthly: boolean;
  setIsMonthly: (value: boolean) => void;
}>({
  isMonthly: true,
  setIsMonthly: () => {},
});

// Main PricingSection Component
export function PricingSection({
  plans,
  badge = "Transparent Subscription Tiers",
  title = "Predictable Pricing for Founders & Agencies",
  description = "Choose a plan to run unblurred scans, get AI remediation prompts, and unlock white-label client security deliverables.",
}: PricingSectionProps) {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <PricingContext.Provider value={{ isMonthly, setIsMonthly }}>
      <div
        className="relative w-full py-20 sm:py-24 bg-black border-t border-neutral-800 overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black border border-neutral-800 text-xs font-mono text-emerald-400">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{badge}</span>
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <PricingToggle />

          {/* 4-Column Responsive Pricing Grid (1 col mobile, 2 col tablet, 4 col desktop) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch text-left">
            {plans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </div>
    </PricingContext.Provider>
  );
}

// Pricing Toggle Component - Pixel-perfect padding and centering
function PricingToggle() {
  const { isMonthly, setIsMonthly } = useContext(PricingContext);
  const confettiRef = useRef<HTMLDivElement>(null);
  const annualBtnRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (monthly: boolean) => {
    if (isMonthly === monthly) return;
    setIsMonthly(monthly);

    if (!monthly && confettiRef.current) {
      const rect = annualBtnRef.current?.getBoundingClientRect();
      if (!rect) return;

      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 70,
        spread: 70,
        origin: { x: originX, y: originY },
        colors: [
          "#10B981",
          "#34D399",
          "#059669",
          "#6EE7B7",
        ],
        ticks: 250,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 26,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div
        ref={confettiRef}
        className="relative inline-flex items-center rounded-full bg-neutral-950 border border-neutral-800 p-1.5 shadow-xl"
      >
        <button
          type="button"
          onClick={() => handleToggle(true)}
          className={cn(
            "relative z-10 rounded-full px-5 sm:px-6 py-2 text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer focus:outline-none",
            isMonthly
              ? "text-neutral-950 font-extrabold"
              : "text-slate-400 hover:text-white"
          )}
        >
          {isMonthly && (
            <motion.div
              layoutId="pricing-pill-active"
              className="absolute inset-0 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/30"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10">Monthly</span>
        </button>

        <button
          ref={annualBtnRef}
          type="button"
          onClick={() => handleToggle(false)}
          className={cn(
            "relative z-10 rounded-full px-5 sm:px-6 py-2 text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer focus:outline-none flex items-center gap-1.5",
            !isMonthly
              ? "text-neutral-950 font-extrabold"
              : "text-slate-400 hover:text-white"
          )}
        >
          {!isMonthly && (
            <motion.div
              layoutId="pricing-pill-active"
              className="absolute inset-0 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/30"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10">Annual</span>
          <span
            className={cn(
              "relative z-10 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors",
              !isMonthly
                ? "bg-neutral-950/20 text-neutral-950 font-extrabold"
                : "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
            )}
          >
            Save 20%
          </span>
        </button>
      </div>
    </div>
  );
}

// Pricing Card Component (Opaque Black, Precise hackmywebsite.io styling)
function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const { isMonthly } = useContext(PricingContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{
        y: plan.isPopular && isDesktop ? -12 : 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      }}
      className={cn(
        "rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative bg-black transition-all duration-200",
        plan.isPopular
          ? "border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20"
          : "border border-neutral-800 hover:border-neutral-700"
      )}
    >
      {/* Featured Badge */}
      {plan.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <div className="bg-emerald-500 text-neutral-950 py-1 px-3.5 rounded-full flex items-center gap-1.5 shadow-lg text-[10.5px] font-black tracking-wide uppercase">
            <LucideStar className="size-3 fill-current" />
            <span>{plan.popularBadge || "Most Practical"}</span>
          </div>
        </div>
      )}

      {/* Plan Header */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">{plan.name}</h3>
          <p className="mt-1 text-xs text-slate-400 min-h-[36px] leading-relaxed">
            {plan.description}
          </p>
        </div>

        {/* Pricing Display with NumberFlow in INR */}
        <div className="py-3 border-y border-neutral-800 flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
            {plan.price === "0" ? (
              "₹0"
            ) : (
              <NumberFlow
                value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
                locales="en-IN"
                format={{
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }}
                className="font-variant-numeric: tabular-nums"
              />
            )}
          </span>
          <span className="text-xs text-slate-400">
            per month
          </span>
        </div>

        {/* Features Checklist */}
        <ul
          role="list"
          aria-label={`${plan.name} plan features`}
          className="space-y-2.5 text-xs text-slate-300"
        >
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check
                className="size-4 text-emerald-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action CTA Button */}
      <div className="pt-6 mt-6 border-t border-neutral-800">
        <a
          href={plan.href}
          className={cn(
            "w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all shadow-md text-center cursor-pointer",
            plan.isPopular
              ? "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99]"
              : "bg-black hover:bg-neutral-900 text-slate-200 border border-neutral-700 hover:border-neutral-500"
          )}
        >
          <span>{plan.buttonText}</span>
        </a>
      </div>
    </motion.div>
  );
}
