import Link from "next/link"

export default function PrivacyPolicy() {
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
      <main className="flex-1 container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto bg-amber-50/90 backdrop-blur-sm border border-amber-200 rounded-lg p-6 md:p-8 shadow-sm">
          <h1 className="text-3xl font-serif font-bold text-amber-900 mb-6">গোপনীয়তা নীতি</h1>

          <div className="prose prose-amber max-w-none">
            <p className="text-amber-800 mb-4">
              চিঠিঘর আপনার গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দেয়। এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আমরা কিভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং
              প্রকাশ করি।
            </p>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">তথ্য সংগ্রহ</h2>
            <p className="text-amber-800 mb-4">আমরা নিম্নলিখিত তথ্য সংগ্রহ করি:</p>
            <ul className="list-disc pl-6 mb-4 text-amber-800">
              <li className="mb-2">ব্যক্তিগত তথ্য: আপনার নাম, ইমেইল ঠিকানা, এবং অন্যান্য যোগাযোগের তথ্য যা আপনি আমাদের প্রদান করেন।</li>
              <li className="mb-2">অ্যাকাউন্ট তথ্য: আপনার ইউজারনেম, পাসওয়ার্ড (এনক্রিপ্টেড), এবং অ্যাকাউন্ট সেটিংস।</li>
              <li className="mb-2">ব্যবহারের তথ্য: আপনি কিভাবে আমাদের সেবা ব্যবহার করেন, যেমন আপনার পাঠানো এবং প্রাপ্ত চিঠি।</li>
              <li className="mb-2">ডিভাইস তথ্য: আপনার ব্রাউজার, আইপি ঠিকানা, এবং ডিভাইস সম্পর্কিত তথ্য।</li>
            </ul>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">তথ্য ব্যবহার</h2>
            <p className="text-amber-800 mb-4">আমরা আপনার তথ্য নিম্নলিখিত উদ্দেশ্যে ব্যবহার করি:</p>
            <ul className="list-disc pl-6 mb-4 text-amber-800">
              <li className="mb-2">আমাদের সেবা প্রদান এবং রক্ষণাবেক্ষণ করতে।</li>
              <li className="mb-2">আপনার অ্যাকাউন্ট পরিচালনা করতে।</li>
              <li className="mb-2">আপনার সাথে যোগাযোগ করতে, যেমন সেবা সম্পর্কিত বিজ্ঞপ্তি পাঠাতে।</li>
              <li className="mb-2">আমাদের সেবা উন্নত করতে এবং নতুন ফিচার বিকাশ করতে।</li>
              <li className="mb-2">সমস্যা সনাক্ত করতে এবং সমাধান করতে।</li>
            </ul>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">তথ্য শেয়ারিং</h2>
            <p className="text-amber-800 mb-4">আমরা আপনার তথ্য নিম্নলিখিত ক্ষেত্রে শেয়ার করতে পারি:</p>
            <ul className="list-disc pl-6 mb-4 text-amber-800">
              <li className="mb-2">আপনার সম্মতি সাপেক্ষে।</li>
              <li className="mb-2">আইনি বাধ্যবাধকতা মেনে চলতে।</li>
              <li className="mb-2">আমাদের অধিকার, সম্পত্তি, বা নিরাপত্তা রক্ষা করতে।</li>
            </ul>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">ডেটা সুরক্ষা</h2>
            <p className="text-amber-800 mb-4">
              আমরা আপনার তথ্য সুরক্ষিত রাখতে যথাযথ ব্যবস্থা গ্রহণ করি। তবে, কোন পদ্ধতিই 100% নিরাপদ নয়, এবং আমরা নিরাপত্তা লঙ্ঘনের ক্ষেত্রে
              দায়ী থাকব না।
            </p>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">কুকি</h2>
            <p className="text-amber-800 mb-4">
              আমরা কুকি এবং অনুরূপ ট্র্যাকিং প্রযুক্তি ব্যবহার করি। আপনি আপনার ব্রাউজার সেটিংস থেকে কুকি প্রত্যাখ্যান করতে পারেন, তবে এটি আমাদের
              সেবার কিছু ফিচার প্রভাবিত করতে পারে।
            </p>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">শিশুদের গোপনীয়তা</h2>
            <p className="text-amber-800 mb-4">
              আমাদের সেবা 13 বছরের কম বয়সী শিশুদের জন্য নয়। আমরা জেনেশুনে 13 বছরের কম বয়সী শিশুদের তথ্য সংগ্রহ করি না।
            </p>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">গোপনীয়তা নীতি পরিবর্তন</h2>
            <p className="text-amber-800 mb-4">
              আমরা এই গোপনীয়তা নীতি সময়ে সময়ে আপডেট করতে পারি। পরিবর্তনগুলি এই পৃষ্ঠায় প্রকাশিত হবে।
            </p>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">যোগাযোগ</h2>
            <p className="text-amber-800 mb-4">
              এই গোপনীয়তা নীতি সম্পর্কে কোন প্রশ্ন থাকলে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন: info@chithighor.com
            </p>

            <p className="text-amber-800 mt-8">সর্বশেষ আপডেট: মে 18, 2025</p>
          </div>
        </div>
      </main>
      <footer className="border-t border-amber-200 py-6 px-4 md:px-6 bg-amber-50">
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
