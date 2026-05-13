import { PageHeader, Section } from "@/components/shared/PageHeader";
import { leaderboard } from "@/data/mockData";
import { Crown, Medal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export function StudentLeaderboard() {
  const ICONS = [Crown, Medal, Trophy];
  const COLORS = ["text-warning-foreground bg-warning/30", "text-muted-foreground bg-muted", "text-orange-700 bg-orange-100"];

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader title="Leaderboard" subtitle="Top learners this month" />

      <div className="grid grid-cols-3 gap-4">
        {[1, 0, 2].map((i) => {
          const user = top3[i];
          const Icon = ICONS[i];
          const heights = ["mt-6", "", "mt-12"];
          return (
            <div key={user.rank} className={cn("rounded-2xl border border-border bg-card p-5 text-center", heights[i])}>
              <div className={cn("h-10 w-10 mx-auto rounded-full flex items-center justify-center", COLORS[i])}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="h-14 w-14 mx-auto rounded-full bg-navy text-navy-foreground flex items-center justify-center font-semibold mt-3">
                {user.avatar}
              </div>
              <div className="mt-3 font-semibold tracking-tight text-sm">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.course}</div>
              <div className="mt-2 text-2xl font-bold text-secondary animate-count-up">{user.points.toLocaleString()}</div>
              <div className="text-[11px] text-muted-foreground">XP points</div>
            </div>
          );
        })}
      </div>

      <Section>
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground uppercase">
            <tr className="text-left">
              <th className="pb-3 pl-2">Rank</th><th className="pb-3">Learner</th>
              <th className="pb-3">Course</th><th className="pb-3 text-right pr-2">XP</th>
            </tr>
          </thead>
          <tbody>
            {rest.map((u) => (
              <tr key={u.rank} className={cn(
                "border-t border-border",
                u.isCurrentUser && "bg-accent"
              )}>
                <td className="py-3 pl-2 font-semibold">#{u.rank}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-navy text-navy-foreground flex items-center justify-center text-xs font-semibold">{u.avatar}</div>
                    <span className="font-medium">{u.name}{u.isCurrentUser && <span className="ml-2 text-xs text-secondary">(you)</span>}</span>
                  </div>
                </td>
                <td className="py-3 text-muted-foreground">{u.course}</td>
                <td className="py-3 text-right font-semibold pr-2">{u.points.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
