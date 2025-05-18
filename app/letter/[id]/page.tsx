"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, Download, Star, Clock } from "lucide-react"
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

export default function LetterPage() {
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

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${letter?.subject}`,
        text: `${sender?.username} থেকে ${recipient?.username} এর কাছে চিঠি`,
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

  const handleDownload = () => {
    if (!letter) return

    // Create a canvas element
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 1200

    // Draw background
    ctx.fillStyle = "#FEF3C7" // amber-50
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw paper texture
    const paperTexture = new Image()
    paperTexture.src = `/paper-texture-${letter.style.paperStyle}.png`
    paperTexture.onload = () => {
      ctx.drawImage(paperTexture, 0, 0, canvas.width, canvas.height)

      // Draw content
      ctx.fillStyle = letter.style.inkColor === "black" ? "#78350F" : letter.style.inkColor // amber-900
      ctx.font = "24px serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "top"

      // Draw header
      ctx.fillText(`প্রিয় ${recipient?.username},`, 50, 50)
      ctx.fillText(letter.subject, 50, 100)

      // Draw content
      const words = letter.content.split(" ")
      let line = ""
      let y = 150
      const lineHeight = 30
      const maxWidth = canvas.width - 100

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " "
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width

        if (testWidth > maxWidth && i > 0) {
          ctx.fillText(line, 50, y)
          line = words[i] + " "
          y += lineHeight
        } else {
          line = testLine
        }
      }
      ctx.fillText(line, 50, y)

      // Draw footer
      y += lineHeight * 2
      ctx.fillText(`শুভেচ্ছান্তে,`, 50, y)
      y += lineHeight
      ctx.fillText(sender?.username || "", 50, y)

      // Draw seal
      const seal = new Image()
      seal.src = `/seal-${letter.style.sealStyle}.png`
      seal.onload = () => {
        ctx.drawImage(seal, canvas.width - 150, canvas.height - 150, 100, 100)

        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
          if (!blob) return
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = `${letter.subject}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        })
      }
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
      <main className="container mx-auto p-4 md:p-6">
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
                  <div className="flex gap-2">
                    <Button
                      onClick={handleShare}
                      className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      শেয়ার করুন
                    </Button>
                    <Button
                      onClick={handleDownload}
                      className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      ডাউনলোড করুন
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/50 p-4 rounded-md border border-amber-200">
                    <Star className="w-6 h-6 text-amber-600 mb-2" />
                    <h3 className="font-semibold text-amber-800">তারকাচিহ্নিত</h3>
                    <p className="text-sm text-amber-700">
                      এই চিঠিটি সেভ করুন
                    </p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-md border border-amber-200">
                    <Clock className="w-6 h-6 text-amber-600 mb-2" />
                    <h3 className="font-semibold text-amber-800">লেখার সময়</h3>
                    <p className="text-sm text-amber-700">
                      {new Date(letter.createdAt).toLocaleDateString("bn-BD")}
                    </p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-md border border-amber-200">
                    <div className="w-6 h-6 text-amber-600 mb-2">
                      <img
                        src={`/seal-${letter.style.sealStyle}.png`}
                        alt="Seal"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="font-semibold text-amber-800">মোমের সিল</h3>
                    <p className="text-sm text-amber-700">
                      {letter.style.sealStyle === "red" && "লাল"}
                      {letter.style.sealStyle === "blue" && "নীল"}
                      {letter.style.sealStyle === "gold" && "সোনালি"}
                      {letter.style.sealStyle === "green" && "সবুজ"}
                      {letter.style.sealStyle === "purple" && "বেগুনি"}
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
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
} 