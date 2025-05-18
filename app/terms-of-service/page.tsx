import Link from "next/link"

export default function TermsOfService() {
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
          <h1 className="text-3xl font-serif font-bold text-amber-900 mb-6">ব্যবহারের শর্তাবলী</h1>

          <div className="prose prose-amber max-w-none">
            <p className="text-amber-800 mb-4">
              চিঠিঘর ব্যবহার করার আগে অনুগ্রহ করে এই শর্তাবলী মনোযোগ সহকারে পড়ুন। এই ওয়েবসাইট ব্যবহার করে, আপনি এই শর্তাবলী মেনে চলতে
              সম্মত হচ্ছেন।
            </p>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">সেবার ব্যবহার</h2>
            <p className="text-amber-800 mb-4">আপনি সম্মত হচ্ছেন যে:</p>
            <ul className="list-disc pl-6 mb-4 text-amber-800">
              <li className="mb-2">আপনি আমাদের সেবা শুধুমাত্র আইনসম্মত উদ্দেশ্যে ব্যবহার করবেন।</li>
              <li className="mb-2">আপনি অন্য ব্যবহারকারীদের হয়রানি করবেন না বা তাদের প্রতি অসম্মানজনক আচরণ করবেন না।</li>
              <li className="mb-2">আপনি আমাদের সেবার নিরাপত্তা লঙ্ঘন করবেন না বা এর কার্যকারিতা বাধাগ্রস্ত করবেন না।</li>
              <li className="mb-2">আপনি আমাদের সেবা ব্যবহার করে অশ্লীল, অবৈধ, বা আপত্তিকর সামগ্রী প্রেরণ করবেন না।</li>
            </ul>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">অ্যাকাউন্ট নিবন্ধন</h2>
            <p className="text-amber-800 mb-4">
              আমাদের সেবা ব্যবহার করতে, আপনাকে একটি অ্যাকাউন্ট তৈরি করতে হবে। আপনি সম্মত হচ্ছেন যে:
            </p>
            <ul className="list-disc pl-6 mb-4 text-amber-800">
              <li className="mb-2">আপনি সঠিক, সম্পূর্ণ, এবং আপ-টু-ডেট তথ্য প্রদান করবেন।</li>
              <li className="mb-2">আপনি আপনার পাসওয়ার্ড গোপন রাখবেন এবং আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করবেন।</li>
              <li className="mb-2">আপনার অ্যাকাউন্টে হওয়া সমস্ত কার্যকলাপের জন্য আপনি দায়ী থাকবেন।</li>
            </ul>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">বৌদ্ধিক সম্পত্তি</h2>
            <p className="text-amber-800 mb-4">
              চিঠিঘর এবং এর সামগ্রী, যেমন লোগো, টেক্সট, গ্রাফিক্স, ইমেজ, এবং সফটওয়্যার, আমাদের বা আমাদের লাইসেন্সদাতাদের বৌদ্ধিক সম্পত্তি।
              আপনি সম্মত হচ্ছেন যে:
            </p>
            <ul className="list-disc pl-6 mb-4 text-amber-800">
              <li className="mb-2">আপনি আমাদের লিখিত অনুমতি ছাড়া এই সামগ্রী কপি, পরিবর্তন, বা বিতরণ করবেন না।</li>
              <li className="mb-2">আপনি আমাদের ট্রেডমার্ক বা লোগো ব্যবহার করবেন না।</li>
            </ul>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">ব্যবহারকারী সামগ্রী</h2>
            <p className="text-amber-800 mb-4">
              আপনি আমাদের সেবায় যে সামগ্রী পোস্ট করেন (যেমন চিঠি, মন্তব্য, ইত্যাদি), তার জন্য আপনি দায়ী। আপনি সম্মত হচ্ছেন যে:
            </p>
            <ul className="list-disc pl-6 mb-4 text-amber-800">
              <li className="mb-2">আপনি এমন কোন সামগ্রী পোস্ট করবেন না যা অন্যের অধিকার লঙ্ঘন করে।</li>
              <li className="mb-2">
                আপনি আমাদের একটি অ-বিশেষাধিকারযুক্ত, রয়্যালটি-মুক্ত লাইসেন্স দিচ্ছেন আপনার সামগ্রী ব্যবহার, প্রদর্শন, এবং বিতরণ করার জন্য।
              </li>
              <li className="mb-2">আমরা আপনার সামগ্রী মডারেট করার অধিকার সংরক্ষণ করি এবং যেকোনো সামগ্রী অপসারণ করতে পারি।</li>
            </ul>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">দায়িত্ব সীমাবদ্ধতা</h2>
            <p className="text-amber-800 mb-4">
              আমাদের সেবা "যেমন আছে" এবং "যেমন উপলব্ধ" ভিত্তিতে প্রদান করা হয়। আমরা কোন ওয়ারেন্টি প্রদান করি না। আমরা নিম্নলিখিত ক্ষেত্রে
              দায়ী থাকব না:
            </p>
            <ul className="list-disc pl-6 mb-4 text-amber-800">
              <li className="mb-2">আমাদের সেবা ব্যবহারের ফলে হওয়া কোন ক্ষতি।</li>
              <li className="mb-2">আমাদের সেবার অনুপলব্ধতা বা ব্যাঘাত।</li>
              <li className="mb-2">আপনার তথ্য বা সামগ্রীর হারানো বা ক্ষতি।</li>
            </ul>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">ক্ষতিপূরণ</h2>
            <p className="text-amber-800 mb-4">
              আপনি আমাদের এবং আমাদের অফিসার, ডিরেক্টর, কর্মচারী, এবং এজেন্টদের ক্ষতিপূরণ দিতে সম্মত হচ্ছেন যেকোনো দাবি, ক্ষতি, দায়,
              এবং খরচ থেকে যা আপনার এই শর্তাবলী লঙ্ঘন বা আমাদের সেবা ব্যবহারের ফলে উদ্ভূত হয়।
            </p>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">শর্তাবলী পরিবর্তন</h2>
            <p className="text-amber-800 mb-4">
              আমরা এই শর্তাবলী সময়ে সময়ে পরিবর্তন করতে পারি। পরিবর্তিত শর্তাবলী এই পৃষ্ঠায় প্রকাশিত হবে। পরিবর্তনের পরে আমাদের সেবা
              ব্যবহার করে, আপনি নতুন শর্তাবলী মেনে চলতে সম্মত হচ্ছেন।
            </p>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">যোগাযোগ</h2>
            <p className="text-amber-800 mb-4">
              এই শর্তাবলী সম্পর্কে কোন প্রশ্ন থাকলে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন: info@chithighor.com
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
