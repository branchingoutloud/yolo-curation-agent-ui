import {
  ClipboardList,
  Globe,
  Wand2,
  Layers,
  Cpu,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface PipelineStage {
  icon: LucideIcon;
  name: string;
  job: string;
  artifact: string;
}

const PIPELINE: PipelineStage[] = [
  {
    icon: ClipboardList,
    name: "Planning agent",
    job: "Estimates how many images each class actually needs — a fixed logo needs far fewer than 'pedestrian' across poses and lighting.",
    artifact: "plan.md · class_budget.json",
  },
  {
    icon: Globe,
    name: "Sourcing agent",
    job: "Searches Roboflow Universe, Kaggle, and the web for already-annotated datasets matching your class budget, with licenses and coverage recorded.",
    artifact: "sources.json",
  },
  {
    icon: Wand2,
    name: "Annotation agent",
    job: "For classes with no labeled data, runs a zero-shot open-vocabulary detector to pre-label images, queued for quick human verification.",
    artifact: "annotation_manifest.json",
  },
  {
    icon: Layers,
    name: "Dataset agent",
    job: "Merges sources, dedupes near-identical images, and splits train/val/test into a ready-to-train dataset spec.",
    artifact: "dataset/data.yaml",
  },
  {
    icon: Cpu,
    name: "Training agent",
    job: "Picks the YOLO variant for your deployment target and runs ultralytics training in an isolated GPU sandbox, streaming status summaries.",
    artifact: "runs/train/metrics.json",
  },
  {
    icon: BarChart3,
    name: "Eval agent",
    job: "Builds a confusion matrix and diagnoses each weak class: too few images, label noise, or genuine class confusability — not just a metric.",
    artifact: "eval_report.md · weak_classes.json",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl px-6 py-20"
    >
      <p className="mb-3 text-center font-medium text-brand caps-label-sm">
        How it works
      </p>
      <h2 className="mx-auto max-w-2xl text-center font-semibold text-foreground display-lg">
        Six specialist agents, one orchestrator with judgment
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
        The orchestrator isn&apos;t following a script. It delegates to
        specialists, reads their output files, and decides what to do next —
        another sourcing round, a re-annotation pass, or straight back to
        training.
      </p>
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PIPELINE.map((stage, index) => (
          <li
            key={stage.name}
            className="relative rounded-lg border border-border bg-card p-6"
          >
            <span className="absolute right-4 top-4 text-xs font-medium text-muted-foreground">
              0{index + 1}
            </span>
            <stage.icon className="mb-4 h-5 w-5 text-brand" />
            <h3 className="font-semibold text-foreground">{stage.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{stage.job}</p>
            <p className="mt-4 font-mono text-xs text-brand">
              → {stage.artifact}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex items-start gap-4 rounded-lg border border-border bg-card p-6">
        <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
        <div>
          <h3 className="font-semibold text-foreground">
            An adaptive loop, not a fixed pipeline
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            After every evaluation, the orchestrator reasons about each weak
            class and routes the fix itself: more raw images means another
            sourcing pass, label noise means re-annotation, and a capacity
            problem means retraining with different hyperparameters — no new
            data at all. It iterates as many rounds as the results warrant.
          </p>
        </div>
      </div>
    </section>
  );
}
