import {
  Box,
  FolderOpen,
  Plug,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Plug,
    title: "MCP-powered sourcing",
    description:
      "First-class Roboflow and Kaggle integrations — the agent forks Universe datasets and pulls Kaggle data directly, not by scraping.",
  },
  {
    icon: Sparkles,
    title: "Zero-shot pre-annotation",
    description:
      "Open-vocabulary detectors pre-label the classes nobody has annotated, so humans only verify boxes instead of drawing them.",
  },
  {
    icon: Box,
    title: "Sandboxed GPU training",
    description:
      "Training and inference run in isolated cloud GPU sandboxes — no local CUDA setup, no dependency conflicts, no OOM on your laptop.",
  },
  {
    icon: Stethoscope,
    title: "Diagnosis, not just metrics",
    description:
      "Evaluation names a likely cause per weak class — too few images, label noise, or class confusability — so the next round fixes the right thing.",
  },
  {
    icon: FolderOpen,
    title: "Every artifact is a real file",
    description:
      "Plans, source manifests, dataset specs, and eval reports land in a workspace you can open and edit — not buried in a chat transcript.",
  },
  {
    icon: ShieldCheck,
    title: "Domain knowledge on demand",
    description:
      "Curated CV skills — model sizing, dataset curation heuristics, eval diagnosis patterns — load only when the task at hand needs them.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="mb-3 text-center font-medium text-brand caps-label-sm">
        Under the hood
      </p>
      <h2 className="mx-auto max-w-2xl text-center font-semibold text-foreground display-lg">
        Built like a real ML team works
      </h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-lg border border-border bg-card p-6"
          >
            <feature.icon className="mb-4 h-5 w-5 text-brand" />
            <h3 className="font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
