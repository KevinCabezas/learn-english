"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { links } from "../data/sidebar";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [movilMenu, setMovilMenu] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/auth/me");

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();

        setUser(data.user);
      } catch (error) {
        console.error(
          "Error al obtener usuario:",
          error
        );
      }
    };

    getUser();
  }, []);


  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST", });

      if (!response.ok) {
        throw new Error(
          "Error al cerrar sesión"
        );
      }

      setUser(null);
      router.push("/");
      router.refresh();

    } catch (error) {
      console.error(error);
    }
  };
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
        <div className="flex-1 justify-end flex flex-col gap-2">
          <button
            onClick={user ? () => {router.push("/profile")} : () => {router.push("/login")}}
            className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-700 transition-all duration-300 "
          >
            <Icon
              icon="qlementine-icons:user-16"
              className="text-xl shrink-0 group-hover:text-emerald-400 transition-all duration-300"
            />

            {!collapsed && (
              <span className="text-sm whitespace-nowrap">
                {user ? user.name : "Ingresar"}
              </span>
            )}
          </button>
          <div className="bg-r">
            <button
              onClick={user ? handleLogout : () => router.push("/")}
              title={collapsed ? (user ? "Cerrar sesión" : "Salir") : undefined}
              className="group flex flex-col lg:flex-row w-full items-start justify-center lg:justify-start lg:items-center gap-3 rounded-lg px-3 py-2 hover:bg-neutral-700  transition-all duration-300">

              <Icon icon={"iconamoon:exit-fill"} className="text-xl shrink-0 group-hover:text-purple-400 transition-all duration-300 " />
              {!collapsed && (
                <span className="whitespace-nowrap font-semibold text-sm">
                  {user ? 'Cerrar sesión' : "Salir"}
                </span>
              )}
            </button>
          </div>

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