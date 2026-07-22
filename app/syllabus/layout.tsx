import Link from "next/link";
import { Icon } from "@iconify/react";
import Sidebar from "../components/Sidebar";

export default function BlogLayout({ children, } : { children: React.ReactNode }) {

  
  return (
    <div className="flex min-h-dvh lg:h-dvh  flex-col lg:flex-row ">
      <Sidebar />
      <section className="flex-1 bg-aber-400  lg:bg-ed-400   overflow-y-auto">{children}</section>
    </div>
  )
}