import {
  Search,
  Tags,
  Scale,
  MonitorCog,
  Grid3x3,
  RotateCcw,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface PainPoint {
  icon: LucideIcon;
  title: string;
  description: string;
  cost: string;
}

const PAIN_POINTS: PainPoint[] = [
  {
    icon: Search,
    title: "Scour the internet for data",
    description:
      "Dig through Roboflow Universe, Kaggle, and papers hoping someone already annotated your classes — then check licenses, coverage, and quality by hand.",
    cost: "Hours to days",
  },
  {
    icon: Tags,
    title: "Hand-label thousands of images",
    description:
      "For the classes nobody has labeled, you draw bounding boxes yourself or pay for annotation — the single biggest time sink in any detection project.",
    cost: "Days to weeks",
  },
  {
    icon: Scale,
    title: "Guess the model size",
    description:
      "Nano, small, or medium? Pick wrong and you either miss your latency budget on the edge device or burn GPU hours on a model that under-fits.",
    cost: "Wasted GPU hours",
  },
  {
    icon: MonitorCog,
    title: "Babysit the training run",
    description:
      "Tail logs, watch loss curves, restart on OOM, tweak batch sizes — a whole workday spent staring at a terminal instead of doing real work.",
    cost: "A day per run",
  },
  {
    icon: Grid3x3,
    title: "Decipher the confusion matrix",
    description:
      "A class scored badly — but why? Too few images, label noise, or two classes that just look alike? Each cause needs a completely different fix.",
    cost: "Guesswork",
  },
  {
    icon: RotateCcw,
    title: "Repeat. From the top.",
    description:
      "Every iteration restarts the whole grind: more sourcing, more labeling, another training run. Most projects stall after round one.",
    cost: "Weeks per iteration",
  },
];

export function PainSection() {
  return (
    <section
      id="pain"
      className="border-y border-border bg-card"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-3 text-center font-medium text-brand caps-label-sm">
          The problem
        </p>
        <h2 className="mx-auto max-w-2xl text-center font-semibold text-foreground display-lg">
          Training a custom detector is still weeks of manual grind
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          The model architecture is a solved problem. Everything around it —
          finding data, labeling it, and figuring out why the model fails — is
          not.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PAIN_POINTS.map((point) => (
            <div
              key={point.title}
              className="rounded-lg border border-border bg-background p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <point.icon className="h-5 w-5 text-brand" />
                <span className="text-secondary-foreground rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                  {point.cost}
                </span>
              </div>
              <h3 className="font-semibold text-foreground">{point.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {point.description}
              </p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-center text-lg font-medium text-foreground">
          YOLO Deep Agent hands this entire loop to a team of specialist agents
          — and only interrupts you three times.
        </p>
      </div>
    </section>
  );
}
