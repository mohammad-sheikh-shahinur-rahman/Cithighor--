"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Archive, Mail, MailOpen, Reply, Share2, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  content: string
  createdAt: string
  isRead?: boolean
  signature?: string
}

interface MessageCardProps {
  message: Message
  onDelete: () => void
  onRead: () => void
  paperStyle: string
  inkColor: string
  fontStyle: string
  sealStyle: string
  stampStyle?: string
}

export default function MessageCard({
  message,
  onDelete,
  onRead,
  paperStyle,
  inkColor,
  fontStyle,
  sealStyle,
  stampStyle = "classic",
}: MessageCardProps) {
  const [isOpen, setIsOpen] = useState(message.isRead)
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [isStarred, setIsStarred] = useState(false)

  // Format the date to show how long ago the message was received
  const timeAgo = formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })

  const handleOpen = () => {
    if (!isOpen) {
      // Play paper unfolding sound
      const audio = new Audio("/paper-unfold.mp3")
      audio.play().catch((e) => console.error("Audio playback failed:", e))

      onRead()
    }
    setIsOpen(true)
  }

  const handleReply = () => {
    setIsReplying(!isReplying)
    if (!isReplying) {
      setReplyText("")
    }
  }

  const sendReply = () => {
    // In a real app, this would send the reply
    alert("এই ফিচারটি শীঘ্রই আসছে!")
    setIsReplying(false)
    setReplyText("")
  }

  const toggleStar = () => {
    setIsStarred(!isStarred)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "border-amber-200 overflow-hidden transition-all duration-500",
          isOpen ? "bg-transparent" : "bg-amber-50/90 backdrop-blur-sm",
        )}
      >
        {!isOpen ? (
          <div className="relative">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-amber-800" />
                <p className="text-amber-800 font-medium">নতুন চিঠি</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-amber-700">{timeAgo}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleOpen}
                  className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
                >
                  খুলুন
                </Button>
              </div>
            </CardContent>

            {/* Wax Seal */}
            <div
              className={`absolute top-1/2 right-12 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center
                ${
                  sealStyle === "red"
                    ? "bg-red-600"
                    : sealStyle === "blue"
                      ? "bg-blue-600"
                      : sealStyle === "gold"
                        ? "bg-yellow-600"
                        : sealStyle === "green"
                          ? "bg-green-600"
                          : "bg-purple-600"
                }`}
            >
              <div className="text-white text-xs font-serif">সিল</div>
            </div>

            {/* Stamp */}
            <div className="absolute top-2 right-2 w-16 h-20">
              <div
                className={`w-full h-full bg-[url('/stamp-${stampStyle}.png')] bg-contain bg-no-repeat bg-center`}
              ></div>
            </div>
          </div>
        ) : (
          <>
            <CardContent className={`p-6 min-h-40 bg-[url('/paper-texture-${paperStyle}.png')] bg-repeat relative`}>
              <div className="flex justify-between items-start mb-4">
                <MailOpen className="h-5 w-5 text-amber-800" />
                <p className="text-xs text-amber-700">{timeAgo}</p>
              </div>

              {/* Stamp in the corner when open */}
              <div className="absolute top-2 right-2 w-16 h-20 opacity-70">
                <div
                  className={`w-full h-full bg-[url('/stamp-${stampStyle}.png')] bg-contain bg-no-repeat bg-center`}
                ></div>
              </div>

              <p
                className={`whitespace-pre-wrap text-${inkColor === "black" ? "amber-900" : inkColor} mt-6`}
                style={{
                  fontFamily:
                    fontStyle === "handwritten"
                      ? "cursive, 'Noto Sans Bengali', sans-serif"
                      : fontStyle === "typewriter"
                        ? "monospace, 'Noto Sans Bengali', sans-serif"
                        : fontStyle === "elegant"
                          ? "serif, 'Noto Sans Bengali', sans-serif"
                          : fontStyle === "bengali-classic"
                            ? "'Noto Sans Bengali', sans-serif"
                            : "'Noto Sans Bengali', sans-serif",
                }}
              >
                {message.content}
              </p>

              {message.signature && (
                <div className="mt-8 flex justify-end">
                  <div
                    className="max-w-[200px] h-16 opacity-80"
                    style={{
                      backgroundImage: `url(${message.signature})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
              )}

              <AnimatePresence>
                {isReplying && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2"
                  >
                    <Textarea
                      placeholder="আপনার উত্তর লিখুন..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="border-amber-200 bg-amber-50/50 min-h-24"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={sendReply}
                        className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                        disabled={!replyText.trim()}
                      >
                        পাঠান
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsReplying(false)}
                        className="border-amber-200 text-amber-800 hover:bg-amber-100"
                      >
                        বাতিল
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
            <CardFooter className="flex justify-between p-4 bg-amber-50/90 backdrop-blur-sm border-t border-amber-200">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReply}
                  className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
                >
                  <Reply className="h-4 w-4 mr-1" />
                  <span className={cn(!isReplying && "hidden sm:inline")}>উত্তর দিন</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleStar}
                  className={cn(
                    "hover:bg-amber-100",
                    isStarred ? "text-yellow-600" : "text-amber-800 hover:text-amber-900",
                  )}
                >
                  <Star className="h-4 w-4 mr-1" fill={isStarred ? "currentColor" : "none"} />
                  <span className="hidden sm:inline">{isStarred ? "তারকামুক্ত করুন" : "তারকাচিহ্নিত করুন"}</span>
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-amber-800 hover:text-amber-900 hover:bg-amber-100">
                  <Share2 className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">শেয়ার</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-amber-800 hover:text-amber-900 hover:bg-amber-100">
                  <Archive className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">আর্কাইভ</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDelete}
                  className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">মুছুন</span>
                </Button>
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </motion.div>
  )
}
