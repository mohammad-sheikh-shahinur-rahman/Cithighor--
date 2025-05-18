"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Archive,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Home,
  Inbox,
  Mail,
  MessageSquare,
  PenTool,
  Settings,
  Star,
  Trash2,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  unreadCount: number
  totalCount: number
}

export default function DashboardSidebar({ isOpen, unreadCount, totalCount }: SidebarProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // If sidebar is closed on mobile, don't render it
  if (isMobile && !isOpen) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-amber-50/90 backdrop-blur-sm border-r border-amber-200 pt-16 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16",
      )}
    >
      <div className="flex flex-col h-full p-4 overflow-y-auto">
        <nav className="space-y-1 flex-1">
          <SidebarItem
            href="/dashboard"
            icon={<Home className="h-5 w-5" />}
            label="ড্যাশবোর্ড"
            isActive={pathname === "/dashboard"}
            isCollapsed={!isOpen}
          />

          <SidebarItem
            href="/inbox"
            icon={<Inbox className="h-5 w-5" />}
            label="ইনবক্স"
            isActive={pathname === "/inbox"}
            isCollapsed={!isOpen}
            badge={unreadCount > 0 ? unreadCount.toString() : undefined}
          />

          <SidebarItem
            href="/compose"
            icon={<PenTool className="h-5 w-5" />}
            label="নতুন চিঠি লিখুন"
            isActive={pathname === "/compose"}
            isCollapsed={!isOpen}
          />

          <SidebarItem
            href="/starred"
            icon={<Star className="h-5 w-5" />}
            label="তারকাচিহ্নিত"
            isActive={pathname === "/starred"}
            isCollapsed={!isOpen}
          />

          <SidebarItem
            href="/sent"
            icon={<Mail className="h-5 w-5" />}
            label="প্রেরিত চিঠি"
            isActive={pathname === "/sent"}
            isCollapsed={!isOpen}
          />

          <SidebarItem
            href="/drafts"
            icon={<MessageSquare className="h-5 w-5" />}
            label="খসড়া"
            isActive={pathname === "/drafts"}
            isCollapsed={!isOpen}
          />

          <SidebarItem
            href="/archive"
            icon={<Archive className="h-5 w-5" />}
            label="আর্কাইভ"
            isActive={pathname === "/archive"}
            isCollapsed={!isOpen}
          />

          <SidebarItem
            href="/trash"
            icon={<Trash2 className="h-5 w-5" />}
            label="ট্র্যাশ"
            isActive={pathname === "/trash"}
            isCollapsed={!isOpen}
          />

          <div className="pt-4 mt-4 border-t border-amber-200">
            <SidebarItem
              href="/contacts"
              icon={<Users className="h-5 w-5" />}
              label="পরিচিতি"
              isActive={pathname === "/contacts"}
              isCollapsed={!isOpen}
            />

            <SidebarItem
              href="/templates"
              icon={<BookOpen className="h-5 w-5" />}
              label="টেমপ্লেট"
              isActive={pathname === "/templates"}
              isCollapsed={!isOpen}
            />

            <SidebarItem
              href="/settings"
              icon={<Settings className="h-5 w-5" />}
              label="সেটিংস"
              isActive={pathname === "/settings"}
              isCollapsed={!isOpen}
            />
          </div>
        </nav>

        <div className="pt-4 mt-auto border-t border-amber-200">
          <div className="flex items-center justify-between p-2">
            <div className={cn("text-sm font-medium text-amber-800", !isOpen && "hidden")}>মোট চিঠি: {totalCount}</div>
            <Button
              variant="ghost"
              size="icon"
              className="text-amber-800 hover:bg-amber-100 md:hidden"
              onClick={() => {
                // This would be handled by the parent component
                // We're just illustrating the UI here
              }}
            >
              {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  isCollapsed: boolean
  badge?: string
}

function SidebarItem({ href, icon, label, isActive, isCollapsed, badge }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "bg-amber-200 text-amber-900" : "text-amber-800 hover:bg-amber-100 hover:text-amber-900",
        isCollapsed && "justify-center px-0",
      )}
    >
      {icon}
      {!isCollapsed && (
        <>
          <span className="flex-1">{label}</span>
          {badge && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-amber-800 text-amber-50">
              {badge}
            </span>
          )}
        </>
      )}
      {isCollapsed && badge && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center w-4 h-4 text-xs font-medium rounded-full bg-amber-800 text-amber-50">
          {badge}
        </span>
      )}
    </Link>
  )
}
