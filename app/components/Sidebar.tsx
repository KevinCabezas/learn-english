"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@iconify/react";

const links = [
  {
    href: "/blog/chat",
    label: "Comprensión lectora",
    icon: "material-symbols:menu-book-outline-sharp",
  },
  {
    href: "/blog/hijo-2",
    label: "Blog hijo 2",
    icon: "mdi:file-document-outline",
  },
  {
    href: "/blog/hijo-3",
    label: "Blog hijo 3",
    icon: "mdi:cog-outline",
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sticky top-0 h-screen shrink-0 rounded-tr-xl bg-neutral-800 text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex h-full flex-col p-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          {!collapsed && (
            <Link href="/blog">
              <img
                src="/logo-english.png"
                alt="logo"
                className="w-20 object-contain"
              />
            </Link>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-2 hover:bg-neutral-700"
          >
            <Icon
              icon={collapsed ? "material-symbols:menu" : "material-symbols:menu-open"}
              className="text-2xl"
            />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              title={collapsed ? link.label : undefined}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-neutral-700"
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
    </aside>
  );
}