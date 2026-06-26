"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { cache } from "react"

export const getAllStudents = cache(async () => {
  const session = await auth()
  
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  try {
    const students = await prisma.student.findMany({
      include: {
        user: true,
        parent: {
          include: {
            user: true,
          },
        },
        quizResults: true,
      },
      orderBy: {
        user: {
          name: "asc",
        },
      },
    })

    return students.map(student => {
      // Calculate average score
      const averageScore = student.quizResults.length > 0
        ? student.quizResults.reduce((sum, result) => sum + result.percentage, 0) / student.quizResults.length
        : 0

      return {
        id: student.id,
        studentId: student.studentId,
        name: student.user.name,
        email: student.user.email,
        grade: student.grade,
        section: student.section,
        rollNumber: student.rollNumber,
        status: student.status,
        average: Math.round(averageScore * 10) / 10,
        parentName: student.parent?.user.name || "No Parent Assigned",
        parentEmail: student.parent?.user.email || "",
        phoneNumber: student.phoneNumber,
        address: student.address,
      }
    })
  } catch (error) {
    console.error("Error fetching students:", error)
    throw new Error("Failed to fetch students")
  }
})