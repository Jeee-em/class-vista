"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Award, BrainCircuit, Lightbulb, Users } from "lucide-react"

const subjectData = [
  { name: "Math", score: 92, color: "hsl(var(--chart-1))" },
  { name: "English", score: 88, color: "hsl(var(--chart-2))" },
  { name: "Biology", score: 85, color: "hsl(var(--chart-3))" },
  { name: "History", score: 95, color: "hsl(var(--chart-1))" },
  { name: "Physics", score: 78, color: "hsl(var(--chart-2))" },
]

export default function ParentAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Academic Analytics</h1>
        <p className="text-muted-foreground">In-depth analysis of strengths, areas for growth, and learning trends.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Subject Proficiency</CardTitle>
            <CardDescription>Current average score per subject for the active term.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectData} layout="vertical">
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "none",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-green-500" />
                <CardTitle className="text-base">Term Progress</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+5.2%</div>
              <p className="text-xs text-muted-foreground">Improvement in overall average compared to Q3</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Award className="size-4 text-primary" />
                <CardTitle className="text-base">Academic Status</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Honor Roll</div>
              <p className="text-xs text-muted-foreground">Eligible for High Academic Achievement Award</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md border-l-4 border-l-green-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1 text-green-500">
              <BrainCircuit className="size-5" />
              <CardTitle className="text-sm uppercase tracking-wider font-bold">Key Strengths</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Alice shows exceptional grasp of historical contexts and logical mathematical reasoning. Her participation
            in group discussions is a highlight.
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md border-l-4 border-l-amber-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1 text-amber-500">
              <Lightbulb className="size-5" />
              <CardTitle className="text-sm uppercase tracking-wider font-bold">Growth Areas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Physics conceptual problems (specifically Mechanics) require more practice. She could benefit from the
            optional Saturday workshop.
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1 text-primary">
              <Users className="size-5" />
              <CardTitle className="text-sm uppercase tracking-wider font-bold">Learning Style</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Alice is a visual and collaborative learner. She performs best when concepts are tied to real-world
            applications and discussed in peer groups.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
