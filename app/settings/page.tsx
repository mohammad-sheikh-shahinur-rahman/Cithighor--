"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

interface User {
  id: string
  username: string
  email: string
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

export default function Settings() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("appearance")
  const [previewStyle, setPreviewStyle] = useState({
    paperStyle: "classic",
    inkColor: "black",
    fontStyle: "handwritten",
    sealStyle: "red"
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

      // Set default preferences if not exists
      const userWithPreferences = {
        ...foundUser,
        preferences: {
          paperStyle: foundUser.preferences?.paperStyle || "classic",
          inkColor: foundUser.preferences?.inkColor || "black",
          fontStyle: foundUser.preferences?.fontStyle || "handwritten",
          sealStyle: foundUser.preferences?.sealStyle || "red",
          theme: foundUser.preferences?.theme || "light",
          language: foundUser.preferences?.language || "bn",
          notifications: foundUser.preferences?.notifications ?? true,
          soundEnabled: foundUser.preferences?.soundEnabled ?? true,
          fontSize: foundUser.preferences?.fontSize || "medium",
          highContrast: foundUser.preferences?.highContrast ?? false,
          reducedMotion: foundUser.preferences?.reducedMotion ?? false
        }
      }

      setUser(userWithPreferences)
      setPreviewStyle({
        paperStyle: userWithPreferences.preferences.paperStyle,
        inkColor: userWithPreferences.preferences.inkColor,
        fontStyle: userWithPreferences.preferences.fontStyle,
        sealStyle: userWithPreferences.preferences.sealStyle
      })
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
      return
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleSave = () => {
    if (!user) return

    // Update user preferences in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: User) =>
      u.id === user.id ? { ...u, preferences: user.preferences } : u
    )
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    localStorage.setItem("currentUser", JSON.stringify(user))

    toast({
      title: "সেটিংস সেভ করা হয়েছে",
      description: "আপনার পছন্দগুলি সফলভাবে আপডেট করা হয়েছে",
    })
  }

  const handlePreviewChange = (key: string, value: string) => {
    setPreviewStyle(prev => ({ ...prev, [key]: value }))
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
                  সেটিংস
                </CardTitle>
                </CardHeader>
                <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                  <TabsList className="grid grid-cols-4 gap-4">
                    <TabsTrigger value="appearance" className="text-amber-800">অ্যাপিয়ারেন্স</TabsTrigger>
                    <TabsTrigger value="notifications" className="text-amber-800">নোটিফিকেশন</TabsTrigger>
                    <TabsTrigger value="language" className="text-amber-800">ভাষা</TabsTrigger>
                    <TabsTrigger value="accessibility" className="text-amber-800">অ্যাক্সেসিবিলিটি</TabsTrigger>
                  </TabsList>

                  <TabsContent value="appearance" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-amber-800">কাগজের স্টাইল</Label>
                          <RadioGroup
                            value={user.preferences.paperStyle}
                            onValueChange={(value) => {
                              setUser({ ...user, preferences: { ...user.preferences, paperStyle: value } })
                              handlePreviewChange("paperStyle", value)
                            }}
                            className="grid grid-cols-2 gap-4 mt-2"
                          >
                            <div>
                              <RadioGroupItem
                                value="classic"
                                id="classic"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="classic"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <span className="text-sm font-medium text-amber-800">ক্লাসিক</span>
                      </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="vintage"
                                id="vintage"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="vintage"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <span className="text-sm font-medium text-amber-800">ভিনটেজ</span>
                              </Label>
                    </div>
                            <div>
                              <RadioGroupItem
                                value="parchment"
                                id="parchment"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="parchment"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <span className="text-sm font-medium text-amber-800">পার্চমেন্ট</span>
                      </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="lined"
                                id="lined"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="lined"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <span className="text-sm font-medium text-amber-800">লাইনযুক্ত</span>
                              </Label>
                            </div>
                          </RadioGroup>
                    </div>

                        <div>
                          <Label className="text-amber-800">কালির রং</Label>
                          <RadioGroup
                            value={user.preferences.inkColor}
                            onValueChange={(value) => {
                              setUser({ ...user, preferences: { ...user.preferences, inkColor: value } })
                              handlePreviewChange("inkColor", value)
                            }}
                            className="grid grid-cols-5 gap-4 mt-2"
                          >
                            <div>
                              <RadioGroupItem
                                value="black"
                                id="black"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="black"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <div className="w-6 h-6 rounded-full bg-black"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="blue-600"
                                id="blue"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="blue"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="red-600"
                                id="red"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="red"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <div className="w-6 h-6 rounded-full bg-red-600"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="green-600"
                                id="green"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="green"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <div className="w-6 h-6 rounded-full bg-green-600"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="purple-600"
                                id="purple"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="purple"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <div className="w-6 h-6 rounded-full bg-purple-600"></div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <Label className="text-amber-800">ফন্ট স্টাইল</Label>
                          <RadioGroup
                            value={user.preferences.fontStyle}
                            onValueChange={(value) => {
                              setUser({ ...user, preferences: { ...user.preferences, fontStyle: value } })
                              handlePreviewChange("fontStyle", value)
                            }}
                            className="grid grid-cols-2 gap-4 mt-2"
                          >
                            <div>
                              <RadioGroupItem
                                value="handwritten"
                                id="handwritten"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="handwritten"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <span className="text-sm font-medium text-amber-800">হাতের লেখা</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="typewriter"
                                id="typewriter"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="typewriter"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <span className="text-sm font-medium text-amber-800">টাইপরাইটার</span>
                      </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="elegant"
                                id="elegant"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="elegant"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <span className="text-sm font-medium text-amber-800">এলিগ্যান্ট</span>
                              </Label>
                    </div>
                            <div>
                              <RadioGroupItem
                                value="modern"
                                id="modern"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="modern"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <span className="text-sm font-medium text-amber-800">আধুনিক</span>
                      </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <Label className="text-amber-800">মোমের সিল</Label>
                          <RadioGroup
                            value={user.preferences.sealStyle}
                            onValueChange={(value) => {
                              setUser({ ...user, preferences: { ...user.preferences, sealStyle: value } })
                              handlePreviewChange("sealStyle", value)
                            }}
                            className="grid grid-cols-5 gap-4 mt-2"
                          >
                            <div>
                              <RadioGroupItem
                                value="red"
                                id="seal-red"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="seal-red"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <div className="w-6 h-6 rounded-full bg-red-600"></div>
                              </Label>
                    </div>
                            <div>
                              <RadioGroupItem
                                value="blue"
                                id="seal-blue"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="seal-blue"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                      </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="gold"
                                id="seal-gold"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="seal-gold"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <div className="w-6 h-6 rounded-full bg-amber-400"></div>
                              </Label>
                    </div>
                            <div>
                              <RadioGroupItem
                                value="green"
                                id="seal-green"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="seal-green"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <div className="w-6 h-6 rounded-full bg-green-600"></div>
                        </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="purple"
                                id="seal-purple"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="seal-purple"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <div className="w-6 h-6 rounded-full bg-purple-600"></div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-amber-800">থিম</Label>
                          <RadioGroup
                            value={user.preferences.theme || "light"}
                            onValueChange={(value) =>
                              setUser({ ...user, preferences: { ...user.preferences, theme: value } })
                            }
                            className="grid grid-cols-3 gap-4 mt-2"
                          >
                            <div>
                              <RadioGroupItem
                                value="light"
                                id="light"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="light"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <span className="text-sm font-medium text-amber-800">লাইট</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="dark"
                                id="dark"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="dark"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <span className="text-sm font-medium text-amber-800">ডার্ক</span>
                        </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="sepia"
                                id="sepia"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="sepia"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                              >
                                <span className="text-sm font-medium text-amber-800">সেপিয়া</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="border-2 border-amber-200 rounded-lg p-4 bg-white">
                          <h3 className="text-lg font-medium text-amber-800 mb-4">প্রিভিউ</h3>
                          <div className={`p-4 rounded-lg ${previewStyle.paperStyle === "lined" ? "bg-[url('/lined-paper.png')]" : "bg-white"} ${previewStyle.paperStyle === "vintage" ? "bg-[url('/vintage-paper.png')]" : ""} ${previewStyle.paperStyle === "parchment" ? "bg-[url('/parchment-paper.png')]" : ""}`}>
                            <p className={`text-${previewStyle.inkColor} font-${previewStyle.fontStyle}`}>
                              এটি একটি প্রিভিউ টেক্সট। এখানে আপনি আপনার পছন্দের স্টাইল দেখতে পারবেন।
                            </p>
                            <div className="mt-4 flex justify-end">
                              <div className={`w-8 h-8 rounded-full bg-${previewStyle.sealStyle}-600`}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-amber-800">নোটিফিকেশন</Label>
                          <p className="text-sm text-amber-600">নতুন মেসেজ এবং আপডেট সম্পর্কে নোটিফিকেশন পান</p>
                        </div>
                        <Switch
                          checked={user.preferences.notifications}
                          onCheckedChange={(checked) =>
                            setUser({ ...user, preferences: { ...user.preferences, notifications: checked } })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-amber-800">সাউন্ড</Label>
                          <p className="text-sm text-amber-600">মেসেজ পাঠানোর সময় সাউন্ড ইফেক্ট</p>
                        </div>
                        <Switch
                          checked={user.preferences.soundEnabled}
                          onCheckedChange={(checked) =>
                            setUser({ ...user, preferences: { ...user.preferences, soundEnabled: checked } })
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="language" className="space-y-4">
                    <div>
                      <Label className="text-amber-800">ভাষা</Label>
                      <RadioGroup
                        value={user.preferences.language || "bn"}
                        onValueChange={(value) =>
                          setUser({ ...user, preferences: { ...user.preferences, language: value } })
                        }
                        className="grid grid-cols-2 gap-4 mt-2"
                      >
                        <div>
                          <RadioGroupItem
                            value="bn"
                            id="bn"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="bn"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                          >
                            <span className="text-sm font-medium text-amber-800">বাংলা</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="en"
                            id="en"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="en"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                      >
                            <span className="text-sm font-medium text-amber-800">English</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </TabsContent>

                  <TabsContent value="accessibility" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-amber-800">ফন্ট সাইজ</Label>
                        <RadioGroup
                          value={user.preferences.fontSize || "medium"}
                          onValueChange={(value) =>
                            setUser({ ...user, preferences: { ...user.preferences, fontSize: value } })
                          }
                          className="grid grid-cols-3 gap-4 mt-2"
                        >
                          <div>
                            <RadioGroupItem
                              value="small"
                              id="small"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="small"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                            >
                              <span className="text-sm font-medium text-amber-800">ছোট</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="medium"
                              id="medium"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="medium"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                            >
                              <span className="text-sm font-medium text-amber-800">মাঝারি</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="large"
                              id="large"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="large"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-amber-200 bg-white p-4 hover:bg-amber-50 peer-data-[state=checked]:border-amber-800 [&:has([data-state=checked])]:border-amber-800 cursor-pointer"
                            >
                              <span className="text-sm font-medium text-amber-800">বড়</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-amber-800">হাই কন্ট্রাস্ট</Label>
                          <p className="text-sm text-amber-600">উচ্চ কন্ট্রাস্ট মোড সক্রিয় করুন</p>
                        </div>
                        <Switch
                          checked={user.preferences.highContrast}
                          onCheckedChange={(checked) =>
                            setUser({ ...user, preferences: { ...user.preferences, highContrast: checked } })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-amber-800">কম মোশন</Label>
                          <p className="text-sm text-amber-600">অ্যানিমেশন এবং ট্রানজিশন কম করুন</p>
                        </div>
                        <Switch
                          checked={user.preferences.reducedMotion}
                          onCheckedChange={(checked) =>
                            setUser({ ...user, preferences: { ...user.preferences, reducedMotion: checked } })
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end mt-6">
                  <Button
                    onClick={handleSave}
                    className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                  >
                    সেটিংস সেভ করুন
                    </Button>
                </div>
                </CardContent>
              </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
