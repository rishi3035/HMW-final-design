"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState, useEffect } from "react";

export interface NavDropdownItem {
  name: string;
  desc?: string;
  icon?: string | React.ReactNode;
  link: string;
}

export interface NavItemConfig {
  name: string;
  link?: string;
  dropdown?: NavDropdownItem[];
}

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: NavItemConfig[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

import { HmwLogo } from "../../../../design-system/src/HmwLogo";

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);
  const [footerReached, setFooterReached] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        // If top of footer is near or entering top half of screen
        if (rect.top <= 120) {
          setFooterReached(true);
        } else {
          setFooterReached(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 60) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      animate={{
        y: footerReached ? -100 : 0,
        opacity: footerReached ? 0 : 1,
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={cn("fixed inset-x-0 top-3 z-50 w-full px-4 flex justify-center pointer-events-none", className)}
    >
      <div className="w-full flex justify-center pointer-events-auto">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible },
              )
            : child,
        )}
      </div>
    </motion.div>
  );
};

const NavbarContext = React.createContext<{ visible: boolean }>({ visible: false });

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <NavbarContext.Provider value={{ visible: Boolean(visible) }}>
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(20px)" : "blur(14px)",
          boxShadow: visible
            ? "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
            : "0 10px 30px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.08)",
          width: visible ? "72%" : "100%",
          maxWidth: visible ? "890px" : "1240px",
          paddingTop: visible ? "7px" : "10px",
          paddingBottom: visible ? "7px" : "10px",
          paddingLeft: visible ? "14px" : "24px",
          paddingRight: visible ? "14px" : "24px",
          y: visible ? 6 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 30,
        }}
        className={cn(
          "relative z-[60] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-black/80 border border-neutral-800/80 lg:flex transition-colors",
          visible && "bg-black/95 border-neutral-700/80 shadow-2xl",
          className,
        )}
      >
        {children}
      </motion.div>
    </NavbarContext.Provider>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (idx: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovered(idx);
    if (items[idx]?.dropdown) {
      setActiveDropdown(idx);
    } else {
      setActiveDropdown(null);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHovered(null);
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-1 text-xs font-semibold text-slate-300 lg:flex relative",
        className,
      )}
    >
      {items.map((item, idx) => {
        const hasDropdown = Boolean(item.dropdown && item.dropdown.length > 0);
        const isCurrentActive = activeDropdown === idx;

        return (
          <div
            key={`nav-item-${idx}`}
            className="relative"
            onMouseEnter={() => handleMouseEnter(idx)}
          >
            {hasDropdown ? (
              <button
                type="button"
                className={cn(
                  "relative flex items-center gap-1 px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white transition-all cursor-pointer",
                  isCurrentActive && "text-white"
                )}
              >
                {hovered === idx && (
                  <motion.div
                    layoutId="hovered-pill"
                    className="absolute inset-0 h-full w-full rounded-full bg-emerald-500/15 border border-emerald-500/30 -z-10"
                  />
                )}
                <span className="relative z-20 font-medium">{item.name}</span>
                <IconChevronDown
                  className={cn(
                    "size-3 text-slate-400 transition-transform duration-200",
                    isCurrentActive && "rotate-180 text-emerald-400"
                  )}
                />
              </button>
            ) : (
              <a
                onClick={onItemClick}
                className="relative flex items-center gap-1 px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white transition-all font-medium"
                href={item.link || "#"}
              >
                {hovered === idx && (
                  <motion.div
                    layoutId="hovered-pill"
                    className="absolute inset-0 h-full w-full rounded-full bg-emerald-500/15 border border-emerald-500/30 -z-10"
                  />
                )}
                <span className="relative z-20">{item.name}</span>
              </a>
            )}

            {/* Dropdown Panel */}
            <AnimatePresence>
              {hasDropdown && isCurrentActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 w-72 sm:w-80"
                >
                  <div className="rounded-2xl bg-black border border-neutral-800 p-3 shadow-2xl backdrop-blur-2xl space-y-1">
                    <div className="px-2 py-1 text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider border-b border-neutral-800 mb-1 flex items-center justify-between">
                      <span>{item.name} Capabilities</span>
                      <span className="text-[9px] text-slate-500">v2.5</span>
                    </div>
                    {item.dropdown?.map((sub, sIdx) => (
                      <a
                        key={`sub-${sIdx}`}
                        href={sub.link}
                        onClick={onItemClick}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all group text-left"
                      >
                        <span className="text-sm shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          {sub.icon || "•"}
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors">
                            {sub.name}
                          </div>
                          {sub.desc && (
                            <div className="text-[11px] text-slate-400 line-clamp-1 leading-snug mt-0.5">
                              {sub.desc}
                            </div>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(8px)",
        boxShadow: visible
          ? "0 0 24px rgba(0, 0, 0, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 16px 68px rgba(0, 0, 0, 0.5)"
          : "none",
        width: visible ? "95%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "16px" : "2rem",
        y: visible ? 8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-4 py-2 lg:hidden",
        visible && "bg-black/95 border border-neutral-800",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-black border border-neutral-800 p-6 shadow-2xl backdrop-blur-xl text-slate-200 max-h-[80vh] overflow-y-auto",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-white cursor-pointer size-6" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white cursor-pointer size-6" onClick={onClick} />
  );
};

export const NavbarLogo = ({
  visible: propVisible,
  href = "/",
  onClick,
}: {
  visible?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  const context = React.useContext(NavbarContext);
  const isScrolled = propVisible ?? context.visible;

  return (
    <a
      href={href}
      onClick={onClick}
      className="relative z-20 flex items-center gap-2 px-1 text-sm font-bold text-white shrink-0 hover:opacity-90 transition-all duration-200 cursor-pointer"
    >
      <HmwLogo size="sm" showText={!isScrolled} />
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-xl text-xs font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-flex items-center justify-center text-center";

  const variantStyles = {
    primary:
      "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-lg shadow-emerald-500/20",
    secondary: "bg-black hover:bg-neutral-900 border border-neutral-700 text-neutral-200",
    dark: "bg-black text-white border border-neutral-800",
    gradient:
      "bg-gradient-to-r from-emerald-500 to-teal-400 text-neutral-950 font-bold",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
