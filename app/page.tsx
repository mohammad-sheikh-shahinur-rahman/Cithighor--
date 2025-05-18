"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Mail, Shield, BookOpen, Users, Star, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { TypewriterEffect } from "@/components/typewriter-effect"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* Curved Nav Bar */}
      <div className="relative">
        <div className="absolute inset-0 bg-amber-800 curved-bottom"></div>
        <header className="relative z-10 px-4 lg:px-6 h-20 flex items-center">
          <Link className="flex items-center justify-center" href="/">
            <span className="font-serif font-bold text-3xl text-amber-50">চিঠিঘর</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium text-amber-50 hover:text-amber-200 transition-colors" href="/login">
              লগইন
            </Link>
            <Link className="text-sm font-medium text-amber-50 hover:text-amber-200 transition-colors" href="/register">
              রেজিস্ট্রেশন
            </Link>
            <Link className="text-sm font-medium text-amber-50 hover:text-amber-200 transition-colors" href="/about">
              আমাদের সম্পর্কে
            </Link>
          </nav>
        </header>
      </div>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/images/paper-texture.png')] bg-repeat">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-amber-900">
                  পুরোনো দিনের মত চিঠি লেখার অনুভূতি
                </h1>
                <p className="mx-auto max-w-[700px] text-amber-800 md:text-xl">
                  আপনার নিজস্ব চিঠিঘর তৈরি করুন, অন্যদের সাথে চিঠি আদান-প্রদান করুন, এবং পুরোনো দিনের স্মৃতি ফিরিয়ে আনুন।
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button className="bg-amber-800 hover:bg-amber-900 text-amber-50">
                    শুরু করুন <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-amber-800 text-amber-800 hover:bg-amber-100">
                    আরও জানুন
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-amber-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 mb-2">প্রিয় পাঠকদের প্রতি একটি চিঠি</h2>
              <p className="text-amber-800 max-w-2xl mx-auto">আমাদের চিঠিঘরে আপনাকে স্বাগতম। নিচের চিঠিটি আপনার জন্য...</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="bg-[url('/paper-texture-bengali-classic.png')] bg-repeat p-8 rounded-lg border border-amber-200 shadow-md relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <div className="w-16 h-20 bg-[url('/stamp-bengali-1.png')] bg-contain bg-no-repeat bg-center"></div>
                </div>
                <div className="mb-4 text-right text-amber-800 text-sm">
                  ঢাকা, {new Date().toLocaleDateString("bn-BD")}
                </div>
                <div className="mb-2 text-amber-900 font-serif font-bold">প্রিয় বন্ধু,</div>
                <TypewriterEffect
                  text="আপনাকে আমাদের চিঠিঘরে আন্তরিক অভিনন্দন। এই ডিজিটাল যুগে, আমরা হারিয়ে যাওয়া একটি শিল্পকে পুনরুজ্জীবিত করতে চাই - হাতে লেখা চিঠির আদান-প্রদান।

চিঠি লেখা শুধু যোগাযোগের মাধ্যম নয়, এটি আমাদের অনুভূতি, চিন্তা এবং স্মৃতির একটি অমূল্য সংগ্রহ। আমাদের দাদা-দাদি, নানা-নানীরা যেভাবে তাদের প্রিয়জনদের সাথে দূর থেকে সম্পর্ক রাখতেন, সেই ঐতিহ্য আমরা ফিরিয়ে আনতে চাই।

চিঠিঘরে আপনি শুধু বার্তা পাঠাবেন না, বরং আপনার অনুভূতি, আবেগ, এবং চিন্তাভাবনা সুন্দরভাবে সাজিয়ে প্রেরণ করবেন। আপনার চিঠি হবে আপনার ব্যক্তিত্বের প্রতিফলন - আপনার হাতের লেখা, আপনার পছন্দের কাগজ, আপনার নির্বাচিত শব্দ।

আমরা বিশ্বাস করি, একটি হাতে লেখা চিঠি হাজার ইমেইল বা টেক্সট মেসেজের চেয়ে বেশি মূল্যবান। এটি সময় নেয়, ভাবনা নেয়, এবং যত্ন নেয় - ঠিক যেমন আমাদের সম্পর্কগুলি নেয়।

আসুন, আবার শুরু করি চিঠি লেখার সেই পুরনো অভ্যাস। আপনার প্রথম চিঠি লিখুন আজই, এবং অনুভব করুন সেই আনন্দ যা শুধুমাত্র একটি সুন্দর হাতে লেখা চিঠি দিতে পারে।

অপেক্ষায় রইলাম আপনার চিঠির,
চিঠিঘর পরিবার"
                  className="text-amber-800 font-serif leading-relaxed whitespace-pre-line text-justify"
                />
                <div className="mt-8 text-right">
                  <div className="inline-block border-b-2 border-amber-800 pb-1 text-amber-900 font-serif font-bold">
                    চিঠিঘর পরিবার
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 opacity-30">
                  <div className="w-24 h-24 bg-[url('/stamp-bengali-2.png')] bg-contain bg-no-repeat bg-center"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-amber-100">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 mb-2">চিঠিঘরের বৈশিষ্ট্য</h2>
              <p className="text-amber-800 max-w-2xl mx-auto">
                চিঠিঘর আপনাকে পুরোনো দিনের চিঠি লেখার অনুভূতি ফিরিয়ে আনতে সাহায্য করে, আধুনিক প্রযুক্তির সুবিধা সহ।
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 items-center">
              <motion.div
                className="rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col space-y-2">
                  <div className="bg-amber-200 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <Mail className="h-6 w-6 text-amber-800" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-amber-800">নস্টালজিক ডিজাইন</h3>
                  <p className="text-sm text-amber-700">
                    পুরোনো দিনের চিঠির মত ডিজাইন, বিভিন্ন কাগজের টেক্সচার, এবং হাতে লেখার ফন্ট।
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col space-y-2">
                  <div className="bg-amber-200 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <Shield className="h-6 w-6 text-amber-800" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-amber-800">মোমের সিল</h3>
                  <p className="text-sm text-amber-700">
                    আপনার চিঠিতে বিভিন্ন ধরনের মোমের সিল ব্যবহার করে একে আরও আকর্ষণীয় করুন।
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col space-y-2">
                  <div className="bg-amber-200 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <MessageSquare className="h-6 w-6 text-amber-800" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-amber-800">খাম এনিমেশন</h3>
                  <p className="text-sm text-amber-700">
                    চিঠি পাঠানোর সময় খাম ভাঁজ করার এনিমেশন এবং চিঠি পাওয়ার সময় খাম খোলার এনিমেশন।
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-[url('/paper-texture-vintage.png')] bg-repeat">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold text-amber-900 mb-4">কেন চিঠিঘর ব্যবহার করবেন?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center mt-1 flex-shrink-0">
                      <Star className="h-4 w-4 text-amber-800" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-amber-800">নস্টালজিয়া</h3>
                      <p className="text-amber-700">পুরোনো দিনের চিঠি লেখার অনুভূতি ফিরিয়ে আনুন।</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center mt-1 flex-shrink-0">
                      <Shield className="h-4 w-4 text-amber-800" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-amber-800">গোপনীয়তা</h3>
                      <p className="text-amber-700">আপনার চিঠি সম্পূর্ণ গোপনীয় থাকে।</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center mt-1 flex-shrink-0">
                      <Users className="h-4 w-4 text-amber-800" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-amber-800">সহজ ব্যবহার</h3>
                      <p className="text-amber-700">সহজেই চিঠি লিখুন, পাঠান এবং পড়ুন।</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center mt-1 flex-shrink-0">
                      <BookOpen className="h-4 w-4 text-amber-800" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-amber-800">কাস্টমাইজেশন</h3>
                      <p className="text-amber-700">আপনার পছন্দ অনুযায়ী চিঠির স্টাইল কাস্টমাইজ করুন।</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-100/80 to-transparent z-10"></div>
                <Image src="/letter-writing.jpg" alt="চিঠি লেখার দৃশ্য" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-amber-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 mb-2">ব্যবহারকারীদের মতামত</h2>
              <p className="text-amber-800 max-w-2xl mx-auto">দেখুন অন্যরা চিঠিঘর সম্পর্কে কী বলছেন</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <motion.div
                className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                      <span className="text-amber-800 font-bold">ল</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900">লাবণ্য প্রভা</h3>
                      <p className="text-xs text-amber-700">ঢাকা</p>
                    </div>
                  </div>
                  <p className="text-amber-800 flex-1">
                    "চিঠিঘর আমার জীবনে একটি নতুন মাত্রা যোগ করেছে। আমি প্রতি সপ্তাহে আমার দূরের বোনকে চিঠি লিখি, যা আমাদের সম্পর্ককে
                    আরও গভীর করেছে। ডিজিটাল যুগে এই অনন্য অভিজ্ঞতার জন্য ধন্যবাদ।"
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                      <span className="text-amber-800 font-bold">মৃ</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900">মৃন্ময়ী মায়া</h3>
                      <p className="text-xs text-amber-700">চট্টগ্রাম</p>
                    </div>
                  </div>
                  <p className="text-amber-800 flex-1">
                    "চিঠিঘরের টাইপরাইটার এফেক্ট আমাকে আমার নানার সময়ের কথা মনে করিয়ে দেয়। তিনি একটি পুরানো টাইপরাইটারে চিঠি লিখতেন। এই
                    প্ল্যাটফর্মে চিঠি লেখা আমার জন্য একটি আবেগময় অভিজ্ঞতা।"
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                      <span className="text-amber-800 font-bold">সা</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900">সানজিন সিমু</h3>
                      <p className="text-xs text-amber-700">সিলেট</p>
                    </div>
                  </div>
                  <p className="text-amber-800 flex-1">
                    "বিভিন্ন স্টিকার এবং স্ট্যাম্প ব্যবহার করে চিঠি সাজানো আমার সবচেয়ে প্রিয় অংশ। আমি প্রতিদিন চিঠিঘর ব্যবহার করি এবং
                    এটি আমার মানসিক স্বাস্থ্যের জন্য খুবই উপকারী।"
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                      <span className="text-amber-800 font-bold">গা</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900">গাজী আব্দুল মালেক</h3>
                      <p className="text-xs text-amber-700">খুলনা</p>
                    </div>
                  </div>
                  <p className="text-amber-800 flex-1">
                    "আমি একজন শিক্ষক এবং আমার ছাত্রদের সাথে চিঠিঘর ব্যবহার করি। এটি তাদের লেখার দক্ষতা উন্নত করতে সাহায্য করেছে এবং তারা
                    ডিজিটাল যুগে হাতে লেখার গুরুত্ব বুঝতে পেরেছে।"
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                      <span className="text-amber-800 font-bold">মু</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900">মুসা আকন্দ</h3>
                      <p className="text-xs text-amber-700">রাজশাহী</p>
                    </div>
                  </div>
                  <p className="text-amber-800 flex-1">
                    "আমি বিদেশে থাকি এবং চিঠিঘর আমাকে আমার দেশের সাথে সংযুক্ত রাখে। আমি প্রতি মাসে আমার পরিবারকে বাংলায় চিঠি লিখি, যা
                    আমাদের সম্পর্ককে আরও মজবুত করেছে।"
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                      <span className="text-amber-800 font-bold">সা</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900">সাবিনা ইসলাম</h3>
                      <p className="text-xs text-amber-700">বরিশাল</p>
                    </div>
                  </div>
                  <p className="text-amber-800 flex-1">
                    "আমি প্রতিদিন চিঠিঘর ব্যবহার করি। এটি আমাকে সোশ্যাল মিডিয়ার হইচই থেকে দূরে থাকতে সাহায্য করে এবং আমার প্রিয়জনদের
                    সাথে আরও অর্থপূর্ণ যোগাযোগ করতে সাহায্য করে।"
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-amber-800 text-amber-50">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-serif font-bold mb-4">আজই চিঠিঘরে যোগ দিন</h2>
              <p className="mb-8">
                পুরোনো দিনের চিঠি লেখার অনুভূতি ফিরিয়ে আনুন। আপনার নিজস্ব চিঠিঘর তৈরি করুন এবং আপনার প্রিয়জনদের সাথে চিঠি আদান-প্রদান
                করুন।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button className="bg-amber-50 text-amber-800 hover:bg-amber-100 w-full sm:w-auto">
                    রেজিস্ট্রেশন করুন
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-amber-50 text-amber-50 hover:bg-amber-700 w-full sm:w-auto"
                  >
                    লগইন করুন
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-amber-200 py-6 px-4 md:px-6 bg-amber-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-serif font-medium text-amber-800 mb-4">চিঠিঘর</h3>
              <p className="text-sm text-amber-700 mb-4">
                পুরোনো দিনের মত চিঠি লেখার অনুভূতি ফিরিয়ে আনতে চিঠিঘর সর্বদা প্রস্তুত। আপনার অনুভূতি, চিন্তা এবং স্মৃতি শেয়ার করুন।
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-amber-800 hover:text-amber-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-amber-800 hover:text-amber-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-amber-800 hover:text-amber-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-serif font-medium text-amber-800 mb-4">দ্রুত লিংক</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/dashboard" className="text-amber-700 hover:text-amber-900 hover:underline">
                    ড্যাশবোর্ড
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="text-amber-700 hover:text-amber-900 hover:underline">
                    সেটিংস
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-amber-700 hover:text-amber-900 hover:underline">
                    আমাদের সম্পর্কে
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-amber-700 hover:text-amber-900 hover:underline">
                    গোপনীয়তা নীতি
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-amber-700 hover:text-amber-900 hover:underline">
                    ব্যবহারের শর্তাবলী
                  </Link>
                </li>
                <li>
                  <Link href="/developer" className="text-amber-700 hover:text-amber-900 hover:underline">
                    ডেভেলপার
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-serif font-medium text-amber-800 mb-4">যোগাযোগ</h3>
              <address className="not-italic text-sm text-amber-700 space-y-2">
                <p>ঢাকা, বাংলাদেশ</p>
                <p>ইমেইল: info@chithighor.com</p>
                <p>ফোন: +880 1234-567890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-amber-200 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
            <p className="text-xs text-amber-700">© 2025 চিঠিঘর। সর্বস্বত্ব সংরক্ষিত।</p>
            <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
              <Link className="text-xs text-amber-700 hover:underline underline-offset-4" href="/privacy-policy">
                গোপনীয়তা নীতি
              </Link>
              <Link className="text-xs text-amber-700 hover:underline underline-offset-4" href="/terms-of-service">
                ব্যবহারের শর্তাবলী
              </Link>
              <Link className="text-xs text-amber-700 hover:underline underline-offset-4" href="/cookie-policy">
                কুকি নীতি
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
