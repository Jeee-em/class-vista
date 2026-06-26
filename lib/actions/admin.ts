"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { cache } from "react"

export const getAdminStats = cache(async () => {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    try {
        // Get total students count
        const totalStudents = await prisma.student.count()

        // Get average score across all quiz results
        const averageScoreResult = await prisma.quizResult.aggregate({
            _avg: {
                percentage: true,
            },
        })

        // Get total quizzes count
        const totalQuizzes = await prisma.quiz.count({
            where: {
                status: "PUBLISHED",
            },
        })

        // Get passing rate (assuming passing is 40% or above)
        const totalResults = await prisma.quizResult.count()
        const passingResults = await prisma.quizResult.count({
            where: {
                percentage: {
                    gte: 40,
                },
            },
        })

        const passingRate = totalResults > 0 ? (passingResults / totalResults) * 100 : 0

        return {
            totalStudents,
            averageScore: averageScoreResult._avg.percentage || 0,
            totalQuizzes,
            passingRate,
        }
    } catch (error) {
        console.error("Error fetching admin stats:", error)
        throw new Error("Failed to fetch admin statistics")
    }
})

export const getSubjectPerformance = cache(async () => {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    try {
        const subjectStats = await prisma.subject.findMany({
            include: {
                quizzes: {
                    include: {
                        results: true,
                    },
                },
            },
        })

        return subjectStats.map(subject => {
            const allResults = subject.quizzes.flatMap(quiz => quiz.results)
            const averageScore = allResults.length > 0
                ? allResults.reduce((sum, result) => sum + result.percentage, 0) / allResults.length
                : 0

            return {
                name: subject.name,
                score: Math.round(averageScore),
            }
        })
    } catch (error) {
        console.error("Error fetching subject performance:", error)
        throw new Error("Failed to fetch subject performance")
    }
})

export const getRecentQuizActivity = cache(async () => {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    try {
        const recentQuizzes = await prisma.quiz.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                subject: true,
                results: true,
            },
        })

        return recentQuizzes.map(quiz => ({
            name: quiz.title,
            subject: quiz.subject.name,
            date: quiz.createdAt.toLocaleDateString(),
            status: quiz.results.length > 0 ? "Completed" : "Pending",
        }))
    } catch (error) {
        console.error("Error fetching recent quiz activity:", error)
        throw new Error("Failed to fetch recent quiz activity")
    }
})