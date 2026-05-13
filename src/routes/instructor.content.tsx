import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, Badge } from "@/components/shared/PageHeader";
import { Plus, GripVertical, FileText, Video, ClipboardList, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/instructor/content")({
  component: ContentPage,
});

const initial = [
  { id: 1, title: "Welcome & Course Overview", type: "video", duration: "8 min" },
  { id: 2, title: "Foundations of Neural Networks", type: "video", duration: "22 min" },
  { id: 3, title: "Quiz: Foundations Check", type: "quiz", duration: "10 min" },
  { id: 4, title: "Hands-on: Build Your First Model", type: "lab", duration: "45 min" },
  { id: 5, title: "Reading: Attention Is All You Need", type: "doc", duration: "15 min" },
];

const ICONS: any = { video: Video, quiz: ClipboardList, doc: FileText, lab: FileText };

function ContentPage() {
  const [modules, setModules] = useState(initial);
  const [openModule, setOpenModule] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);

  return (
    <div className="max-w-5xl space-y-6">
      <PageHeader
        title="Content Management"
        subtitle="Organize modules, lessons, and quizzes"
        action={
          <div className="flex gap-2">
            <button onClick={() => setOpenQuiz(true)} className="bg-card border border-border rounded-lg px-3 py-2 text-sm font-medium hover:border-secondary">
              + Quiz
            </button>
            <button onClick={() => setOpenModule(true)} className="bg-secondary text-secondary-foreground rounded-lg px-3 py-2 text-sm font-medium inline-flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> Module
            </button>
          </div>
        }
      />

      <Section>
        <ul className="space-y-2">
          {modules.map((m) => {
            const Icon = ICONS[m.type] ?? FileText;
            return (
              <li key={m.id} className="flex items-center gap-3 px-3 py-3 rounded-xl border border-border hover:border-secondary/50 transition-colors group">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center"><Icon className="h-4 w-4 text-secondary" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{m.title}</div>
                  <div className="text-xs text-muted-foreground capitalize">{m.type} • {m.duration}</div>
                </div>
                <Badge tone="info">Published</Badge>
                <button onClick={() => setModules((x) => x.filter((y) => y.id !== m.id))} className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-destructive/10 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      </Section>

      <AddModal open={openModule} onClose={() => setOpenModule(false)} title="Add module"
        onAdd={(name) => { setModules((m) => [...m, { id: Date.now(), title: name, type: "video", duration: "—" }]); toast.success("Module added"); }} />
      <AddModal open={openQuiz} onClose={() => setOpenQuiz(false)} title="Add quiz"
        onAdd={(name) => { setModules((m) => [...m, { id: Date.now(), title: name, type: "quiz", duration: "10 min" }]); toast.success("Quiz added"); }} />
    </div>
  );
}

function AddModal({ open, onClose, title, onAdd }: { open: boolean; onClose: () => void; title: string; onAdd: (n: string) => void }) {
  const [name, setName] = useState("");
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
        <input
          value={name} onChange={(e) => setName(e.target.value)} autoFocus
          placeholder="Title…"
          className="w-full bg-muted/60 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-secondary"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm">Cancel</button>
          <button onClick={() => { if (name.trim()) { onAdd(name); setName(""); onClose(); } }}
            className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2 text-sm font-medium">Add</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
