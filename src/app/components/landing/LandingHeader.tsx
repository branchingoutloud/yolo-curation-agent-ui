import Link from "next/link";
import { ScanSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground"
        >
          <ScanSearch className="h-5 w-5 text-brand" />
          YOLO Deep Agent
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a
            href="#pain"
            className="transition-colors hover:text-foreground"
          >
            The problem
          </a>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-foreground"
          >
            How it works
          </a>
          <a
            href="#control"
            className="transition-colors hover:text-foreground"
          >
            Human in the loop
          </a>
        </nav>
        <Button asChild>
          <Link href="/agent">Launch the agent</Link>
        </Button>
      </div>
    </header>
  );
}
