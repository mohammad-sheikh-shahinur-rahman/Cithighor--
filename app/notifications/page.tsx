"use client"

import { useState } from "react"
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
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "message",
      title: "নতুন চিঠি",
      message: "আপনার একটি নতুন চিঠি এসেছে",
      time: "১০ মিনিট আগে",
      read: false
    },
    {
      id: 2,
      type: "system",
      title: "সিস্টেম আপডেট",
      message: "আমাদের সিস্টেমে নতুন ফিচার যোগ করা হয়েছে",
      time: "১ ঘন্টা আগে",
      read: true
    },
    {
      id: 3,
      type: "star",
      title: "তারকাচিহ্নিত",
      message: "আপনার চিঠিটি তারকাচিহ্নিত করা হয়েছে",
      time: "২ ঘন্টা আগে",
      read: true
    },
    {
      id: 4,
      type: "trash",
      title: "চিঠি মুছে ফেলা হয়েছে",
      message: "আপনার একটি চিঠি ট্র্যাশে স্থানান্তরিত করা হয়েছে",
      time: "১ দিন আগে",
      read: true
    }
  ])

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
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="flex flex-col min-h-screen bg-[url('/paper-texture.png')] bg-repeat">
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