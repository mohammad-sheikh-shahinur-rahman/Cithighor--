"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Check if this is the super admin login
    if (formData.email === "shahinalam3546@gmail.com" && formData.password === "4111000310199") {
      // Create super admin user if it doesn't exist
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      let superAdmin = users.find((u: any) => u.email === "shahinalam3546@gmail.com")

      if (!superAdmin) {
        superAdmin = {
          id: "super-admin-" + Date.now().toString(),
          username: "superadmin",
          email: "shahinalam3546@gmail.com",
          password: "4111000310199", // In a real app, this would be hashed
          fullName: "মোহাম্মদ শেখ শাহিনুর রহমান",
          mobile: "+880 1234-567890",
          address: "ঢাকা, বাংলাদেশ",
          profileImage: null,
          createdAt: new Date().toISOString(),
          role: "superadmin",
          preferences: {
            paperStyle: "classic",
            inkColor: "black",
            fontStyle: "handwritten",
            sealStyle: "red",
          },
        }

        localStorage.setItem("users", JSON.stringify([...users, superAdmin]))
      }

      // Set current user as super admin
      localStorage.setItem("currentUser", JSON.stringify(superAdmin))

      toast({
        title: "সুপার এডমিন লগইন সফল",
        description: "আপনি সফলভাবে সুপার এডমিন হিসেবে লগইন করেছেন।",
      })

      // Redirect to admin dashboard
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 1000)

      return
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Find user with matching email and password
    const user = users.find((u: any) => u.email === formData.email && u.password === formData.password)

    if (!user) {
      toast({
        title: "লগইন ব্যর্থ",
        description: "ইমেইল বা পাসওয়ার্ড ভুল।",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Set current user
    localStorage.setItem("currentUser", JSON.stringify(user))

    toast({
      title: "লগইন সফল",
      description: "আপনি সফলভাবে লগইন করেছেন।",
    })

    // Redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/images/paper-texture.png')] p-4">
      <Card className="w-full max-w-md border-amber-200 bg-amber-50/90 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif font-bold text-center text-amber-800">লগইন</CardTitle>
          <CardDescription className="text-center text-amber-700">আপনার চিঠিঘরে প্রবেশ করুন</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-amber-800">
                ইমেইল
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="আপনার ইমেইল"
                required
                value={formData.email}
                onChange={handleChange}
                className="border-amber-200 bg-amber-50 text-amber-900 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-amber-800">
                পাসওয়ার্ড
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="আপনার পাসওয়ার্ড"
                required
                value={formData.password}
                onChange={handleChange}
                className="border-amber-200 bg-amber-50 text-amber-900 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <Button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50" disabled={loading}>
              {loading ? "প্রক্রিয়াকরণ হচ্ছে..." : "লগইন করুন"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-amber-700 text-center">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/register" className="text-amber-900 font-medium hover:underline">
              রেজিস্টার করুন
            </Link>
          </p>
          <Link href="/forgot-password" className="text-sm text-amber-900 font-medium hover:underline text-center">
            পাসওয়ার্ড ভুলে গেছেন?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
