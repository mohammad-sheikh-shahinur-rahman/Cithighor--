"use client"

import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CookiePolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/paper-texture.png')] bg-repeat">
      <DashboardHeader toggleSidebar={() => {}} />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-serif font-bold mb-6 text-amber-800">কুকি পলিসি</h1>
          
          <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-amber-800">কুকি কি?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 mb-4">
                কুকি হল ছোট টেক্সট ফাইল যা আপনার ডিভাইসে সংরক্ষিত হয় যখন আপনি কোন ওয়েবসাইট পরিদর্শন করেন। 
                এই ফাইলগুলি আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে এবং ওয়েবসাইটের কার্যকারিতা বজায় রাখতে সাহায্য করে।
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-amber-800">আমরা কি ধরনের কুকি ব্যবহার করি?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">অত্যাবশ্যকীয় কুকি</h3>
                  <p className="text-amber-700">
                    এই কুকিগুলি ওয়েবসাইটের মৌলিক কার্যকারিতার জন্য প্রয়োজনীয়। এগুলি আপনার লগইন সেশন, 
                    নিরাপত্তা এবং অ্যাকাউন্ট সেটিংস পরিচালনা করে।
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">পারফরম্যান্স কুকি</h3>
                  <p className="text-amber-700">
                    এই কুকিগুলি আমাদের ওয়েবসাইটের পারফরম্যান্স এবং ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে সাহায্য করে।
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">ফাংশনালিটি কুকি</h3>
                  <p className="text-amber-700">
                    এই কুকিগুলি আপনার পছন্দ এবং সেটিংস মনে রাখতে সাহায্য করে, যেমন আপনার ভাষা পছন্দ বা 
                    থিম সেটিংস।
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-amber-800">কুকি পরিচালনা</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 mb-4">
                আপনি আপনার ব্রাউজার সেটিংস পরিবর্তন করে কুকি পরিচালনা করতে পারেন। তবে, কিছু কুকি 
                নিষ্ক্রিয় করলে ওয়েবসাইটের কিছু বৈশিষ্ট্য সঠিকভাবে কাজ নাও করতে পারে।
              </p>
              <p className="text-amber-700">
                আপনার ব্রাউজারের কুকি সেটিংস পরিবর্তন করতে, অনুগ্রহ করে আপনার ব্রাউজারের সাহায্য 
                বিভাগ দেখুন।
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-amber-800">আমাদের সাথে যোগাযোগ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700">
                কুকি পলিসি সম্পর্কে আপনার কোন প্রশ্ন থাকলে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।
                আমরা আপনার প্রশ্নের উত্তর দিতে সর্বদা প্রস্তুত।
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="border-t border-amber-200 py-6 px-4 md:px-6 bg-amber-50/80 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-amber-700">© 2025 চিঠিঘর। সর্বস্বত্ব সংরক্ষিত।</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
            <Link className="text-xs text-amber-700 hover:underline underline-offset-4" href="/privacy-policy">
              গোপনীয়তা নীতি
            </Link>
            <Link className="text-xs text-amber-700 hover:underline underline-offset-4" href="/terms">
              ব্যবহারের শর্তাবলী
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
} 