import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, Badge } from "@/components/shared/PageHeader";
import { courses } from "@/data/mockData";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/courses")({
  component: AdminCourses,
});

function AdminCourses() {
  const [list, setList] = useState(courses);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  return (
    <div className="max-w-7xl">
      <PageHeader title="Course Catalog" subtitle="Manage all platform courses"
        action={<button onClick={() => setOpen(true)} className="bg-secondary text-secondary-foreground rounded-lg px-3 py-2 text-sm font-medium inline-flex items-center gap-1.5"><Plus className="h-4 w-4" /> New course</button>} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className={`h-24 bg-gradient-to-br ${c.color}`} />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-semibold tracking-tight">{c.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.instructor} • {c.students} students</p>
                </div>
                <Badge tone={c.active ? "success" : "default"}>{c.active ? "Active" : "Inactive"}</Badge>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">Visible to students</span>
                <Switch checked={c.active} onCheckedChange={(v) => setList((l) => l.map((x) => x.id === c.id ? { ...x, active: v } : x))} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create course</DialogTitle></DialogHeader>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Course title…" className="w-full bg-muted/60 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-secondary" />
          <div className="flex justify-end gap-2"><button onClick={() => setOpen(false)} className="px-4 py-2 text-sm">Cancel</button>
            <button onClick={() => { if (name.trim()) { toast.success("Course created"); setOpen(false); setName(""); } }} className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2 text-sm font-medium">Create</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
