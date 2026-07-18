import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDashed, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_TODOS = [
  { label: "Interview user & estimate class budget", done: true },
  { label: "Source datasets (Roboflow, Kaggle, web)", done: true },
  { label: "Zero-shot pre-annotate unlabeled classes", done: true },
  { label: "Train YOLO11s in GPU sandbox", active: true },
  { label: "Evaluate & diagnose weak classes", done: false },
];

function HeroMockup() {
  return (
    <div className="rounded-lg border border-border bg-card shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
        <span className="ml-3 text-xs text-muted-foreground">
          YOLO Deep Agent
        </span>
      </div>
      <div className="space-y-4 p-5">
        <div className="text-primary-foreground ml-auto max-w-[85%] rounded-lg bg-primary px-4 py-2.5 text-sm">
          Detect forklifts, pallets, and people in warehouse CCTV. Deploying on
          a Jetson Orin.
        </div>
        <div className="max-w-[90%] rounded-lg border border-border bg-background px-4 py-3">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Agent plan
          </p>
          <ul className="space-y-2">
            {MOCK_TODOS.map((todo) => (
              <li
                key={todo.label}
                className="flex items-center gap-2 text-sm"
              >
                {todo.done ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
                ) : todo.active ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin text-brand" />
                ) : (
                  <CircleDashed className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
                <span
                  className={
                    todo.done
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  }
                >
                  {todo.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2">
      <div>
        <p className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          Autonomous curation, training & evaluation for object detection
        </p>
        <h1 className="font-semibold text-foreground display-2xl">
          Describe what you want to detect.{" "}
          <span className="text-brand">Get a trained YOLO model.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Stop spending weeks hunting datasets, hand-labeling images, and
          babysitting training runs. An orchestrated team of AI agents sources
          the data, labels it, trains the model, and diagnoses what to improve —
          you approve the plan at three checkpoints.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button
            asChild
            size="lg"
          >
            <Link href="/agent">
              Launch the agent
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
          >
            <a href="#how-it-works">See how it works</a>
          </Button>
        </div>
      </div>
      <HeroMockup />
    </section>
  );
}
