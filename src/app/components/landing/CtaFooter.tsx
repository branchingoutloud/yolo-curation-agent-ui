import Link from "next/link";
import { ArrowRight, ScanSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaFooter() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="mx-auto max-w-2xl font-semibold text-foreground display-lg">
          Your next detection model is a conversation away
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Describe the use case, approve three checkpoints, and let the agents
          handle the grind in between.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8"
        >
          <Link href="/agent">
            Launch the agent
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <span className="flex items-center gap-2">
            <ScanSearch className="h-4 w-4 text-brand" />
            YOLO Deep Agent
          </span>
          <span>
            Built on{" "}
            <a
              href="https://github.com/langchain-ai/deepagents"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              deepagents
            </a>{" "}
            &{" "}
            <a
              href="https://docs.ultralytics.com"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Ultralytics YOLO
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
