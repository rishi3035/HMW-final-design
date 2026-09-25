"use client";

import Timeline from "@/components/ui/timeline";

const settings = {
  textColor: "var(--color-foreground, #ffffff)",
  mutedTextColor: "var(--color-muted-foreground, #a1a1aa)",
  activeColor: "#10b981",
  backgroundColor: "var(--color-background, #000000)",
  duration: 1.4,
};

export default function TimelineDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <main className="bg-background text-foreground">
      {/* Lead-in so the pinned timeline has somewhere to scroll in from. */}
      <section className="flex h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className=" text-xs uppercase tracking-[0.3em] text-emerald-400">
          Continuous Security Pipeline
        </p>
        <h1 className="max-w-[18ch] text-4xl font-semibold leading-tight tracking-tight sm:text-6xl text-white">
          Six stages, one horizontal execution pipeline.
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-slate-400">
          Scroll down — the section pins, the track slides sideways, and each
          security milestone draws its stem and reveals its execution telemetry as it reaches centre.
        </p>
        <span className="mt-2 animate-bounce text-emerald-400">&darr;</span>
      </section>

      {/* Realistic usage: custom copy, a branded accent, tuned reveal speed. */}
      <Timeline
        title="Execution Pipeline"
        periodLabel="Target ➔ Fix"
        backgroundColor={s.backgroundColor}
        textColor={s.textColor}
        mutedTextColor={s.mutedTextColor}
        activeColor={s.activeColor}
        imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
        imageAlt="Cybersecurity data operations center"
        duration={s.duration}
      />

      <section className="flex h-screen items-center justify-center px-6 text-center text-sm text-slate-400">
        From external DNS discovery to verified 1-click developer diffs.
      </section>
    </main>
  );
}
