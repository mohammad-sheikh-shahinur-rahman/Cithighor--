"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check } from "lucide-react"

interface Template {
  id: string
  title: string
  content: string
  thumbnail: string
}

interface TemplateSelectorProps {
  onSelect: (content: string) => void
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const templates: Template[] = [
    {
      id: "formal-letter",
      title: "আনুষ্ঠানিক চিঠি",
      content: `প্রিয় মহোদয়/মহোদয়া,

আশা করি আপনি ভালো আছেন। আমি আপনাকে জানাতে চাই যে...

[আপনার বিষয়বস্তু এখানে লিখুন]

ধন্যবাদান্তে,
[আপনার নাম]`,
      thumbnail: "/templates/formal-letter.png",
    },
    {
      id: "friendly-letter",
      title: "বন্ধুত্বপূর্ণ চিঠি",
      content: `প্রিয় বন্ধু,

কেমন আছো? অনেকদিন তোমার কোন খবর পাইনি। আমি আশা করি তুমি ভালো আছো।

[আপনার বিষয়বস্তু এখানে লিখুন]

তোমার বন্ধু,
[আপনার নাম]`,
      thumbnail: "/templates/friendly-letter.png",
    },
    {
      id: "love-letter",
      title: "প্রেমপত্র",
      content: `প্রিয়তম,

তোমাকে দেখা থেকে আমার দিনগুলি আলোকিত হয়ে উঠেছে। তোমার কথা ভাবলেই আমার হৃদয় আনন্দে ভরে যায়।

[আপনার অনুভূতি এখানে লিখুন]

চিরদিন তোমার,
[আপনার নাম]`,
      thumbnail: "/templates/love-letter.png",
    },
    {
      id: "invitation",
      title: "আমন্ত্রণপত্র",
      content: `প্রিয় [নাম],

আমি আপনাকে/তোমাকে আমন্ত্রণ জানাচ্ছি [অনুষ্ঠানের নাম] অনুষ্ঠানে যোগদান করার জন্য।

তারিখ: [তারিখ]
সময়: [সময়]
স্থান: [স্থান]

আপনার/তোমার উপস্থিতি আমাদের অনুষ্ঠানকে সার্থক করবে।

শুভেচ্ছান্তে,
[আপনার নাম]`,
      thumbnail: "/templates/invitation.png",
    },
    {
      id: "thank-you",
      title: "ধন্যবাদ পত্র",
      content: `প্রিয় [নাম],

আপনার/তোমার সাহায্য ও সহযোগিতার জন্য আন্তরিক ধন্যবাদ। আপনার/তোমার সহায়তা ছাড়া এটি সম্ভব হতো না।

[আপনার কৃতজ্ঞতা এখানে লিখুন]

ধন্যবাদান্তে,
[আপনার নাম]`,
      thumbnail: "/templates/thank-you.png",
    },
  ]

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template.id)
    onSelect(template.content)
  }

  return (
    <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
      <CardContent className="p-4">
        <h3 className="text-lg font-serif font-medium text-amber-800 mb-4">চিঠির টেমপ্লেট বাছাই করুন</h3>
        <ScrollArea className="h-64 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`
                  relative cursor-pointer rounded-md border p-2 transition-all
                  ${
                    selectedTemplate === template.id
                      ? "border-amber-600 bg-amber-100"
                      : "border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                  }
                `}
                onClick={() => handleSelectTemplate(template)}
              >
                <div className="aspect-[4/3] relative mb-2 rounded overflow-hidden bg-amber-200">
                  <div
                    className="w-full h-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${template.thumbnail})` }}
                  />
                </div>
                <p className="text-sm font-medium text-amber-800 text-center">{template.title}</p>
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 bg-amber-600 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            className="border-amber-200 text-amber-800 hover:bg-amber-100"
            onClick={() => onSelect("")}
          >
            খালি চিঠি
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
