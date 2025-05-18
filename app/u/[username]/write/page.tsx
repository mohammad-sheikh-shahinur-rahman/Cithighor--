"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface User {
  id: string
  username: string
  preferences?: {
    paperStyle: string
    inkColor: string
    fontStyle: string
  }
}

export default function PublicWritePage({ params }: { params: Promise<{ username: string }> }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [formData, setFormData] = useState({
    senderName: "",
    message: "",
    email: ""
  })
  const resolvedParams = use(params)

  useEffect(() => {
    try {
      // Get user data from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find((u: User) => u.username === resolvedParams.username)

      if (!foundUser) {
        toast({
          title: "ব্যবহারকারী পাওয়া যায়নি",
          description: "দুঃখিত, এই ব্যবহারকারী খুঁজে পাওয়া যায়নি",
          variant: "destructive"
        })
        router.push("/")
        return
      }

      setUser(foundUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      toast({
        title: "ত্রুটি",
        description: "ব্যবহারকারীর তথ্য লোড করতে সমস্যা হয়েছে",
        variant: "destructive"
      })
      router.push("/")
      return
    } finally {
      setLoading(false)
    }
  }, [router, resolvedParams.username])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    try {
      // Get existing letters
      const letters = JSON.parse(localStorage.getItem("letters") || "[]")
      
      // Create new letter with the same format as compose
      const newLetter = {
        id: Date.now().toString(),
        to: user?.username,
        from: formData.senderName,
        email: formData.email,
        message: formData.message,
        createdAt: new Date().toISOString(),
        read: false,
        replied: false,
        isPublic: true,
        // Add compose-specific fields
        paperStyle: "classic",
        inkColor: "black",
        fontStyle: "handwritten",
        sealStyle: "red",
        status: "sent",
        type: "public"
      }

      // Save letter
      letters.push(newLetter)
      localStorage.setItem("letters", JSON.stringify(letters))

      // Create notification for the recipient
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      const newNotification = {
        id: Date.now(),
        type: "message",
        title: "নতুন চিঠি",
        message: `${formData.senderName} থেকে আপনার কাছে একটি নতুন চিঠি এসেছে`,
        time: "এইমাত্র",
        read: false,
        userId: user?.id
      }
      notifications.push(newNotification)
      localStorage.setItem("notifications", JSON.stringify(notifications))

      // Update user's letter count
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const updatedUsers = users.map((u: User) => {
        if (u.username === user?.username) {
          return {
            ...u,
            letterCount: (u.letterCount || 0) + 1
          }
        }
        return u
      })
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      toast({
        title: "চিঠি পাঠানো হয়েছে",
        description: "আপনার চিঠি সফলভাবে পাঠানো হয়েছে",
      })

      // Reset form
      setFormData({
        senderName: "",
        message: "",
        email: ""
      })

      // Redirect to success page
      router.push(`/u/${user?.username}/success`)
    } catch (error) {
      console.error("Error sending letter:", error)
      toast({
        title: "ত্রুটি",
        description: "চিঠি পাঠানোতে সমস্যা হয়েছে",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="animate-pulse text-amber-800">লোড হচ্ছে...</div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-[url('/images/paper-texture.png')] bg-repeat">
      <main className="container mx-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-amber-800 text-center">
                  {user.username} কে চিঠি লিখুন
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="senderName" className="text-amber-800">
                      আপনার নাম
                    </Label>
                    <Input
                      id="senderName"
                      value={formData.senderName}
                      onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                      required
                      className="border-amber-200 focus:border-amber-800"
                      placeholder="আপনার নাম লিখুন"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-amber-800">
                      আপনার ইমেইল
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-amber-200 focus:border-amber-800"
                      placeholder="আপনার ইমেইল লিখুন"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-amber-800">
                      আপনার বার্তা
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="min-h-[200px] border-amber-200 focus:border-amber-800"
                      placeholder="আপনার বার্তা লিখুন..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        পাঠানো হচ্ছে...
                      </>
                    ) : (
                      "চিঠি পাঠান"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
} 