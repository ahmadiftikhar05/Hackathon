import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, ProgressBar, Badge } from "@/components/shared/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { courses } from "@/data/mockData";
import { PlayCircle, CheckCircle2, Lock, MessageSquare } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student/courses/$id")({
  component: CourseDetail,
});

function CourseDetail() {
  const { id } = Route.useParams();
  const course = courses.find((c) => c.id === id) ?? courses[0];
  const [active, setActive] = useState(2);

  const modules = Array.from({ length: course.modules }).map((_, i) => ({
    id: i,
    title: ["Welcome & Setup","Foundations","Core Concepts","Hands-on Lab","Project","Advanced","Capstone"][i % 7] + ` ${i+1}`,
    duration: `${10 + i * 3} min`,
    done: i < 5,
    locked: i > 7,
  }));

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6 max-w-7xl">
      <aside className="rounded-2xl border border-border bg-card p-3 h-fit lg:sticky lg:top-20">
        <div className="px-2 pb-3 border-b border-border">
          <Link to="/student/courses" className="text-xs text-muted-foreground hover:text-foreground">← All courses</Link>
          <h3 className="font-semibold tracking-tight mt-2">{course.title}</h3>
          <ProgressBar value={course.progress} className="mt-3" />
          <div className="text-xs text-muted-foreground mt-1">{course.progress}% complete</div>
        </div>
        <ul className="mt-2 space-y-0.5 max-h-[60vh] overflow-y-auto">
          {modules.map((m, i) => (
            <li key={m.id}>
              <button
                disabled={m.locked}
                onClick={() => setActive(i)}
                className={cn(
                  "w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors",
                  active === i ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                  m.locked && "opacity-50 cursor-not-allowed"
                )}
              >
                {m.done ? <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" /> :
                 m.locked ? <Lock className="h-4 w-4 shrink-0" /> :
                 <PlayCircle className="h-4 w-4 text-navy shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="truncate text-[13px]">{m.title}</div>
                  <div className="text-[11px] text-muted-foreground">{m.duration}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="space-y-6 min-w-0">
        <div className="rounded-2xl bg-navy aspect-video flex items-center justify-center text-navy-foreground/70 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-secondary/20" />
          <div className="relative text-center">
            <div className="h-16 w-16 mx-auto rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mb-3">
              <PlayCircle className="h-8 w-8" />
            </div>
            <div className="text-sm">Video player placeholder</div>
          </div>
        </div>

        <div>
          <Badge tone="info">{course.category}</Badge>
          <h2 className="text-2xl font-semibold tracking-tight mt-2">{modules[active]?.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{course.instructor} • {modules[active]?.duration}</p>
        </div>

        <Tabs defaultValue="notes">
          <TabsList>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>
          <TabsContent value="notes" className="mt-4">
            <Section>
              <textarea
                placeholder="Take notes for this lesson…"
                className="w-full min-h-40 bg-transparent outline-none text-sm resize-none"
                defaultValue="Key idea: attention lets the model weigh which tokens matter for each prediction. Multi-head = parallel attention with different learned projections."
              />
            </Section>
          </TabsContent>
          <TabsContent value="resources" className="mt-4 space-y-2">
            {["Slides — Attention Mechanisms.pdf", "Reading: Attention Is All You Need", "Notebook: transformer_intro.ipynb"].map((r) => (
              <a key={r} className="block rounded-xl border border-border bg-card px-4 py-3 text-sm hover:border-secondary transition-colors">{r}</a>
            ))}
          </TabsContent>
          <TabsContent value="discussion" className="mt-4">
            <Section>
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-navy text-navy-foreground flex items-center justify-center text-xs font-semibold">SK</div>
                <div className="flex-1">
                  <div className="text-sm"><strong>Sarah Khan</strong> <span className="text-muted-foreground text-xs">2h ago</span></div>
                  <p className="text-sm mt-0.5">Can someone clarify how positional encoding compares to learned embeddings?</p>
                  <button className="text-xs text-secondary mt-1 inline-flex items-center gap-1"><MessageSquare className="h-3 w-3" /> Reply</button>
                </div>
              </div>
            </Section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
