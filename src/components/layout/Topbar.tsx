import { useRole, type Role } from "@/lib/role-context";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, Menu, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications } from "@/data/mockData";
import { cn } from "@/lib/utils";

const ROLE_HOMES: Record<Role, string> = {
  student: "/student/dashboard",
  instructor: "/instructor/dashboard",
  admin: "/admin/dashboard",
};

function pageTitle(path: string) {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return "Home";
  return parts[parts.length - 1].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function Breadcrumbs({ path }: { path: string }) {
  const parts = path.split("/").filter(Boolean);
  return (
    <div className="text-xs text-muted-foreground flex items-center gap-1.5">
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          <span className={cn("capitalize", i === parts.length - 1 && "text-foreground font-medium")}>
            {p.replace(/-/g, " ")}
          </span>
        </span>
      ))}
    </div>
  );
}

export function Topbar({ onMobileMenu }: { onMobileMenu: () => void }) {
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [notifOpen, setNotifOpen] = useState(false);

  const switchRole = (r: Role) => {
    setRole(r);
    navigate({ to: ROLE_HOMES[r] });
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur border-b border-border flex items-center gap-4 px-4 md:px-6">
      <button onClick={onMobileMenu} className="md:hidden p-2 -ml-2 rounded hover:bg-muted">
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="text-lg font-semibold tracking-tight truncate">{pageTitle(path)}</h1>
        <Breadcrumbs path={path} />
      </div>

      <div className="hidden md:flex items-center gap-2 bg-muted/60 rounded-lg px-3 py-1.5 w-72">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search courses, students…"
          className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
        />
      </div>

      <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
        <DropdownMenuTrigger asChild>
          <button className="relative p-2 rounded-lg hover:bg-muted">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-secondary" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.map((n) => (
            <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2">
              <div className="text-sm">{n.title}</div>
              <div className="text-xs text-muted-foreground">{n.time}</div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 bg-navy text-navy-foreground rounded-lg px-3 py-2 text-sm font-medium hover:opacity-90 transition-opacity">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <span className="capitalize">{role}</span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Switch role</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(["student", "instructor", "admin"] as Role[]).map((r) => (
            <DropdownMenuItem key={r} onClick={() => switchRole(r)} className="capitalize">
              {r}
              {role === r && <span className="ml-auto text-secondary">●</span>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
