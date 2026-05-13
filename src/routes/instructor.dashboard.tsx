import { createFileRoute } from "@tanstack/react-router";
import { InstructorDashboard } from "@/pages/instructor/InstructorDashboard";

export const Route = createFileRoute("/instructor/dashboard")({
  component: InstructorDashboard,
});

