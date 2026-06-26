"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { cache } from "react"

export const getStudentStats = cache(async () => {
  const session = await auth()
  
  if (!session?.user || session.user.role !== "STUDENT") {
    throw new Error("Unauthorized")
  }

  try {
    const student = await prisma.student.findUnique({
      where: {
        userId: session.user.id,
      },
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
      },
    })

    if (!student) {
      throw new Error("Student not found")
    }

    // Latest quiz score
    const latestQuiz = student.quizResults[0]
    
    // Monthly average (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const monthlyResults = student.quizResults.filter(
      result => result.submittedAt >= thirtyDaysAgo
    )
    
    const monthlyAverage = monthlyResults.length > 0
      ? monthlyResults.reduce((sum, result) => sum + result.percentage, 0) / monthlyResults.length
      : 0

    // Total quizzes taken
    const totalQuizzes = student.quizResults.length

    // Class ranking (rough calculation)
    const allStudents = await prisma.student.findMany({
      include: {
        quizResults: true,
      },
    })

    const studentAverages = allStudents.map(s => {
      const avg = s.quizResults.length > 0
        ? s.quizResults.reduce((sum, result) => sum + result.percentage, 0) / s.quizResults.length
        : 0
      return { studentId: s.id, average: avg }
    }).sort((a, b) => b.average - a.average)

    const rank = studentAverages.findIndex(s => s.studentId === student.id) + 1

    return {
      studentName: student.user.name,
      latestQuiz: latestQuiz ? {
        score: latestQuiz.percentage,
        subject: latestQuiz.quiz.subject.name,
        date: latestQuiz.submittedAt.toLocaleDateString(),
      } : null,
      monthlyAverage: Math.round(monthlyAverage * 10) / 10,
      totalQuizzes,
      classRank: rank,
      totalStudents: allStudents.length,
    }
  } catch (error) {
    console.error("Error fetching student stats:", error)
    throw new Error("Failed to fetch student statistics")
  }
})

export const getStudentSubjectMastery = cache(async () => {
  const session = await auth()
  
  if (!session?.user || session.user.role !== "STUDENT") {
    throw new Error("Unauthorized")
  }

  try {
    const student = await prisma.student.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        quizResults: {
          include: {
            quiz: {
              include: {
                subject: true,
              },
            },
          },
        },
      },
    })

    if (!student) {
      throw new Error("Student not found")
    }

    // Group results by subject
    const subjectResults = student.quizResults.reduce((acc, result) => {
      const subjectName = result.quiz.subject.name
      if (!acc[subjectName]) {
        acc[subjectName] = []
      }
      acc[subjectName].push(result.percentage)
      return acc
    }, {} as Record<string, number[]>)

    // Calculate average for each subject
    return Object.entries(subjectResults).map(([subject, scores]) => ({
      subject,
      level: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
      color: getSubjectColor(subject),
    }))
  } catch (error) {
    console.error("Error fetching student subject mastery:", error)
    throw new Error("Failed to fetch subject mastery")
  }
})

export const getUpcomingAssessments = cache(async () => {
  const session = await auth()
  
  if (!session?.user || session.user.role !== "STUDENT") {
    throw new Error("Unauthorized")
  }

  try {
    const upcomingQuizzes = await prisma.quiz.findMany({
      where: {
        status: "PUBLISHED",
        scheduledDate: {
          gte: new Date(),
        },
      },
      include: {
        subject: true,
      },
      orderBy: {
        scheduledDate: "asc",
      },
      take: 3,
    })

    return upcomingQuizzes.map(quiz => ({
      title: `${quiz.subject.name}: ${quiz.title}`,
      date: quiz.scheduledDate 
        ? quiz.scheduledDate.toLocaleDateString("en-US", { 
            weekday: "long", 
            month: "short", 
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
          })
        : "TBD",
      category: "Quiz",
    }))
  } catch (error) {
    console.error("Error fetching upcoming assessments:", error)
    throw new Error("Failed to fetch upcoming assessments")
  }
})

function getSubjectColor(subject: string): string {
  const colors = {
    "Mathematics": "bg-blue-500",
    "Physics": "bg-amber-500", 
    "Chemistry": "bg-green-500",
    "Biology": "bg-purple-500",
    "English Literature": "bg-pink-500",
    "History": "bg-red-500",
    "Geography": "bg-teal-500",
    "Computer Science": "bg-indigo-500",
  }
  return colors[subject as keyof typeof colors] || "bg-gray-500"
}