import { createFileRoute } from "@tanstack/react-router";
import { StudentQuizzes } from "@/pages/student/StudentQuizzes";

export const Route = createFileRoute("/student/quizzes")({
  component: StudentQuizzes,
});

