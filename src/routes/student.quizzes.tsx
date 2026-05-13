import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, Badge } from "@/components/shared/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { quizzes, sampleQuestions } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Clock, Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student/quizzes")({
  component: QuizzesPage,
});

function QuizzesPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const groups = {
    pending: quizzes.filter((q) => q.status === "pending"),
    submitted: quizzes.filter((q) => q.status === "submitted"),
    graded: quizzes.filter((q) => q.status === "graded"),
  };

  const list = (items: typeof quizzes) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((q) => (
        <button
          key={q.id}
          onClick={() => q.status === "pending" && setOpenId(q.id)}
          className="text-left rounded-2xl border border-border bg-card p-5 hover:border-secondary transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-xs text-muted-foreground">{q.course}</div>
              <h4 className="font-semibold tracking-tight mt-1">{q.title}</h4>
            </div>
            {q.status === "graded" && <Badge tone="success">{q.score}%</Badge>}
            {q.status === "submitted" && <Badge tone="info">Submitted</Badge>}
            {q.status === "pending" && <Badge tone="warning">Due {q.due}</Badge>}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{q.duration} min</span>
            <span>{q.questions} questions</span>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl">
      <PageHeader title="Quizzes" subtitle="Test your knowledge" />
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending ({groups.pending.length})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({groups.submitted.length})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({groups.graded.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-6">{list(groups.pending)}</TabsContent>
        <TabsContent value="submitted" className="mt-6">{list(groups.submitted)}</TabsContent>
        <TabsContent value="graded" className="mt-6">{list(groups.graded)}</TabsContent>
      </Tabs>

      <QuizModal open={!!openId} onClose={() => setOpenId(null)} />
    </div>
  );
}

function QuizModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(900);

  useEffect(() => {
    if (!open) { setIdx(0); setPicks({}); setSubmitted(false); setTime(900); return; }
    const t = setInterval(() => setTime((x) => Math.max(0, x - 1)), 1000);
    return () => clearInterval(t);
  }, [open]);

  const score = Object.entries(picks).filter(([i, v]) => sampleQuestions[+i].correct === v).length;
  const pct = Math.round((score / sampleQuestions.length) * 100);
  const q = sampleQuestions[idx];
  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Intro to Neural Networks</DialogTitle>
            <Badge tone="warning"><Clock className="h-3 w-3" /> {mm}:{ss}</Badge>
          </div>
        </DialogHeader>

        {!submitted ? (
          <div className="space-y-5">
            <div className="text-xs text-muted-foreground">Question {idx + 1} of {sampleQuestions.length}</div>
            <h3 className="font-semibold text-lg">{q.q}</h3>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setPicks({ ...picks, [idx]: i })}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl border-2 transition-colors text-sm",
                    picks[idx] === i ? "border-secondary bg-secondary/10" : "border-border hover:border-muted-foreground/30"
                  )}
                >{opt}</button>
              ))}
            </div>
            <div className="flex items-center justify-between pt-2">
              <button disabled={idx === 0} onClick={() => setIdx((i) => i - 1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground disabled:opacity-40">
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              {idx === sampleQuestions.length - 1 ? (
                <button onClick={() => setSubmitted(true)} className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2 text-sm font-medium">Submit</button>
              ) : (
                <button onClick={() => setIdx((i) => i + 1)} className="inline-flex items-center gap-1 bg-navy text-navy-foreground rounded-lg px-4 py-2 text-sm font-medium">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 animate-fade-in">
            <div className="h-16 w-16 mx-auto rounded-full bg-secondary/15 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-secondary" />
            </div>
            <div className="text-5xl font-bold mt-4 animate-count-up text-navy">{pct}%</div>
            <p className="text-sm text-muted-foreground mt-2">You got {score} of {sampleQuestions.length} correct</p>
            <button onClick={onClose} className="mt-6 bg-navy text-navy-foreground rounded-lg px-5 py-2 text-sm font-medium">Done</button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
