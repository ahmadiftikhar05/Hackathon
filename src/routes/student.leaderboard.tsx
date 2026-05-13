import { createFileRoute } from "@tanstack/react-router";
import { StudentLeaderboard } from "@/pages/student/StudentLeaderboard";

export const Route = createFileRoute("/student/leaderboard")({
  component: StudentLeaderboard,
});

