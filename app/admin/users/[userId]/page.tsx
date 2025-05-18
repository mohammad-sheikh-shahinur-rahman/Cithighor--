"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Shield, Mail, User, Calendar, Lock } from "lucide-react"

interface User {
  id: string
  username: string
  email: string
  role: string
  createdAt: string
  lastLogin: string
  isActive: boolean
}

export default function AdminUserPage({ params }: { params: Promise<{ userId: string }> }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const resolvedParams = use(params)

  useEffect(() => {
    // Check if user is logged in and is admin
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }

    try {
      const userData = JSON.parse(currentUser)
      if (userData.role !== "admin") {
        router.push("/dashboard")
        return
      }

      // Get user data from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find((u: User) => u.id === resolvedParams.userId)

      if (!foundUser) {
        toast({
          title: "ব্যবহারকারী পাওয়া যায়নি",
          description: "অনুগ্রহ করে আবার চেষ্টা করুন",
          variant: "destructive",
        })
        router.push("/admin/dashboard")
        return
      }

      setUser(foundUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
      return
    } finally {
      setLoading(false)
    }
  }, [router, resolvedParams.userId])

  const handleDeactivateUser = () => {
    if (!user) return

    // Update user status in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: User) =>
      u.id === user.id ? { ...u, isActive: !u.isActive } : u
    )
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    setUser({ ...user, isActive: !user.isActive })

    toast({
      title: user.isActive ? "ব্যবহারকারী নিষ্ক্রিয় করা হয়েছে" : "ব্যবহারকারী সক্রিয় করা হয়েছে",
      description: "ব্যবহারকারীর স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="animate-pulse text-amber-800">লোড হচ্ছে...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="text-amber-800">ব্যবহারকারী পাওয়া যায়নি</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[url('/images/paper-texture.png')] bg-repeat">
      <main className="container mx-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-amber-800">
                  ব্যবহারকারীর তথ্য
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-amber-800" />
                        <h3 className="font-medium text-amber-800">ব্যবহারকারীর নাম</h3>
                      </div>
                      <p className="text-amber-700">{user.username}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-5 w-5 text-amber-800" />
                        <h3 className="font-medium text-amber-800">ইমেইল</h3>
                      </div>
                      <p className="text-amber-700">{user.email}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-amber-800" />
                        <h3 className="font-medium text-amber-800">ভূমিকা</h3>
                      </div>
                      <p className="text-amber-700">{user.role}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Lock className="h-5 w-5 text-amber-800" />
                        <h3 className="font-medium text-amber-800">স্ট্যাটাস</h3>
                      </div>
                      <p className="text-amber-700">{user.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-amber-800" />
                        <h3 className="font-medium text-amber-800">অ্যাকাউন্ট তৈরি</h3>
                      </div>
                      <p className="text-amber-700">{new Date(user.createdAt).toLocaleDateString("bn-BD")}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-amber-800" />
                        <h3 className="font-medium text-amber-800">সর্বশেষ লগইন</h3>
                      </div>
                      <p className="text-amber-700">{new Date(user.lastLogin).toLocaleDateString("bn-BD")}</p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      onClick={handleDeactivateUser}
                      variant="outline"
                      className="border-amber-800 text-amber-800 hover:bg-amber-100"
                    >
                      {user.isActive ? "ব্যবহারকারী নিষ্ক্রিয় করুন" : "ব্যবহারকারী সক্রিয় করুন"}
                    </Button>
                    <Button
                      onClick={() => router.push("/admin/dashboard")}
                      className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                    >
                      ড্যাশবোর্ডে ফিরে যান
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
} 