"use client"

import { useState, useCallback, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { Archive, Mail, MailOpen, Reply, Share2, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"

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
  replyText?: string
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
  signature?: string
}

let lastSoundTime = 0;

interface UserType {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  mobile?: string;
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
  signature,
}: MessageCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [isStarred, setIsStarred] = useState(false)
  const [users, setUsers] = useState<UserType[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const timeAgo = formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })

  const audioRef = useRef<HTMLAudioElement | null>(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    const newAudio = new Audio("/sounds/typewriter-sound.mp3");
    newAudio.volume = 0.5;
    audioRef.current = newAudio;
  }

  return () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
}, []);


const handleOpen = () => {
  onRead();
  setIsOpen(true);

  const audio = audioRef.current;
  if (audio) {
    if (!audio.paused) {
      // Prevent overlapping playback
      audio.pause();
      audio.currentTime = 0;
    }

    audio.play().catch((error) => {
      if (error.name !== 'AbortError') {
        console.error('Audio playback error:', error);
      }
    });
  }
};


  const handleReply = () => {
    setIsReplying(!isReplying)
    if (!isReplying) setReplyText("")
  }

  const sendReply = () => {
    if (!replyText.trim()) return;
    const allMessages = JSON.parse(localStorage.getItem("letters") || "[]");
    const updatedMessages = allMessages.map((msg: Message) =>
      msg.id === message.id ? { ...msg, replyText, replied: true } : msg
    );
    localStorage.setItem("letters", JSON.stringify(updatedMessages));
    setIsReplying(false);
    setReplyText("");
    message.replyText = replyText;
    message.replied = true;
    window.dispatchEvent(new Event("storage"));
  }

  const toggleStar = () => setIsStarred(!isStarred);

  const handleUserUpdate = (updatedUser: UserType) => {
    const users: UserType[] = JSON.parse(localStorage.getItem("users") || "[]");
    const newUsers = users.map((u: UserType) => u.id === updatedUser.id ? updatedUser : u);
    localStorage.setItem("users", JSON.stringify(newUsers));
    setUsers(newUsers);
    window.dispatchEvent(new Event("storage"));
  };

  const reloadUsers = useCallback(() => {
    const allUsers: UserType[] = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(allUsers);
    setFilteredUsers(allUsers.filter((user: UserType) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.mobile && user.mobile.toLowerCase().includes(searchTerm.toLowerCase()))
    ));
  }, [searchTerm]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "users") {
        const allUsers: UserType[] = JSON.parse(localStorage.getItem("users") || "[]")
        setUsers(allUsers)
        setFilteredUsers(allUsers.filter((user: UserType) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user.mobile && user.mobile.toLowerCase().includes(searchTerm.toLowerCase()))
        ))
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [searchTerm])

  const deleteUser = (userId: string) => {
    const updatedUsers: UserType[] = [];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers.filter((user: UserType) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.mobile && user.mobile.toLowerCase().includes(searchTerm.toLowerCase()))
    ));
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
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-amber-800" />
                <p className="text-amber-800 font-medium">নতুন চিঠি</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-amber-700">{timeAgo}</p>
                <button
                  type="button"
                  onClick={handleOpen}
                  className="text-amber-800 hover:text-amber-900 hover:bg-amber-100 cursor-pointer px-4 py-2 rounded-md transition-colors border border-amber-200 bg-white font-bold"
                >
                  খুলুন
                </button>
              </div>
            </div>
            {/* Wax Seal */}
            <button
              type="button"
              onClick={handleOpen}
              className={`absolute top-1/2 right-12 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-4 border-white shadow-lg
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
              aria-label="সিল খুলুন"
            >
              <span className="text-white text-xs font-serif">সিল</span>
            </button>
          </div>
        ) : (
          <>
            <CardContent className="p-6 min-h-40 relative">
              <div 
                className="absolute inset-0 bg-repeat"
                style={{
                  backgroundImage: `url('/images/paper-texture-classic.png')`,
                  opacity: 0.8
                }}
              ></div>
              <div className="relative z-10 bg-white/80 p-6 rounded-lg shadow-sm">
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

                <div className="mt-6">
                  <p
                    className="whitespace-pre-wrap text-lg leading-relaxed"
                    style={{
                      color: inkColor === "black" ? "#78350f" : inkColor,
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
                    {message.message}
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
                </div>

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

                {message.replyText && (
                  <div className="mt-8 p-4 bg-amber-50 border-l-4 border-amber-400 rounded">
                    <div className="font-bold text-amber-800 mb-2">আপনার উত্তর:</div>
                    <div className="text-amber-900 whitespace-pre-wrap">{message.replyText}</div>
                  </div>
                )}
              </div>
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
