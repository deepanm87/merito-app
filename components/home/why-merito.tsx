import { cn } from "@/lib/utils";
import { BrainCircuitIcon, FileOutputIcon, FileTextIcon } from "lucide-react";

const steps = [
  {
    icon: <FileTextIcon size={64} strokeWidth={1.5} />,
    title: "Collect Testimonials",
    description:
      "Easily gather authentic testimonials from your customers with a simple form.",
    accent: "★",
  },
  {
    icon: <BrainCircuitIcon size={64} strokeWidth={1.5} />,
    title: "Build Trust",
    description:
      "Showcase real feedback to build instant trust and credibility with new visitors.",
    accent: "✔",
  },
  {
    icon: <FileOutputIcon size={64} strokeWidth={1.5} />,
    title: "Boost Conversions",
    description:
      "Leverage social proof to increase engagement and drive more sales.",
    accent: "🚀",
  },
];

export default function WhyMerito() {
  return (
    <section
      className="px-12 py-12 relative overflow-hidden bg-orange-50/60"
      id="features"
    >
      <div className="wrapper max-w-screen-lg">
        <div className="mb-16 flex flex-col items-start">
          <h2 className="font-bold uppercase text-xl mb-2 text-orange-500 tracking-widest">
            Why Testimonials Matter
          </h2>
          <div className="w-16 h-1 bg-orange-200 rounded mb-4" />
          <h3 className="heading-large">
            97% of visitors aren&apos;t ready to buy right away. Convert more
            visitors into customers by showing them social proof.
          </h3>
        </div>
        <div className="flex flex-col gap-16 w-full">
          {steps.map((step, idx) => {
            return (
              <div
                key={step.title}
                className={cn(
                  "relative flex flex-col md:flex-row items-center md:items-stretch gap-0 md:gap-8 w-full",
                  idx === 1 && "md:flex-row-reverse"
                )}
              >
                <div className="relative shrink-0 flex flex-col items-center justify-center md:justify-start">
                  <div className="icon-circle">
                    <span className="text-orange-500"> {step.icon}</span>
                  </div>
                  <span className="badge-accent">{step.accent}</span>
                </div>
                <div
                  className={cn(
                    "mt-6 md:mt-0 card-glass p-6 flex-1 max-w-xl",
                    idx === 1
                      ? "md:text-right md:items-end"
                      : "md:text-left md:items-start"
                  )}
                >
                  <h4 className="font-bold text-xl mb-2 text-orange-600">
                    {step.title}
                  </h4>
                  <p className="leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
