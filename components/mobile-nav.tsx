"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // When menu is open, prevent scrolling
    if (!isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      {/* Hamburger button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-amber-50 hover:bg-amber-800/20 hover:text-amber-200 z-50"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={closeMenu} aria-hidden="true" />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-amber-50 dark:bg-amber-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-100 font-bengali">মেনু</h2>
            <Button
              variant="ghost"
              size="icon"
              className="text-amber-800 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-800"
              onClick={closeMenu}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-amber-800 dark:text-amber-100 hover:text-amber-600 dark:hover:text-amber-300 font-medium py-2 font-bengali text-lg"
              onClick={closeMenu}
            >
              হোম
            </Link>
            <Link
              href="/about"
              className="text-amber-800 dark:text-amber-100 hover:text-amber-600 dark:hover:text-amber-300 font-medium py-2 font-bengali text-lg"
              onClick={closeMenu}
            >
              আমাদের সম্পর্কে
            </Link>
            <Link
              href="/features"
              className="text-amber-800 dark:text-amber-100 hover:text-amber-600 dark:hover:text-amber-300 font-medium py-2 font-bengali text-lg"
              onClick={closeMenu}
            >
              ফিচারসমূহ
            </Link>
            <Link
              href="/login"
              className="text-amber-800 dark:text-amber-100 hover:text-amber-600 dark:hover:text-amber-300 font-medium py-2 font-bengali text-lg"
              onClick={closeMenu}
            >
              লগইন
            </Link>
            <Link
              href="/register"
              className="text-amber-800 dark:text-amber-100 hover:text-amber-600 dark:hover:text-amber-300 font-medium py-2 font-bengali text-lg"
              onClick={closeMenu}
            >
              রেজিস্টার
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t border-amber-200 dark:border-amber-700">
            <div className="flex items-center justify-between">
              <span className="text-amber-800 dark:text-amber-100 font-bengali">থিম</span>
              <Button
                variant="ghost"
                size="icon"
                className="text-amber-800 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-800"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
