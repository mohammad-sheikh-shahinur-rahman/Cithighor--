"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Filter, Trash2, Send, Edit, Clock, Calendar, SortAsc, SortDesc, Tag, User } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { bn } from "date-fns/locale"

interface Draft {
  id: string
  recipient: string
  content: string
  createdAt: string
  updatedAt: string
  paperStyle: string
  inkColor: string
  fontStyle: string
  sealStyle: string
  stampStyle?: string
  signature?: string
  category?: string
  status: "draft" | "sending" | "sent"
  lastEdited?: string
}

export default function Drafts() {
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Load drafts from localStorage
    const loadDrafts = () => {
      const storedDrafts = localStorage.getItem("drafts")
      if (storedDrafts) {
        setDrafts(JSON.parse(storedDrafts))
      }
      setLoading(false)
    }
    loadDrafts()
  }, [])

  const filteredDrafts = drafts
    .filter(draft => {
      const matchesSearch = draft.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          draft.content.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === "all" || draft.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime()
      const dateB = new Date(b.updatedAt).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

  const categories = ["all", "personal", "work", "family", "other"]

  const handleDelete = (draftId: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId)
    setDrafts(updatedDrafts)
    localStorage.setItem("drafts", JSON.stringify(updatedDrafts))
    toast({
      title: "সফল",
      description: "খসড়া সফলভাবে মুছে ফেলা হয়েছে।",
    })
  }

  const handleSend = (draft: Draft) => {
    // Move draft to sent messages
    const sentMessages = JSON.parse(localStorage.getItem("sentMessages") || "[]")
    const messageToSend = {
      ...draft,
      status: "sent",
      sentAt: new Date().toISOString()
    }
    localStorage.setItem("sentMessages", JSON.stringify([...sentMessages, messageToSend]))
    
    // Remove from drafts
    const updatedDrafts = drafts.filter(d => d.id !== draft.id)
    setDrafts(updatedDrafts)
    localStorage.setItem("drafts", JSON.stringify(updatedDrafts))
    
    toast({
      title: "সফল",
      description: "চিঠি সফলভাবে পাঠানো হয়েছে।",
    })
  }

  const handleEdit = (draft: Draft) => {
    router.push(`/compose?draft=${draft.id}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <DashboardHeader toggleSidebar={() => {}} />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-serif font-bold text-amber-800">খসড়া</h1>
            
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
              <Button
                className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                onClick={() => router.push("/compose")}
              >
                <Plus className="h-4 w-4 mr-2" />
                নতুন খসড়া
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
                    <span className="text-amber-700">মোট খসড়া</span>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                      {drafts.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700">আজকের খসড়া</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      {drafts.filter(d => new Date(d.createdAt).toDateString() === new Date().toDateString()).length}
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
                  ) : filteredDrafts.length === 0 ? (
                    <div className="text-center py-8 text-amber-700">কোন খসড়া পাওয়া যায়নি।</div>
                  ) : (
                    <div className="space-y-4">
                      {filteredDrafts.map(draft => (
                        <Card key={draft.id} className="border-amber-200 hover:border-amber-300 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <User className="h-4 w-4 text-amber-600" />
                                  <h3 className="font-medium text-amber-900">{draft.recipient}</h3>
                                  {draft.category && (
                                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                                      {draft.category === "personal" ? "ব্যক্তিগত" :
                                       draft.category === "work" ? "কর্মস্থল" :
                                       draft.category === "family" ? "পরিবার" : "অন্যান্য"}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-amber-700 line-clamp-2 mb-2">
                                  {draft.content}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-amber-600">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {formatDistanceToNow(new Date(draft.updatedAt), { addSuffix: true, locale: bn })}
                                  </div>
                                  {draft.lastEdited && (
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      শেষ সম্পাদনা: {formatDistanceToNow(new Date(draft.lastEdited), { addSuffix: true, locale: bn })}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(draft)}
                                  className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSend(draft)}
                                  className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(draft.id)}
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