import { createFileRoute } from "@tanstack/react-router";
import { StudentCourses } from "@/pages/student/StudentCourses";

export const Route = createFileRoute("/student/courses")({
  component: StudentCourses,
});

