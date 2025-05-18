"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Twitter, LinkedIn, Link2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

interface Letter {
  id: string
  senderId: string
  recipientId: string
  subject: string
  content: string
  createdAt: string
  style: {
    paperStyle: string
    inkColor: string
    fontStyle: string
    sealStyle: string
  }
}

interface User {
  id: string
  username: string
  email: string
}

export default function ShareLetter() {
  const params = useParams()
  const [letter, setLetter] = useState<Letter | null>(null)
  const [sender, setSender] = useState<User | null>(null)
  const [recipient, setRecipient] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get letter data from localStorage
    const letters = JSON.parse(localStorage.getItem("letters") || "[]")
    const foundLetter = letters.find((l: Letter) => l.id === params.id)
    setLetter(foundLetter || null)

    if (foundLetter) {
      // Get sender and recipient data
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundSender = users.find((u: User) => u.id === foundLetter.senderId)
      const foundRecipient = users.find((u: User) => u.id === foundLetter.recipientId)
      setSender(foundSender || null)
      setRecipient(foundRecipient || null)
    }

    setLoading(false)
  }, [params.id])

  const handleShare = async (platform: string) => {
    if (!letter || !sender || !recipient) return

    const url = window.location.href
    const text = `${sender.username} থেকে ${recipient.username} এর কাছে চিঠি: ${letter.subject}`
    const title = letter.subject

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
          "_blank"
        )
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          "_blank"
        )
        break
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank"
        )
        break
      case "copy":
        try {
          await navigator.clipboard.writeText(url)
          toast({
            title: "লিংক কপি করা হয়েছে",
            description: "আপনার বন্ধুদের সাথে শেয়ার করুন",
          })
        } catch (err) {
          toast({
            title: "লিংক কপি করা যায়নি",
            description: "দুঃখিত, লিংক কপি করা যায়নি। আবার চেষ্টা করুন।",
            variant: "destructive",
          })
        }
        break
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="animate-pulse text-amber-800">লোড হচ্ছে...</div>
      </div>
    )
  }

  if (!letter || !sender || !recipient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="text-amber-800">চিঠি পাওয়া যায়নি</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[url('/images/paper-texture.png')] bg-repeat">
      <div className="container mx-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-serif font-bold text-amber-800 mb-2">
                      {letter.subject}
                    </h1>
                    <p className="text-amber-700">
                      {sender.username} থেকে {recipient.username} এর কাছে
                    </p>
                  </div>
                </div>

                <div
                  className={`
                    p-6 rounded-md border border-amber-200 bg-white/50
                    bg-[url('/paper-texture-${letter.style.paperStyle}.png')] bg-repeat
                  `}
                >
                  <div
                    className={`
                      text-${letter.style.inkColor === "black" ? "amber-900" : letter.style.inkColor}
                      font-${letter.style.fontStyle === "handwritten" ? "serif" : "sans"}
                      whitespace-pre-wrap
                    `}
                    style={{
                      fontFamily:
                        letter.style.fontStyle === "handwritten"
                          ? "cursive"
                          : letter.style.fontStyle === "typewriter"
                            ? "monospace"
                            : letter.style.fontStyle === "elegant"
                              ? "serif"
                              : "sans-serif",
                    }}
                  >
                    <p className="mb-4">প্রিয় {recipient.username},</p>
                    <p className="mb-4">{letter.content}</p>
                    <p className="mb-4">শুভেচ্ছান্তে,</p>
                    <p>{sender.username}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-amber-800 mb-4">
                    সোশ্যাল মিডিয়ায় শেয়ার করুন
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      onClick={() => handleShare("facebook")}
                      className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      ফেসবুক
                    </Button>
                    <Button
                      onClick={() => handleShare("twitter")}
                      className="w-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      টুইটার
                    </Button>
                    <Button
                      onClick={() => handleShare("linkedin")}
                      className="w-full bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white"
                    >
                      <LinkedIn className="w-4 h-4 mr-2" />
                      লিংকডইন
                    </Button>
                    <Button
                      onClick={() => handleShare("copy")}
                      className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50"
                    >
                      <Link2 className="w-4 h-4 mr-2" />
                      লিংক কপি করুন
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 