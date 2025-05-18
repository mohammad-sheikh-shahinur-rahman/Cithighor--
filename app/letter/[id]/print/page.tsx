"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

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

export default function PrintLetter() {
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

  const handlePrint = () => {
    window.print()
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
    <div className="min-h-screen bg-[url('/paper-texture.png')] bg-repeat">
      <div className="container mx-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-end mb-4 print:hidden">
            <Button
              onClick={handlePrint}
              className="bg-amber-800 hover:bg-amber-900 text-amber-50"
            >
              <Printer className="w-4 h-4 mr-2" />
              প্রিন্ট করুন
            </Button>
          </div>

          <div
            className={`
              p-8 rounded-md border border-amber-200 bg-white
              bg-[url('/paper-texture-${letter.style.paperStyle}.png')] bg-repeat
              print:border-none print:p-0 print:bg-none
            `}
          >
            <div
              className={`
                text-${letter.style.inkColor === "black" ? "amber-900" : letter.style.inkColor}
                font-${letter.style.fontStyle === "handwritten" ? "serif" : "sans"}
                whitespace-pre-wrap
                print:text-black
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
              <div className="text-right mb-8 print:mb-4">
                <p>{new Date(letter.createdAt).toLocaleDateString("bn-BD")}</p>
              </div>

              <div className="mb-8 print:mb-4">
                <p className="mb-2">প্রিয় {recipient.username},</p>
                <p className="mb-2">{letter.content}</p>
                <p className="mb-2">শুভেচ্ছান্তে,</p>
                <p>{sender.username}</p>
              </div>

              <div className="text-center">
                <img
                  src={`/seal-${letter.style.sealStyle}.png`}
                  alt="Seal"
                  className="w-24 h-24 object-contain inline-block print:w-16 print:h-16"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 2cm;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  )
} 