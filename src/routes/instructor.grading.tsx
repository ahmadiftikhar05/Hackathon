import { createFileRoute } from "@tanstack/react-router";
import { InstructorGrading } from "@/pages/instructor/InstructorGrading";

export const Route = createFileRoute("/instructor/grading")({
  component: InstructorGrading,
});

