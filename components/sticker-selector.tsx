"use client"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check } from "lucide-react"

interface Sticker {
  id: string
  name: string
  image: string
}

interface StickerSelectorProps {
  onSelect: (stickerId: string) => void
  selectedSticker: string | null
}

export function StickerSelector({ onSelect, selectedSticker }: StickerSelectorProps) {
  const stickers: Sticker[] = [
    { id: "flower-1", name: "ফুল ১", image: "/stickers/flower-1.png" },
    { id: "flower-2", name: "ফুল ২", image: "/stickers/flower-2.png" },
    { id: "heart-1", name: "হার্ট ১", image: "/stickers/heart-1.png" },
    { id: "heart-2", name: "হার্ট ২", image: "/stickers/heart-2.png" },
    { id: "star-1", name: "তারা ১", image: "/stickers/star-1.png" },
    { id: "star-2", name: "তারা ২", image: "/stickers/star-2.png" },
    { id: "butterfly-1", name: "প্রজাপতি ১", image: "/stickers/butterfly-1.png" },
    { id: "butterfly-2", name: "প্রজাপতি ২", image: "/stickers/butterfly-2.png" },
    { id: "bird-1", name: "পাখি ১", image: "/stickers/bird-1.png" },
    { id: "bird-2", name: "পাখি ২", image: "/stickers/bird-2.png" },
    { id: "moon-1", name: "চাঁদ ১", image: "/stickers/moon-1.png" },
    { id: "sun-1", name: "সূর্য ১", image: "/stickers/sun-1.png" },
  ]

  return (
    <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
      <CardContent className="p-4">
        <h3 className="text-lg font-serif font-medium text-amber-800 mb-4">স্টিকার বাছাই করুন</h3>
        <ScrollArea className="h-64 w-full">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {stickers.map((sticker) => (
              <div
                key={sticker.id}
                className={`
                  relative cursor-pointer rounded-md border p-2 transition-all
                  ${
                    selectedSticker === sticker.id
                      ? "border-amber-600 bg-amber-100"
                      : "border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                  }
                `}
                onClick={() => onSelect(sticker.id)}
              >
                <div className="aspect-square relative mb-2 rounded overflow-hidden">
                  <div
                    className="w-full h-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${sticker.image})` }}
                  />
                </div>
                <p className="text-xs font-medium text-amber-800 text-center truncate">{sticker.name}</p>
                {selectedSticker === sticker.id && (
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
