import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useRole, type Role } from "@/lib/role-context";
import {
  LayoutDashboard, BookOpen, GraduationCap, Trophy, LineChart, Sparkles,
  Users, ClipboardList, FileBarChart, Boxes, Megaphone, ShieldCheck,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const NAV: Record<Role, { label: string; to: string; icon: any }[]> = {
  student: [
    { label: "Dashboard", to: "/student/dashboard", icon: LayoutDashboard },
    { label: "My Courses", to: "/student/courses", icon: BookOpen },
    { label: "Quizzes", to: "/student/quizzes", icon: ClipboardList },
    { label: "Progress", to: "/student/progress", icon: LineChart },
    { label: "Leaderboard", to: "/student/leaderboard", icon: Trophy },
    { label: "AI Tutor", to: "/student/tutor", icon: Sparkles },
  ],
  instructor: [
    { label: "Dashboard", to: "/instructor/dashboard", icon: LayoutDashboard },
    { label: "Students", to: "/instructor/students", icon: GraduationCap },
    { label: "Analytics", to: "/instructor/analytics", icon: LineChart },
    { label: "Content", to: "/instructor/content", icon: Boxes },
    { label: "Grading", to: "/instructor/grading", icon: ClipboardList },
  ],
  admin: [
    { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Course Catalog", to: "/admin/courses", icon: BookOpen },
    { label: "Users", to: "/admin/users", icon: Users },
    { label: "Announcements", to: "/admin/announcements", icon: Megaphone },
    { label: "Reports", to: "/admin/reports", icon: FileBarChart },
  ],
};

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const { role } = useRole();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = NAV[role];

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 sticky top-0 h-screen",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 overflow-hidden">
          <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
            a
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">atomcamp</div>
              <div className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">LMS</div>
            </div>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="p-1 rounded hover:bg-sidebar-accent text-sidebar-foreground/70"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {items.map((it) => {
          const active = path.startsWith(it.to);
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-secondary text-secondary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <it.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{it.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-sidebar-accent/40">
          <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-semibold text-sm shrink-0">
            SK
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">Sarah Khan</div>
              <div className="text-[11px] text-sidebar-foreground/60 truncate capitalize">{role}</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { role } = useRole();
  const navigate = useNavigate();
  const items = NAV[role];
  if (!open) return null;
  return (
    <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={onClose}>
      <div
        className="absolute left-0 top-0 bottom-0 w-72 bg-sidebar text-sidebar-foreground p-4 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center font-bold">a</div>
          <div className="font-semibold">atomcamp LMS</div>
        </div>
        <nav className="space-y-1">
          {items.map((it) => (
            <button
              key={it.to}
              onClick={() => { navigate({ to: it.to }); onClose(); }}
              className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent"
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
