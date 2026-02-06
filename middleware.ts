import NextAuth from "next-auth"
import authConfig from "./auth.config.edge"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role

  const isPublicRoute = nextUrl.pathname === "/select-role" || nextUrl.pathname === "/"
  const isLogin = nextUrl.pathname === "/login"
  const isDashboard = nextUrl.pathname.startsWith("/dashboard")

  // Allow public routes (select-role and root) - but only if not authenticated
  if (isPublicRoute) {
    if (isLoggedIn) {
      // Authenticated users should not access select-role, redirect to their dashboard
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole?.toLowerCase()}/overview`, nextUrl)
      )
    }
    return NextResponse.next()
  }

  // Handle login page
  if (isLogin) {
    if (isLoggedIn && userRole) {
      // User is already logged in, redirect to appropriate dashboard
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole.toLowerCase()}/overview`, nextUrl)
      )
    }
    return NextResponse.next()
  }

  // Redirect to select-role if not authenticated
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/select-role", nextUrl))
  }

  // Role-based dashboard access - strict validation
  if (isDashboard) {
    if (!userRole) {
      // User has no role, redirect to select-role
      return NextResponse.redirect(new URL("/select-role", nextUrl))
    }

    const roleRoute = nextUrl.pathname.split("/")[2] // admin, student, or parent
    const allowedRoles = ["admin", "student", "parent"]
    
    // If accessing /dashboard without specific role, redirect to user's role
    if (!roleRoute) {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole.toLowerCase()}/overview`, nextUrl)
      )
    }
    
    // Check if the route role is valid
    if (!allowedRoles.includes(roleRoute)) {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole.toLowerCase()}/overview`, nextUrl)
      )
    }
    
    // Ensure user can only access their own role's dashboard
    if (roleRoute !== userRole.toLowerCase()) {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole.toLowerCase()}/overview`, nextUrl)
      )
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
