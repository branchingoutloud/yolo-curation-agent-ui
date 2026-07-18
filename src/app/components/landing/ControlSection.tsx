import { Check, Pencil, X } from "lucide-react";

interface ApprovalGate {
  stage: string;
  title: string;
  summary: string;
}

const GATES: ApprovalGate[] = [
  {
    stage: "Gate 1 · Before any data moves",
    title: "Approve the sourcing plan",
    summary:
      "Class budget: 6 classes, ~4,200 images total. Fork 2 Roboflow datasets, download 1 Kaggle set, zero-shot label 'pallet jack' (no public data found).",
  },
  {
    stage: "Gate 2 · Before training starts",
    title: "Confirm the model size",
    summary:
      "Proposing YOLO11s (~9.4M params) for Jetson Orin at ≥15 FPS. One size up from nano because two classes are visually similar.",
  },
  {
    stage: "Gate 3 · Before iteration two",
    title: "Approve the iteration plan",
    summary:
      "'forklift' underperformed (mAP50 0.61) — likely label noise from zero-shot annotation, not missing data. Proposing re-annotation only, no new sourcing.",
  },
];

function ApprovalCard({ gate }: { gate: ApprovalGate }) {
  return (
    <div className="rounded-lg border border-border bg-background shadow-lg">
      <div className="border-b border-border px-5 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {gate.stage}
        </p>
      </div>
      <div className="px-5 py-4">
        <h3 className="font-semibold text-foreground">{gate.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{gate.summary}</p>
      </div>
      <div className="flex gap-2 border-t border-border px-5 py-3">
        <span className="text-primary-foreground inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium">
          <Check className="h-3.5 w-3.5" /> Approve
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground">
          <Pencil className="h-3.5 w-3.5" /> Edit
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground">
          <X className="h-3.5 w-3.5" /> Reject
        </span>
      </div>
    </div>
  );
}

export function ControlSection() {
  return (
    <section
      id="control"
      className="border-y border-border bg-card"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-3 text-center font-medium text-brand caps-label-sm">
          Human in the loop
        </p>
        <h2 className="mx-auto max-w-2xl text-center font-semibold text-foreground display-lg">
          Autonomous, not unsupervised
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          The agent pauses at exactly three checkpoints — the decisions that
          actually deserve your judgment. Approve, edit, or reject each one;
          everything in between runs on its own.
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {GATES.map((gate) => (
            <ApprovalCard
              key={gate.stage}
              gate={gate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
