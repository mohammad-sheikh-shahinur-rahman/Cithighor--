"use client"

import { useEffect, useState } from "react"

export function EnvelopeAnimation() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500)
    const timer2 = setTimeout(() => setStage(2), 1000)
    const timer3 = setTimeout(() => setStage(3), 1500)
    const timer4 = setTimeout(() => setStage(4), 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-64 h-48 mb-8">
        {/* Envelope base */}
        <div className="absolute inset-0 bg-amber-100 border-2 border-amber-300 rounded-md shadow-md"></div>

        {/* Bottom flap (always visible) */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-amber-100 border-t-2 border-amber-300"></div>

        {/* Left flap */}
        <div
          className={`absolute top-0 left-0 w-32 h-0 border-r-[64px] border-r-transparent border-t-[48px] border-t-amber-200 border-l-[64px] border-l-transparent transition-transform duration-500 origin-bottom-left ${stage >= 2 ? "scale-y-100" : "scale-y-0"}`}
          style={{ transformOrigin: "bottom left" }}
        ></div>

        {/* Right flap */}
        <div
          className={`absolute top-0 right-0 w-32 h-0 border-l-[64px] border-l-transparent border-t-[48px] border-t-amber-200 border-r-[64px] border-r-transparent transition-transform duration-500 origin-bottom-right ${stage >= 3 ? "scale-y-100" : "scale-y-0"}`}
          style={{ transformOrigin: "bottom right" }}
        ></div>

        {/* Top flap */}
        <div
          className={`absolute top-0 left-0 right-0 h-0 border-l-[128px] border-l-transparent border-b-[48px] border-b-amber-200 border-r-[128px] border-r-transparent transition-transform duration-500 origin-top ${stage >= 4 ? "scale-y-100" : "scale-y-0"}`}
          style={{ transformOrigin: "top" }}
        ></div>

        {/* Letter */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-40 bg-amber-50 border border-amber-200 rounded transition-all duration-500 ${stage >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
        >
          <div className="p-2 text-center text-amber-800 font-serif text-sm">
            <p>চিঠি পাঠানো হচ্ছে...</p>
            <div className="mt-4 border-t border-amber-200 pt-2">
              <p className="text-xs">আপনার চিঠি প্রাপকের কাছে পৌঁছাচ্ছে</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-amber-800 text-lg font-serif animate-pulse">চিঠি পাঠানো হচ্ছে...</p>
    </div>
  )
}
