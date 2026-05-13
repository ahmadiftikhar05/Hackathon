import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, Badge } from "@/components/shared/PageHeader";
import { users } from "@/data/mockData";
import { useState } from "react";
import { Search, Download } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({
  component: UsersPage,
});

const ROLES = ["All", "Student", "Instructor", "Admin"];

function UsersPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [list, setList] = useState(users);
  const filtered = list.filter((u) =>
    (filter === "All" || u.role === filter) &&
    (u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="max-w-7xl">
      <PageHeader title="User Management" subtitle="Manage students, instructors and admins"
        action={<button onClick={() => toast("Export started")} className="bg-card border border-border rounded-lg px-3 py-2 text-sm font-medium inline-flex items-center gap-1.5"><Download className="h-4 w-4" /> Export</button>} />
      <Section>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center gap-2 bg-muted/60 rounded-lg px-3 py-2 max-w-sm flex-1">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users…" className="bg-transparent flex-1 text-sm outline-none" />
          </div>
          <div className="flex gap-1">
            {ROLES.map((r) => (
              <button key={r} onClick={() => setFilter(r)} className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === r ? "bg-navy text-navy-foreground" : "bg-card border border-border hover:bg-muted"}`}>{r}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase">
              <tr className="text-left"><th className="pb-3">User</th><th className="pb-3">Email</th><th className="pb-3">Role</th><th className="pb-3">Joined</th></tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t border-border">
                  <td className="py-3 font-medium">{u.name}</td>
                  <td className="py-3 text-muted-foreground">{u.email}</td>
                  <td className="py-3">
                    <Select value={u.role} onValueChange={(v) => setList((l) => l.map((x) => x.id === u.id ? { ...x, role: v } : x))}>
                      <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Student", "Instructor", "Admin"].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-3 text-muted-foreground">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
