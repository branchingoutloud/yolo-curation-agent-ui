import type { Metadata } from "next";
import { LandingHeader } from "@/app/components/landing/LandingHeader";
import { HeroSection } from "@/app/components/landing/HeroSection";
import { PainSection } from "@/app/components/landing/PainSection";
import { HowItWorksSection } from "@/app/components/landing/HowItWorksSection";
import { ControlSection } from "@/app/components/landing/ControlSection";
import { FeatureGrid } from "@/app/components/landing/FeatureGrid";
import { ArtifactShowcase } from "@/app/components/landing/ArtifactShowcase";
import { CtaFooter } from "@/app/components/landing/CtaFooter";

export const metadata: Metadata = {
  title: "YOLO Deep Agent — from use case to trained detector, autonomously",
  description:
    "Describe what you want to detect and an orchestrated team of AI agents sources the data, labels it, trains a YOLO model, and diagnoses what to improve — pausing only for three approvals.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <PainSection />
        <HowItWorksSection />
        <ControlSection />
        <FeatureGrid />
        <ArtifactShowcase />
      </main>
      <CtaFooter />
    </div>
  );
}
