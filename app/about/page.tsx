import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, Heart, Users, Shield } from "lucide-react"

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-amber-200">
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/images/paper-texture.png')] bg-repeat">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-amber-900">
                  আমাদের সম্পর্কে
                </h1>
                <p className="mx-auto max-w-[700px] text-amber-800 md:text-xl">
                  চিঠিঘর - পুরোনো দিনের চিঠি লেখার অনুভূতি ফিরিয়ে আনার একটি প্রয়াস
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-amber-50">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/letter-writing.jpg" alt="চিঠি লেখার দৃশ্য" fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold text-amber-900 mb-4">আমাদের গল্প</h2>
                <p className="text-amber-800 mb-4">
                  চিঠিঘর প্রকল্পটি ২০২৩ সালে শুরু হয়েছিল, যখন আমরা লক্ষ্য করলাম যে ডিজিটাল যুগে চিঠি লেখার সংস্কৃতি প্রায় হারিয়ে যাচ্ছে।
                  আমরা বিশ্বাস করি যে চিঠি লেখা শুধু যোগাযোগের একটি মাধ্যম নয়, এটি একটি শিল্প, একটি অনুভূতি, এবং একটি ঐতিহ্য।
                </p>
                <p className="text-amber-800 mb-4">
                  আমাদের লক্ষ্য ছিল এমন একটি প্ল্যাটফর্ম তৈরি করা যা আধুনিক প্রযুক্তির সুবিধা নিয়ে পুরোনো দিনের চিঠি লেখার অনুভূতি ফিরিয়ে
                  আনতে পারে। আমরা চেয়েছিলাম এমন একটি জায়গা তৈরি করতে যেখানে মানুষ তাদের চিন্তা, অনুভূতি, এবং স্মৃতি শেয়ার করতে পারে একটি
                  আবেগপূর্ণ এবং ব্যক্তিগত উপায়ে।
                </p>
                <p className="text-amber-800">
                  আজ, চিঠিঘর হাজার হাজার ব্যবহারকারীর কাছে পৌঁছেছে, যারা প্রতিদিন তাদের প্রিয়জনদের সাথে চিঠি আদান-প্রদান করছে। আমরা গর্বিত
                  যে আমরা এই ডিজিটাল যুগে পুরোনো দিনের চিঠি লেখার অনুভূতি ফিরিয়ে আনতে সক্ষম হয়েছি।
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-[url('/paper-texture-vintage.png')] bg-repeat">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 mb-2">আমাদের মিশন</h2>
              <p className="text-amber-800 max-w-2xl mx-auto">
                আমাদের মিশন হল ডিজিটাল যুগে পুরোনো দিনের চিঠি লেখার অনুভূতি ফিরিয়ে আনা এবং মানুষের মধ্যে আবেগপূর্ণ যোগাযোগের সেতুবন্ধন
                তৈরি করা।
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3 items-center">
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm">
                <div className="flex flex-col space-y-2">
                  <div className="bg-amber-200 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <Heart className="h-6 w-6 text-amber-800" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-amber-800">আবেগপূর্ণ যোগাযোগ</h3>
                  <p className="text-sm text-amber-700">
                    আমরা বিশ্বাস করি যে আবেগপূর্ণ যোগাযোগ মানুষের মধ্যে সম্পর্ক গড়ে তোলে। চিঠিঘর এই আবেগপূর্ণ যোগাযোগকে উৎসাহিত করে।
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm">
                <div className="flex flex-col space-y-2">
                  <div className="bg-amber-200 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-amber-800" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-amber-800">সম্প্রদায় গঠন</h3>
                  <p className="text-sm text-amber-700">
                    আমরা একটি সম্প্রদায় গড়ে তুলতে চাই যেখানে মানুষ তাদের চিন্তা, অনুভূতি, এবং স্মৃতি শেয়ার করতে পারে।
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm">
                <div className="flex flex-col space-y-2">
                  <div className="bg-amber-200 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <Shield className="h-6 w-6 text-amber-800" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-amber-800">গোপনীয়তা রক্ষা</h3>
                  <p className="text-sm text-amber-700">
                    আমরা আমাদের ব্যবহারকারীদের গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। আপনার চিঠি সম্পূর্ণ গোপনীয় থাকবে।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-amber-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 mb-2">আমাদের টিম</h2>
              <p className="text-amber-800 max-w-2xl mx-auto">
                চিঠিঘর একটি উৎসর্গীকৃত টিমের দ্বারা পরিচালিত, যারা পুরোনো দিনের চিঠি লেখার অনুভূতি ফিরিয়ে আনতে প্রতিশ্রুতিবদ্ধ।
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm max-w-md">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-amber-200">
                    <Image
                      src="/developer-photo.jpg"
                      alt="মোহাম্মদ শেখ শাহিনুর রহমান"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="font-medium text-amber-900 text-lg">মোহাম্মদ শেখ শাহিনুর রহমান</h3>
                  <p className="text-sm text-amber-700 mb-2">প্রতিষ্ঠাতা ও প্রধান নির্বাহী কর্মকর্তা</p>
                  <p className="text-sm text-amber-800">
                    কবি, লেখক, সফটওয়্যার ইঞ্জিনিয়ার, এবং প্রযুক্তি উদ্ভাবক। চিঠিঘরের দৃষ্টি ও মিশনের পিছনে প্রধান চালিকা শক্তি।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-amber-100">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-amber-900 mb-2">যোগাযোগ করুন</h2>
              <p className="text-amber-800 max-w-2xl mx-auto">
                আমাদের সাথে যোগাযোগ করতে নিচের তথ্য ব্যবহার করুন। আমরা আপনার মতামত শুনতে সর্বদা আগ্রহী।
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-amber-200 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-amber-800" />
                </div>
                <h3 className="font-medium text-amber-900 mb-2">ইমেইল</h3>
                <p className="text-sm text-amber-800">info@chithighor.com</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-amber-200 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-amber-800" />
                </div>
                <h3 className="font-medium text-amber-900 mb-2">ফোন</h3>
                <p className="text-sm text-amber-800">+880 1234-567890</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-amber-200 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-amber-800" />
                </div>
                <h3 className="font-medium text-amber-900 mb-2">ঠিকানা</h3>
                <p className="text-sm text-amber-800">ঢাকা, বাংলাদেশ</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-amber-200 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-amber-800" />
                </div>
                <h3 className="font-medium text-amber-900 mb-2">কার্যালয়ের সময়</h3>
                <p className="text-sm text-amber-800">সোম-শুক্র: সকাল ৯টা - বিকাল ৫টা</p>
              </div>
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
