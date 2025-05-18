"use client"

import DashboardHeader from "@/components/dashboard-header"

export default function Trash() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/paper-texture.png')] bg-repeat">
      <DashboardHeader toggleSidebar={() => {}} />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-serif font-bold mb-6 text-amber-800">ট্র্যাশ</h1>
          <div className="bg-amber-50/90 backdrop-blur-sm rounded-lg p-6 border border-amber-200">
            <p className="text-amber-700">আপনার ট্র্যাশে কোন চিঠি নেই।</p>
          </div>
        </div>
      </main>
    </div>
  )
} 