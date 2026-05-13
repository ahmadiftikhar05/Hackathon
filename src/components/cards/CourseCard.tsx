import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Users, BookOpen } from "lucide-react";

export function ProgressRing({ value, size = 56 }: { value: number; size?: number }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeOpacity="0.15" strokeWidth="6" fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke="currentColor" strokeWidth="6" fill="none"
        strokeDasharray={c} strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-secondary transition-all duration-700"
      />
      <text x="50%" y="50%" textAnchor="middle" dy="4" className="rotate-90 origin-center fill-foreground text-[11px] font-semibold">
        {value}%
      </text>
    </svg>
  );
}

export function CourseCard({ course }: { course: any }) {
  return (
    <Link
      to="/student/courses/$id"
      params={{ id: course.id }}
      className="group block rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className={cn("h-28 bg-gradient-to-br relative", course.color)}>
        <div className="absolute top-3 left-3 text-xs font-medium px-2 py-0.5 rounded-full bg-white/90 text-navy">
          {course.category}
        </div>
        <div className="absolute bottom-3 right-3 text-xs px-2 py-0.5 rounded-full bg-black/30 text-white backdrop-blur">
          {course.level}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold tracking-tight truncate group-hover:text-secondary transition-colors">
              {course.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">by {course.instructor}</p>
          </div>
          <ProgressRing value={course.progress} />
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> {course.modules} modules</div>
          <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {course.students}</div>
        </div>
      </div>
    </Link>
  );
}
