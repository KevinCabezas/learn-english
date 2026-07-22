"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@iconify/react";

const links = [
  {
    href: "/syllabus",
    label: "Temario",
    icon: "mage:dashboard",
  },
  {
    href: "/syllabus/readingComprehesion",
    label: "Comprensión lectora",
    icon: "material-symbols:menu-book-outline-sharp",
  },
  {
    href: "/syllabus/hijo-2",
    label: "syllabus hijo 2",
    icon: "mdi:file-document-outline",
  },
  {
    href: "/syllabus/hijo-3",
    label: "syllabus hijo 3",
    icon: "mdi:cog-outline",
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [movilMenu, setMovilMenu] = useState(false);


  return (
    <aside
      className={`lg:sticky fixed z-50  flex flex-col lg:top-0 lg:h-dvh min-h-15 w-full shrink-0 p-5 lg:p-0 lg:rounded-tr-x bg-neutral-800 text-white transition-all duration-300 ${collapsed ? "lg:w-20" : "lg:w-56"}`}
    >

      <div className="lg:flex hidden h-full lg:flex-col p-4">
        {/* Header */}
        <div className="lg:mb-8 flex items-center lg:justify-end">

          {/* {!collapsed && (
            <Link href="/blog">
              <img
                src="/logo-english.png"
                alt="logo"
                className="w-20 object-contain"
              />
            </Link>
          )} */}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-2 hover:bg-neutral-700 hidden lg:flex "
          >
            <Icon
              icon={collapsed ? "material-symbols:menu" : "material-symbols:menu-open"}
              className="text-2xl"
            />
          </button>
        </div>

        {/* Links */}
        <nav className="flex lg:flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              title={collapsed ? link.label : undefined}
              className="flex flex-col lg:flex-row items-start justify-center lg:justify-start lg:items-center gap-3 rounded-lg px-3 py-3 hover:bg-neutral-700"
            >
              <Icon icon={link.icon} className="text-xl shrink-0" />
              {!collapsed && (
                <span className="whitespace-nowrap text-sm">
                  {link.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="flex-1 items-end flex">

          <Link
            href={"/"}
            title={collapsed ? 'Cerrar sesión' : undefined}
            className="flex flex-col lg:flex-row items-start justify-center lg:justify-start lg:items-center gap-3 rounded-lg px-3 py-3 hover:bg-neutral-700  transition-all duration-300">

            <Icon icon={"iconamoon:exit-fill"} className="text-xl shrink-0" />
            {!collapsed && (
              <span className="whitespace-nowrap font-semibold text-sm">
                Cerrar sesión
              </span>
            )}
          </Link>
          {/* <Link
              href={"/"}
              title={collapsed ? "salir" : undefined}
              className="flex flex-col lg:flex-row items-start justify-center lg:justify-start lg:items-center gap-3 rounded-lg px-3 py-3 hover:bg-neutral-700"
            >
              <Icon icon={'carbon:exit'} className="text-xl shrink-0" />
              {!collapsed && (
                <span className="whitespace-nowrap text-sm">
                  salior
                </span>
              )}
            </Link> */}
        </div>
      </div>



      {movilMenu &&
        <div>
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                title={collapsed ? link.label : undefined}
                onClick={() => setMovilMenu(false)}

                className="flex  items-center justify-start  gap-2 rounded-lg px-3 py-2 hover:bg-neutral-700"
              >
                <Icon icon={link.icon} className="text-xl shrink-0" />
                {!collapsed && (
                  <span className="whitespace-nowrap text-sm">
                    {link.label}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      }
      <button
        onClick={() => setMovilMenu(!movilMenu)}
        className={`flex items-center justify-end lg:hidden`}>
        <Icon icon={movilMenu ? "mingcute:close-line" : "material-symbols:menu"} className="text-2xl  " />
      </button>


    </aside>
  );
}