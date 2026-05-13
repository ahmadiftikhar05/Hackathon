import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/shared/PageHeader";
import { activityData, skillRadar } from "@/data/mockData";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student/progress")({
  component: ProgressPage,
});

const heatmap = Array.from({ length: 7 * 12 }).map(() => Math.floor(Math.random() * 5));

function ProgressPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <PageHeader title="Progress & Analytics" subtitle="Your learning at a glance" />

      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Skill mastery">
          <div className="h-72">
            <ResponsiveContainer>
              <RadarChart data={skillRadar}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="var(--secondary)" fill="var(--secondary)" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Weekly study time">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={activityData}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="minutes" stroke="var(--secondary)" strokeWidth={3} dot={{ r: 4, fill: "var(--secondary)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      <Section title="Quiz scores by course">
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={[
              { course: "AI Bootcamp", score: 82 },
              { course: "Data Analytics", score: 68 },
              { course: "Agentic AI", score: 91 },
              { course: "Excel", score: 95 },
              { course: "Python", score: 74 },
            ]}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="course" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="score" fill="var(--secondary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>

      <Section title="Activity heatmap" action={<span className="text-xs text-muted-foreground">Last 12 weeks</span>}>
        <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2">
          {heatmap.map((v, i) => (
            <div
              key={i}
              className={cn(
                "h-4 w-4 rounded-sm",
                v === 0 && "bg-muted",
                v === 1 && "bg-secondary/25",
                v === 2 && "bg-secondary/50",
                v === 3 && "bg-secondary/75",
                v >= 4 && "bg-secondary",
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
          Less
          <div className="h-3 w-3 rounded-sm bg-muted" />
          <div className="h-3 w-3 rounded-sm bg-secondary/25" />
          <div className="h-3 w-3 rounded-sm bg-secondary/50" />
          <div className="h-3 w-3 rounded-sm bg-secondary/75" />
          <div className="h-3 w-3 rounded-sm bg-secondary" />
          More
        </div>
      </Section>
    </div>
  );
}
