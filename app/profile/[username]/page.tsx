"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Mail, Calendar, BookOpen, PenTool, Heart } from "lucide-react"
import Image from "next/image"

interface User {
  id: string
  username: string
  email: string
  bio?: string
  createdAt: string
  preferences?: {
    paperStyle: string
    inkColor: string
    fontStyle: string
  }
}

export default function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const resolvedParams = use(params)

  useEffect(() => {
    try {
      // Get user data from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find((u: User) => u.username === resolvedParams.username)

      if (!foundUser) {
        router.push("/404")
        return
      }

      setUser(foundUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/404")
      return
    } finally {
      setLoading(false)
    }
  }, [router, resolvedParams.username])

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
    <div className="min-h-screen bg-[url('/paper-texture.png')] bg-repeat">
      <main className="container mx-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-amber-200">
                    <Image
                      src="/default-avatar.png"
                      alt={user.username}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle className="text-3xl font-serif font-bold text-amber-800">
                    {user.username}
                  </CardTitle>
                  {user.bio && (
                    <p className="text-center text-amber-700 max-w-2xl">
                      {user.bio}
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-5 w-5 text-amber-800" />
                        <h3 className="font-medium text-amber-800">ইমেইল</h3>
                      </div>
                      <p className="text-amber-700">{user.email}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-amber-800" />
                        <h3 className="font-medium text-amber-800">সদস্য</h3>
                      </div>
                      <p className="text-amber-700">
                        {new Date(user.createdAt).toLocaleDateString("bn-BD")} থেকে
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3 mt-8">
                    <div className="bg-amber-100/50 rounded-lg p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <BookOpen className="h-6 w-6 text-amber-800" />
                      </div>
                      <h3 className="font-medium text-amber-800 mb-1">চিঠি</h3>
                      <p className="text-2xl font-bold text-amber-900">০</p>
                    </div>
                    <div className="bg-amber-100/50 rounded-lg p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <PenTool className="h-6 w-6 text-amber-800" />
                      </div>
                      <h3 className="font-medium text-amber-800 mb-1">লেখা</h3>
                      <p className="text-2xl font-bold text-amber-900">০</p>
                    </div>
                    <div className="bg-amber-100/50 rounded-lg p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <Heart className="h-6 w-6 text-amber-800" />
                      </div>
                      <h3 className="font-medium text-amber-800 mb-1">পছন্দ</h3>
                      <p className="text-2xl font-bold text-amber-900">০</p>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={() => router.push(`/compose?to=${user.username}`)}
                      className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                    >
                      চিঠি লিখুন
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