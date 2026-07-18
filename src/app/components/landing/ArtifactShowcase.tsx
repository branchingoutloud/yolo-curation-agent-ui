import { FileText } from "lucide-react";

interface Artifact {
  path: string;
  description: string;
}

const ARTIFACTS: Artifact[] = [
  { path: "plan.md", description: "class budget & reasoning" },
  { path: "sources.json", description: "every dataset found, with licenses" },
  { path: "annotation_manifest.json", description: "zero-shot label results" },
  { path: "dataset/data.yaml", description: "merged, deduped, split" },
  { path: "runs/train/metrics.json", description: "training results" },
  { path: "eval_report.md", description: "per-class diagnosis" },
  { path: "weak_classes.json", description: "what to fix next, and why" },
];

export function ArtifactShowcase() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <p className="mb-3 font-medium text-brand caps-label-sm">
            Full transparency
          </p>
          <h2 className="font-semibold text-foreground display-lg">
            Nothing hidden in a chat log
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every decision the agent makes is written to a file you can open,
            audit, and edit — while the run is still going. Change the class
            budget in <span className="font-mono text-sm">plan.md</span> and the
            orchestrator picks it up on its next read.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background p-2 shadow-lg">
          <ul className="divide-y divide-border">
            {ARTIFACTS.map((artifact) => (
              <li
                key={artifact.path}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <span className="flex items-center gap-2.5 font-mono text-sm text-foreground">
                  <FileText className="h-4 w-4 shrink-0 text-brand" />
                  {artifact.path}
                </span>
                <span className="text-right text-xs text-muted-foreground">
                  {artifact.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
