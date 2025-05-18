"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Trash2, Star, Archive as ArchiveIcon, SortAsc, SortDesc, Tag, User, Calendar, Clock } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { bn } from "date-fns/locale"

interface StarredMessage {
  id: string
  recipient: string
  content: string
  sentAt: string
  paperStyle: string
  inkColor: string
  fontStyle: string
  sealStyle: string
  stampStyle?: string
  signature?: string
  category?: string
  isStarred?: boolean
  isArchived?: boolean
}

export default function Starred() {
  const [messages, setMessages] = useState<StarredMessage[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Load starred messages from localStorage
    const loadMessages = () => {
      const sentMessages = JSON.parse(localStorage.getItem("sentMessages") || "[]")
      const archivedMessages = JSON.parse(localStorage.getItem("archivedMessages") || "[]")
      const allMessages = [...sentMessages, ...archivedMessages]
      const starredMessages = allMessages.filter(msg => msg.isStarred)
      setMessages(starredMessages)
      setLoading(false)
    }
    loadMessages()
  }, [])

  const filteredMessages = messages
    .filter(message => {
      const matchesSearch = message.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.content.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === "all" || message.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      const dateA = new Date(a.sentAt).getTime()
      const dateB = new Date(b.sentAt).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

  const categories = ["all", "personal", "work", "family", "other"]

  const handleUnstar = (messageId: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId)
    setMessages(updatedMessages)
    
    // Update in sent messages
    const sentMessages = JSON.parse(localStorage.getItem("sentMessages") || "[]")
    const updatedSentMessages = sentMessages.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: false } : msg
    )
    localStorage.setItem("sentMessages", JSON.stringify(updatedSentMessages))
    
    // Update in archived messages
    const archivedMessages = JSON.parse(localStorage.getItem("archivedMessages") || "[]")
    const updatedArchivedMessages = archivedMessages.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: false } : msg
    )
    localStorage.setItem("archivedMessages", JSON.stringify(updatedArchivedMessages))
    
    toast({
      title: "সফল",
      description: "চিঠি আনস্টার করা হয়েছে।",
    })
  }

  const handleArchive = (messageId: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId)
    setMessages(updatedMessages)
    
    // Update in sent messages
    const sentMessages = JSON.parse(localStorage.getItem("sentMessages") || "[]")
    const messageToArchive = sentMessages.find(msg => msg.id === messageId)
    if (messageToArchive) {
      const updatedSentMessages = sentMessages.filter(msg => msg.id !== messageId)
      localStorage.setItem("sentMessages", JSON.stringify(updatedSentMessages))
      
      // Add to archived messages
      const archivedMessages = JSON.parse(localStorage.getItem("archivedMessages") || "[]")
      localStorage.setItem("archivedMessages", JSON.stringify([...archivedMessages, messageToArchive]))
    }
    
    toast({
      title: "সফল",
      description: "চিঠি আর্কাইভ করা হয়েছে।",
    })
  }

  const handleDelete = (messageId: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId)
    setMessages(updatedMessages)
    
    // Update in sent messages
    const sentMessages = JSON.parse(localStorage.getItem("sentMessages") || "[]")
    const messageToTrash = sentMessages.find(msg => msg.id === messageId)
    if (messageToTrash) {
      const updatedSentMessages = sentMessages.filter(msg => msg.id !== messageId)
      localStorage.setItem("sentMessages", JSON.stringify(updatedSentMessages))
      
      // Add to trash
      const trashMessages = JSON.parse(localStorage.getItem("trashMessages") || "[]")
      localStorage.setItem("trashMessages", JSON.stringify([...trashMessages, messageToTrash]))
    }
    
    toast({
      title: "সফল",
      description: "চিঠি ট্র্যাশে সরানো হয়েছে।",
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <DashboardHeader toggleSidebar={() => {}} />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-serif font-bold text-amber-800">স্টার করা</h1>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="h-4 w-4 mr-2" />
                ) : (
                  <SortDesc className="h-4 w-4 mr-2" />
                )}
                {sortOrder === "asc" ? "পুরনো থেকে নতুন" : "নতুন থেকে পুরনো"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-4">
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-800">ফিল্টার</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-amber-500" />
                    <Input
                      placeholder="সার্চ করুন..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 border-amber-200 bg-amber-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-800">ক্যাটাগরি</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="border-amber-200 bg-amber-50">
                        <SelectValue placeholder="ক্যাটাগরি বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category === "all" ? "সকল" : 
                             category === "personal" ? "ব্যক্তিগত" :
                             category === "work" ? "কর্মস্থল" :
                             category === "family" ? "পরিবার" : "অন্যান্য"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-800">স্ট্যাটাস</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700">মোট চিঠি</span>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                      {messages.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700">আজকের চিঠি</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      {messages.filter(m => new Date(m.sentAt).toDateString() === new Date().toDateString()).length}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <Card className="border-amber-200">
                <CardContent className="p-6">
                  {loading ? (
                    <div className="text-center py-8 text-amber-700">লোড হচ্ছে...</div>
                  ) : filteredMessages.length === 0 ? (
                    <div className="text-center py-8 text-amber-700">কোন স্টার করা চিঠি পাওয়া যায়নি।</div>
                  ) : (
                    <div className="space-y-4">
                      {filteredMessages.map(message => (
                        <Card key={message.id} className="border-amber-200 hover:border-amber-300 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <User className="h-4 w-4 text-amber-600" />
                                  <h3 className="font-medium text-amber-900">{message.recipient}</h3>
                                  {message.category && (
                                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                                      {message.category === "personal" ? "ব্যক্তিগত" :
                                       message.category === "work" ? "কর্মস্থল" :
                                       message.category === "family" ? "পরিবার" : "অন্যান্য"}
                                    </Badge>
                                  )}
                                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                    <Star className="h-3 w-3 mr-1" />
                                    স্টার করা
                                  </Badge>
                                </div>
                                <p className="text-sm text-amber-700 line-clamp-2 mb-2">
                                  {message.content}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-amber-600">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {formatDistanceToNow(new Date(message.sentAt), { addSuffix: true, locale: bn })}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleUnstar(message.id)}
                                  className="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50"
                                >
                                  <Star className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleArchive(message.id)}
                                  className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                                >
                                  <ArchiveIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(message.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 