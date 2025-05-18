"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Camera, Upload, X } from "lucide-react"
import Image from "next/image"

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    mobile: "",
    address: "",
  })
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    setProfileImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "পাসওয়ার্ড মিলছে না",
        description: "পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড একই হতে হবে।",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (!formData.mobile) {
      toast({
        title: "মোবাইল নম্বর প্রয়োজন",
        description: "অনুগ্রহ করে আপনার মোবাইল নম্বর প্রদান করুন।",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Get existing users from localStorage or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if username or email already exists
    const userExists = existingUsers.some(
      (user: any) => user.username === formData.username || user.email === formData.email,
    )

    if (userExists) {
      toast({
        title: "ইউজারনেম বা ইমেইল ইতিমধ্যে ব্যবহৃত",
        description: "অন্য ইউজারনেম বা ইমেইল ব্যবহার করুন।",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username: formData.username,
      email: formData.email,
      password: formData.password, // In a real app, you should hash this password
      fullName: formData.fullName,
      mobile: formData.mobile,
      address: formData.address,
      profileImage: profileImage,
      createdAt: new Date().toISOString(),
      role: "user", // Default role is user
      preferences: {
        paperStyle: "classic",
        inkColor: "black",
        fontStyle: "handwritten",
        sealStyle: "red",
      },
    }

    // Save to localStorage
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]))

    // Set current user
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    toast({
      title: "রেজিস্ট্রেশন সফল",
      description: "আপনার অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে।",
    })

    // Redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/paper-texture.png')] p-4">
      <Card className="w-full max-w-md border-amber-200 bg-amber-50/90 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif font-bold text-center text-amber-800">রেজিস্ট্রেশন</CardTitle>
          <CardDescription className="text-center text-amber-700">আপনার নিজস্ব চিঠিঘর তৈরি করুন</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="relative">
                <div
                  className="w-24 h-24 rounded-full border-2 border-amber-200 flex items-center justify-center overflow-hidden bg-amber-100 cursor-pointer"
                  onClick={triggerFileInput}
                >
                  {profileImage ? (
                    <Image
                      src={profileImage || "/placeholder.svg"}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  ) : (
                    <Camera className="h-8 w-8 text-amber-800" />
                  )}
                </div>
                {profileImage && (
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                aria-label="Upload profile picture"
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="mt-2 text-sm text-amber-800 hover:text-amber-900 flex items-center"
              >
                <Upload className="h-4 w-4 mr-1" /> প্রোফাইল ছবি আপলোড করুন
              </button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-amber-800">
                পূর্ণ নাম
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="আপনার পূর্ণ নাম"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="border-amber-200 bg-amber-50 text-amber-900 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-amber-800">
                ইউজারনেম
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="আপনার ইউজারনেম"
                required
                value={formData.username}
                onChange={handleChange}
                className="border-amber-200 bg-amber-50 text-amber-900 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

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
              <Label htmlFor="mobile" className="text-amber-800">
                মোবাইল নম্বর
              </Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="আপনার মোবাইল নম্বর"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="border-amber-200 bg-amber-50 text-amber-900 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-amber-800">
                ঠিকানা
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="আপনার ঠিকানা"
                value={formData.address}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-amber-800">
                কনফার্ম পাসওয়ার্ড
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="পাসওয়ার্ড আবার লিখুন"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border-amber-200 bg-amber-50 text-amber-900 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <Button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50" disabled={loading}>
              {loading ? "প্রক্রিয়াকরণ হচ্ছে..." : "রেজিস্টার করুন"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-amber-700">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link href="/login" className="text-amber-900 font-medium hover:underline">
              লগইন করুন
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
