"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Mathematics", score: 85 },
  { name: "Science", score: 78 },
  { name: "History", score: 92 },
  { name: "English", score: 88 },
  { name: "Geography", score: 81 },
  { name: "Physics", score: 76 },
]

export function OverviewCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4 border-none shadow-sm bg-card/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Average Score by Subject</CardTitle>
          <CardDescription>Performance comparison across all taught subjects this term.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "none",
                    borderRadius: "var(--radius)",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  cursor={{ fill: "hsl(var(--muted) / 0.2)" }}
                />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3 border-none shadow-sm bg-card/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest quiz updates and student submissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {[
              { name: "Algebra II Quiz", subject: "Mathematics", date: "2 hours ago", status: "Completed" },
              { name: "Chemical Bonds", subject: "Science", date: "5 hours ago", status: "Grading" },
              { name: "French Revolution", subject: "History", date: "Yesterday", status: "Completed" },
              { name: "Global Trade", subject: "Geography", date: "2 days ago", status: "Pending" },
              { name: "Modernism", subject: "English", date: "3 days ago", status: "Completed" },
            ].map((item, i) => (
              <div key={i} className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.subject}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm font-medium">{item.date}</p>
                  <p className="text-xs text-muted-foreground">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
