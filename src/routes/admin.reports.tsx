import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/shared/PageHeader";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/reports")({
  component: ReportsPage,
});

const REPORTS = [
  { name: "Monthly enrollments", rows: 1842 },
  { name: "Course completion summary", rows: 18 },
  { name: "Instructor performance", rows: 3 },
  { name: "Revenue by course", rows: 18 },
];

function ReportsPage() {
  return (
    <div className="max-w-6xl space-y-6">
      <PageHeader title="Reports" subtitle="Generate and download platform reports" />
      <Section title="Filters">
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className="text-xs text-muted-foreground">Date range</label>
            <select className="w-full mt-1 bg-muted/60 rounded-lg px-3 py-2 text-sm outline-none"><option>Last 30 days</option><option>This quarter</option><option>This year</option></select></div>
          <div><label className="text-xs text-muted-foreground">Course</label>
            <select className="w-full mt-1 bg-muted/60 rounded-lg px-3 py-2 text-sm outline-none"><option>All courses</option><option>AI Bootcamp</option></select></div>
          <div><label className="text-xs text-muted-foreground">Format</label>
            <select className="w-full mt-1 bg-muted/60 rounded-lg px-3 py-2 text-sm outline-none"><option>CSV</option><option>PDF</option><option>Excel</option></select></div>
        </div>
      </Section>
      <Section title="Available reports">
        <ul className="divide-y divide-border">
          {REPORTS.map((r) => (
            <li key={r.name} className="flex items-center gap-3 py-3">
              <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center"><FileText className="h-4 w-4 text-secondary" /></div>
              <div className="flex-1"><div className="text-sm font-medium">{r.name}</div><div className="text-xs text-muted-foreground">{r.rows} rows</div></div>
              <button onClick={() => toast("Download starting…")} className="bg-card border border-border rounded-lg px-3 py-1.5 text-sm inline-flex items-center gap-1.5 hover:border-secondary"><Download className="h-3.5 w-3.5" /> Download</button>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
