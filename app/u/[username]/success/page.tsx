"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export default function SuccessPage({ params }: { params: Promise<{ username: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)

  return (
    <div className="min-h-screen bg-[url('/images/paper-texture.png')] bg-repeat">
      <main className="container mx-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col items-center space-y-4">
                  <CheckCircle2 className="h-16 w-16 text-green-600" />
                  <CardTitle className="text-2xl font-serif font-bold text-amber-800 text-center">
                    চিঠি সফলভাবে পাঠানো হয়েছে
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 text-center">
                  <p className="text-amber-700">
                    {resolvedParams.username} কে আপনার চিঠি সফলভাবে পাঠানো হয়েছে। 
                    তারা আপনার চিঠি পড়ার পর আপনাকে উত্তর দিতে পারবেন।
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={() => router.push(`/u/${resolvedParams.username}/write`)}
                      className="bg-amber-800 hover:bg-amber-900 text-amber-50"
                    >
                      আরেকটি চিঠি লিখুন
                    </Button>
                    <Button
                      onClick={() => router.push("/")}
                      variant="outline"
                      className="border-amber-800 text-amber-800 hover:bg-amber-100"
                    >
                      হোম পেজে যান
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
} 