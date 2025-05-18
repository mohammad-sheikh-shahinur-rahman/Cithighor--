"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnvelopeAnimation } from "@/components/envelope-animation"
import { SignatureCanvas } from "@/components/signature-canvas"
import { motion } from "framer-motion"
import { Share2, Mail, Star, Clock } from "lucide-react"

interface User {
  id: string
  username: string
  email: string
  preferences: {
    paperStyle: string
    inkColor: string
    fontStyle: string
    sealStyle: string
  }
}

export default function UserProfile() {
  const [message, setMessage] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [paperStyle, setPaperStyle] = useState("classic")
  const [inkColor, setInkColor] = useState("black")
  const [fontStyle, setFontStyle] = useState("handwritten")
  const [sealStyle, setSealStyle] = useState("red")
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const username = params.username as string

  const [stampStyle, setStampStyle] = useState("classic")
  const [signatureDataURL, setSignatureDataURL] = useState("")
  const [showSignaturePad, setShowSignaturePad] = useState(false)

  useEffect(() => {
    // Get user data from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find((u: User) => u.username === username)
    setUser(foundUser || null)
    setLoading(false)
  }, [username])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() || !user) return

    setSubmitting(true)
    setShowAnimation(true)

    // Play paper folding sound
    const audio = new Audio("/paper-fold.mp3")
    audio.play().catch((e) => console.error("Audio playback failed:", e))

    // Create new message with styling options and signature
    const newMessage = {
      id: Date.now().toString(),
      recipientId: user.id,
      content: message,
      createdAt: new Date().toISOString(),
      paperStyle,
      inkColor,
      fontStyle,
      sealStyle,
      stampStyle,
      signature: signatureDataURL,
      isRead: false,
    }

    // Delay to show animation
    setTimeout(() => {
      // Get existing messages or initialize empty array
      const existingMessages = JSON.parse(localStorage.getItem("messages") || "[]")

      // Save to localStorage
      localStorage.setItem("messages", JSON.stringify([...existingMessages, newMessage]))

      toast({
        title: "চিঠি পাঠানো হয়েছে",
        description: "আপনার চিঠি সফলভাবে পাঠানো হয়েছে।",
      })

      // Clear form
      setMessage("")
      setSubmitting(false)
      setShowAnimation(false)
      setSignatureDataURL("")
    }, 3000) // 3 seconds for animation
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${user?.username} এর চিঠিঘর`,
        text: `${user?.username} কে চিঠি লিখুন`,
        url: window.location.href,
      })
    } catch (err) {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "লিংক কপি করা হয়েছে",
        description: "আপনার বন্ধুদের সাথে শেয়ার করুন",
      })
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
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="text-amber-800">ব্যবহারকারী পাওয়া যায়নি</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[url('/paper-texture.png')] bg-repeat">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-amber-200 bg-amber-50/80 backdrop-blur-sm">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-serif font-bold text-3xl text-amber-800">চিঠিঘর</span>
        </Link>
      </header>
      <main className="flex-1 container mx-auto p-4 md:p-6 flex items-center justify-center">
        {showAnimation ? (
          <EnvelopeAnimation />
        ) : (
          <Card className="w-full max-w-2xl border-amber-200 bg-amber-50/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif text-amber-800">{username} এর চিঠিঘর</CardTitle>
              <CardDescription className="text-amber-700">{username} কে একটি চিঠি পাঠান</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-amber-800 mb-2">
                    {user.username} এর চিঠিঘর
                  </h1>
                  <p className="text-amber-700">
                    এই ব্যবহারকারীকে চিঠি লিখুন
                  </p>
                </div>
                <Button
                  onClick={handleShare}
                  className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  শেয়ার করুন
                </Button>
              </div>

              <Tabs defaultValue="write" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-amber-100 text-amber-800">
                  <TabsTrigger
                    value="write"
                    className="data-[state=active]:bg-amber-800 data-[state=active]:text-amber-50"
                  >
                    চিঠি লিখুন
                  </TabsTrigger>
                  <TabsTrigger
                    value="style"
                    className="data-[state=active]:bg-amber-800 data-[state=active]:text-amber-50"
                  >
                    স্টাইল করুন
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="write" className="mt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div
                        className={`
                          min-h-64 p-6 rounded-md border border-amber-200 
                          bg-[url('/paper-texture-${paperStyle}.png')] bg-repeat
                        `}
                      >
                        <Textarea
                          placeholder="আপনার চিঠি লিখুন..."
                          className={`
                            min-h-52 border-none bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0
                            text-${inkColor === "black" ? "amber-900" : inkColor} 
                            font-${fontStyle === "handwritten" ? "serif" : "sans"}
                          `}
                          style={{
                            fontFamily:
                              fontStyle === "handwritten"
                                ? "cursive"
                                : fontStyle === "typewriter"
                                  ? "monospace"
                                  : fontStyle === "elegant"
                                    ? "serif"
                                    : "sans-serif",
                          }}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50"
                        disabled={submitting}
                      >
                        {submitting ? "পাঠানো হচ্ছে..." : "চিঠি পাঠান"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="style" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="paper-style" className="text-amber-800">
                        কাগজের স্টাইল
                      </Label>
                      <Select value={paperStyle} onValueChange={setPaperStyle}>
                        <SelectTrigger id="paper-style" className="border-amber-200 bg-amber-50 text-amber-900">
                          <SelectValue placeholder="কাগজের স্টাইল বাছাই করুন" />
                        </SelectTrigger>
                        <SelectContent className="border-amber-200 bg-amber-50">
                          <SelectItem value="classic">ক্লাসিক</SelectItem>
                          <SelectItem value="vintage">ভিনটেজ</SelectItem>
                          <SelectItem value="parchment">পার্চমেন্ট</SelectItem>
                          <SelectItem value="lined">লাইনযুক্ত</SelectItem>
                          <SelectItem value="modern">আধুনিক</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ink-color" className="text-amber-800">
                        কালির রং
                      </Label>
                      <Select value={inkColor} onValueChange={setInkColor}>
                        <SelectTrigger id="ink-color" className="border-amber-200 bg-amber-50 text-amber-900">
                          <SelectValue placeholder="কালির রং বাছাই করুন" />
                        </SelectTrigger>
                        <SelectContent className="border-amber-200 bg-amber-50">
                          <SelectItem value="black">কালো</SelectItem>
                          <SelectItem value="blue-600">নীল</SelectItem>
                          <SelectItem value="red-600">লাল</SelectItem>
                          <SelectItem value="green-600">সবুজ</SelectItem>
                          <SelectItem value="purple-600">বেগুনি</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="font-style" className="text-amber-800">
                        ফন্ট স্টাইল
                      </Label>
                      <Select value={fontStyle} onValueChange={setFontStyle}>
                        <SelectTrigger id="font-style" className="border-amber-200 bg-amber-50 text-amber-900">
                          <SelectValue placeholder="ফন্ট স্টাইল বাছাই করুন" />
                        </SelectTrigger>
                        <SelectContent className="border-amber-200 bg-amber-50">
                          <SelectItem value="handwritten">হাতের লেখা</SelectItem>
                          <SelectItem value="typewriter">টাইপরাইটার</SelectItem>
                          <SelectItem value="elegant">এলিগ্যান্ট</SelectItem>
                          <SelectItem value="modern">আধুনিক</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seal-style" className="text-amber-800">
                        মোমের সিল
                      </Label>
                      <Select value={sealStyle} onValueChange={setSealStyle}>
                        <SelectTrigger id="seal-style" className="border-amber-200 bg-amber-50 text-amber-900">
                          <SelectValue placeholder="মোমের সিল বাছাই করুন" />
                        </SelectTrigger>
                        <SelectContent className="border-amber-200 bg-amber-50">
                          <SelectItem value="red">লাল</SelectItem>
                          <SelectItem value="blue">নীল</SelectItem>
                          <SelectItem value="gold">সোনালি</SelectItem>
                          <SelectItem value="green">সবুজ</SelectItem>
                          <SelectItem value="purple">বেগুনি</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stamp-style" className="text-amber-800">
                      পোস্ট স্ট্যাম্প
                    </Label>
                    <Select value={stampStyle} onValueChange={setStampStyle}>
                      <SelectTrigger id="stamp-style" className="border-amber-200 bg-amber-50 text-amber-900">
                        <SelectValue placeholder="স্ট্যাম্প বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent className="border-amber-200 bg-amber-50">
                        <SelectItem value="classic">ক্লাসিক</SelectItem>
                        <SelectItem value="bengali-1">বাংলাদেশ-১</SelectItem>
                        <SelectItem value="bengali-2">বাংলাদেশ-২</SelectItem>
                        <SelectItem value="vintage">ভিনটেজ</SelectItem>
                        <SelectItem value="modern">আধুনিক</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label className="text-amber-800 flex justify-between items-center">
                      <span>সিগনেচার</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSignaturePad(!showSignaturePad)}
                        className="border-amber-200 text-amber-800 hover:bg-amber-100"
                      >
                        {showSignaturePad ? "বন্ধ করুন" : "সিগনেচার যোগ করুন"}
                      </Button>
                    </Label>

                    {showSignaturePad && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border border-amber-200 rounded-md p-2 bg-amber-50"
                      >
                        <SignatureCanvas onSave={setSignatureDataURL} />
                      </motion.div>
                    )}

                    {signatureDataURL && (
                      <div className="mt-2 border border-amber-200 rounded-md p-2 bg-amber-50">
                        <p className="text-sm text-amber-800 mb-2">আপনার সিগনেচার:</p>
                        <div
                          className="h-20 bg-contain bg-no-repeat bg-center"
                          style={{ backgroundImage: `url(${signatureDataURL})` }}
                        ></div>
                      </div>
                    )}
                  </div>

                  <div className="bg-amber-100 p-4 rounded-md border border-amber-200">
                    <h3 className="text-sm font-medium text-amber-800 mb-2">প্রিভিউ</h3>
                    <div
                      className={`
                        p-4 rounded-md border border-amber-200 
                        bg-[url('/paper-texture-${paperStyle}.png')] bg-repeat
                      `}
                    >
                      <p
                        className={`
                          text-${inkColor === "black" ? "amber-900" : inkColor} 
                          font-${fontStyle === "handwritten" ? "serif" : "sans"}
                        `}
                        style={{
                          fontFamily:
                            fontStyle === "handwritten"
                              ? "cursive"
                              : fontStyle === "typewriter"
                                ? "monospace"
                                : fontStyle === "elegant"
                                  ? "serif"
                                  : "sans-serif",
                        }}
                      >
                        এটি আপনার চিঠির প্রিভিউ। এখানে আপনি দেখতে পাচ্ছেন কিভাবে আপনার চিঠি দেখাবে।
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-amber-700">আপনার পরিচয় গোপন থাকবে</p>
            </CardFooter>
          </Card>
        )}
      </main>
      <footer className="border-t border-amber-200 py-6 px-4 md:px-6 bg-amber-50/80 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-amber-700">© 2025 চিঠিঘর। সর্বস্বত্ব সংরক্ষিত।</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
            <Link className="text-xs text-amber-700 hover:underline underline-offset-4" href="#">
              গোপনীয়তা নীতি
            </Link>
            <Link className="text-xs text-amber-700 hover:underline underline-offset-4" href="#">
              ব্যবহারের শর্তাবলী
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
