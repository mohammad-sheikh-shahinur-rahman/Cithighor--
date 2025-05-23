"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Mail, Star, Trash2 } from "lucide-react"

interface Notification {
  id: number
  type: "message" | "system" | "star" | "trash"
  title: string
  message: string
  time: string
  read: boolean
  userId: number
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(currentUser)

    // Load notifications from localStorage
    const storedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
    const userNotifications = storedNotifications.filter((n: Notification) => n.userId === userData.id)
    setNotifications(userNotifications)

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      const userUpdatedNotifications = updatedNotifications.filter((n: Notification) => n.userId === userData.id)
      setNotifications(userUpdatedNotifications)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [router])

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <Mail className="w-5 h-5 text-amber-600" />
      case "system":
        return <Bell className="w-5 h-5 text-amber-600" />
      case "star":
        return <Star className="w-5 h-5 text-amber-600" />
      case "trash":
        return <Trash2 className="w-5 h-5 text-amber-600" />
    }
  }

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }))
    setNotifications(updatedNotifications)

    // Update localStorage
    const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
    const updatedAllNotifications = allNotifications.map((n: Notification) => {
      if (notifications.some(notification => notification.id === n.id)) {
        return { ...n, read: true }
      }
      return n
    })
    localStorage.setItem("notifications", JSON.stringify(updatedAllNotifications))
  }

  const clearAll = () => {
    setNotifications([])

    // Update localStorage
    const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
    const filteredNotifications = allNotifications.filter((n: Notification) => 
      !notifications.some(notification => notification.id === n.id)
    )
    localStorage.setItem("notifications", JSON.stringify(filteredNotifications))
  }

  return (
    <div className="flex flex-col min-h-screen bg-[url('/images/paper-texture.png')] bg-repeat">
      <DashboardHeader toggleSidebar={() => {}} />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-serif font-bold text-amber-800">নোটিফিকেশন</h1>
            <div className="space-x-2">
              <Button 
                onClick={markAllAsRead}
                variant="outline"
                className="border-amber-200 text-amber-800 hover:bg-amber-100"
              >
                সব পঠিত হিসেবে চিহ্নিত করুন
              </Button>
              <Button 
                onClick={clearAll}
                variant="outline"
                className="border-amber-200 text-amber-800 hover:bg-amber-100"
              >
                সব মুছে ফেলুন
              </Button>
            </div>
          </div>

          {notifications.length === 0 ? (
            <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <p className="text-amber-700 text-center">কোন নোটিফিকেশন নেই</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id}
                  className={`border-amber-200 bg-amber-50/90 backdrop-blur-sm transition-colors ${
                    !notification.read ? "bg-amber-100/90" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-amber-800">{notification.title}</h3>
                          <span className="text-sm text-amber-600">{notification.time}</span>
                        </div>
                        <p className="text-amber-700 mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 