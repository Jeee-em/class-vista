import { Search, Filter, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const history = [
  { id: "1", subject: "Mathematics", quiz: "Unit 4: Geometry", score: 94, date: "Oct 24, 2024", remark: "Excellent" },
  { id: "2", subject: "English", quiz: "Vocabulary Test", score: 82, date: "Oct 22, 2024", remark: "Good" },
  { id: "3", subject: "Biology", quiz: "Genetics Intro", score: 78, date: "Oct 19, 2024", remark: "Needs Review" },
  { id: "4", subject: "History", quiz: "The Renaissance", score: 91, date: "Oct 15, 2024", remark: "Very Good" },
  { id: "5", subject: "Geography", quiz: "Tectonic Plates", score: 85, date: "Oct 10, 2024", remark: "Consistent" },
]

export default function ParentQuizzes() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Quiz History</h1>
        <p className="text-muted-foreground">Complete record of Alice's assessment scores and teacher remarks.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input placeholder="Filter by subject or quiz name..." className="pl-9 bg-card/50 border-none" />
        </div>
        <Button variant="outline" className="bg-card/50 border-none">
          <Filter className="mr-2 size-4" /> Filter
        </Button>
      </div>

      <div className="rounded-md border border-border/50 overflow-hidden bg-card/30 backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-semibold text-muted-foreground border-b border-border/50 bg-muted/20">
          <div className="col-span-4 sm:col-span-3">Date</div>
          <div className="col-span-8 sm:col-span-4">Subject & Quiz</div>
          <div className="hidden sm:block col-span-2 text-center">Score</div>
          <div className="hidden sm:block col-span-2 text-center">Remark</div>
          <div className="hidden sm:block col-span-1"></div>
        </div>
        <div className="divide-y divide-border/50">
          {history.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/10 transition-colors">
              <div className="col-span-4 sm:col-span-3 text-sm">{item.date}</div>
              <div className="col-span-8 sm:col-span-4">
                <p className="text-sm font-medium">{item.subject}</p>
                <p className="text-xs text-muted-foreground">{item.quiz}</p>
              </div>
              <div className="hidden sm:block col-span-2 text-center">
                <Badge
                  variant="secondary"
                  className={`${item.score >= 90 ? "bg-green-500/10 text-green-500" : item.score < 80 ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500"}`}
                >
                  {item.score}%
                </Badge>
              </div>
              <div className="hidden sm:block col-span-2 text-center text-sm text-muted-foreground italic">
                {item.remark}
              </div>
              <div className="hidden sm:block col-span-1 text-right">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
