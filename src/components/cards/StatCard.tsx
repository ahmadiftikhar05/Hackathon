import { cn } from "@/lib/utils";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({
  label, value, delta, icon: Icon, accent = false,
}: {
  label: string; value: string | number; delta?: string; icon?: LucideIcon; accent?: boolean;
}) {
  const positive = delta?.startsWith("+");
  return (
    <div className={cn(
      "rounded-2xl border border-border bg-card p-5 hover:shadow-sm transition-shadow",
      accent && "bg-navy text-navy-foreground border-transparent"
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className={cn("text-xs uppercase tracking-wide", accent ? "text-navy-foreground/70" : "text-muted-foreground")}>
          {label}
        </div>
        {Icon && (
          <div className={cn(
            "h-9 w-9 rounded-lg flex items-center justify-center",
            accent ? "bg-white/10" : "bg-accent text-accent-foreground"
          )}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight animate-count-up">{value}</div>
      {delta && (
        <div className={cn("mt-1 inline-flex items-center gap-1 text-xs",
          positive ? "text-secondary" : "text-destructive"
        )}>
          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {delta} <span className={cn(accent ? "text-navy-foreground/60" : "text-muted-foreground")}>vs last month</span>
        </div>
      )}
    </div>
  );
}
