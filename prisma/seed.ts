import { PrismaClient, UserRole, StudentStatus, QuizStatus } from "@prisma/client"
import { hash } from "bcrypt"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

// Create Prisma client with pg adapter
const connectionString = process.env.DATABASE_URL!
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Starting database seed...")

  // Clear existing data
  await prisma.attendance.deleteMany()
  await prisma.quizResult.deleteMany()
  await prisma.quiz.deleteMany()
  await prisma.subject.deleteMany()
  await prisma.student.deleteMany()
  await prisma.parent.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Create Admin Users
  const admin1 = await prisma.user.create({
    data: {
      email: "admin@school.edu",
      password: await hash("admin123", 10),
      name: "Dr. Sarah Johnson",
      role: UserRole.ADMIN,
    },
  })

  const admin2 = await prisma.user.create({
    data: {
      email: "principal@school.edu",
      password: await hash("principal123", 10),
      name: "Mr. Michael Chen",
      role: UserRole.ADMIN,
    },
  })

  console.log("✅ Created admin users")

  // Create Parent Users with Student Profiles
  const parent1 = await prisma.user.create({
    data: {
      email: "parent1@example.com",
      password: await hash("parent123", 10),
      name: "Mrs. Emily Davis",
      role: UserRole.PARENT,
      parent: {
        create: {
          phoneNumber: "+1-555-0101",
          occupation: "Software Engineer",
          address: "123 Elm Street, Springfield",
        },
      },
    },
  })

  const parent2 = await prisma.user.create({
    data: {
      email: "parent2@example.com",
      password: await hash("parent123", 10),
      name: "Mr. Robert Williams",
      role: UserRole.PARENT,
      parent: {
        create: {
          phoneNumber: "+1-555-0102",
          occupation: "Doctor",
          address: "456 Oak Avenue, Springfield",
        },
      },
    },
  })

  const parent3 = await prisma.user.create({
    data: {
      email: "parent3@example.com",
      password: await hash("parent123", 10),
      name: "Mrs. Jennifer Martinez",
      role: UserRole.PARENT,
      parent: {
        create: {
          phoneNumber: "+1-555-0103",
          occupation: "Teacher",
          address: "789 Pine Road, Springfield",
        },
      },
    },
  })

  console.log("✅ Created parent users")

  // Fetch parent records
  const parent1Record = await prisma.parent.findUnique({ where: { userId: parent1.id } })
  const parent2Record = await prisma.parent.findUnique({ where: { userId: parent2.id } })
  const parent3Record = await prisma.parent.findUnique({ where: { userId: parent3.id } })

  // Create Student Users
  const students = [
    {
      email: "alice.j@school.edu",
      name: "Alice Johnson",
      grade: "11th",
      section: "A",
      rollNumber: 101,
      studentId: "STU2024101",
      dateOfBirth: new Date("2008-05-15"),
      phoneNumber: "+1-555-1101",
      parentId: parent1Record?.id,
      status: StudentStatus.ACTIVE,
    },
    {
      email: "bob.s@school.edu",
      name: "Bob Smith",
      grade: "10th",
      section: "B",
      rollNumber: 102,
      studentId: "STU2024102",
      dateOfBirth: new Date("2009-03-22"),
      phoneNumber: "+1-555-1102",
      parentId: parent1Record?.id,
      status: StudentStatus.AT_RISK,
    },
    {
      email: "charlie.d@school.edu",
      name: "Charlie Davis",
      grade: "12th",
      section: "A",
      rollNumber: 103,
      studentId: "STU2024103",
      dateOfBirth: new Date("2007-11-30"),
      phoneNumber: "+1-555-1103",
      parentId: parent2Record?.id,
      status: StudentStatus.ACTIVE,
    },
    {
      email: "diana.p@school.edu",
      name: "Diana Prince",
      grade: "11th",
      section: "B",
      rollNumber: 104,
      studentId: "STU2024104",
      dateOfBirth: new Date("2008-07-08"),
      phoneNumber: "+1-555-1104",
      parentId: parent2Record?.id,
      status: StudentStatus.ACTIVE,
    },
    {
      email: "ethan.h@school.edu",
      name: "Ethan Hunt",
      grade: "10th",
      section: "A",
      rollNumber: 105,
      studentId: "STU2024105",
      dateOfBirth: new Date("2009-09-14"),
      phoneNumber: "+1-555-1105",
      parentId: parent3Record?.id,
      status: StudentStatus.SUPPORT_NEEDED,
    },
    {
      email: "fiona.a@school.edu",
      name: "Fiona Apple",
      grade: "12th",
      section: "A",
      rollNumber: 106,
      studentId: "STU2024106",
      dateOfBirth: new Date("2007-02-20"),
      phoneNumber: "+1-555-1106",
      parentId: parent3Record?.id,
      status: StudentStatus.ACTIVE,
    },
    {
      email: "george.c@school.edu",
      name: "George Clark",
      grade: "11th",
      section: "A",
      rollNumber: 107,
      studentId: "STU2024107",
      dateOfBirth: new Date("2008-12-05"),
      phoneNumber: "+1-555-1107",
      status: StudentStatus.ACTIVE,
    },
    {
      email: "hannah.b@school.edu",
      name: "Hannah Brown",
      grade: "10th",
      section: "B",
      rollNumber: 108,
      studentId: "STU2024108",
      dateOfBirth: new Date("2009-06-18"),
      phoneNumber: "+1-555-1108",
      status: StudentStatus.ACTIVE,
    },
  ]

  for (const studentData of students) {
    await prisma.user.create({
      data: {
        email: studentData.email,
        password: await hash("student123", 10),
        name: studentData.name,
        role: UserRole.STUDENT,
        student: {
          create: {
            studentId: studentData.studentId,
            grade: studentData.grade,
            section: studentData.section,
            rollNumber: studentData.rollNumber,
            dateOfBirth: studentData.dateOfBirth,
            phoneNumber: studentData.phoneNumber,
            address: `${studentData.rollNumber} Student Lane, Springfield`,
            status: studentData.status,
            parentId: studentData.parentId,
          },
        },
      },
    })
  }

  console.log("✅ Created student users")

  // Create Subjects
  const subjects = [
    { name: "Mathematics", code: "MATH101", description: "Advanced Mathematics" },
    { name: "Physics", code: "PHYS101", description: "Physics Fundamentals" },
    { name: "Chemistry", code: "CHEM101", description: "General Chemistry" },
    { name: "Biology", code: "BIO101", description: "Life Sciences" },
    { name: "English Literature", code: "ENG101", description: "Literature and Composition" },
    { name: "History", code: "HIST101", description: "World History" },
    { name: "Geography", code: "GEO101", description: "Physical and Human Geography" },
    { name: "Computer Science", code: "CS101", description: "Introduction to Programming" },
  ]

  const createdSubjects = await Promise.all(
    subjects.map((subject) => prisma.subject.create({ data: subject }))
  )

  console.log("✅ Created subjects")

  // Create Quizzes
  const quizzes = [
    {
      title: "Algebra Fundamentals",
      description: "Test on algebraic equations and functions",
      subjectId: createdSubjects[0].id,
      totalMarks: 100,
      passingMarks: 40,
      duration: 60,
      status: QuizStatus.PUBLISHED,
      scheduledDate: new Date("2024-01-15"),
    },
    {
      title: "Calculus Mid-term",
      description: "Differentiation and integration concepts",
      subjectId: createdSubjects[0].id,
      totalMarks: 100,
      passingMarks: 40,
      duration: 90,
      status: QuizStatus.PUBLISHED,
      scheduledDate: new Date("2024-02-20"),
    },
    {
      title: "Newton's Laws",
      description: "Quiz on mechanics and motion",
      subjectId: createdSubjects[1].id,
      totalMarks: 50,
      passingMarks: 20,
      duration: 45,
      status: QuizStatus.PUBLISHED,
      scheduledDate: new Date("2024-01-18"),
    },
    {
      title: "Organic Chemistry Basics",
      description: "Hydrocarbons and functional groups",
      subjectId: createdSubjects[2].id,
      totalMarks: 75,
      passingMarks: 30,
      duration: 60,
      status: QuizStatus.PUBLISHED,
      scheduledDate: new Date("2024-01-22"),
    },
    {
      title: "Cell Biology",
      description: "Structure and function of cells",
      subjectId: createdSubjects[3].id,
      totalMarks: 100,
      passingMarks: 40,
      duration: 75,
      status: QuizStatus.PUBLISHED,
      scheduledDate: new Date("2024-02-01"),
    },
    {
      title: "Shakespeare Analysis",
      description: "Analysis of Hamlet and Macbeth",
      subjectId: createdSubjects[4].id,
      totalMarks: 100,
      passingMarks: 50,
      duration: 90,
      status: QuizStatus.PUBLISHED,
      scheduledDate: new Date("2024-01-25"),
    },
    {
      title: "World War II",
      description: "Events and impacts of WWII",
      subjectId: createdSubjects[5].id,
      totalMarks: 80,
      passingMarks: 32,
      duration: 60,
      status: QuizStatus.PUBLISHED,
      scheduledDate: new Date("2024-02-10"),
    },
    {
      title: "Python Programming Basics",
      description: "Variables, loops, and functions",
      subjectId: createdSubjects[7].id,
      totalMarks: 100,
      passingMarks: 40,
      duration: 120,
      status: QuizStatus.PUBLISHED,
      scheduledDate: new Date("2024-02-15"),
    },
  ]

  const createdQuizzes = await Promise.all(
    quizzes.map((quiz) => prisma.quiz.create({ data: quiz }))
  )

  console.log("✅ Created quizzes")

  // Create Quiz Results for Students
  const allStudents = await prisma.student.findMany()

  for (const student of allStudents) {
    // Each student has results for 4-6 random quizzes
    const numQuizzes = Math.floor(Math.random() * 3) + 4
    const selectedQuizzes = createdQuizzes
      .sort(() => 0.5 - Math.random())
      .slice(0, numQuizzes)

    for (const quiz of selectedQuizzes) {
      // Generate realistic scores based on student status
      let baseScore = 70
      if (student.status === StudentStatus.ACTIVE) {
        baseScore = 75 + Math.random() * 20 // 75-95%
      } else if (student.status === StudentStatus.AT_RISK) {
        baseScore = 50 + Math.random() * 25 // 50-75%
      } else if (student.status === StudentStatus.SUPPORT_NEEDED) {
        baseScore = 40 + Math.random() * 30 // 40-70%
      }

      const percentage = Math.min(100, Math.max(0, baseScore + (Math.random() * 10 - 5)))
      const marksObtained = (quiz.totalMarks * percentage) / 100

      let grade = "F"
      if (percentage >= 90) grade = "A+"
      else if (percentage >= 85) grade = "A"
      else if (percentage >= 80) grade = "A-"
      else if (percentage >= 75) grade = "B+"
      else if (percentage >= 70) grade = "B"
      else if (percentage >= 65) grade = "B-"
      else if (percentage >= 60) grade = "C+"
      else if (percentage >= 55) grade = "C"
      else if (percentage >= 50) grade = "C-"
      else if (percentage >= 40) grade = "D"

      await prisma.quizResult.create({
        data: {
          studentId: student.id,
          quizId: quiz.id,
          marksObtained: Math.round(marksObtained * 10) / 10,
          totalMarks: quiz.totalMarks,
          percentage: Math.round(percentage * 10) / 10,
          grade,
          remarks:
            percentage >= 90
              ? "Excellent performance!"
              : percentage >= 75
                ? "Good work!"
                : percentage >= 60
                  ? "Satisfactory"
                  : percentage >= 40
                    ? "Needs improvement"
                    : "Please see teacher",
          submittedAt: quiz.scheduledDate 
            ? new Date(quiz.scheduledDate.getTime() + 2 * 60 * 60 * 1000)
            : new Date(), // 2 hours after scheduled or now
        },
      })
    }
  }

  console.log("✅ Created quiz results")

  // Create Attendance Records for the last 30 days
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue

    for (const student of allStudents) {
      // 95% attendance for active students, lower for others
      let attendanceProbability = 0.95
      if (student.status === StudentStatus.AT_RISK) attendanceProbability = 0.85
      if (student.status === StudentStatus.SUPPORT_NEEDED) attendanceProbability = 0.75

      const present = Math.random() < attendanceProbability

      await prisma.attendance.create({
        data: {
          studentId: student.id,
          date,
          present,
          remarks: present ? undefined : "Absent",
        },
      })
    }
  }

  console.log("✅ Created attendance records")

  console.log("\n🎉 Seed completed successfully!\n")
  console.log("📧 Test Credentials:")
  console.log("   Admin:   admin@school.edu / admin123")
  console.log("   Student: alice.j@school.edu / student123")
  console.log("   Parent:  parent1@example.com / parent123\n")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e)
    await prisma.$disconnect()
    process.exit(1)
  })
