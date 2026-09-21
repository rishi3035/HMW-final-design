import React, { useEffect, useRef, useState } from "react";
import TreeChart from "@/components/ui/linktypes";

const settings = {
  layout: "cartesian",
  orientation: "horizontal",
  linkType: "diagonal",
  stepPercent: 0.5,
};

export default function TreeChartDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-screen w-screen">
      {size.width > 0 && (
        <TreeChart
          width={size.width}
          height={size.height}
          layout={s.layout}
          orientation={s.orientation}
          linkType={s.linkType}
          stepPercent={s.stepPercent}
        />
      )}
    </div>
  );
}
