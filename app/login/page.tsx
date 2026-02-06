import { LoginForm } from "./login-form"
import { GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md shadow-lg border-none bg-background/60 backdrop-blur-xl">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
            <GraduationCap className="size-8" />
          </div>
          <CardTitle className="text-2xl font-bold">ClassVista</CardTitle>
          <CardDescription>Enter your credentials to access the performance portal</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
          <div className="text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Contact Administration
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
