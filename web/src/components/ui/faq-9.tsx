"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/faq-9-utils/accordion";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/faq-9-utils/toggle-group";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const groups = {
  General: [
    {
      value: "item-1",
      trigger: "What services are included in the subscription?",
      content:
        "Every plan includes unlimited design requests, a dedicated board, and two rounds of revision per task. Brand assets and source files are delivered with each request.",
    },
    {
      value: "item-2",
      trigger: "How many design requests can I make each month?",
      content:
        "There is no request cap. Tasks are queued and worked one at a time so quality stays consistent. Pause or add requests whenever you need.",
    },
    {
      value: "item-3",
      trigger: "What is the turnaround time for design requests?",
      content:
        "Smaller tasks such as graphics or copy tweaks take 2-4 hours. Larger pages and campaigns typically ship within one business day.",
    },
  ],
  Subscriptions: [
    {
      value: "item-4",
      trigger: "Can I pause my subscription?",
      content:
        "Pause anytime from billing. Your queue is saved, and you can resume on the same plan without setup fees.",
    },
    {
      value: "item-5",
      trigger: "What if I need services outside the subscription?",
      content:
        "One-off projects such as motion or 3D can be quoted separately. We will share a fixed price before any work starts.",
    },
  ],
  Services: [
    {
      value: "item-6",
      trigger: "Can I request revisions to the designs?",
      content:
        "Yes. Each request includes two revision rounds. Extra rounds can be added as a follow-up task so nothing is blocked.",
    },
    {
      value: "item-7",
      trigger: "Who owns the final files?",
      content:
        "You own everything we deliver. Source files, fonts we licensed for you, and exported assets are transferred at handoff.",
    },
  ],
};

const categories = Object.keys(groups);

export function Faq() {
  const [active, setActive] = useState(categories[0] ?? "General");
  const items = groups[active as keyof typeof groups];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          Subscriptions
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Plans, seats, and renewals
          </h1>
          <p className="text-muted-foreground">
            Use the rail to switch topics. Each question opens in place.
          </p>
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-[10rem_1fr]">
        <ToggleGroup
          value={[active]}
          onValueChange={(value) => {
            if (value.length > 0)
              setActive(value[0] ?? categories[0] ?? "General");
          }}
          orientation="vertical"
          spacing={1}
          className="flex-row md:flex-col"
        >
          {categories.map((category) => (
            <ToggleGroupItem
              key={category}
              value={category}
              className="justify-start rounded-lg px-3 py-2 text-sm"
            >
              {category}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <Accordion
          key={active}
          defaultValue={[items[0]?.value]}
          className="gap-2"
        >
          {items.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="overflow-hidden rounded-xl border-none bg-muted"
            >
              <AccordionTrigger className="px-4 py-4 text-left hover:no-underline *:data-[slot=accordion-trigger-icon]:hidden">
                <span className="font-medium">{item.trigger}</span>
                <span className="ml-auto flex size-7 shrink-0 items-center justify-center">
                  <ChevronDownIcon className="size-3.5 text-muted-foreground group-aria-expanded/accordion-trigger:hidden" />
                  <ChevronUpIcon className="hidden size-3.5 text-muted-foreground group-aria-expanded/accordion-trigger:inline" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
export default Faq;
