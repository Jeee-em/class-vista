import Link from "next/link"
import { GraduationCap, ShieldCheck, User, Users } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SelectRolePage() {
  const roles = [
    {
      title: "Teacher / Admin",
      description: "Manage students, quizzes, and view class-wide analytics.",
      icon: ShieldCheck,
      href: "/dashboard/admin/overview",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Student",
      description: "View your quiz results, performance trends, and study materials.",
      icon: User,
      href: "/dashboard/student/overview",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Parent",
      description: "Monitor your child's progress and quiz performance history.",
      icon: Users,
      href: "/dashboard/parent/overview",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <GraduationCap className="size-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to ClassVista</h1>
        <p className="text-muted-foreground">Please select your role to continue to the dashboard</p>
      </div>

      <div className="grid w-full max-w-4xl gap-4 md:grid-cols-3">
        {roles.map((role) => (
          <Link key={role.title} href={role.href} className="group">
            <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1 border-none bg-background/60 backdrop-blur-xl">
              <CardHeader>
                <div
                  className={`mb-2 inline-flex size-10 items-center justify-center rounded-lg ${role.bg} ${role.color}`}
                >
                  <role.icon className="size-6" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
