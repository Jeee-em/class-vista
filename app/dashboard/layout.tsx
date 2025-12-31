import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app, we'd get this from auth context/cookies
  // For UI demo, we'll infer it from the path in sub-layouts or keep it generic
  return (
    <SidebarProvider>
      {/* Sidebar is rendered by specific role layouts to ensure correct nav */}
      {children}
    </SidebarProvider>
  )
}
