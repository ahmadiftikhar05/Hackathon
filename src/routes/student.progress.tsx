import { createFileRoute } from "@tanstack/react-router";
import { StudentProgress } from "@/pages/student/StudentProgress";

export const Route = createFileRoute("/student/progress")({
  component: StudentProgress,
});

