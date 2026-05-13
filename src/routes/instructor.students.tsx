import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, Badge, ProgressBar } from "@/components/shared/PageHeader";
import { students } from "@/data/mockData";
import { Search } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const Route = createFileRoute("/instructor/students")({
  component: StudentsPage,
});

function StudentsPage() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<typeof students[0] | null>(null);
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(q.toLowerCase()) || s.course.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div className="max-w-7xl">
      <PageHeader title="Student Progress" subtitle="Track and support your learners" />
      <Section>
        <div className="flex items-center gap-2 mb-4 bg-muted/60 rounded-lg px-3 py-2 max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or course"
            className="bg-transparent flex-1 text-sm outline-none" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase">
              <tr className="text-left">
                <th className="pb-3">Student</th><th className="pb-3">City</th>
                <th className="pb-3">Course</th><th className="pb-3 w-48">Progress</th>
                <th className="pb-3">Risk</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} onClick={() => setOpen(s)} className="border-t border-border hover:bg-muted/40 cursor-pointer">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-navy text-navy-foreground flex items-center justify-center text-xs font-semibold">{s.avatar}</div>
                      <span className="font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{s.city}</td>
                  <td className="py-3">{s.course}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={s.progress} className="flex-1" />
                      <span className="text-xs text-muted-foreground w-9 text-right">{s.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge tone={s.risk === "high" ? "danger" : s.risk === "medium" ? "warning" : "success"}>{s.risk}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent>
          {open && (
            <>
              <SheetHeader><SheetTitle>{open.name}</SheetTitle></SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-navy text-navy-foreground flex items-center justify-center font-semibold">{open.avatar}</div>
                  <div>
                    <div className="font-semibold">{open.name}</div>
                    <div className="text-xs text-muted-foreground">{open.city} • {open.course}</div>
                  </div>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <div className="text-xs text-muted-foreground">Course progress</div>
                  <div className="text-2xl font-semibold mt-1">{open.progress}%</div>
                  <ProgressBar value={open.progress} className="mt-3" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border p-4"><div className="text-xs text-muted-foreground">Streak</div><div className="text-xl font-semibold mt-1">{open.streak} days</div></div>
                  <div className="rounded-xl border border-border p-4"><div className="text-xs text-muted-foreground">Risk</div><div className="text-xl font-semibold mt-1 capitalize">{open.risk}</div></div>
                </div>
                <button className="w-full bg-navy text-navy-foreground rounded-lg py-2.5 text-sm font-medium">Send message</button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
