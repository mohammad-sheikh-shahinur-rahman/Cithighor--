"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { SignatureCanvas } from "@/components/signature-canvas"
import { EnvelopeAnimation } from "@/components/envelope-animation"
import { TypewriterEditor } from "@/components/typewriter-editor"
import { TemplateSelector } from "@/components/template-selector"
import { StickerSelector } from "@/components/sticker-selector"
import { StampSelector } from "@/components/stamp-selector"
import {
  Volume2,
  VolumeX,
  Save,
  Send,
  LayoutTemplateIcon as Template,
  Palette,
  Sticker,
  PenTool,
  Settings,
  Image as ImageIcon,
  Music,
  Smile,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Star,
  Gift,
  Bookmark,
  Share2,
} from "lucide-react"

interface User {
  id: string
  username: string
  email: string
  preferences: {
    paperStyle: string
    inkColor: string
    fontStyle: string
    sealStyle: string
    stampStyle?: string
  }
}

export default function ComposePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [recipient, setRecipient] = useState("")
  const [message, setMessage] = useState("")
  const [paperStyle, setPaperStyle] = useState("classic")
  const [inkColor, setInkColor] = useState("black")
  const [fontStyle, setFontStyle] = useState("handwritten")
  const [sealStyle, setSealStyle] = useState("red")
  const [stampStyle, setStampStyle] = useState("classic")
  const [signatureDataURL, setSignatureDataURL] = useState("")
  const [showSignaturePad, setShowSignaturePad] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("write")
  const [showTemplates, setShowTemplates] = useState(false)
  const [showStickers, setShowStickers] = useState(false)
  const [showStamps, setShowStamps] = useState(false)
  const [showEmojis, setShowEmojis] = useState(false)
  const [showBackgroundMusic, setShowBackgroundMusic] = useState(false)
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showLocation, setShowLocation] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [showMood, setShowMood] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [showGift, setShowGift] = useState(false)
  const [selectedGift, setSelectedGift] = useState<string | null>(null)
  const [showBookmark, setShowBookmark] = useState(false)
  const [selectedBookmark, setSelectedBookmark] = useState<string | null>(null)

  const router = useRouter()
  const { toast } = useToast()

  let lastPaperFoldSoundTime = 0;

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(currentUser)
    setUser(userData)

    // Set default preferences from user settings
    if (userData.preferences) {
      setPaperStyle(userData.preferences.paperStyle || "classic")
      setInkColor(userData.preferences.inkColor || "black")
      setFontStyle(userData.preferences.fontStyle || "handwritten")
      setSealStyle(userData.preferences.sealStyle || "red")
      setStampStyle(userData.preferences.stampStyle || "classic")
    }

    // Get all users for recipient selection
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
    // Filter out current user
    const otherUsers = allUsers.filter((u: User) => u.id !== userData.id)
    setUsers(otherUsers)

    setLoading(false)
  }, [router])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() || !recipient || !user) return

    setSubmitting(true)
    setShowAnimation(true)

    // Play paper folding sound with debounce
    if (soundEnabled) {
      const now = Date.now();
      if (now - lastPaperFoldSoundTime > 500) { // 500ms debounce
        lastPaperFoldSoundTime = now;
        const audio = new Audio("/paper-fold.mp3");
        audio.play().catch(() => {});
      }
    }

    // Find recipient user
    const recipientUser = users.find((u) => u.username === recipient)

    if (!recipientUser) {
      toast({
        title: "প্রাপক পাওয়া যায়নি",
        description: "এই ইউজারনেমের কোনো ব্যবহারকারী নেই।",
        variant: "destructive",
      })
      setSubmitting(false)
      setShowAnimation(false)
      return
    }

    // Create new message with styling options and signature
    const newMessage = {
      id: Date.now().toString(),
      recipientId: recipientUser.id,
      senderId: user.id,
      content: message,
      createdAt: new Date().toISOString(),
      paperStyle,
      inkColor,
      fontStyle,
      sealStyle,
      stampStyle,
      signature: signatureDataURL,
      sticker: selectedSticker,
      music: selectedMusic,
      date: selectedDate,
      location: selectedLocation,
      mood: selectedMood,
      gift: selectedGift,
      bookmark: selectedBookmark,
      isRead: false,
    }

    // Delay to show animation
    setTimeout(() => {
      // Get existing messages or initialize empty array
      const existingMessages = JSON.parse(localStorage.getItem("messages") || "[]")

      // Save to localStorage
      localStorage.setItem("messages", JSON.stringify([...existingMessages, newMessage]))

      // Also save to sent messages
      const existingSentMessages = JSON.parse(localStorage.getItem("sentMessages") || "[]")
      localStorage.setItem("sentMessages", JSON.stringify([...existingSentMessages, newMessage]))

      // Create notification for the recipient
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      const newNotification = {
        id: Date.now(),
        type: "message",
        title: "নতুন চিঠি",
        message: `${user.username} থেকে আপনার কাছে একটি নতুন চিঠি এসেছে`,
        time: "এইমাত্র",
        read: false,
        userId: recipientUser.id
      }
      notifications.push(newNotification)
      localStorage.setItem("notifications", JSON.stringify(notifications))

      toast({
        title: "চিঠি পাঠানো হয়েছে",
        description: "আপনার চিঠি সফলভাবে পাঠানো হয়েছে।",
      })

      // Clear form
      setMessage("")
      setRecipient("")
      setSubmitting(false)
      setShowAnimation(false)
      setSignatureDataURL("")
      setSelectedSticker(null)
      setSelectedMusic(null)
      setSelectedDate(null)
      setSelectedLocation(null)
      setSelectedMood(null)
      setSelectedGift(null)
      setSelectedBookmark(null)
    }, 3000) // 3 seconds for animation
  }

  const handleSaveDraft = () => {
    if (!user) return

    // Create draft message
    const draftMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      recipient: recipient,
      content: message,
      createdAt: new Date().toISOString(),
      paperStyle,
      inkColor,
      fontStyle,
      sealStyle,
      stampStyle,
      signature: signatureDataURL,
      sticker: selectedSticker,
      music: selectedMusic,
      date: selectedDate,
      location: selectedLocation,
      mood: selectedMood,
      gift: selectedGift,
      bookmark: selectedBookmark,
      isDraft: true,
    }

    // Get existing drafts or initialize empty array
    const existingDrafts = JSON.parse(localStorage.getItem("drafts") || "[]")

    // Save to localStorage
    localStorage.setItem("drafts", JSON.stringify([...existingDrafts, draftMessage]))

    toast({
      title: "খসড়া সংরক্ষিত হয়েছে",
      description: "আপনার চিঠি খসড়া হিসেবে সংরক্ষিত হয়েছে।",
    })
  }

  const handleTemplateSelect = (content: string) => {
    setMessage(content)
    setShowTemplates(false)
    setActiveTab("write")
  }

  const handleSignatureSave = (dataURL: string) => {
    setSignatureDataURL(dataURL)
    setShowSignaturePad(false)
    toast({
      title: "সফল",
      description: "সিগনেচার সেভ করা হয়েছে।",
    })
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-amber-50">লোড হচ্ছে...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <DashboardSidebar isOpen={sidebarOpen} unreadCount={0} totalCount={0} />
        <main className={`flex-1 p-4 md:p-6 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "ml-0"}`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-serif font-bold text-amber-800">নতুন চিঠি লিখুন</h1>

              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSound}
                  className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
                  title={soundEnabled ? "শব্দ বন্ধ করুন" : "শব্দ চালু করুন"}
                >
                  {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  <span className="sr-only">{soundEnabled ? "শব্দ বন্ধ করুন" : "শব্দ চালু করুন"}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSaveDraft}
                  className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
                  title="খসড়া সংরক্ষণ করুন"
                >
                  <Save className="h-5 w-5" />
                  <span className="sr-only">খসড়া সংরক্ষণ করুন</span>
                </Button>
              </div>
            </div>

              <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <Tabs defaultValue="write" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-amber-100 text-amber-800">
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
                    <TabsTrigger
                      value="decorate"
                      className="data-[state=active]:bg-amber-800 data-[state=active]:text-amber-50"
                    >
                      সাজান
                    </TabsTrigger>
                    <TabsTrigger
                      value="extras"
                      className="data-[state=active]:bg-amber-800 data-[state=active]:text-amber-50"
                    >
                      অতিরিক্ত
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="write" className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                              <Label htmlFor="recipient" className="text-amber-800">
                                প্রাপক
                              </Label>
                              <Select value={recipient} onValueChange={setRecipient}>
                                <SelectTrigger id="recipient" className="border-amber-200 bg-amber-50 text-amber-900">
                                  <SelectValue placeholder="প্রাপক বাছাই করুন" />
                                </SelectTrigger>
                                <SelectContent className="border-amber-200 bg-amber-50">
                                  {users.map((user) => (
                                    <SelectItem key={user.id} value={user.username}>
                                      {user.username}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                          </div>

                              <div
                                className="min-h-64 p-6 rounded-md border border-amber-200 bg-amber-50"
                              >
                                <TypewriterEditor
                                  value={message}
                                  onChange={setMessage}
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
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowSignaturePad(!showSignaturePad)}
                            className="border-amber-200 text-amber-800 hover:bg-amber-100"
                          >
                            <PenTool className="h-4 w-4 mr-2" />
                            {showSignaturePad ? "সিগনেচার বন্ধ করুন" : "সিগনেচার যোগ করুন"}
                          </Button>

                          <Button
                            type="submit"
                            className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                            disabled={submitting}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            {submitting ? "পাঠানো হচ্ছে..." : "চিঠি পাঠান"}
                          </Button>
                        </div>

                        {showSignaturePad && (
                          <div className="border border-amber-200 rounded-md p-4 bg-amber-50">
                            <SignatureCanvas onSave={handleSignatureSave} />
                          </div>
                        )}

                        {signatureDataURL && !showSignaturePad && (
                          <div className="mt-4 border border-amber-200 rounded-md p-4 bg-amber-50">
                            <p className="text-sm text-amber-800 mb-2">আপনার সিগনেচার:</p>
                            <div
                              className="h-20 bg-contain bg-no-repeat bg-center"
                              style={{ backgroundImage: `url(${signatureDataURL})` }}
                            ></div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setShowSignaturePad(true)}
                              className="mt-2 border-amber-200 text-amber-800 hover:bg-amber-100"
                            >
                              সিগনেচার পরিবর্তন করুন
                            </Button>
                          </div>
                        )}
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

                    <div className="bg-amber-100 p-4 rounded-md border border-amber-200">
                      <h3 className="text-sm font-medium text-amber-800 mb-2">প্রিভিউ</h3>
                      <div
                        className="p-4 rounded-md border border-amber-200 bg-amber-50"
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

                  <TabsContent value="decorate" className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowTemplates(!showTemplates)}
                        className="border-amber-200 text-amber-800 hover:bg-amber-100"
                      >
                        <Template className="h-4 w-4 mr-2" />
                        টেমপ্লেট
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setShowStickers(!showStickers)}
                        className="border-amber-200 text-amber-800 hover:bg-amber-100"
                      >
                        <Sticker className="h-4 w-4 mr-2" />
                        স্টিকার
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setShowStamps(!showStamps)}
                        className="border-amber-200 text-amber-800 hover:bg-amber-100"
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        স্ট্যাম্প
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setShowEmojis(!showEmojis)}
                        className="border-amber-200 text-amber-800 hover:bg-amber-100"
                      >
                        <Smile className="h-4 w-4 mr-2" />
                        ইমোজি
                      </Button>
                    </div>

                    {showTemplates && (
                      <div className="border border-amber-200 rounded-md p-4 bg-amber-50">
                        <TemplateSelector onSelect={handleTemplateSelect} />
                      </div>
                    )}

                    {showStickers && (
                      <div className="border border-amber-200 rounded-md p-4 bg-amber-50">
                        <StickerSelector onSelect={setSelectedSticker} />
                      </div>
                    )}

                    {showStamps && (
                      <div className="border border-amber-200 rounded-md p-4 bg-amber-50">
                        <StampSelector onSelect={setStampStyle} />
                      </div>
                    )}

                    {showEmojis && (
                      <div className="border border-amber-200 rounded-md p-4 bg-amber-50">
                        <div className="grid grid-cols-8 gap-2">
                          {["❤️", "😊", "🎉", "🎁", "✨", "🌟", "💫", "💝", "💖", "💕", "💓", "💗", "💘", "💞", "💟", "💌"].map(
                            (emoji) => (
                              <button
                                key={emoji}
                                onClick={() => setMessage(message + emoji)}
                                className="text-2xl hover:scale-110 transition-transform"
                              >
                                {emoji}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}
                            </TabsContent>

                  <TabsContent value="extras" className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowBackgroundMusic(!showBackgroundMusic)}
                        className="border-amber-200 text-amber-800 hover:bg-amber-100"
                      >
                        <Music className="h-4 w-4 mr-2" />
                        ব্যাকগ্রাউন্ড মিউজিক
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className="border-amber-200 text-amber-800 hover:bg-amber-100"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        তারিখ
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setShowLocation(!showLocation)}
                        className="border-amber-200 text-amber-800 hover:bg-amber-100"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        লোকেশন
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setShowMood(!showMood)}
                        className="border-amber-200 text-amber-800 hover:bg-amber-100"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        মুড
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setShowGift(!showGift)}
                        className="border-amber-200 text-amber-800 hover:bg-amber-100"
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        উপহার
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setShowBookmark(!showBookmark)}
                        className="border-amber-200 text-amber-800 hover:bg-amber-100"
                      >
                        <Bookmark className="h-4 w-4 mr-2" />
                        বুকমার্ক
                      </Button>
                                  </div>

                    {showBackgroundMusic && (
                      <div className="border border-amber-200 rounded-md p-4 bg-amber-50">
                        <h3 className="text-sm font-medium text-amber-800 mb-2">ব্যাকগ্রাউন্ড মিউজিক</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {["রবীন্দ্র সঙ্গীত", "নজরুল গীতি", "লালন গীতি", "বাউল গান"].map((music) => (
                            <Button
                              key={music}
                              variant={selectedMusic === music ? "default" : "outline"}
                              onClick={() => setSelectedMusic(music)}
                              className={selectedMusic === music ? "bg-amber-800" : "border-amber-200"}
                            >
                              {music}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {showDatePicker && (
                      <div className="border border-amber-200 rounded-md p-4 bg-amber-50">
                        <h3 className="text-sm font-medium text-amber-800 mb-2">তারিখ</h3>
                        <input
                          type="date"
                          value={selectedDate || ""}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full p-2 border border-amber-200 rounded-md bg-amber-50 text-amber-900"
                        />
                      </div>
                    )}

                    {showLocation && (
                      <div className="border border-amber-200 rounded-md p-4 bg-amber-50">
                        <h3 className="text-sm font-medium text-amber-800 mb-2">লোকেশন</h3>
                        <input
                          type="text"
                          value={selectedLocation || ""}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                          placeholder="আপনার লোকেশন লিখুন"
                          className="w-full p-2 border border-amber-200 rounded-md bg-amber-50 text-amber-900"
                                      />
                                    </div>
                                  )}

                    {showMood && (
                      <div className="border border-amber-200 rounded-md p-4 bg-amber-50">
                        <h3 className="text-sm font-medium text-amber-800 mb-2">মুড</h3>
                        <div className="grid grid-cols-4 gap-2">
                          {["😊", "😢", "😡", "😴", "🥰", "😎", "🤔", "😇"].map((mood) => (
                            <Button
                              key={mood}
                              variant={selectedMood === mood ? "default" : "outline"}
                              onClick={() => setSelectedMood(mood)}
                              className={selectedMood === mood ? "bg-amber-800" : "border-amber-200"}
                            >
                              {mood}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {showGift && (
                      <div className="border border-amber-200 rounded-md p-4 bg-amber-50">
                        <h3 className="text-sm font-medium text-amber-800 mb-2">উপহার</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {["🎁", "💐", "🎀", "🎈", "🎊", "🎉", "🎨", "🎭"].map((gift) => (
                          <Button
                              key={gift}
                              variant={selectedGift === gift ? "default" : "outline"}
                              onClick={() => setSelectedGift(gift)}
                              className={selectedGift === gift ? "bg-amber-800" : "border-amber-200"}
                          >
                              {gift}
                          </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {showBookmark && (
                      <div className="border border-amber-200 rounded-md p-4 bg-amber-50">
                        <h3 className="text-sm font-medium text-amber-800 mb-2">বুকমার্ক</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {["📚", "📖", "🔖", "📑", "📌", "📍", "📎", "📝"].map((bookmark) => (
                          <Button
                              key={bookmark}
                              variant={selectedBookmark === bookmark ? "default" : "outline"}
                              onClick={() => setSelectedBookmark(bookmark)}
                              className={selectedBookmark === bookmark ? "bg-amber-800" : "border-amber-200"}
                          >
                              {bookmark}
                          </Button>
                          ))}
                        </div>
                      </div>
                  )}
                  </TabsContent>
                </Tabs>
                </CardContent>
              </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
