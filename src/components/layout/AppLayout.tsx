import { useState, type ReactNode } from "react";
import { AppSidebar, MobileSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";
import { AITutorFab } from "@/components/shared/AITutorChat";

export function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMobileMenu={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 animate-fade-in">{children}</main>
      </div>

      <AITutorFab />
    </div>
  );
}
