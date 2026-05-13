import { createFileRoute } from "@tanstack/react-router";
import { AdminCourses } from "@/pages/admin/AdminCourses";

export const Route = createFileRoute("/admin/courses")({
  component: AdminCourses,
});

