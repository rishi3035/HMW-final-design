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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useMediaQuery(query: string) {
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
}

export interface PricingSectionProps {
  plans: PricingPlan[];
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
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that's right for you. All plans include our core features and support.",
}: PricingSectionProps) {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <PricingContext.Provider value={{ isMonthly, setIsMonthly }}>
      <div
        id="pricing"
        aria-label="Transparent Pricing Plans"
        className="relative w-full h-screen min-h-[100vh] lg:h-screen lg:max-h-screen flex flex-col justify-between bg-black py-4 sm:py-6 lg:py-6 border-t border-neutral-800 overflow-hidden"
      >
        <AmbientStarfield />
        <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col justify-between h-full w-full max-w-6xl">
          <div className="max-w-3xl mx-auto text-center space-y-1 sm:space-y-1.5 mb-2 sm:mb-3 shrink-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              {description}
            </p>
          </div>
          <div className="mb-2 sm:mb-3 shrink-0">
            <PricingToggle />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 items-stretch gap-4 lg:gap-6 flex-1 my-auto min-h-0">
            {plans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </div>
    </PricingContext.Provider>
  );
}

// Pricing Toggle Component
function PricingToggle() {
  const { isMonthly, setIsMonthly } = useContext(PricingContext);
  const confettiRef = useRef<HTMLDivElement>(null);
  const monthlyBtnRef = useRef<HTMLButtonElement>(null);
  const annualBtnRef = useRef<HTMLButtonElement>(null);

  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    const btnRef = isMonthly ? monthlyBtnRef : annualBtnRef;
    if (btnRef.current) {
      setPillStyle({
        width: btnRef.current.offsetWidth,
        transform: `translateX(${btnRef.current.offsetLeft}px)`,
      });
    }
  }, [isMonthly]);

  const handleToggle = (monthly: boolean) => {
    if (isMonthly === monthly) return;
    setIsMonthly(monthly);

    if (!monthly && confettiRef.current) {
      const rect = annualBtnRef.current?.getBoundingClientRect();
      if (!rect) return;

      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { x: originX, y: originY },
        colors: [
          "#10B981",
          "#06B6D4",
          "#34D399",
          "#3B82F6",
        ],
        ticks: 300,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div ref={confettiRef} className="relative flex w-fit items-center rounded-full bg-black border border-neutral-800 p-1">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-primary p-1"
          style={pillStyle}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
        <button
          ref={monthlyBtnRef}
          onClick={() => handleToggle(true)}
          className={cn(
            "relative z-10 rounded-full px-3.5 sm:px-5 py-1.5 text-xs sm:text-sm font-medium transition-colors",
            isMonthly
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Monthly
        </button>
        <button
          ref={annualBtnRef}
          onClick={() => handleToggle(false)}
          className={cn(
            "relative z-10 rounded-full px-3.5 sm:px-5 py-1.5 text-xs sm:text-sm font-medium transition-colors",
            !isMonthly
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Annual
          <span
            className={cn(
              "hidden sm:inline",
              !isMonthly ? "text-primary-foreground/80" : "",
            )}
          >
            {" "}
            (Save 20%)
          </span>
        </button>
      </div>
    </div>
  );
}

// Pricing Card Component
function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const { isMonthly } = useContext(PricingContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.12,
      }}
      className={cn(
        "rounded-2xl p-4 sm:p-5 flex flex-col justify-between relative bg-black backdrop-blur-sm h-full",
        plan.isPopular
          ? "border-2 border-primary shadow-xl shadow-emerald-500/15"
          : "border border-neutral-800 hover:border-neutral-700",
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-primary py-1 px-3 rounded-full flex items-center gap-1 shadow-md">
            <LucideStar className="text-primary-foreground h-3.5 w-3.5 fill-current" />
            <span className="text-primary-foreground text-xs font-semibold">
              Most Popular
            </span>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col text-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground">{plan.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
            {plan.description}
          </p>
          <div className="mt-3 flex items-baseline justify-center gap-x-1">
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              <NumberFlow
                value={
                  isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                }
                format={{
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                }}
                className="font-variant-numeric: tabular-nums"
              />
            </span>
            <span className="text-xs font-semibold tracking-wide text-muted-foreground">
              / {plan.period}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {isMonthly ? "Billed Monthly" : "Billed Annually"}
          </p>
        </div>

        <ul
          role="list"
          className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs leading-snug text-left text-muted-foreground py-1"
        >
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-x-2">
              <Check
                className="h-3.5 w-3.5 flex-none text-primary"
                aria-hidden="true"
              />
              <span className="truncate">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-3 sm:mt-4 pt-1 shrink-0">
          <a
            href={plan.href}
            className={cn(
              buttonVariants({
                variant: plan.isPopular ? "default" : "outline",
                size: "default",
              }),
              "w-full cursor-pointer h-9 text-xs sm:text-sm font-semibold rounded-xl",
            )}
          >
            {plan.buttonText}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export { Button, buttonVariants };
