'use client'
import Image from "next/image";
import Link from "next/link";


export default function Home() {

  return (
    <main className="flex items-center justify-start flex-col min-h-dvh gap-20 p-20 bg-purple-500 ">
      <h1 className="text-4xl font-semibold">Learn English</h1>
      <div className="flex flex-col items-center justify-center h-50 w-fit gap-5 px-10 rounded-lg bg-gray-100">
        <Link
          href={"/users"}
          className="w-full text-center py-2 px-4 rounded-lg bg-emerald-800 text-white">
          page users
        </Link>
        <Link
          href={"/blog"}
          className="w-full text-center py-2 px-4 rounded-lg bg-purple-400 text-white"
        >
          page blog
        </Link>
        <Link
          href={"/chat"}
          className="w-full text-center py-2 px-4 rounded-lg bg-purple-400 text-white"
        >
          page chat
        </Link>
      </div>
    </main>
  );
}
