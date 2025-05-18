"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, LogOut, Menu, MessageSquare, Moon, Settings, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"

interface UserData {
  username: string
}

interface DashboardHeaderProps {
  toggleSidebar: () => void
}

export default function DashboardHeader({ toggleSidebar }: DashboardHeaderProps) {
  const [user, setUser] = useState<UserData | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-40 px-4 lg:px-6 h-16 flex items-center border-b border-amber-200 bg-amber-50/90 backdrop-blur-sm">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 text-amber-800 hover:bg-amber-100">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <Link className="flex items-center justify-center" href="/dashboard">
        <span className="font-serif font-bold text-3xl text-amber-800">চিঠিঘর</span>
      </Link>

      <div className="flex-1"></div>

      <nav className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-amber-800 hover:bg-amber-100"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button variant="ghost" size="icon" className="text-amber-800 hover:bg-amber-100" asChild>
          <Link href="/notifications">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>

        <Button variant="ghost" size="icon" className="text-amber-800 hover:bg-amber-100" asChild>
          <Link href="/compose">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Compose</span>
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="relative h-8 w-8 rounded-full border border-amber-200 bg-amber-100 text-amber-800 hover:bg-amber-200"
            >
              <User className="h-4 w-4" />
              <span className="sr-only">ইউজার মেনু</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-amber-200 bg-amber-50 w-56">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {user && <p className="font-medium text-amber-800">{user.username}</p>}
              </div>
            </div>
            <DropdownMenuSeparator className="bg-amber-200" />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="text-amber-800 focus:bg-amber-100 focus:text-amber-900 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>প্রোফাইল</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="text-amber-800 focus:bg-amber-100 focus:text-amber-900 cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>সেটিংস</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-amber-200" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-amber-800 focus:bg-amber-100 focus:text-amber-900 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>লগআউট</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  )
}
