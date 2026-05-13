import { StatCard } from "@/components/cards/StatCard";
import { PageHeader, Section } from "@/components/shared/PageHeader";
import { adminKpis, enrollmentTrend } from "@/data/mockData";
import { Users, BookOpen, DollarSign, TrendingUp, Megaphone, FileBarChart, UserPlus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function AdminDashboard() {
  const ICONS = [Users, BookOpen, DollarSign, TrendingUp];

  return (
    <div className="space-y-6 max-w-7xl">
      <PageHeader title="Admin Dashboard" subtitle="Platform overview" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminKpis.map((k, i) => (
          <StatCard key={k.label} label={k.label} value={k.value} delta={k.delta} icon={ICONS[i]} accent={i === 0} />
        ))}
      </div>
      <Section title="Enrollment trend">
        <div className="h-64">
          <ResponsiveContainer>
            <AreaChart data={enrollmentTrend}>
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--secondary)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--secondary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="students" stroke="var(--secondary)" fill="url(#ag)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Section>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { to: "/admin/courses", icon: BookOpen, label: "Manage courses" },
          { to: "/admin/users", icon: UserPlus, label: "Add users" },
          { to: "/admin/announcements", icon: Megaphone, label: "Send announcement" },
        ].map((q) => (
          <Link key={q.to} to={q.to} className="rounded-2xl border border-border bg-card p-5 hover:border-secondary transition-colors flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center"><q.icon className="h-5 w-5 text-secondary" /></div>
            <div className="font-medium">{q.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
