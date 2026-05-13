import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { CourseCard } from "@/components/cards/CourseCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { courses } from "@/data/mockData";

export const Route = createFileRoute("/student/courses")({
  component: MyCourses,
});

function MyCourses() {
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);
  const completed = courses.filter((c) => c.progress === 100);

  const grid = (list: typeof courses) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {list.map((c) => <CourseCard key={c.id} course={c} />)}
    </div>
  );

  return (
    <div className="max-w-7xl">
      <PageHeader title="My Courses" subtitle="Pick up where you left off" />
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({courses.length})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({inProgress.length})</TabsTrigger>
          <TabsTrigger value="done">Completed ({completed.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">{grid(courses)}</TabsContent>
        <TabsContent value="progress" className="mt-6">{grid(inProgress)}</TabsContent>
        <TabsContent value="done" className="mt-6">{grid(completed)}</TabsContent>
      </Tabs>
    </div>
  );
}
