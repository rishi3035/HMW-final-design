import React from "react";

export interface SecurityTechnologyItem {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  tag?: string;
}

export const SECURITY_TECHNOLOGIES: SecurityTechnologyItem[] = [
  {
    id: "zap",
    name: "OWASP ZAP",
    role: "Dynamic Application Security Testing",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4 text-emerald-400"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
        <path d="M13 7l-3 5h4l-2 5" />
      </svg>
    )
  },
  {
    id: "nuclei",
    name: "Nuclei",
    role: "Vulnerability & Misconfiguration Detection",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4 text-cyan-400"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-30 12 12)" />
      </svg>
    )
  },
  {
    id: "semgrep",
    name: "Semgrep",
    role: "Static Application Security Testing",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4 text-amber-400"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "github",
    name: "GitHub",
    role: "Developer Security Workflow",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4 text-slate-300"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    )
  }
];

export interface SecurityTechnologyStripProps {
  className?: string;
}

export const SecurityTechnologyStrip: React.FC<SecurityTechnologyStripProps> = ({
  className = ""
}) => {
  return (
    <section
      aria-label="Built on Proven Security Technologies"
      className={`w-full bg-[#070A12]/95 border-y border-slate-800/80 py-6 sm:py-7 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Understated Section Header */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-slate-800" />
          <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-400 text-center">
            BUILT ON PROVEN SECURITY TECHNOLOGIES
          </span>
          <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-slate-800" />
        </div>

        {/* 1 Horizontal Row on Desktop, Clean Grid / Stacked on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5">
          {SECURITY_TECHNOLOGIES.map((tech) => (
            <div
              key={tech.id}
              className="group flex flex-col justify-between p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/70 hover:border-slate-700/80 hover:bg-slate-900/70 transition-all duration-200"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="size-7 rounded-lg bg-slate-950/80 border border-slate-800/90 flex items-center justify-center shrink-0 group-hover:border-slate-700 transition-colors">
                  {tech.icon}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors truncate">
                  {tech.name}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 group-hover:text-slate-300 font-normal leading-snug transition-colors">
                {tech.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
