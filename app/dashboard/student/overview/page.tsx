import { GraduationCap, BookOpen, Clock, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function StudentOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, Alice</h1>
        <p className="text-muted-foreground">Here is a quick look at your academic performance this month.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Quiz</CardTitle>
            <BookOpen className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Algebra II - Oct 24</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Avg</CardTitle>
            <Target className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.5%</div>
            <p className="text-xs text-muted-foreground">+2.4% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Taken</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">In current semester</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <GraduationCap className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#12</div>
            <p className="text-xs text-muted-foreground">Out of 124 students</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
            <CardDescription>Stay on top of your schedule with upcoming quizzes and exams.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "World History: French Revolution", date: "Tomorrow, 10:00 AM", category: "Quiz" },
                { title: "Physics: Thermodynamics", date: "Friday, 1:30 PM", category: "Exam" },
                { title: "English: Modernist Poetry", date: "Oct 28, 9:00 AM", category: "Assessment" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-lg border border-border/50 p-3 bg-background/30"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="size-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.category}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Subject Mastery</CardTitle>
            <CardDescription>Your proficiency levels across core subjects.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { subject: "Mathematics", level: 92, color: "bg-blue-500" },
              { subject: "History", level: 95, color: "bg-green-500" },
              { subject: "Physics", level: 78, color: "bg-amber-500" },
              { subject: "English", level: 88, color: "bg-purple-500" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.subject}</span>
                  <span className="text-muted-foreground">{item.level}%</span>
                </div>
                <Progress value={item.level} className="h-2 bg-muted/50" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
