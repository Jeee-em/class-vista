import { NextRequest, NextResponse } from "next/server"
import { compare } from "bcrypt"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { email, password, expectedRole } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
        parent: true,
      },
    })

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const isValid = await compare(password, user.password)

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Validate role matches expected role from login form
    if (expectedRole && user.role.toLowerCase() !== expectedRole.toLowerCase()) {
      return NextResponse.json(
        { error: `This account is for ${user.role.toLowerCase()} access only. Please use the correct login form.` },
        { status: 403 }
      )
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}