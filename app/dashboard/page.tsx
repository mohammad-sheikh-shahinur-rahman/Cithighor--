"use client"

import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Volume2, VolumeX } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import DashboardHeader from "@/components/dashboard-header"
import MessageCard from "@/components/message-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardSidebar from "@/components/dashboard-sidebar"

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

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [playingMusic, setPlayingMusic] = useState(false)
  const [paperStyle, setPaperStyle] = useState("classic")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(currentUser)
    setUser(userData)
    setPaperStyle(userData.preferences?.paperStyle || "classic")

    // Load messages for this user
    const allMessages = JSON.parse(localStorage.getItem("letters") || "[]")
    const userMessages = allMessages.filter((message: Message) => message.to === userData.username)

    // Sort messages by date (newest first)
    userMessages.sort((a: Message, b: Message) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    setMessages(userMessages)
    setLoading(false)
  }, [router])

  const handleCopyLink = () => {
    if (!user) return

    const link = `${window.location.origin}/u/${user.username}`
    navigator.clipboard.writeText(link)

    toast({
      title: "লিংক কপি করা হয়েছে",
      description: "আপনার প্রোফাইল লিংক কপি করা হয়েছে।",
    })
  }

  const handleDeleteMessage = (messageId: string) => {
    // Filter out the deleted message
    const updatedMessages = messages.filter((message) => message.id !== messageId)
    setMessages(updatedMessages)

    // Update localStorage
    const allMessages = JSON.parse(localStorage.getItem("letters") || "[]")
    const filteredMessages = allMessages.filter((message: Message) => message.id !== messageId)
    localStorage.setItem("letters", JSON.stringify(filteredMessages))

    toast({
      title: "চিঠি মুছে ফেলা হয়েছে",
      description: "চিঠিটি সফলভাবে মুছে ফেলা হয়েছে।",
    })
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

    // Update current user's messages
    if (user) {
      const updatedUser = {
        ...user,
        messages: updatedMessages
      }
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    }
  }

  const toggleMusic = () => {
    setPlayingMusic(!playingMusic)

    const audio = document.getElementById("background-music") as HTMLAudioElement

    if (!playingMusic) {
      audio.play().catch((e) => console.error("Audio playback failed:", e))
    } else {
      audio.pause()
    }
  }

  const handlePaperStyleChange = (value: string) => {
    setPaperStyle(value)

    if (user) {
      // Update user preferences
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          paperStyle: value,
        },
      }

      // Update in localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))

      // Update users array
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const updatedUsers = users.map((u: User) => {
        if (u.id === user.id) {
          return updatedUser
        }
        return u
      })
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      setUser(updatedUser)

      toast({
        title: "কাগজের স্টাইল পরিবর্তন করা হয়েছে",
        description: "আপনার পছন্দের কাগজের স্টাইল সেট করা হয়েছে।",
      })
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const unreadCount = messages.filter((message) => !message.read).length

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-amber-50">লোড হচ্ছে...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <DashboardSidebar isOpen={sidebarOpen} unreadCount={unreadCount} totalCount={messages.length} />
        <main className={`flex-1 p-4 md:p-6 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "ml-0"}`}>
          <div className="grid gap-6 max-w-5xl mx-auto">
            <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-serif text-amber-800">আপনার চিঠিঘরের লিংক</CardTitle>
                    <CardDescription className="text-amber-700">
                      এই লিংকটি শেয়ার করুন যাতে অন্যরা আপনাকে চিঠি পাঠাতে পারে
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMusic}
                    className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
                  >
                    {playingMusic ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    <span className="sr-only">{playingMusic ? "বাদ্য বন্ধ করুন" : "বাদ্য চালু করুন"}</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="bg-amber-100 p-2 rounded-md flex-1 overflow-x-auto border border-amber-200">
                    <code className="text-sm whitespace-nowrap text-amber-800">{`${window.location.origin}/u/${user?.username}`}</code>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyLink}
                    className="border-amber-200 text-amber-800 hover:bg-amber-100"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">কপি করুন</span>
                  </Button>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex flex-col space-y-1 flex-1">
                    <Label htmlFor="paper-style" className="text-amber-800">
                      কাগজের স্টাইল
                    </Label>
                    <Select value={paperStyle} onValueChange={handlePaperStyleChange}>
                      <SelectTrigger id="paper-style" className="border-amber-200 bg-amber-50 text-amber-900">
                        <SelectValue placeholder="কাগজের স্টাইল বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent className="border-amber-200 bg-amber-50">
                        <SelectItem value="classic">ক্লাসিক</SelectItem>
                        <SelectItem value="vintage">ভিনটেজ</SelectItem>
                        <SelectItem value="parchment">পার্চমেন্ট</SelectItem>
                        <SelectItem value="lined">লাইনযুক্ত</SelectItem>
                        <SelectItem value="modern">আধুনিক</SelectItem>
                        <SelectItem value="bengali-classic">বাংলা ক্লাসিক</SelectItem>
                        <SelectItem value="bengali-patternA">বাংলা প্যাটার্ন ১</SelectItem>
                        <SelectItem value="bengali-patternB">বাংলা প্যাটার্ন ২</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="inbox" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="inbox" className="text-amber-800">
                  ইনবক্স ({unreadCount})
                </TabsTrigger>
                <TabsTrigger value="sent" className="text-amber-800">
                  পাঠানো ({messages.filter((m) => m.replied).length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="inbox" className="space-y-4">
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
              </TabsContent>

              <TabsContent value="sent" className="space-y-4">
                {messages.filter((m) => m.replied).length === 0 ? (
                  <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <p className="text-amber-800">কোন পাঠানো চিঠি নেই</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {messages
                      .filter((m) => m.replied)
                      .map((message) => (
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
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <footer className="border-t border-amber-200 py-6 px-4 md:px-6 bg-amber-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-serif font-medium text-amber-800 mb-4">চিঠিঘর</h3>
              <p className="text-sm text-amber-700 mb-4">
                পুরোনো দিনের মত চিঠি লেখার অনুভূতি ফিরিয়ে আনতে চিঠিঘর সর্বদা প্রস্তুত। আপনার অনুভূতি, চিন্তা এবং স্মৃতি শেয়ার করুন।
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-amber-800 hover:text-amber-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-amber-800 hover:text-amber-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-amber-800 hover:text-amber-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-serif font-medium text-amber-800 mb-4">দ্রুত লিংক</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/dashboard" className="text-amber-700 hover:text-amber-900 hover:underline">
                    ড্যাশবোর্ড
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="text-amber-700 hover:text-amber-900 hover:underline">
                    সেটিংস
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-amber-700 hover:text-amber-900 hover:underline">
                    আমাদের সম্পর্কে
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-amber-700 hover:text-amber-900 hover:underline">
                    যোগাযোগ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-serif font-medium text-amber-800 mb-4">যোগাযোগ</h3>
              <address className="not-italic text-sm text-amber-700 space-y-2">
                <p>ঢাকা, বাংলাদেশ</p>
                <p>ইমেইল: info@chithighor.com</p>
                <p>ফোন: +880 1234-567890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-amber-200 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
            <p className="text-xs text-amber-700">© 2025 চিঠিঘর। সর্বস্বত্ব সংরক্ষিত।</p>
            <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
              <Link className="text-xs text-amber-700 hover:underline underline-offset-4" href="/privacy-policy">
                গোপনীয়তা নীতি
              </Link>
              <Link className="text-xs text-amber-700 hover:underline underline-offset-4" href="/terms-of-service">
                ব্যবহারের শর্তাবলী
              </Link>
              <Link className="text-xs text-amber-700 hover:underline underline-offset-4" href="/cookie-policy">
                কুকি নীতি
              </Link>
            </nav>
          </div>
        </div>
      </footer>

      <audio id="background-music" loop>
        <source src="/paper-sounds.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
