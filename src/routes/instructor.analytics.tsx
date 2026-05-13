import { createFileRoute } from "@tanstack/react-router";
import { InstructorAnalytics } from "@/pages/instructor/InstructorAnalytics";

export const Route = createFileRoute("/instructor/analytics")({
  component: InstructorAnalytics,
});

