import Link from "next/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">
      <aside className="fixed top-0 left-0 flex flex-col h-dvh w-50 p-5 gap-5 border-r border-gray-200/20 bg-white  ">
        <Link
          href={"/blog"}
          className="flex items-center justify-center gap-2">
          <div className=" w-25">

            <img src="../logo-english.png" alt="logo" className="objet-contain" />
          </div>
        </Link>
        <Link href="/blog/chat">Comprension lectora</Link>
        <Link href="/blog/hijo-2">Blog hijo 2</Link>
        <Link href="/blog/hijo-3">Blog hijo 3</Link>
      </aside>
      <section className="ml-50 bg-gray-100/50 min-h-dvh">{children}</section>

    </div>
  )
}