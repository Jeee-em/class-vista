import { Users, GraduationCap, ClipboardList, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewCharts } from "@/components/overview-charts"

export default function AdminOverview() {
  const stats = [
    {
      title: "Total Students",
      value: "124",
      icon: Users,
      description: "+4 from last month",
    },
    {
      title: "Average Score",
      value: "82.4%",
      icon: TrendingUp,
      description: "+2.1% from last term",
    },
    {
      title: "Quizzes Held",
      value: "48",
      icon: ClipboardList,
      description: "12 in last 30 days",
    },
    {
      title: "Passing Rate",
      value: "94%",
      icon: GraduationCap,
      description: "+1% from last year",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">Detailed summary of student performance and class metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
