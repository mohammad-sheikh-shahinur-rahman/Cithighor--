"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import MessageCard from "@/components/message-card"
import { Card, CardContent } from "@/components/ui/card"

interface Message {
  id: string
  to: string
  from: string
  email: string
  message: string
  createdAt: string
  paperStyle?: string
  inkColor?: string
  fontStyle?: string
  sealStyle?: string
  stampStyle?: string
  signature?: string
  read?: boolean
  replied?: boolean
  isPublic?: boolean
  status?: string
  type?: string
}

export default function Inbox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(currentUser)

    // Load messages for this user
    const allMessages = JSON.parse(localStorage.getItem("letters") || "[]")
    const userMessages = allMessages.filter((message: Message) => message.to === userData.username)

    // Sort messages by date (newest first)
    userMessages.sort((a: Message, b: Message) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    setMessages(userMessages)
    setLoading(false)
  }, [router])

  const handleDeleteMessage = (messageId: string) => {
    // Filter out the deleted message
    const updatedMessages = messages.filter((message) => message.id !== messageId)
    setMessages(updatedMessages)

    // Update localStorage
    const allMessages = JSON.parse(localStorage.getItem("letters") || "[]")
    const filteredMessages = allMessages.filter((message: Message) => message.id !== messageId)
    localStorage.setItem("letters", JSON.stringify(filteredMessages))
  }

  const handleMarkAsRead = (messageId: string) => {
    // Mark message as read
    const updatedMessages = messages.map((message) => {
      if (message.id === messageId) {
        return { ...message, read: true }
      }
      return message
    })
    setMessages(updatedMessages)

    // Update localStorage
    const allMessages = JSON.parse(localStorage.getItem("letters") || "[]")
    const updatedAllMessages = allMessages.map((message: Message) => {
      if (message.id === messageId) {
        return { ...message, read: true }
      }
      return message
    })
    localStorage.setItem("letters", JSON.stringify(updatedAllMessages))
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[url('/images/paper-texture.png')] bg-repeat">
        <DashboardHeader toggleSidebar={() => {}} />
        <main className="flex-1 container mx-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse text-amber-800">লোড হচ্ছে...</div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[url('/images/paper-texture.png')] bg-repeat">
      <DashboardHeader toggleSidebar={() => {}} />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-serif font-bold mb-6 text-amber-800">ইনবক্স</h1>
          {messages.length === 0 ? (
            <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <p className="text-amber-800">কোন চিঠি নেই</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {messages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  onDelete={() => handleDeleteMessage(message.id)}
                  onRead={() => handleMarkAsRead(message.id)}
                  paperStyle={message.paperStyle || "classic"}
                  inkColor={message.inkColor || "black"}
                  fontStyle={message.fontStyle || "handwritten"}
                  sealStyle={message.sealStyle || "red"}
                  stampStyle={message.stampStyle || "classic"}
                  signature={message.signature}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 