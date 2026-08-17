"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: FolderKanban,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const handleLogout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
  });

  window.location.href = "/login";
};

export default function Sidebar() {

  const pathname = usePathname();

  return (

    <aside className="w-72 bg-slate-900 text-white flex flex-col">

      <div className="border-b border-slate-700 p-6">

        <h1 className="text-3xl font-bold">
          Task Manager
        </h1>

        <p className="text-slate-400 mt-1">
          Admin Panel
        </p>

      </div>

      <nav className="flex-1 p-5">

        {menus.map((item) => {

          const Icon = item.icon;

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-4 rounded-xl mb-2 transition

              ${
                pathname === item.href
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >

              <Icon size={22} />

              <span className="font-medium">
                {item.title}
              </span>

            </Link>

          );

        })}

      </nav>

      <div className="border-t border-slate-700 p-5">

        <button
  onClick={handleLogout}
  className="w-full flex items-center gap-3 bg-red-600 hover:bg-red-700 rounded-xl py-3 justify-center"
>
  <LogOut size={20} />
  Logout
</button>

      </div>

    </aside>

  );
}