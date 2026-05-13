import { PageHeader, Section, Badge } from "@/components/shared/PageHeader";
import { assignments } from "@/data/mockData";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const RUBRIC = [
  { criterion: "Code quality", max: 25 },
  { criterion: "Correctness", max: 35 },
  { criterion: "Documentation", max: 15 },
  { criterion: "Creativity", max: 25 },
];

export function InstructorGrading() {
  const [active, setActive] = useState(assignments[0]);
  const [scores, setScores] = useState<number[]>(RUBRIC.map(() => 0));
  const total = scores.reduce((a, b) => a + b, 0);

  return (
    <div className="grid lg:grid-cols-[260px_1fr_320px] gap-6 max-w-7xl">
      <aside className="rounded-2xl border border-border bg-card p-2 h-fit">
        <div className="px-3 py-2 text-xs uppercase text-muted-foreground tracking-wide">Submissions</div>
        <ul className="space-y-1">
          {assignments.map((a) => (
            <li key={a.id}>
              <button
                onClick={() => { setActive(a); setScores(RUBRIC.map(() => 0)); }}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm",
                  active.id === a.id ? "bg-accent" : "hover:bg-muted"
                )}
              >
                <div className="font-medium truncate">{a.student}</div>
                <div className="text-xs text-muted-foreground truncate">{a.title}</div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div>
        <PageHeader title={active.title} subtitle={`${active.student} • ${active.course} • Submitted ${active.submitted}`} />
        <Section title="Submission preview">
          <div className="rounded-xl bg-muted/40 p-6 font-mono text-xs whitespace-pre-wrap leading-relaxed">
            {`# sentiment_classifier.py
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

MODEL = "distilbert-base-uncased-finetuned-sst-2-english"
tok = AutoTokenizer.from_pretrained(MODEL)
clf = AutoModelForSequenceClassification.from_pretrained(MODEL)

def predict(text: str):
    inputs = tok(text, return_tensors="pt")
    logits = clf(**inputs).logits
    return logits.argmax().item()

print(predict("This bootcamp is awesome!"))`}
          </div>
        </Section>
      </div>

      <aside className="space-y-4">
        <Section title="Rubric">
          <div className="space-y-3">
            {RUBRIC.map((r, i) => (
              <div key={r.criterion}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{r.criterion}</span>
                  <span className="text-muted-foreground text-xs">/ {r.max}</span>
                </div>
                <input
                  type="number" min={0} max={r.max} value={scores[i]}
                  onChange={(e) => {
                    const v = Math.max(0, Math.min(r.max, +e.target.value));
                    setScores((s) => s.map((x, j) => (j === i ? v : x)));
                  }}
                  className="w-full bg-muted/60 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-2xl font-semibold animate-count-up">{total}<span className="text-sm text-muted-foreground"> /100</span></span>
          </div>
          <button
            onClick={() => toast.success(`Graded ${active.student} — ${total}/100`)}
            className="w-full mt-4 bg-secondary text-secondary-foreground rounded-lg py-2.5 text-sm font-medium"
          >Submit grade</button>
        </Section>

        <Section>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">AI suggestion</div>
              <p className="text-xs text-muted-foreground mt-1">
                Strong code structure and use of pretrained models. Consider asking the student to add input validation and unit tests. Suggested grade: <strong className="text-foreground">82/100</strong>.
              </p>
            </div>
          </div>
        </Section>
      </aside>
    </div>
  );
}
