import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@school.edu" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" asChild>
            <Link href="/select-role">Sign In</Link>
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Contact Administration
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
