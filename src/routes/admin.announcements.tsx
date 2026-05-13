import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/shared/PageHeader";
import { Bold, Italic, List, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/announcements")({
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const [audience, setAudience] = useState("All Students");
  const [when, setWhen] = useState("now");
  return (
    <div className="max-w-3xl">
      <PageHeader title="Announcements" subtitle="Broadcast updates to your community" />
      <Section>
        <input placeholder="Title" className="w-full text-lg font-semibold bg-transparent outline-none border-b border-border pb-3" />
        <div className="flex items-center gap-1 mt-3 border-b border-border pb-2">
          {[Bold, Italic, List, LinkIcon].map((Icon, i) => (
            <button key={i} className="p-2 rounded hover:bg-muted"><Icon className="h-4 w-4" /></button>
          ))}
        </div>
        <textarea placeholder="Write your announcement…" className="w-full min-h-48 mt-3 bg-transparent outline-none text-sm resize-none" />
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="text-xs text-muted-foreground">Audience</label>
            <select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full mt-1 bg-muted/60 rounded-lg px-3 py-2 text-sm outline-none">
              {["All Students", "All Instructors", "Everyone", "AI Bootcamp", "Data Analytics"].map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Schedule</label>
            <select value={when} onChange={(e) => setWhen(e.target.value)} className="w-full mt-1 bg-muted/60 rounded-lg px-3 py-2 text-sm outline-none">
              <option value="now">Send now</option>
              <option value="later">Schedule for later</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 text-sm">Save draft</button>
          <button onClick={() => toast.success("Announcement sent")} className="bg-secondary text-secondary-foreground rounded-lg px-5 py-2 text-sm font-medium">Send</button>
        </div>
      </Section>
    </div>
  );
}
