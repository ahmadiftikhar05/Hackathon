import { PageHeader, Section } from "@/components/shared/PageHeader";
import { Sparkles } from "lucide-react";

export function StudentTutor() {
  return (
    <div className="max-w-3xl">
      <PageHeader title="AI Tutor" subtitle="Open the floating chat button to ask anything" />
      <Section>
        <div className="text-center py-10">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-secondary text-secondary-foreground flex items-center justify-center">
            <Sparkles className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Your personal AI tutor is always here</h3>
          <p className="text-sm text-muted-foreground mt-1">Tap the green sparkle button at the bottom right to start a conversation.</p>
        </div>
      </Section>
    </div>
  );
}
