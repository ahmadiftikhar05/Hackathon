// Centralized hardcoded mock data for the atomcamp LMS prototype.

export const courses = [
  { id: "ai-bootcamp", title: "AI Bootcamp", instructor: "Jehangir Amjad", level: "Intermediate", students: 248, modules: 12, progress: 68, color: "from-emerald-400 to-teal-500", category: "AI", active: true },
  { id: "data-analytics", title: "Data Analytics Bootcamp", instructor: "Sidra Cheema", level: "Beginner", students: 312, modules: 10, progress: 34, color: "from-sky-400 to-indigo-500", category: "Data", active: true },
  { id: "agentic-ai", title: "Agentic AI Bootcamp", instructor: "Hussain Shahbaz", level: "Advanced", students: 156, modules: 14, progress: 91, color: "from-fuchsia-400 to-purple-500", category: "AI", active: true },
  { id: "automation-ai", title: "Automation with AI", instructor: "Jehangir Amjad", level: "Intermediate", students: 189, modules: 8, progress: 52, color: "from-amber-400 to-orange-500", category: "Automation", active: true },
  { id: "excel-course", title: "Excel Course", instructor: "Sidra Cheema", level: "Beginner", students: 421, modules: 6, progress: 100, color: "from-green-400 to-emerald-500", category: "Productivity", active: true },
  { id: "python-basics", title: "Python Basics", instructor: "Hussain Shahbaz", level: "Beginner", students: 502, modules: 9, progress: 12, color: "from-yellow-400 to-amber-500", category: "Programming", active: false },
];

export const students = [
  { id: 1, name: "Sarah Khan", city: "Lahore", course: "AI Bootcamp", progress: 68, risk: "low", streak: 14, avatar: "SK" },
  { id: 2, name: "Ali Raza", city: "Karachi", course: "Data Analytics", progress: 34, risk: "medium", streak: 4, avatar: "AR" },
  { id: 3, name: "Fatima Malik", city: "Islamabad", course: "Agentic AI", progress: 91, risk: "low", streak: 28, avatar: "FM" },
  { id: 4, name: "Usman Ahmed", city: "Rawalpindi", course: "Python Basics", progress: 12, risk: "high", streak: 1, avatar: "UA" },
  { id: 5, name: "Ayesha Iqbal", city: "Lahore", course: "Excel Course", progress: 100, risk: "low", streak: 9, avatar: "AI" },
  { id: 6, name: "Bilal Hassan", city: "Multan", course: "Automation with AI", progress: 47, risk: "medium", streak: 6, avatar: "BH" },
];

export const instructors = [
  { id: 1, name: "Jehangir Amjad", courses: 2, students: 437, rating: 4.9 },
  { id: 2, name: "Sidra Cheema", courses: 2, students: 733, rating: 4.8 },
  { id: 3, name: "Hussain Shahbaz", courses: 2, students: 658, rating: 4.7 },
];

export const quizzes = [
  { id: "q1", title: "Intro to Neural Networks", course: "AI Bootcamp", status: "pending", duration: 20, questions: 10, due: "Today" },
  { id: "q2", title: "Pandas DataFrames", course: "Data Analytics", status: "pending", duration: 15, questions: 8, due: "Tomorrow" },
  { id: "q3", title: "Agent Tooling", course: "Agentic AI", status: "submitted", duration: 25, questions: 12, due: "Yesterday" },
  { id: "q4", title: "Python Functions", course: "Python Basics", status: "graded", score: 88, duration: 15, questions: 10, due: "Last week" },
  { id: "q5", title: "Excel Formulas", course: "Excel Course", status: "graded", score: 95, duration: 20, questions: 15, due: "Last week" },
];

export const sampleQuestions = [
  { id: 1, q: "What is a transformer in deep learning?", options: ["A power converter", "A sequence model using attention", "A type of CNN", "A regression algorithm"], correct: 1 },
  { id: 2, q: "Which library is built on top of Pandas?", options: ["Numpy", "Polars", "Geopandas", "Matplotlib"], correct: 2 },
  { id: 3, q: "An autonomous agent typically requires…", options: ["Only a prompt", "Tools + memory + planning", "A GPU", "A database"], correct: 1 },
];

export const assignments = [
  { id: "a1", title: "Build a sentiment classifier", course: "AI Bootcamp", student: "Sarah Khan", submitted: "2h ago", status: "ungraded" },
  { id: "a2", title: "Sales dashboard in Excel", course: "Excel Course", student: "Ayesha Iqbal", submitted: "Yesterday", status: "graded", grade: 92 },
  { id: "a3", title: "Web scraper agent", course: "Agentic AI", student: "Fatima Malik", submitted: "3h ago", status: "ungraded" },
  { id: "a4", title: "Data cleaning notebook", course: "Data Analytics", student: "Ali Raza", submitted: "1d ago", status: "ungraded" },
];

export const leaderboard = [
  { rank: 1, name: "Fatima Malik", points: 4820, course: "Agentic AI", avatar: "FM" },
  { rank: 2, name: "Ayesha Iqbal", points: 4310, course: "Excel Course", avatar: "AI" },
  { rank: 3, name: "Sarah Khan", points: 3990, course: "AI Bootcamp", avatar: "SK" },
  { rank: 4, name: "Bilal Hassan", points: 3420, course: "Automation", avatar: "BH" },
  { rank: 5, name: "Ali Raza", points: 2780, course: "Data Analytics", avatar: "AR", isCurrentUser: true },
  { rank: 6, name: "Usman Ahmed", points: 1240, course: "Python Basics", avatar: "UA" },
];

export const activityData = [
  { day: "Mon", minutes: 45 }, { day: "Tue", minutes: 78 }, { day: "Wed", minutes: 32 },
  { day: "Thu", minutes: 95 }, { day: "Fri", minutes: 62 }, { day: "Sat", minutes: 110 }, { day: "Sun", minutes: 58 },
];

export const skillRadar = [
  { skill: "Python", value: 85 }, { skill: "ML", value: 72 }, { skill: "Stats", value: 60 },
  { skill: "Agents", value: 78 }, { skill: "SQL", value: 90 }, { skill: "Viz", value: 65 },
];

export const scoreDistribution = [
  { range: "0-20", count: 4 }, { range: "21-40", count: 12 }, { range: "41-60", count: 28 },
  { range: "61-80", count: 64 }, { range: "81-100", count: 42 },
];

export const enrollmentTrend = [
  { month: "Jan", students: 120 }, { month: "Feb", students: 180 }, { month: "Mar", students: 240 },
  { month: "Apr", students: 320 }, { month: "May", students: 410 }, { month: "Jun", students: 520 },
];

export const completionFunnel = [
  { stage: "Enrolled", value: 100 }, { stage: "Started", value: 86 },
  { stage: "Halfway", value: 64 }, { stage: "Completed", value: 41 },
];

export const announcements = [
  { id: 1, title: "New Agentic AI cohort launching", audience: "All Students", date: "May 10, 2026" },
  { id: 2, title: "Maintenance window Sunday 2 AM", audience: "Everyone", date: "May 8, 2026" },
];

export const notifications = [
  { id: 1, title: "Your AI Tutor has 3 new suggestions", time: "2m ago", type: "ai" },
  { id: 2, title: "Quiz 'Intro to Neural Networks' is due today", time: "1h ago", type: "deadline" },
  { id: 3, title: "Fatima moved up to #1 on the leaderboard", time: "3h ago", type: "social" },
];

export const upcomingDeadlines = [
  { id: 1, title: "Neural Networks Quiz", course: "AI Bootcamp", due: "Today, 11:59 PM" },
  { id: 2, title: "Sentiment Classifier Project", course: "AI Bootcamp", due: "Fri, 6 PM" },
  { id: 3, title: "Pandas DataFrames Quiz", course: "Data Analytics", due: "Tomorrow" },
];

export const upcomingSessions = [
  { id: 1, title: "Live: Transformer Architectures", time: "Today, 7:00 PM", students: 124 },
  { id: 2, title: "Office Hours: Agentic AI", time: "Tomorrow, 5:00 PM", students: 38 },
];

export const adminKpis = [
  { label: "Total Students", value: 1842, delta: "+12.4%" },
  { label: "Active Courses", value: 18, delta: "+2" },
  { label: "Monthly Revenue", value: "$48.2k", delta: "+8.1%" },
  { label: "Completion Rate", value: "67%", delta: "+3.2%" },
];

export const users = [
  { id: 1, name: "Sarah Khan", email: "sarah@atomcamp.io", role: "Student", joined: "Jan 2026" },
  { id: 2, name: "Jehangir Amjad", email: "jehangir@atomcamp.io", role: "Instructor", joined: "Sep 2024" },
  { id: 3, name: "Ali Raza", email: "ali@atomcamp.io", role: "Student", joined: "Feb 2026" },
  { id: 4, name: "Sidra Cheema", email: "sidra@atomcamp.io", role: "Instructor", joined: "Aug 2024" },
  { id: 5, name: "Admin User", email: "admin@atomcamp.io", role: "Admin", joined: "Jan 2024" },
  { id: 6, name: "Fatima Malik", email: "fatima@atomcamp.io", role: "Student", joined: "Mar 2026" },
];
