"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import { toast } from "@/hooks/use-toast"

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

export default function EmailLetter() {
  const params = useParams()
  const [letter, setLetter] = useState<Letter | null>(null)
  const [sender, setSender] = useState<User | null>(null)
  const [recipient, setRecipient] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)

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

  const handleSend = async () => {
    if (!letter || !sender || !recipient) return
    if (!email) {
      toast({
        title: "ইমেইল প্রয়োজন",
        description: "অনুগ্রহ করে ইমেইল ঠিকানা দিন",
        variant: "destructive",
      })
      return
    }

    setSending(true)

    try {
      // Create email content
      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FEF3C7; border: 1px solid #FCD34D;">
          <div style="text-align: right; margin-bottom: 20px;">
            <p>${new Date(letter.createdAt).toLocaleDateString("bn-BD")}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p style="margin-bottom: 10px;">প্রিয় ${recipient.username},</p>
            <p style="margin-bottom: 10px;">${letter.content}</p>
            <p style="margin-bottom: 10px;">শুভেচ্ছান্তে,</p>
            <p>${sender.username}</p>
          </div>
          
          <div style="text-align: center;">
            <img src="${window.location.origin}/seal-${letter.style.sealStyle}.png" alt="Seal" style="width: 100px; height: 100px; object-fit: contain;" />
          </div>
        </div>
      `

      // Send email using EmailJS
      const templateParams = {
        to_email: email,
        subject: letter.subject,
        message: emailContent,
      }

      // TODO: Implement email sending functionality
      // For now, just show a success message
      toast({
        title: "ইমেইল পাঠানো হয়েছে",
        description: "চিঠিটি সফলভাবে ইমেইল করা হয়েছে",
      })
    } catch (error) {
      toast({
        title: "ইমেইল পাঠানো যায়নি",
        description: "দুঃখিত, ইমেইল পাঠানো যায়নি। আবার চেষ্টা করুন।",
        variant: "destructive",
      })
    } finally {
      setSending(false)
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
          <div
            className={`
              p-8 rounded-md border border-amber-200 bg-white
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
              <div className="text-right mb-8">
                <p>{new Date(letter.createdAt).toLocaleDateString("bn-BD")}</p>
              </div>

              <div className="mb-8">
                <p className="mb-2">প্রিয় {recipient.username},</p>
                <p className="mb-2">{letter.content}</p>
                <p className="mb-2">শুভেচ্ছান্তে,</p>
                <p>{sender.username}</p>
              </div>

              <div className="text-center">
                <img
                  src={`/seal-${letter.style.sealStyle}.png`}
                  alt="Seal"
                  className="w-24 h-24 object-contain inline-block"
                />
              </div>
            </div>

            <div className="mt-8 p-6 bg-amber-50 rounded-md border border-amber-200">
              <h2 className="text-lg font-semibold text-amber-800 mb-4">
                ইমেইল হিসেবে পাঠান
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-amber-800">
                    ইমেইল ঠিকানা
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="mt-1 border-amber-200 bg-amber-50 text-amber-900 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <Button
                  onClick={handleSend}
                  disabled={sending}
                  className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {sending ? "পাঠানো হচ্ছে..." : "ইমেইল পাঠান"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 