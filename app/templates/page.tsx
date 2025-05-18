"use client"

import { useState } from "react"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const templates = [
  {
    id: 1,
    title: "বন্ধুকে চিঠি",
    description: "বন্ধুকে লেখা একটি সাধারণ চিঠির টেমপ্লেট",
    content: `প্রিয় বন্ধু,

আশা করি তুমি ভালো আছো। আমি এখানে ভালো আছি।

তোমার সাথে দেখা না হয়ে অনেক দিন হয়ে গেছে। কবে দেখা হবে?

তোমার বন্ধু,
[আপনার নাম]`
  },
  {
    id: 2,
    title: "পরিবারকে চিঠি",
    description: "পরিবারের সদস্যদের লেখা একটি চিঠির টেমপ্লেট",
    content: `প্রিয় পরিবার,

আশা করি সবাই ভালো আছেন। আমি এখানে ভালো আছি।

আমার জীবন এখানে কেমন যাচ্ছে তা জানাতে চাই।

ভালোবাসা,
[আপনার নাম]`
  },
  {
    id: 3,
    title: "অফিসিয়াল চিঠি",
    description: "অফিসিয়াল উদ্দেশ্যে লেখা একটি চিঠির টেমপ্লেট",
    content: `জনাব/জনাবা,

বিষয়: [বিষয় লিখুন]

মহোদয়/মহোদয়া,

আপনার দৃষ্টি আকর্ষণ করতে চাই যে...

আপনার বিশ্বস্ত,
[আপনার নাম]
[পদবি]`
  },
  {
    id: 4,
    title: "ধন্যবাদ চিঠি",
    description: "কাউকে ধন্যবাদ জানাতে লেখা একটি চিঠির টেমপ্লেট",
    content: `প্রিয় [নাম],

আপনার সাহায্যের জন্য আন্তরিক ধন্যবাদ জানাই।

আপনার সহযোগিতা আমার জন্য খুবই মূল্যবান ছিল।

কৃতজ্ঞতাসহ,
[আপনার নাম]`
  },
  {
    id: 5,
    title: "অভিনন্দন চিঠি",
    description: "কাউকে অভিনন্দন জানাতে লেখা একটি চিঠির টেমপ্লেট",
    content: `প্রিয় [নাম],

আপনার সাফল্যের জন্য আন্তরিক অভিনন্দন জানাই।

আপনার এই অর্জন আমাদের সকলের জন্য গর্বের বিষয়।

শুভকামনা সহ,
[আপনার নাম]`
  },
  {
    id: 6,
    title: "শুভেচ্ছা চিঠি",
    description: "কাউকে শুভেচ্ছা জানাতে লেখা একটি চিঠির টেমপ্লেট",
    content: `প্রিয় [নাম],

আপনার জন্য শুভেচ্ছা রইল।

আশা করি আপনি ভালো আছেন এবং আপনার জীবন সুখময়।

শুভকামনা সহ,
[আপনার নাম]`
  }
]

export default function Templates() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  const handleUseTemplate = (templateId: number) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      // Store the template content in localStorage
      localStorage.setItem('selectedTemplate', JSON.stringify(template))
      // Navigate to compose page
      router.push('/compose')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[url('/images/paper-texture.png')] bg-repeat">
      <DashboardHeader toggleSidebar={() => {}} />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-serif font-bold mb-6 text-amber-800">টেমপ্লেট</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-amber-800">{template.title}</CardTitle>
                  <CardDescription className="text-amber-700">{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white/50 p-4 rounded-md border border-amber-200 mb-4">
                    <pre className="text-sm text-amber-900 whitespace-pre-wrap font-serif">
                      {template.content}
                    </pre>
                  </div>
                  <Button 
                    onClick={() => handleUseTemplate(template.id)}
                    className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50"
                  >
                    এই টেমপ্লেট ব্যবহার করুন
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 