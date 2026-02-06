"use client"

import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import { ReactNode } from "react"

interface SessionWrapperProps {
  children: ReactNode
  session: Session | null
}

export function SessionWrapper({ children, session }: SessionWrapperProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}