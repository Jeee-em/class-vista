"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { month: "Jan", score: 78 },
  { month: "Feb", score: 82 },
  { month: "Mar", score: 80 },
  { month: "Apr", score: 85 },
  { month: "May", score: 88 },
  { month: "Jun", score: 87 },
  { month: "Jul", score: 91 },
  { month: "Aug", score: 89 },
  { month: "Sep", score: 92 },
  { month: "Oct", score: 94 },
]

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Performance Analytics</h1>
        <p className="text-muted-foreground">Track your academic progress and score trends over time.</p>
      </div>

      <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Overall Score Trend</CardTitle>
          <CardDescription>Your monthly average score across all subjects this academic year.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
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
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Subject Strength Analysis</CardTitle>
            <CardDescription>Where you're excelling and where you can improve.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                <h4 className="font-semibold text-green-500 mb-2">Strengths</h4>
                <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Consistent high performance in Mathematics and History.</li>
                  <li>Excellent participation in Science practical assessments.</li>
                  <li>Strong analytical skills shown in English Literature.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                <h4 className="font-semibold text-amber-500 mb-2">Opportunities</h4>
                <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Physics thermodynamics concepts need further review.</li>
                  <li>Focus on improving submission timelines for Geography assignments.</li>
                  <li>Consider joining the Mathematics study group for Advanced Calculus.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Teacher Feedback</CardTitle>
            <CardDescription>Recent comments from your subject instructors.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  teacher: "Mr. Henderson",
                  subject: "Mathematics",
                  comment: "Excellent work on the last quiz. Your understanding of quadratic functions is very strong.",
                },
                {
                  teacher: "Ms. Williams",
                  subject: "Physics",
                  comment: "You're making steady progress. Let's focus on the lab report for next week.",
                },
                {
                  teacher: "Dr. Aris",
                  subject: "History",
                  comment: "Your essay on the French Revolution was very insightful. Great depth of research.",
                },
              ].map((feedback, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{feedback.teacher}</span>
                    <span className="text-xs text-muted-foreground">{feedback.subject}</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{feedback.comment}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
