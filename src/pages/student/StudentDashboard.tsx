import { Link } from "@tanstack/react-router";
import { StatCard } from "@/components/cards/StatCard";
import { PageHeader, Section, Badge, ProgressBar } from "@/components/shared/PageHeader";
import { Flame, BookOpen, Trophy, Clock, Sparkles, ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import { courses, upcomingDeadlines, activityData } from "@/data/mockData";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function StudentDashboard() {
  const current = courses[0];
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome banner */}
      <div className="rounded-2xl bg-gradient-to-br from-navy to-navy/80 text-navy-foreground p-6 md:p-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative">
          <p className="text-sm text-navy-foreground/70">Wednesday, May 13</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">Welcome back, Sarah 👋</h2>
          <p className="text-navy-foreground/70 mt-1 text-sm">You're on a 14-day streak. Keep the momentum going.</p>
          <Link to="/student/courses" className="inline-flex items-center gap-1.5 mt-4 bg-secondary text-secondary-foreground rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90">
            Resume learning <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Day Streak" value="14" delta="+3" icon={Flame} />
        <StatCard label="Courses Active" value="3" icon={BookOpen} />
        <StatCard label="XP This Week" value="1,240" delta="+18%" icon={Trophy} />
        <StatCard label="Hours Learned" value="42h" delta="+5%" icon={Clock} />
      </div>

      {/* AI banner */}
      <div className="rounded-2xl border border-secondary/30 bg-accent p-5 flex items-start gap-4">
        <div className="h-10 w-10 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold tracking-tight">AI Tutor recommendation</div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Based on your last quiz, brushing up on <strong className="text-foreground">attention mechanisms</strong> would help most. Want a 10-minute mini-lesson?
          </p>
        </div>
        <button className="bg-navy text-navy-foreground text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap">Start lesson</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Continue learning */}
        <Section title="Continue learning" className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-5 items-start">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground">{current.category} • {current.instructor}</div>
              <h4 className="text-lg font-semibold mt-1">{current.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">Module 8 — Attention & Transformers</p>
              <ProgressBar value={current.progress} className="mt-4" />
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span>{current.progress}% complete</span>
                <span>4 modules remaining</span>
              </div>
              <Link to="/student/courses/$id" params={{ id: current.id }} className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-secondary hover:opacity-80">
                <PlayCircle className="h-4 w-4" /> Resume lesson
              </Link>
            </div>
            <div className={`h-32 w-full md:w-44 rounded-xl bg-gradient-to-br ${current.color}`} />
          </div>
        </Section>

        {/* Activity */}
        <Section title="This week">
          <div className="h-40">
            <ResponsiveContainer>
              <LineChart data={activityData}>
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="minutes" stroke="var(--secondary)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--secondary)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-muted-foreground text-center">Minutes per day</div>
        </Section>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Upcoming deadlines">
          <ul className="space-y-3">
            {upcomingDeadlines.map((d) => (
              <li key={d.id} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-warning/20 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-warning-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{d.title}</div>
                  <div className="text-xs text-muted-foreground">{d.course}</div>
                </div>
                <Badge tone="warning">{d.due}</Badge>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Recent activity">
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><CheckCircle2 className="h-4 w-4 text-secondary mt-0.5" /> <div><div>Completed quiz <strong>Excel Formulas</strong></div><div className="text-xs text-muted-foreground">2 hours ago</div></div></li>
            <li className="flex gap-3"><Trophy className="h-4 w-4 text-warning-foreground mt-0.5" /> <div><div>Earned the <strong>14-day streak</strong> badge</div><div className="text-xs text-muted-foreground">Today</div></div></li>
            <li className="flex gap-3"><BookOpen className="h-4 w-4 text-navy mt-0.5" /> <div><div>Started <strong>Module 8</strong> in AI Bootcamp</div><div className="text-xs text-muted-foreground">Yesterday</div></div></li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
