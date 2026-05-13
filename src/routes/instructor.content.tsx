import { createFileRoute } from "@tanstack/react-router";
import { InstructorContent } from "@/pages/instructor/InstructorContent";

export const Route = createFileRoute("/instructor/content")({
  component: InstructorContent,
});

