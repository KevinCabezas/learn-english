import Link from "next/link";
import { Icon } from "@iconify/react";
import Sidebar from "../components/Sidebar";

export default function BlogLayout({ children, } : { children: React.ReactNode }) {

  
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      {/* <aside className="sticky top-0 h-screen shrink-0 flex flex-col p-5 gap-5 bg-neutral-800 text-white ">
        <Link
          href={"/blog"}
          className="flex items-center justify-center gap-2">
          <div className=" w-25">

            <img src="../logo-english.png" alt="logo" className="objet-contain" />
          </div>
        </Link>
        <Link href="/blog/chat" className="bg-emerald-400 flex items-center gap-2 py-2 px-3 rounded-lg">
          <Icon icon={"material-symbols:menu-book-outline-sharp"} className="text-xl"/>
          Comprension lectora
        </Link>
        <Link href="/blog/hijo-2">Blog hijo 2</Link>
        <Link href="/blog/hijo-3">Blog hijo 3</Link>
      </aside> */}
      <section className="flex-1 min-h-dvh bg-gray-100 ">{children}</section>

    </div>
  )
}