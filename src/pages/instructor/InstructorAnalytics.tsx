import { PageHeader, Section } from "@/components/shared/PageHeader";
import { scoreDistribution, completionFunnel, activityData } from "@/data/mockData";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  AreaChart, Area,
} from "recharts";

export function InstructorAnalytics() {
  return (
    <div className="space-y-6 max-w-7xl">
      <PageHeader title="Course Analytics" subtitle="How your cohorts are performing" />

      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Score distribution">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={scoreDistribution}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="range" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="count" fill="var(--secondary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Completion funnel">
          <div className="space-y-3">
            {completionFunnel.map((s) => (
              <div key={s.stage}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{s.stage}</span><span className="text-muted-foreground">{s.value}%</span>
                </div>
                <div className="h-8 rounded-lg bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary to-secondary/70 transition-all duration-700" style={{ width: `${s.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section title="Engagement (study minutes/day)">
        <div className="h-64">
          <ResponsiveContainer>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--secondary)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--secondary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="minutes" stroke="var(--secondary)" fill="url(#g1)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Section>
    </div>
  );
}
