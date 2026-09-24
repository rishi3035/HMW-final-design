import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

export interface BentoCardProps {
  title?: string;
  titleClassName?: string;
  description?: string;
  icon?: ReactNode;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
  className?: string;
  children?: ReactNode;
  badge?: string;
  headerAction?: ReactNode;
  hideHeader?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function BentoCard({
  title,
  titleClassName,
  description,
  icon,
  colSpan = 1,
  rowSpan = 1,
  className,
  children,
  badge,
  headerAction,
  hideHeader = false,
}: BentoCardProps) {
  const colSpanClasses: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-1 md:col-span-2",
    3: "col-span-1 md:col-span-3",
    4: "col-span-1 md:col-span-2 lg:col-span-4",
  };

  const rowSpanClasses: Record<number, string> = {
    1: "row-span-1",
    2: "row-span-1 md:row-span-2",
  };

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6 transition-all duration-300 hover:border-neutral-700 shadow-xl ring-1 ring-white/5 flex flex-col justify-between",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className
      )}
    >
      {!hideHeader && (title || icon || badge || headerAction) && (
        <div className="relative z-10 w-full mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2.5">
              {icon && (
                <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-emerald-400 group-hover:scale-105 transition-transform">
                  {icon}
                </div>
              )}
              {title && (
                <div>
                  <h3 className={cn("text-sm font-bold text-white tracking-tight leading-snug", titleClassName)}>
                    {title}
                  </h3>
                  {description && (
                    <p className="text-xs text-neutral-400 line-clamp-1 leading-normal">
                      {description}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {badge && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded-md font-semibold">
                  {badge}
                </span>
              )}
              {headerAction}
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

export default BentoCard;
