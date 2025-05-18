"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Globe, Mail, Twitter, BookOpen, Code2, PenTool, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Developer() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/paper-texture.png')] bg-repeat">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-amber-200 bg-amber-50/90 backdrop-blur-sm">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-serif font-bold text-3xl text-amber-800">চিঠিঘর</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium text-amber-800 hover:underline underline-offset-4" href="/login">
            লগইন
          </Link>
          <Link className="text-sm font-medium text-amber-800 hover:underline underline-offset-4" href="/register">
            রেজিস্ট্রেশন
          </Link>
        </nav>
      </header>
      <main className="flex-1 container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-serif font-bold text-amber-900 mb-8 text-center"
          >
            ডেভেলপার
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-amber-50/90 backdrop-blur-sm border border-amber-200 rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="w-48 h-48 relative rounded-lg overflow-hidden border-4 border-amber-200 shadow-md flex-shrink-0"
              >
                <Image
                  src="https://m.media-amazon.com/images/S/amzn-author-media-prod/b02mvc2hucu96hchlksdjmogii._SY450_CR0%2C0%2C450%2C450_.jpg"
                  alt="মোহাম্মদ শেখ শাহিনুর রহমান"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <div className="flex-1">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-2xl font-serif font-bold text-amber-900 mb-2"
                >
                  মোহাম্মদ শেখ শাহিনুর রহমান
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-amber-800 mb-4"
                >
                  কবি | লেখক | সফটওয়্যার ইঞ্জিনিয়ার | প্রোগ্রামার | ডিজিটাল ফরেনসিক বিশেষজ্ঞ | প্রযুক্তি উদ্ভাবক
                </motion.p>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <h3 className="text-lg font-serif font-bold text-amber-800 mb-2 flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      পরিচিতি
                    </h3>
                    <p className="text-amber-700 mb-3">
                      মোহাম্মদ শেখ শাহিনুর রহমান একজন বহুমুখী প্রতিভার অধিকারী, যিনি সাহিত্য ও প্রযুক্তির জগতে সমান দক্ষতার সাথে কাজ করেন।
                      তিনি একজন প্রতিষ্ঠিত কবি ও লেখক হিসেবে বাংলা সাহিত্যে অবদান রাখার পাশাপাশি, একজন দক্ষ সফটওয়্যার ইঞ্জিনিয়ার ও
                      প্রোগ্রামার হিসেবেও পরিচিত।
                    </p>
                    <p className="text-amber-700 mb-3">
                      ডিজিটাল ফরেনসিক বিশেষজ্ঞ হিসেবে তিনি প্রযুক্তি সংক্রান্ত জটিল সমস্যা সমাধানে বিশেষ দক্ষতা অর্জন করেছেন। তার উদ্ভাবনী
                      চিন্তাভাবনা ও প্রযুক্তিগত জ্ঞান তাকে একজন সফল প্রযুক্তি উদ্ভাবক হিসেবে প্রতিষ্ঠিত করেছে।
                    </p>
                    <p className="text-amber-700">
                      চিঠিঘর প্রকল্পটি তার সাহিত্যিক অনুভূতি ও প্রযুক্তিগত দক্ষতার এক অনন্য সমন্বয়, যা পুরোনো দিনের চিঠি লেখার নস্টালজিয়াকে
                      আধুনিক ডিজিটাল যুগে ফিরিয়ে আনার একটি প্রয়াস।
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <h3 className="text-lg font-serif font-bold text-amber-800 mb-2 flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      যোগাযোগ
                    </h3>
                    <div className="space-y-2">
                      <motion.a
                        whileHover={{ x: 5 }}
                        href="https://mohammad-sheikh-shahinur-rahman.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-amber-800 hover:text-amber-900 hover:underline"
                      >
                        <Globe className="h-4 w-4" />
                        <span>mohammad-sheikh-shahinur-rahman.vercel.app</span>
                      </motion.a>
                      <motion.a
                        whileHover={{ x: 5 }}
                        href="https://shahinur.amadersomaj.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-amber-800 hover:text-amber-900 hover:underline"
                      >
                        <Globe className="h-4 w-4" />
                        <span>shahinur.amadersomaj.com</span>
                      </motion.a>
                      <motion.a
                        whileHover={{ x: 5 }}
                        href="mailto:shahinalam3546@gmail.com"
                        className="flex items-center gap-2 text-amber-800 hover:text-amber-900 hover:underline"
                      >
                        <Mail className="h-4 w-4" />
                        <span>contact@shahinur.com</span>
                      </motion.a>
                      <motion.a
                        whileHover={{ x: 5 }}
                        href="https://github.com/mohammad-sheikh-shahinur-rahman"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-amber-800 hover:text-amber-900 hover:underline"
                      >
                        <Github className="h-4 w-4" />
                        <span>github.com/mohammad-sheikh-shahinur-rahman</span>
                      </motion.a>
                      <motion.a
                        whileHover={{ x: 5 }}
                        href="https://twitter.com/Shahinalam3546"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-amber-800 hover:text-amber-900 hover:underline"
                      >
                        <Twitter className="h-4 w-4" />
                        <span>twitter.com/Shahinalam3546</span>
                      </motion.a>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-6 flex flex-wrap gap-3"
                >
                  <Button asChild className="bg-amber-800 hover:bg-amber-900 text-amber-50">
                    <a
                      href="https://mohammad-sheikh-shahinur-rahman.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ওয়েবসাইট দেখুন <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-amber-800 text-amber-800 hover:bg-amber-100">
                    <a href="mailto:shahinalam3546@gmail.com">
                      যোগাযোগ করুন <Mail className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-10 bg-amber-50/90 backdrop-blur-sm border border-amber-200 rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-4 flex items-center gap-2">
              <Code2 className="h-6 w-6" />
              চিঠিঘর প্রকল্প সম্পর্কে
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <PenTool className="h-5 w-5 text-amber-800 mt-1" />
                  <p className="text-amber-700">
                    চিঠিঘর প্রকল্পটি মোহাম্মদ শেখ শাহিনুর রহমানের একটি স্বপ্ন প্রকল্প, যা তিনি ডিজিটাল যুগে পুরোনো দিনের চিঠি লেখার অনুভূতি
                    ফিরিয়ে আনার লক্ষ্যে তৈরি করেছেন। এই প্রকল্পটি বাংলা ভাষা ও সংস্কৃতিকে সমৃদ্ধ করার পাশাপাশি, ডিজিটাল যোগাযোগের মাধ্যমে মানুষের
                    মধ্যে আবেগপূর্ণ যোগাযোগের সেতুবন্ধন তৈরি করতে সাহায্য করে।
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-amber-800 mt-1" />
                  <p className="text-amber-700">
                    এই প্ল্যাটফর্মে ব্যবহারকারীরা বিভিন্ন ধরনের কাগজ, কালি, ফন্ট, সিল, এবং স্ট্যাম্প ব্যবহার করে তাদের চিঠি কাস্টমাইজ করতে পারেন।
                    এছাড়াও, চিঠি পাঠানোর সময় খাম ভাঁজ করার এনিমেশন এবং চিঠি পাওয়ার সময় খাম খোলার এনিমেশন ব্যবহারকারীদের একটি অনন্য অভিজ্ঞতা প্রদান
                    করে।
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-amber-100/50 rounded-lg p-4 border border-amber-200">
                  <h4 className="font-serif font-bold text-amber-800 mb-2">ব্যবহৃত প্রযুক্তি</h4>
                  <ul className="space-y-2 text-amber-700">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-800 rounded-full"></span>
                      React
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-800 rounded-full"></span>
                      Next.js
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-800 rounded-full"></span>
                      Tailwind CSS
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-800 rounded-full"></span>
                      Framer Motion
                    </li>
                  </ul>
                </div>
                <p className="text-amber-700">
                  চিঠিঘর প্রকল্পটি একটি মুক্ত উৎস প্রকল্প, যা ডেভেলপারদের অবদান রাখার সুযোগ প্রদান করে।
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <footer className="border-t border-amber-200 py-6 px-4 md:px-6 bg-amber-50/90 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-amber-700">© 2025 চিঠিঘর। সর্বস্বত্ব সংরক্ষিত।</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
            <Link className="text-xs text-amber-700 hover:underline underline-offset-4" href="/privacy-policy">
              গোপনীয়তা নীতি
            </Link>
            <Link className="text-xs text-amber-700 hover:underline underline-offset-4" href="/terms-of-service">
              ব্যবহারের শর্তাবলী
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
