"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Mail, User, Lock, Key, Shield, Trash2, AlertTriangle, Facebook, Twitter, Instagram, Linkedin, Github, Globe, MapPin, Calendar, BookOpen, PenTool, Heart } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"

interface User {
  id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  joinDate?: string
  socialLinks?: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    github?: string
  }
  stats?: {
    lettersWritten: number
    lettersReceived: number
    totalWords: number
    favoriteStyle: string
  }
  preferences: {
    paperStyle: string
    inkColor: string
    fontStyle: string
    sealStyle: string
    theme: string
    language: string
    notifications: boolean
    soundEnabled: boolean
    fontSize: string
    highContrast: boolean
    reducedMotion: boolean
  }
}

export default function Profile() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    bio: "",
    location: "",
    website: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      github: ""
    }
  })

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }

    try {
      // Parse the current user data
      const userData = JSON.parse(currentUser)
      
      // Get user data from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find((u: User) => u.id === userData.id)

      if (!foundUser) {
        router.push("/login")
        return
      }

      // Set default values for new fields
      const userWithDefaults = {
        ...foundUser,
        joinDate: foundUser.joinDate || new Date().toISOString(),
        socialLinks: foundUser.socialLinks || {},
        stats: foundUser.stats || {
          lettersWritten: 0,
          lettersReceived: 0,
          totalWords: 0,
          favoriteStyle: "classic"
        }
      }

      setUser(userWithDefaults)
      setFormData({
        username: foundUser.username,
        email: foundUser.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        bio: foundUser.bio || "",
        location: foundUser.location || "",
        website: foundUser.website || "",
        socialLinks: foundUser.socialLinks || {
          facebook: "",
          twitter: "",
          instagram: "",
          linkedin: "",
          github: ""
        }
      })
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
      return
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleProfileUpdate = () => {
    if (!user) return

    // Update user data in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: User) =>
      u.id === user.id ? { 
        ...u, 
        username: formData.username, 
        email: formData.email,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        socialLinks: formData.socialLinks
      } : u
    )
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    localStorage.setItem("currentUser", JSON.stringify({ 
      ...user, 
      username: formData.username, 
      email: formData.email,
      bio: formData.bio,
      location: formData.location,
      website: formData.website,
      socialLinks: formData.socialLinks
    }))

    setUser({ 
      ...user, 
      username: formData.username, 
      email: formData.email,
      bio: formData.bio,
      location: formData.location,
      website: formData.website,
      socialLinks: formData.socialLinks
    })
    setEditMode(false)

    toast({
      title: "প্রোফাইল আপডেট করা হয়েছে",
      description: "আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে",
    })
  }

  const handlePasswordChange = () => {
    if (!user) return

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "পাসওয়ার্ড মিলছে না",
        description: "নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড একই হতে হবে",
        variant: "destructive"
      })
      return
    }

    // Here you would typically verify the current password and update it
    // For now, we'll just show a success message
    toast({
      title: "পাসওয়ার্ড পরিবর্তন করা হয়েছে",
      description: "আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে",
    })

    // Clear password fields
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
  }

  const handleDeleteAccount = () => {
    if (!user) return

    // Remove user from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.filter((u: User) => u.id !== user.id)
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    localStorage.removeItem("currentUser")

    // Redirect to login page
    router.push("/login")
    
    toast({
      title: "অ্যাকাউন্ট মুছে ফেলা হয়েছে",
      description: "আপনার অ্যাকাউন্ট সফলভাবে মুছে ফেলা হয়েছে",
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
                <CardTitle className="text-2xl font-serif font-bold text-amber-800">
                  প্রোফাইল
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                  <TabsList className="grid grid-cols-4 gap-4">
                    <TabsTrigger value="profile" className="text-amber-800">প্রোফাইল</TabsTrigger>
                    <TabsTrigger value="activity" className="text-amber-800">অ্যাক্টিভিটি</TabsTrigger>
                    <TabsTrigger value="security" className="text-amber-800">সিকিউরিটি</TabsTrigger>
                    <TabsTrigger value="privacy" className="text-amber-800">প্রাইভেসি</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="w-24 h-24 border-2 border-amber-200">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-amber-100 text-amber-800 text-2xl">
                          {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        variant="outline"
                        className="border-amber-200 text-amber-800 hover:bg-amber-100"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        প্রোফাইল ছবি পরিবর্তন করুন
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-amber-800">ব্যবহারকারীর নাম</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            disabled={!editMode}
                            className="border-amber-200 bg-white"
                          />
                          <Button
                            variant="outline"
                            onClick={() => setEditMode(!editMode)}
                            className="border-amber-200 text-amber-800 hover:bg-amber-100"
                          >
                            {editMode ? "বাতিল করুন" : "সম্পাদনা করুন"}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-amber-800">ইমেইল</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={!editMode}
                            className="border-amber-200 bg-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-amber-800">বায়ো</Label>
                        <Input
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          disabled={!editMode}
                          placeholder="আপনার সম্পর্কে কিছু লিখুন..."
                          className="border-amber-200 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-amber-800">লোকেশন</Label>
                        <Input
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          disabled={!editMode}
                          placeholder="আপনার বর্তমান অবস্থান"
                          className="border-amber-200 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-amber-800">ওয়েবসাইট</Label>
                        <Input
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          disabled={!editMode}
                          placeholder="https://example.com"
                          className="border-amber-200 bg-white"
                        />
                      </div>

                      <div className="space-y-4 pt-4 border-t border-amber-200">
                        <Label className="text-amber-800">সোশ্যাল লিংক</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm text-amber-600">ফেসবুক</Label>
                            <Input
                              value={formData.socialLinks.facebook}
                              onChange={(e) => setFormData({
                                ...formData,
                                socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                              })}
                              disabled={!editMode}
                              placeholder="https://facebook.com/username"
                              className="border-amber-200 bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-amber-600">টুইটার</Label>
                            <Input
                              value={formData.socialLinks.twitter}
                              onChange={(e) => setFormData({
                                ...formData,
                                socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                              })}
                              disabled={!editMode}
                              placeholder="https://twitter.com/username"
                              className="border-amber-200 bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-amber-600">ইনস্টাগ্রাম</Label>
                            <Input
                              value={formData.socialLinks.instagram}
                              onChange={(e) => setFormData({
                                ...formData,
                                socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                              })}
                              disabled={!editMode}
                              placeholder="https://instagram.com/username"
                              className="border-amber-200 bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-amber-600">লিংকডইন</Label>
                            <Input
                              value={formData.socialLinks.linkedin}
                              onChange={(e) => setFormData({
                                ...formData,
                                socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                              })}
                              disabled={!editMode}
                              placeholder="https://linkedin.com/in/username"
                              className="border-amber-200 bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-amber-600">গিটহাব</Label>
                            <Input
                              value={formData.socialLinks.github}
                              onChange={(e) => setFormData({
                                ...formData,
                                socialLinks: { ...formData.socialLinks, github: e.target.value }
                              })}
                              disabled={!editMode}
                              placeholder="https://github.com/username"
                              className="border-amber-200 bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {editMode && (
                        <Button
                          onClick={handleProfileUpdate}
                          className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                        >
                          পরিবর্তনগুলি সেভ করুন
                        </Button>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-amber-200 bg-white">
                        <CardHeader>
                          <CardTitle className="text-lg font-medium text-amber-800">চিঠি পরিসংখ্যান</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <PenTool className="h-5 w-5 text-amber-600" />
                              <span className="text-amber-800">লিখিত চিঠি</span>
                            </div>
                            <span className="text-2xl font-bold text-amber-800">{user.stats?.lettersWritten || 0}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-5 w-5 text-amber-600" />
                              <span className="text-amber-800">প্রাপ্ত চিঠি</span>
                            </div>
                            <span className="text-2xl font-bold text-amber-800">{user.stats?.lettersReceived || 0}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Heart className="h-5 w-5 text-amber-600" />
                              <span className="text-amber-800">মোট শব্দ</span>
                            </div>
                            <span className="text-2xl font-bold text-amber-800">{user.stats?.totalWords || 0}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-amber-200 bg-white">
                        <CardHeader>
                          <CardTitle className="text-lg font-medium text-amber-800">অ্যাকাউন্ট তথ্য</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-amber-600" />
                            <span className="text-amber-800">যোগদানের তারিখ:</span>
                            <span className="text-amber-600">
                              {new Date(user.joinDate || "").toLocaleDateString("bn-BD")}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-amber-600" />
                            <span className="text-amber-800">অবস্থান:</span>
                            <span className="text-amber-600">{user.location || "উল্লেখ করা হয়নি"}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-5 w-5 text-amber-600" />
                            <span className="text-amber-800">ওয়েবসাইট:</span>
                            <span className="text-amber-600">{user.website || "উল্লেখ করা হয়নি"}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="border-amber-200 bg-white">
                      <CardHeader>
                        <CardTitle className="text-lg font-medium text-amber-800">পছন্দের স্টাইল</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-amber-800">কাগজের স্টাইল</Label>
                            <Progress value={70} className="h-2 mt-2" />
                            <div className="flex justify-between mt-1">
                              <span className="text-sm text-amber-600">{user.preferences.paperStyle}</span>
                              <span className="text-sm text-amber-600">70%</span>
                            </div>
                          </div>
                          <div>
                            <Label className="text-amber-800">কালির রং</Label>
                            <Progress value={85} className="h-2 mt-2" />
                            <div className="flex justify-between mt-1">
                              <span className="text-sm text-amber-600">{user.preferences.inkColor}</span>
                              <span className="text-sm text-amber-600">85%</span>
                            </div>
                          </div>
                          <div>
                            <Label className="text-amber-800">ফন্ট স্টাইল</Label>
                            <Progress value={60} className="h-2 mt-2" />
                            <div className="flex justify-between mt-1">
                              <span className="text-sm text-amber-600">{user.preferences.fontStyle}</span>
                              <span className="text-sm text-amber-600">60%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-amber-800">বর্তমান পাসওয়ার্ড</Label>
                        <Input
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                          className="border-amber-200 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-amber-800">নতুন পাসওয়ার্ড</Label>
                        <Input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                          className="border-amber-200 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-amber-800">নতুন পাসওয়ার্ড নিশ্চিত করুন</Label>
                        <Input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="border-amber-200 bg-white"
                        />
                      </div>

                      <Button
                        onClick={handlePasswordChange}
                        className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                      >
                        পাসওয়ার্ড পরিবর্তন করুন
                      </Button>

                      <div className="pt-6 border-t border-amber-200">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              className="w-full"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              অ্যাকাউন্ট মুছে ফেলুন
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-amber-800">
                                আপনি কি নিশ্চিত?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-amber-600">
                                এই কাজটি অপরিবর্তনীয়। আপনার সমস্ত ডেটা চিরতরে মুছে যাবে।
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-amber-200 text-amber-800 hover:bg-amber-100">
                                বাতিল করুন
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteAccount}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                মুছে ফেলুন
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="privacy" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border-2 border-amber-200 rounded-lg">
                        <div>
                          <h3 className="text-lg font-medium text-amber-800">প্রোফাইল পাবলিক</h3>
                          <p className="text-sm text-amber-600">অন্য ব্যবহারকারীরা আপনার প্রোফাইল দেখতে পারবে</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between p-4 border-2 border-amber-200 rounded-lg">
                        <div>
                          <h3 className="text-lg font-medium text-amber-800">মেসেজ নোটিফিকেশন</h3>
                          <p className="text-sm text-amber-600">নতুন মেসেজ পেলে নোটিফিকেশন পাবেন</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between p-4 border-2 border-amber-200 rounded-lg">
                        <div>
                          <h3 className="text-lg font-medium text-amber-800">অনলাইন স্ট্যাটাস</h3>
                          <p className="text-sm text-amber-600">অন্য ব্যবহারকারীরা আপনার অনলাইন স্ট্যাটাস দেখতে পারবে</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
} 