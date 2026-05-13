import { createFileRoute } from "@tanstack/react-router";
import { InstructorStudents } from "@/pages/instructor/InstructorStudents";

export const Route = createFileRoute("/instructor/students")({
  component: InstructorStudents,
});

