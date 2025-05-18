"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Filter, Download, Upload, Star, MessageSquare, Shield, MoreVertical, UserPlus, Users, Mail, Phone, MapPin, Calendar, X } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  location?: string
  avatar?: string
  status: "online" | "offline" | "away"
  lastActive?: string
  isFavorite: boolean
  isBlocked: boolean
  group?: string
  notes?: string
  lastContact?: string
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showAddContact, setShowAddContact] = useState(false)
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: "",
    email: "",
    phone: "",
    location: "",
    status: "offline",
    isFavorite: false,
    isBlocked: false,
    group: "other"
  })
  const { toast } = useToast()

  useEffect(() => {
    // Load contacts from localStorage
    const loadContacts = () => {
      const storedContacts = localStorage.getItem("contacts")
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts))
      }
      setLoading(false)
    }
    loadContacts()
  }, [])

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.phone && contact.phone.includes(searchTerm))
    
    const matchesGroup = selectedGroup === "all" || contact.group === selectedGroup
    
    const matchesTab = activeTab === "all" || 
                      (activeTab === "favorites" && contact.isFavorite) ||
                      (activeTab === "blocked" && contact.isBlocked)

    return matchesSearch && matchesGroup && matchesTab
  })

  const groups = ["all", "family", "friends", "work", "other"]

  const handleFavorite = (contactId: string) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId ? { ...contact, isFavorite: !contact.isFavorite } : contact
    )
    setContacts(updatedContacts)
    localStorage.setItem("contacts", JSON.stringify(updatedContacts))
  }

  const handleBlock = (contactId: string) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId ? { ...contact, isBlocked: !contact.isBlocked } : contact
    )
    setContacts(updatedContacts)
    localStorage.setItem("contacts", JSON.stringify(updatedContacts))
  }

  const handleGroupChange = (contactId: string, group: string) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId ? { ...contact, group } : contact
    )
    setContacts(updatedContacts)
    localStorage.setItem("contacts", JSON.stringify(updatedContacts))
  }

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email) {
      toast({
        title: "ত্রুটি",
        description: "নাম এবং ইমেইল আবশ্যক।",
        variant: "destructive",
      })
      return
    }

    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone,
      location: newContact.location,
      status: newContact.status || "offline",
      isFavorite: newContact.isFavorite || false,
      isBlocked: newContact.isBlocked || false,
      group: newContact.group || "other",
      lastContact: new Date().toISOString()
    }

    const updatedContacts = [...contacts, contact]
    setContacts(updatedContacts)
    localStorage.setItem("contacts", JSON.stringify(updatedContacts))
    setShowAddContact(false)
    setNewContact({
      name: "",
      email: "",
      phone: "",
      location: "",
      status: "offline",
      isFavorite: false,
      isBlocked: false,
      group: "other"
    })

    toast({
      title: "সফল",
      description: "যোগাযোগ সফলভাবে যোগ করা হয়েছে।",
    })
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const importedContacts = JSON.parse(event.target?.result as string)
            if (Array.isArray(importedContacts)) {
              const updatedContacts = [...contacts, ...importedContacts]
              setContacts(updatedContacts)
              localStorage.setItem("contacts", JSON.stringify(updatedContacts))
              toast({
                title: "সফল",
                description: `${importedContacts.length}টি যোগাযোগ সফলভাবে আমদানি করা হয়েছে।`,
              })
            }
          } catch (error) {
            toast({
              title: "ত্রুটি",
              description: "ফাইল আমদানি করতে সমস্যা হয়েছে।",
              variant: "destructive",
            })
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(contacts, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'contacts.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    
    toast({
      title: "সফল",
      description: "যোগাযোগ সফলভাবে রপ্তানি করা হয়েছে।",
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <DashboardHeader toggleSidebar={() => {}} />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-serif font-bold text-amber-800">যোগাযোগ</h1>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleImport}
                className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
              >
                <Upload className="h-4 w-4 mr-2" />
                আমদানি
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
              >
                <Download className="h-4 w-4 mr-2" />
                রপ্তানি
              </Button>
              <Button
                className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                onClick={() => setShowAddContact(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                যোগাযোগ যোগ করুন
              </Button>
            </div>
          </div>

          {/* Add Contact Dialog */}
          <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-amber-800">নতুন যোগাযোগ যোগ করুন</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-amber-800">
                    নাম
                  </Label>
                  <Input
                    id="name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="col-span-3 border-amber-200 bg-amber-50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right text-amber-800">
                    ইমেইল
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    className="col-span-3 border-amber-200 bg-amber-50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right text-amber-800">
                    ফোন
                  </Label>
                  <Input
                    id="phone"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="col-span-3 border-amber-200 bg-amber-50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right text-amber-800">
                    ঠিকানা
                  </Label>
                  <Input
                    id="location"
                    value={newContact.location}
                    onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
                    className="col-span-3 border-amber-200 bg-amber-50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="group" className="text-right text-amber-800">
                    গ্রুপ
                  </Label>
                  <Select
                    value={newContact.group}
                    onValueChange={(value) => setNewContact({ ...newContact, group: value })}
                  >
                    <SelectTrigger className="col-span-3 border-amber-200 bg-amber-50">
                      <SelectValue placeholder="গ্রুপ বাছাই করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.filter(g => g !== "all").map(group => (
                        <SelectItem key={group} value={group}>
                          {group === "family" ? "পরিবার" :
                           group === "friends" ? "বন্ধু" :
                           group === "work" ? "কর্মস্থল" : "অন্যান্য"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowAddContact(false)}
                  className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
                >
                  বাতিল
                </Button>
                <Button
                  onClick={handleAddContact}
                  className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                >
                  যোগ করুন
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
                    <label className="text-sm font-medium text-amber-800">গ্রুপ</label>
                    <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                      <SelectTrigger className="border-amber-200 bg-amber-50">
                        <SelectValue placeholder="গ্রুপ বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {groups.map(group => (
                          <SelectItem key={group} value={group}>
                            {group === "all" ? "সকল" : 
                             group === "family" ? "পরিবার" :
                             group === "friends" ? "বন্ধু" :
                             group === "work" ? "কর্মস্থল" : "অন্যান্য"}
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
                    <span className="text-amber-700">অনলাইন</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      {contacts.filter(c => c.status === "online").length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700">অফলাইন</span>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                      {contacts.filter(c => c.status === "offline").length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700">অন্যান্য</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      {contacts.filter(c => c.status === "away").length}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <Card className="border-amber-200">
                <CardHeader>
                  <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 bg-amber-100">
                      <TabsTrigger value="all" className="data-[state=active]:bg-amber-800 data-[state=active]:text-amber-50">
                        সকল
                      </TabsTrigger>
                      <TabsTrigger value="favorites" className="data-[state=active]:bg-amber-800 data-[state=active]:text-amber-50">
                        প্রিয়
                      </TabsTrigger>
                      <TabsTrigger value="blocked" className="data-[state=active]:bg-amber-800 data-[state=active]:text-amber-50">
                        ব্লক করা
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8 text-amber-700">লোড হচ্ছে...</div>
                  ) : filteredContacts.length === 0 ? (
                    <div className="text-center py-8 text-amber-700">কোন যোগাযোগ পাওয়া যায়নি।</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredContacts.map(contact => (
                        <Card key={contact.id} className="border-amber-200 hover:border-amber-300 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12 border-2 border-amber-200">
                                  <AvatarImage src={contact.avatar} />
                                  <AvatarFallback className="bg-amber-100 text-amber-800">
                                    {contact.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium text-amber-900">{contact.name}</h3>
                                  <p className="text-sm text-amber-700">{contact.email}</p>
                                  {contact.phone && (
                                    <p className="text-sm text-amber-600 flex items-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      {contact.phone}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleFavorite(contact.id)}
                                  className={contact.isFavorite ? "text-yellow-500" : "text-amber-700"}
                                >
                                  <Star className="h-4 w-4" fill={contact.isFavorite ? "currentColor" : "none"} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleBlock(contact.id)}
                                  className={contact.isBlocked ? "text-red-500" : "text-amber-700"}
                                >
                                  <Shield className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-amber-700">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-sm">
                              <Badge
                                variant="outline"
                                className={`
                                  ${contact.status === "online" ? "bg-green-100 text-green-800 border-green-200" :
                                    contact.status === "offline" ? "bg-gray-100 text-gray-800 border-gray-200" :
                                    "bg-yellow-100 text-yellow-800 border-yellow-200"}
                                `}
                              >
                                {contact.status === "online" ? "অনলাইন" :
                                 contact.status === "offline" ? "অফলাইন" : "অন্যান্য"}
                              </Badge>
                              <Select
                                value={contact.group || "other"}
                                onValueChange={(value) => handleGroupChange(contact.id, value)}
                              >
                                <SelectTrigger className="h-7 w-24 border-amber-200 bg-amber-50">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {groups.filter(g => g !== "all").map(group => (
                                    <SelectItem key={group} value={group}>
                                      {group === "family" ? "পরিবার" :
                                       group === "friends" ? "বন্ধু" :
                                       group === "work" ? "কর্মস্থল" : "অন্যান্য"}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {contact.lastContact && (
                              <div className="mt-3 text-xs text-amber-600 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                শেষ যোগাযোগ: {new Date(contact.lastContact).toLocaleDateString()}
                              </div>
                            )}
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