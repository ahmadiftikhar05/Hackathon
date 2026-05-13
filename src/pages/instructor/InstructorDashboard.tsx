import { StatCard } from "@/components/cards/StatCard";
import { PageHeader, Section, Badge } from "@/components/shared/PageHeader";
import { students, assignments, upcomingSessions } from "@/data/mockData";
import { Users, BookOpen, Star, AlertTriangle, Calendar } from "lucide-react";

export function InstructorDashboard() {
  const atRisk = students.filter((s) => s.risk !== "low");

  return (
    <div className="space-y-6 max-w-7xl">
      <PageHeader title="Instructor Dashboard" subtitle="Welcome back, Jehangir" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Students" value="437" delta="+24" icon={Users} accent />
        <StatCard label="Courses" value="2" icon={BookOpen} />
        <StatCard label="Avg Rating" value="4.9" delta="+0.1" icon={Star} />
        <StatCard label="Submissions" value="18" icon={AlertTriangle} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Section title="At-risk students" className="lg:col-span-2">
          <ul className="divide-y divide-border">
            {atRisk.map((s) => (
              <li key={s.id} className="flex items-center gap-3 py-3">
                <div className="h-9 w-9 rounded-full bg-navy text-navy-foreground flex items-center justify-center text-xs font-semibold">{s.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.course} • {s.progress}% complete</div>
                </div>
                <Badge tone={s.risk === "high" ? "danger" : "warning"}>{s.risk} risk</Badge>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Upcoming sessions">
          <ul className="space-y-3">
            {upcomingSessions.map((s) => (
              <li key={s.id} className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center"><Calendar className="h-4 w-4 text-secondary" /></div>
                <div className="min-w-0">
                  <div className="text-sm font-medium">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.time} • {s.students} attending</div>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Recent submissions">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase">
              <tr className="text-left">
                <th className="pb-3">Student</th><th className="pb-3">Assignment</th>
                <th className="pb-3">Course</th><th className="pb-3">Submitted</th><th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="py-3 font-medium">{a.student}</td>
                  <td className="py-3">{a.title}</td>
                  <td className="py-3 text-muted-foreground">{a.course}</td>
                  <td className="py-3 text-muted-foreground">{a.submitted}</td>
                  <td className="py-3">{a.status === "graded" ? <Badge tone="success">Graded {a.grade}</Badge> : <Badge tone="warning">Ungraded</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
