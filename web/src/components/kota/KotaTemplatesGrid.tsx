import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";

interface TemplateItem {
  name: string;
  category: string;
  price: string;
  description: string;
  gradient: string;
  badge?: string;
}

const templates: TemplateItem[] = [
  {
    name: "Orionix",
    category: "Agency",
    price: "$99",
    description: "Dark-mode, high-converting agency portfolio with smooth physics and CMS.",
    gradient: "from-blue-900/60 via-indigo-950 to-black",
    badge: "Bestseller",
  },
  {
    name: "Fizens",
    category: "Finance",
    price: "$99",
    description: "Clean, trustworthy fintech template with interactive card stacks and charts.",
    gradient: "from-emerald-950 via-neutral-900 to-black",
  },
  {
    name: "Intelly",
    category: "AI & SaaS",
    price: "$99",
    description: "Sleek software landing page featuring dark aesthetics and interactive feature grids.",
    gradient: "from-purple-950 via-neutral-900 to-black",
    badge: "Trending",
  },
  {
    name: "AUREA",
    category: "Luxury Studio",
    price: "$99",
    description: "Editorial luxury agency template with editorial serif headings and scroll reveals.",
    gradient: "from-amber-950/60 via-neutral-900 to-black",
  },
  {
    name: "James Nolan",
    category: "Portfolio",
    price: "$99",
    description: "Minimalist designer portfolio with fluid magnetic interactions and work reels.",
    gradient: "from-cyan-950 via-neutral-900 to-black",
  },
];

export const KotaTemplatesGrid: React.FC = () => {
  return (
    <section id="templates" className="relative w-full bg-black text-white py-24 sm:py-36 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
              [ 04 / Framer Templates ]
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight mt-2">
              Featured Templates
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-neutral-400">Ready to launch in 1 click</span>
            <a
              href="#templates"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold tracking-wide border border-white/10 transition-colors"
            >
              <span>View all templates</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {templates.map((tpl, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-[32px] bg-neutral-900/80 border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              {/* Preview Showcase Box */}
              <div
                className={`relative aspect-[16/10] w-full bg-gradient-to-br ${tpl.gradient} p-6 flex flex-col justify-between overflow-hidden`}
              >
                {/* Top Bar inside card */}
                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono text-white/90 border border-white/15">
                    {tpl.category}
                  </span>
                  {tpl.badge && (
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-mono border border-blue-400/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-400" />
                      {tpl.badge}
                    </span>
                  )}
                </div>

                {/* Card abstract mock elements */}
                <div className="my-auto text-center transform group-hover:scale-105 transition-transform duration-500">
                  <div className="inline-block p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <Layers className="w-8 h-8 text-neutral-300 mx-auto" />
                    <span className="block mt-2 font-mono text-xs text-neutral-400">
                      framer.com/preview/{tpl.name.toLowerCase().replace(/\s+/g, "-")}
                    </span>
                  </div>
                </div>

                {/* Bottom glass blur bar */}
                <div className="z-10 flex items-center justify-between text-xs font-mono text-white/70">
                  <span>60 FPS Motion</span>
                  <span>Fully Responsive</span>
                </div>
              </div>

              {/* Meta details */}
              <div className="p-6 bg-black/40 flex items-center justify-between border-t border-white/5">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-[200px] truncate">
                    {tpl.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-lg font-mono font-bold text-white">{tpl.price}</span>
                  <button
                    data-cursor-text="PREVIEW"
                    className="size-9 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
