import { Users, GraduationCap, ClipboardList, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewCharts } from "@/components/overview-charts"
import { getAdminStats } from "@/lib/actions/admin"

export default async function AdminOverview() {
  const stats = await getAdminStats()

  const statItems = [
    {
      title: "Total Students",
      value: stats.totalStudents.toString(),
      icon: Users,
      description: "Active students in system",
    },
    {
      title: "Average Score",
      value: `${stats.averageScore.toFixed(1)}%`,
      icon: TrendingUp,
      description: "Across all quiz results",
    },
    {
      title: "Quizzes Held",
      value: stats.totalQuizzes.toString(),
      icon: ClipboardList,
      description: "Published quizzes",
    },
    {
      title: "Passing Rate",
      value: `${stats.passingRate.toFixed(0)}%`,
      icon: GraduationCap,
      description: "Students scoring 40% or above",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">Detailed summary of student performance and class metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statItems.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm bg-card/50 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <OverviewCharts />
    </div>
  )
}
