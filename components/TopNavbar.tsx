"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function TopNavbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Daily Task Manager
        </h1>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-lg border pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <button className="relative">

          <Bell
            size={22}
            className="text-gray-600"
          />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
            2
          </span>

        </button>

        <div className="flex items-center gap-3">

          <UserCircle
            size={40}
            className="text-blue-600"
          />

          <div>

            <p className="font-semibold">
              Nikhil Rajput
            </p>

            <p className="text-sm text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}