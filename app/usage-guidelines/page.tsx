import Link from "next/link"

export default function UsageGuidelines() {
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
          <h1 className="text-3xl font-serif font-bold text-amber-900 mb-6">ব্যবহারের নির্দেশিকা</h1>

          <div className="prose prose-amber max-w-none">
            <p className="text-amber-800 mb-4">
              চিঠিঘর ব্যবহার করার জন্য আপনাকে স্বাগতম! এই নির্দেশিকাটি আপনাকে চিঠিঘর প্ল্যাটফর্মের সর্বোত্তম ব্যবহার করতে সাহায্য করবে।
            </p>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">শুরু করা</h2>
            <ol className="list-decimal pl-6 mb-4 text-amber-800">
              <li className="mb-2">
                <strong>অ্যাকাউন্ট তৈরি করুন:</strong> চিঠিঘর ব্যবহার করতে, প্রথমে "রেজিস্ট্রেশন" বাটনে ক্লিক করে একটি অ্যাকাউন্ট তৈরি
                করুন। আপনার ইউজারনেম, ইমেইল, এবং পাসওয়ার্ড প্রদান করুন।
              </li>
              <li className="mb-2">
                <strong>লগইন করুন:</strong> অ্যাকাউন্ট তৈরি করার পর, আপনার ইমেইল এবং পাসওয়ার্ড ব্যবহার করে লগইন করুন।
              </li>
              <li className="mb-2">
                <strong>প্রোফাইল সেটআপ:</strong> আপনার প্রোফাইল সম্পূর্ণ করুন এবং আপনার পছন্দসমূহ সেট করুন, যেমন কাগজের স্টাইল, কালির রং,
                ফন্ট স্টাইল, এবং সিল স্টাইল।
              </li>
            </ol>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">চিঠি পাঠানো</h2>
            <ol className="list-decimal pl-6 mb-4 text-amber-800">
              <li className="mb-2">
                <strong>নতুন চিঠি লিখুন:</strong> ড্যাশবোর্ডে "নতুন চিঠি লিখুন" বাটনে ক্লিক করুন বা নেভিগেশন মেনু থেকে "কম্পোজ"
                বিকল্পটি বেছে নিন।
              </li>
              <li className="mb-2">
                <strong>প্রাপক নির্বাচন করুন:</strong> আপনি যাকে চিঠি পাঠাতে চান তার ইউজারনেম বা ইমেইল ঠিকানা প্রদান করুন।
              </li>
              <li className="mb-2">
                <strong>চিঠি লিখুন:</strong> আপনার বার্তা লিখুন। আপনি টেক্সট ফরম্যাটিং টুলস ব্যবহার করতে পারেন।
              </li>
              <li className="mb-2">
                <strong>স্টাইল কাস্টমাইজ করুন:</strong> "স্টাইল" ট্যাবে ক্লিক করে আপনার চিঠির স্টাইল কাস্টমাইজ করুন। আপনি কাগজের স্টাইল, কালির
                রং, ফন্ট স্টাইল, সিল, এবং স্ট্যাম্প পরিবর্তন করতে পারেন।
              </li>
              <li className="mb-2">
                <strong>সিগনেচার যোগ করুন:</strong> আপনি চাইলে আপনার চিঠিতে একটি ডিজিটাল সিগনেচার যোগ করতে পারেন।
              </li>
              <li className="mb-2">
                <strong>চিঠি পাঠান:</strong> সবকিছু ঠিক আছে কিনা দেখে নিয়ে "চিঠি পাঠান" বাটনে ক্লিক করুন।
              </li>
            </ol>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">চিঠি পড়া</h2>
            <ol className="list-decimal pl-6 mb-4 text-amber-800">
              <li className="mb-2">
                <strong>ইনবক্স দেখুন:</strong> আপনার ইনবক্সে যান, যেখানে আপনি আপনার প্রাপ্ত সমস্ত চিঠি দেখতে পাবেন।
              </li>
              <li className="mb-2">
                <strong>চিঠি খুলুন:</strong> যে চিঠিটি আপনি পড়তে চান তাতে ক্লিক করুন। চিঠি খোলার সময় একটি এনিমেশন দেখানো হবে।
              </li>
              <li className="mb-2">
                <strong>উত্তর দিন:</strong> চিঠি পড়ার পর, আপনি "উত্তর দিন" বাটনে ক্লিক করে প্রেরককে উত্তর দিতে পারেন।
              </li>
              <li className="mb-2">
                <strong>চিঠি সংরক্ষণ করুন:</strong> আপনি চাইলে "তারকাচিহ্নিত করুন" বাটনে ক্লিক করে চিঠিটি সংরক্ষণ করতে পারেন।
              </li>
              <li className="mb-2">
                <strong>চিঠি আর্কাইভ করুন:</strong> আপনি চাইলে "আর্কাইভ" বাটনে ক্লিক করে চিঠিটি আর্কাইভ করতে পারেন।
              </li>
              <li className="mb-2">
                <strong>চিঠি মুছুন:</strong> আপনি চাইলে "মুছুন" বাটনে ক্লিক করে চিঠিটি মুছে ফেলতে পারেন।
              </li>
            </ol>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">প্রোফাইল ও সেটিংস</h2>
            <ol className="list-decimal pl-6 mb-4 text-amber-800">
              <li className="mb-2">
                <strong>প্রোফাইল আপডেট করুন:</strong> "সেটিংস" পৃষ্ঠায় গিয়ে "প্রোফাইল" ট্যাবে ক্লিক করে আপনার প্রোফাইল তথ্য আপডেট করুন।
              </li>
              <li className="mb-2">
                <strong>পাসওয়ার্ড পরিবর্তন করুন:</strong> "সেটিংস" পৃষ্ঠায় গিয়ে "পাসওয়ার্ড" ট্যাবে ক্লিক করে আপনার পাসওয়ার্ড পরিবর্তন করুন।
              </li>
              <li className="mb-2">
                <strong>পছন্দসমূহ সেট করুন:</strong> "সেটিংস" পৃষ্ঠায় গিয়ে "পছন্দসমূহ" ট্যাবে ক্লিক করে আপনার ডিফল্ট চিঠি স্টাইল সেট
                করুন।
              </li>
            </ol>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">টিপস ও ট্রিকস</h2>
            <ul className="list-disc pl-6 mb-4 text-amber-800">
              <li className="mb-2">
                <strong>কীবোর্ড শর্টকাট:</strong> দ্রুত নেভিগেশনের জন্য কীবোর্ড শর্টকাট ব্যবহার করুন। উদাহরণস্বরূপ, "N" চাপুন নতুন চিঠি
                লিখতে, "R" চাপুন উত্তর দিতে।
              </li>
              <li className="mb-2">
                <strong>টেমপ্লেট:</strong> আপনি প্রায়শই একই ধরনের চিঠি পাঠান, তাহলে টেমপ্লেট তৈরি করুন এবং সেগুলি পরবর্তীতে ব্যবহার
                করুন।
              </li>
              <li className="mb-2">
                <strong>ফিল্টার:</strong> আপনার ইনবক্সে চিঠিগুলি ফিল্টার করতে সার্চ বার ব্যবহার করুন।
              </li>
              <li className="mb-2">
                <strong>মোবাইল অ্যাপ:</strong> আরও সুবিধার জন্য আমাদের মোবাইল অ্যাপ ডাউনলোড করুন।
              </li>
            </ul>

            <h2 className="text-xl font-serif font-bold text-amber-800 mt-6 mb-3">সাহায্য ও সমর্থন</h2>
            <p className="text-amber-800 mb-4">
              আপনার যদি কোন প্রশ্ন বা সমস্যা থাকে, তাহলে আমাদের সাহায্য কেন্দ্রে যান বা info@chithighor.com ঠিকানায় ইমেইল করুন। আমরা আপনাকে
              সাহায্য করতে সর্বদা প্রস্তুত।
            </p>

            <p className="text-amber-800 mt-8">
              আমরা আশা করি আপনি চিঠিঘর ব্যবহার উপভোগ করবেন এবং পুরোনো দিনের চিঠি লেখার অনুভূতি ফিরে পাবেন!
            </p>
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
            <Link className="text-xs text-amber-700 hover:underline underline-offset-4" href="/usage-guidelines">
              ব্যবহারের নির্দেশিকা
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
