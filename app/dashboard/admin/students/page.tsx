"use client"

import { useState } from "react"
import { Search, UserPlus, Filter, MoreHorizontal, Mail, Phone, Trash2, Edit } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const initialStudents = [
  { id: "1", name: "Alice Johnson", grade: "11th", email: "alice.j@school.edu", average: 88.5, status: "Active" },
  { id: "2", name: "Bob Smith", grade: "10th", email: "bob.s@school.edu", average: 76.2, status: "At Risk" },
  { id: "3", name: "Charlie Davis", grade: "12th", email: "charlie.d@school.edu", average: 92.4, status: "Active" },
  { id: "4", name: "Diana Prince", grade: "11th", email: "diana.p@school.edu", average: 84.1, status: "Active" },
  { id: "5", name: "Ethan Hunt", grade: "10th", email: "ethan.h@school.edu", average: 68.9, status: "Support Needed" },
  { id: "6", name: "Fiona Apple", grade: "12th", email: "fiona.a@school.edu", average: 95.8, status: "Active" },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = initialStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Student Directory</h1>
          <p className="text-muted-foreground">Manage student records and monitor individual performance.</p>
        </div>
        <Button className="shrink-0">
          <UserPlus className="mr-2 size-4" /> Add Student
        </Button>
      </div>

      <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-9 bg-background/50 border-none ring-offset-0 focus-visible:ring-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="shrink-0 bg-background/50 border-none">
              <Filter className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Grade</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Email</TableHead>
                  <TableHead className="font-semibold">Avg. Score</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/20 border-border/50">
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{student.email}</TableCell>
                    <TableCell>
                      <span
                        className={
                          student.average >= 90
                            ? "text-green-500 font-semibold"
                            : student.average < 75
                              ? "text-red-500 font-semibold"
                              : ""
                        }
                      >
                        {student.average}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          student.status === "Active"
                            ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                            : student.status === "At Risk"
                              ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                              : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 size-4" /> Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 size-4" /> Message Student
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 size-4" /> Contact Parent
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 size-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
