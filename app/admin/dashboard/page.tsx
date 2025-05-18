"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import { Eye, Search, Trash2, UserCog, Users } from "lucide-react"
import Image from "next/image"

interface User {
  id: string
  username: string
  email: string
  fullName?: string
  mobile?: string
  address?: string
  profileImage?: string | null
  createdAt: string
  role: string
}

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Helper to reload users from localStorage
  const reloadUsers = useCallback(() => {
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
    setUsers(allUsers)
    setFilteredUsers(allUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.mobile && user.mobile.toLowerCase().includes(searchTerm.toLowerCase())),
    ))
  }, [searchTerm])

  useEffect(() => {
    // Check if user is logged in and is super admin
    const user = localStorage.getItem("currentUser")
    if (!user) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(user)
    if (userData.role !== "superadmin") {
      toast({
        title: "অননুমোদিত অ্যাক্সেস",
        description: "আপনার এই পৃষ্ঠা দেখার অনুমতি নেই।",
        variant: "destructive",
      })
      router.push("/dashboard")
      return
    }

    setCurrentUser(userData)
    reloadUsers()
    setLoading(false)
  }, [router, toast, reloadUsers])

  // Add this useEffect to auto-refresh users when localStorage changes (other tabs)
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "users") {
        reloadUsers()
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [reloadUsers])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.trim() === "") {
      setFilteredUsers(users)
      return
    }

    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase()) ||
        (user.fullName && user.fullName.toLowerCase().includes(term.toLowerCase())) ||
        (user.mobile && user.mobile.toLowerCase().includes(term.toLowerCase())),
    )
    setFilteredUsers(filtered)
  }

  const deleteUser = (userId: string) => {
    if (window.confirm("আপনি কি নিশ্চিত যে আপনি এই ব্যবহারকারীকে মুছতে চান?")) {
      // Don't allow deleting super admin
      const userToDelete = users.find((user) => user.id === userId)
      if (userToDelete?.role === "superadmin") {
        toast({
          title: "অপারেশন অসম্ভব",
          description: "সুপার এডমিন ডিলিট করা যাবে না।",
          variant: "destructive",
        })
        return
      }

      // Filter out the deleted user
      const updatedUsers = users.filter((user) => user.id !== userId)
      localStorage.setItem("users", JSON.stringify(updatedUsers))
      reloadUsers()

      // Also delete user's messages
      const messages = JSON.parse(localStorage.getItem("messages") || "[]")
      const updatedMessages = messages.filter((m: any) => m.recipientId !== userId && m.senderId !== userId)
      localStorage.setItem("messages", JSON.stringify(updatedMessages))

      toast({
        title: "ব্যবহারকারী মুছে ফেলা হয়েছে",
        description: "ব্যবহারকারী সফলভাবে মুছে ফেলা হয়েছে।",
      })
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-amber-50">লোড হচ্ছে...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-[url('/images/paper-texture.png')] bg-repeat">
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <AdminSidebar isOpen={sidebarOpen} />
        <main className={`flex-1 p-4 md:p-6 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "ml-0"}`}>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-serif font-bold mb-6 text-amber-800">এডমিন ড্যাশবোর্ড</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-serif text-amber-800 flex items-center">
                    <Users className="mr-2 h-5 w-5" /> মোট ব্যবহারকারী
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-amber-900">{users.length}</p>
                </CardContent>
              </Card>
              <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-serif text-amber-800 flex items-center">
                    <UserCog className="mr-2 h-5 w-5" /> এডমিন
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-amber-900">
                    {users.filter((user) => user.role === "admin" || user.role === "superadmin").length}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-serif text-amber-800 flex items-center">
                    <Users className="mr-2 h-5 w-5" /> সাধারণ ব্যবহারকারী
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-amber-900">
                    {users.filter((user) => user.role === "user").length}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-amber-800">ব্যবহারকারী ব্যবস্থাপনা</CardTitle>
                <CardDescription className="text-amber-700">
                  সমস্ত ব্যবহারকারীদের দেখুন, সম্পাদনা করুন, এবং ব্যবস্থাপনা করুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-800" />
                  <Input
                    placeholder="ব্যবহারকারী খুঁজুন..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 border-amber-200 bg-amber-50 text-amber-900 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-amber-100 text-amber-800">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-amber-800 data-[state=active]:text-amber-50"
                    >
                      সকল ব্যবহারকারী
                    </TabsTrigger>
                    <TabsTrigger
                      value="admin"
                      className="data-[state=active]:bg-amber-800 data-[state=active]:text-amber-50"
                    >
                      এডমিন
                    </TabsTrigger>
                    <TabsTrigger
                      value="user"
                      className="data-[state=active]:bg-amber-800 data-[state=active]:text-amber-50"
                    >
                      সাধারণ ব্যবহারকারী
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-amber-200 bg-amber-100">
                            <th className="px-4 py-2 text-left text-amber-800">ব্যবহারকারী</th>
                            <th className="px-4 py-2 text-left text-amber-800">ইমেইল</th>
                            <th className="px-4 py-2 text-left text-amber-800">মোবাইল</th>
                            <th className="px-4 py-2 text-left text-amber-800">রোল</th>
                            <th className="px-4 py-2 text-left text-amber-800">রেজিস্ট্রেশন তারিখ</th>
                            <th className="px-4 py-2 text-center text-amber-800">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-4 py-4 text-center text-amber-800">
                                কোন ব্যবহারকারী পাওয়া যায়নি
                              </td>
                            </tr>
                          ) : (
                            filteredUsers.map((user) => (
                              <tr key={user.id} className="border-b border-amber-200 hover:bg-amber-50">
                                <td className="px-4 py-3 text-amber-800">
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-amber-200 mr-3 flex-shrink-0">
                                      {user.profileImage ? (
                                        <Image
                                          src={user.profileImage || "/placeholder.svg"}
                                          alt={user.username}
                                          width={40}
                                          height={40}
                                          className="object-cover w-full h-full"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-amber-800 font-bold">
                                          {user.username.charAt(0).toUpperCase()}
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <div className="font-medium">{user.fullName || user.username}</div>
                                      <div className="text-xs text-amber-700">@{user.username}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-amber-800">{user.email}</td>
                                <td className="px-4 py-3 text-amber-800">{user.mobile || "N/A"}</td>
                                <td className="px-4 py-3 text-amber-800">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      user.role === "superadmin"
                                        ? "bg-red-100 text-red-800"
                                        : user.role === "admin"
                                          ? "bg-purple-100 text-purple-800"
                                          : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {user.role === "superadmin"
                                      ? "সুপার এডমিন"
                                      : user.role === "admin"
                                        ? "এডমিন"
                                        : "সাধারণ ব্যবহারকারী"}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-amber-800">
                                  {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 text-amber-800">
                                  <div className="flex justify-center space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
                                      asChild
                                    >
                                      <Link href={`/admin/users/${user.id}`}>
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">দেখুন</span>
                                      </Link>
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-600 hover:text-red-700 hover:bg-red-100"
                                      onClick={() => deleteUser(user.id)}
                                      disabled={user.role === "superadmin"}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      <span className="sr-only">মুছুন</span>
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="admin" className="mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-amber-200 bg-amber-100">
                            <th className="px-4 py-2 text-left text-amber-800">ব্যবহারকারী</th>
                            <th className="px-4 py-2 text-left text-amber-800">ইমেইল</th>
                            <th className="px-4 py-2 text-left text-amber-800">মোবাইল</th>
                            <th className="px-4 py-2 text-left text-amber-800">রোল</th>
                            <th className="px-4 py-2 text-left text-amber-800">রেজিস্ট্রেশন তারিখ</th>
                            <th className="px-4 py-2 text-center text-amber-800">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.filter((user) => user.role === "admin" || user.role === "superadmin")
                            .length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-4 py-4 text-center text-amber-800">
                                কোন এডমিন পাওয়া যায়নি
                              </td>
                            </tr>
                          ) : (
                            filteredUsers
                              .filter((user) => user.role === "admin" || user.role === "superadmin")
                              .map((user) => (
                                <tr key={user.id} className="border-b border-amber-200 hover:bg-amber-50">
                                  <td className="px-4 py-3 text-amber-800">
                                    <div className="flex items-center">
                                      <div className="w-10 h-10 rounded-full overflow-hidden bg-amber-200 mr-3 flex-shrink-0">
                                        {user.profileImage ? (
                                          <Image
                                            src={user.profileImage || "/placeholder.svg"}
                                            alt={user.username}
                                            width={40}
                                            height={40}
                                            className="object-cover w-full h-full"
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-amber-800 font-bold">
                                            {user.username.charAt(0).toUpperCase()}
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        <div className="font-medium">{user.fullName || user.username}</div>
                                        <div className="text-xs text-amber-700">@{user.username}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-amber-800">{user.email}</td>
                                  <td className="px-4 py-3 text-amber-800">{user.mobile || "N/A"}</td>
                                  <td className="px-4 py-3 text-amber-800">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs ${
                                        user.role === "superadmin"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-purple-100 text-purple-800"
                                      }`}
                                    >
                                      {user.role === "superadmin" ? "সুপার এডমিন" : "এডমিন"}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-amber-800">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                  </td>
                                  <td className="px-4 py-3 text-amber-800">
                                    <div className="flex justify-center space-x-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
                                        asChild
                                      >
                                        <Link href={`/admin/users/${user.id}`}>
                                          <Eye className="h-4 w-4" />
                                          <span className="sr-only">দেখুন</span>
                                        </Link>
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700 hover:bg-red-100"
                                        onClick={() => deleteUser(user.id)}
                                        disabled={user.role === "superadmin"}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">মুছুন</span>
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="user" className="mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-amber-200 bg-amber-100">
                            <th className="px-4 py-2 text-left text-amber-800">ব্যবহারকারী</th>
                            <th className="px-4 py-2 text-left text-amber-800">ইমেইল</th>
                            <th className="px-4 py-2 text-left text-amber-800">মোবাইল</th>
                            <th className="px-4 py-2 text-left text-amber-800">রোল</th>
                            <th className="px-4 py-2 text-left text-amber-800">রেজিস্ট্রেশন তারিখ</th>
                            <th className="px-4 py-2 text-center text-amber-800">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.filter((user) => user.role === "user").length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-4 py-4 text-center text-amber-800">
                                কোন সাধারণ ব্যবহারকারী পাওয়া যায়নি
                              </td>
                            </tr>
                          ) : (
                            filteredUsers
                              .filter((user) => user.role === "user")
                              .map((user) => (
                                <tr key={user.id} className="border-b border-amber-200 hover:bg-amber-50">
                                  <td className="px-4 py-3 text-amber-800">
                                    <div className="flex items-center">
                                      <div className="w-10 h-10 rounded-full overflow-hidden bg-amber-200 mr-3 flex-shrink-0">
                                        {user.profileImage ? (
                                          <Image
                                            src={user.profileImage || "/placeholder.svg"}
                                            alt={user.username}
                                            width={40}
                                            height={40}
                                            className="object-cover w-full h-full"
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-amber-800 font-bold">
                                            {user.username.charAt(0).toUpperCase()}
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        <div className="font-medium">{user.fullName || user.username}</div>
                                        <div className="text-xs text-amber-700">@{user.username}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-amber-800">{user.email}</td>
                                  <td className="px-4 py-3 text-amber-800">{user.mobile || "N/A"}</td>
                                  <td className="px-4 py-3 text-amber-800">
                                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                      সাধারণ ব্যবহারকারী
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-amber-800">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                  </td>
                                  <td className="px-4 py-3 text-amber-800">
                                    <div className="flex justify-center space-x-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
                                        asChild
                                      >
                                        <Link href={`/admin/users/${user.id}`}>
                                          <Eye className="h-4 w-4" />
                                          <span className="sr-only">দেখুন</span>
                                        </Link>
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700 hover:bg-red-100"
                                        onClick={() => deleteUser(user.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">মুছুন</span>
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
