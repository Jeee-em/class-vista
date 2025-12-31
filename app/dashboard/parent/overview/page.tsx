import { Users, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ParentOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Child Progress: Alice Johnson</h1>
          <p className="text-muted-foreground">Comprehensive summary of your child's academic journey.</p>
        </div>
        <div className="flex items-center gap-3 bg-card/50 backdrop-blur-md p-2 rounded-lg border border-border/50">
          <Avatar className="size-10 border-2 border-primary/20">
            <AvatarImage src="/diverse-students-studying.png" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">Alice Johnson</p>
            <p className="text-xs text-muted-foreground">11th Grade • Class 11-B</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Average</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">88.5%</div>
            <p className="text-xs text-muted-foreground">In top 15% of class</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <CheckCircle2 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground">2 days missed this term</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Behavoiral Note</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Excellent</div>
            <p className="text-xs text-muted-foreground">Consistent positive feedback</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next PTA</CardTitle>
            <AlertCircle className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Nov 12</div>
            <p className="text-xs text-muted-foreground">14:00 - Main Hall</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Recent Quiz Results</CardTitle>
            <CardDescription>View the most recent assessments taken by your child.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { subject: "Mathematics", topic: "Quadratic Equations", date: "Oct 24", score: 92, trend: "up" },
                { subject: "Biology", topic: "Cellular Respiration", date: "Oct 21", score: 85, trend: "stable" },
                { subject: "English", topic: "Modernist Literature", date: "Oct 18", score: 88, trend: "up" },
                { subject: "History", topic: "Industrial Revolution", date: "Oct 15", score: 79, trend: "down" },
              ].map((quiz, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{quiz.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {quiz.topic} • {quiz.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${quiz.score >= 90 ? "text-green-500" : quiz.score < 80 ? "text-amber-500" : ""}`}
                    >
                      {quiz.score}%
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      {quiz.trend === "up" ? "Improved" : quiz.trend === "down" ? "Needs Attention" : "Consistent"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-none shadow-sm bg-card/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Teacher Contact</CardTitle>
            <CardDescription>Direct line to your child's subject teachers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Mr. David Henderson", subject: "Math & Physics" },
                { name: "Ms. Sarah Williams", subject: "English & Literature" },
                { name: "Dr. James Aris", subject: "History & Geography" },
                { name: "Ms. Elena Rodriguez", subject: "Biology & Chemistry" },
              ].map((teacher, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage src={`/teacher-.jpg?height=32&width=32&query=teacher-${i}`} />
                    <AvatarFallback>
                      {teacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">{teacher.name}</p>
                    <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                  </div>
                  <div className="size-2 rounded-full bg-green-500 shrink-0" title="Online" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
