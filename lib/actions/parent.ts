"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { cache } from "react"

export const getParentChildStats = cache(async () => {
  const session = await auth()
  
  if (!session?.user || session.user.role !== "PARENT") {
    throw new Error("Unauthorized")
  }

  try {
    const parent = await prisma.parent.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        students: {
          include: {
            user: true,
            quizResults: {
              include: {
                quiz: {
                  include: {
                    subject: true,
                  },
                },
              },
              orderBy: {
                submittedAt: "desc",
              },
            },
            attendances: {
              where: {
                date: {
                  gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                },
              },
            },
          },
        },
      },
    })

    if (!parent || parent.students.length === 0) {
      throw new Error("No children found")
    }

    // For demo, we'll use the first child
    const child = parent.students[0]
    
    // Calculate overall average
    const overallAverage = child.quizResults.length > 0
      ? child.quizResults.reduce((sum, result) => sum + result.percentage, 0) / child.quizResults.length
      : 0

    // Calculate attendance percentage
    const totalDays = child.attendances.length
    const presentDays = child.attendances.filter(att => att.present).length
    const attendancePercentage = totalDays > 0 ? (presentDays / totalDays) * 100 : 100

    // Recent quiz results by subject
    const recentResults = child.quizResults.slice(0, 4).map(result => ({
      subject: result.quiz.subject.name,
      topic: result.quiz.title,
      date: result.submittedAt.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      score: Math.round(result.percentage),
      trend: getTrend(result.percentage),
    }))

    return {
      childName: child.user.name,
      childGrade: child.grade,
      childSection: child.section || "A",
      overallAverage: Math.round(overallAverage * 10) / 10,
      attendancePercentage: Math.round(attendancePercentage),
      recentResults,
      behavioralNote: "Excellent", // This could be from a separate behavioral table
      nextPTA: "Nov 12", // This could be from a school events table
    }
  } catch (error) {
    console.error("Error fetching parent child stats:", error)
    throw new Error("Failed to fetch child statistics")
  }
})

function getTrend(score: number): "up" | "down" | "stable" {
  // This is a simplified trend calculation
  // In a real app, you'd compare with previous scores
  if (score >= 85) return "up"
  if (score < 75) return "down"
  return "stable"
}