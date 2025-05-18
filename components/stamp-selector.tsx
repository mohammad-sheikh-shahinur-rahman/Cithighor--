"use client"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check } from "lucide-react"

interface Stamp {
  id: string
  name: string
  image: string
}

interface StampSelectorProps {
  onSelect: (stampId: string) => void
  selectedStamp: string
}

export function StampSelector({ onSelect, selectedStamp }: StampSelectorProps) {
  const stamps: Stamp[] = [
    { id: "classic", name: "ক্লাসিক", image: "/stamp-classic.png" },
    { id: "bengali-1", name: "বাংলাদেশ-১", image: "/stamp-bengali-1.png" },
    { id: "bengali-2", name: "বাংলাদেশ-২", image: "/stamp-bengali-2.png" },
    { id: "vintage", name: "ভিনটেজ", image: "/stamp-vintage.png" },
    { id: "modern", name: "আধুনিক", image: "/stamp-modern.png" },
    { id: "special-1", name: "বিশেষ-১", image: "/stamp-special-1.png" },
    { id: "special-2", name: "বিশেষ-২", image: "/stamp-special-2.png" },
    { id: "holiday", name: "ছুটির দিন", image: "/stamp-holiday.png" },
  ]

  return (
    <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
      <CardContent className="p-4">
        <h3 className="text-lg font-serif font-medium text-amber-800 mb-4">ডাক টিকিট বাছাই করুন</h3>
        <ScrollArea className="h-64 w-full">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {stamps.map((stamp) => (
              <div
                key={stamp.id}
                className={`
                  relative cursor-pointer rounded-md border p-2 transition-all
                  ${
                    selectedStamp === stamp.id
                      ? "border-amber-600 bg-amber-100"
                      : "border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                  }
                `}
                onClick={() => onSelect(stamp.id)}
              >
                <div className="aspect-[3/4] relative mb-2 rounded overflow-hidden">
                  <div
                    className="w-full h-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${stamp.image})` }}
                  />
                </div>
                <p className="text-xs font-medium text-amber-800 text-center truncate">{stamp.name}</p>
                {selectedStamp === stamp.id && (
                  <div className="absolute top-2 right-2 bg-amber-600 text-white rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
