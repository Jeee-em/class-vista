import { Search, FileText, ChevronRight, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const quizzes = [
  {
    id: "1",
    name: "Algebra II: Quadratic Equations",
    subject: "Mathematics",
    date: "Oct 24, 2024",
    score: 92,
    status: "A",
  },
  { id: "2", name: "Cell Structure & Function", subject: "Biology", date: "Oct 20, 2024", score: 85, status: "B" },
  { id: "3", name: "The Great Gatsby Analysis", subject: "English", date: "Oct 15, 2024", score: 88, status: "B+" },
  { id: "4", name: "World War I: Origins", subject: "History", date: "Oct 10, 2024", score: 95, status: "A" },
  { id: "5", name: "Newtonian Mechanics", subject: "Physics", date: "Oct 05, 2024", score: 76, status: "C" },
]

export default function StudentQuizzes() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Quiz History</h1>
        <p className="text-muted-foreground">Review your past assessments and download detailed performance reports.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input placeholder="Search quizzes..." className="pl-9 bg-card/50 border-none" />
        </div>
        <Button variant="outline" className="bg-card/50 border-none">
          Download All (PDF)
        </Button>
      </div>

      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className="border-none shadow-sm bg-card/50 backdrop-blur-md transition-all hover:bg-muted/10"
          >
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <FileText className="size-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{quiz.name}</h3>
                    <Badge variant="secondary" className="bg-background/50 font-normal">
                      {quiz.subject}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Taken on {quiz.date}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto">
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold">{quiz.score}%</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Grade {quiz.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                      <Download className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
