import { createFileRoute } from "@tanstack/react-router";
import { StudentCourseDetail } from "@/pages/student/StudentCourseDetail";

export const Route = createFileRoute("/student/courses/$id")({
  component: () => {
    const { id } = Route.useParams();
    return <StudentCourseDetail courseId={id} />;
  },
});


