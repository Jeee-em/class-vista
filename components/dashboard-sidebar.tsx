"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Upload,
  BarChart3,
  History,
  TrendingUp,
  LogOut,
  GraduationCap,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

type Role = "admin" | "student" | "parent"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const roleNav: Record<Role, NavItem[]> = {
  admin: [
    { title: "Overview", href: "/dashboard/admin/overview", icon: LayoutDashboard },
    { title: "Students", href: "/dashboard/admin/students", icon: Users },
    { title: "Quizzes", href: "/dashboard/admin/quizzes", icon: BookOpen },
    { title: "Import Data", href: "/dashboard/admin/import", icon: Upload },
    { title: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  ],
  student: [
    { title: "Overview", href: "/dashboard/student/overview", icon: LayoutDashboard },
    { title: "My Quizzes", href: "/dashboard/student/quizzes", icon: History },
    { title: "Performance", href: "/dashboard/student/performance", icon: TrendingUp },
  ],
  parent: [
    { title: "Child Overview", href: "/dashboard/parent/overview", icon: LayoutDashboard },
    { title: "Quiz History", href: "/dashboard/parent/quizzes", icon: History },
    { title: "Analytics", href: "/dashboard/parent/analytics", icon: BarChart3 },
  ],
}

export function DashboardSidebar({ role }: { role: Role }) {
  const pathname = usePathname()
  const items = roleNav[role]

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={`/dashboard/${role}/overview`}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">EduPortal</span>
                  <span className="text-xs text-muted-foreground">High School v1.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => signOut({ callbackUrl: "/select-role" })}
              className="cursor-pointer"
            >
              <LogOut />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
