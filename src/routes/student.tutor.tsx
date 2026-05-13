import { createFileRoute } from "@tanstack/react-router";
import { StudentTutor } from "@/pages/student/StudentTutor";

export const Route = createFileRoute("/student/tutor")({
  component: StudentTutor,
});
