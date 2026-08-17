"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ItraHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });

      localStorage.removeItem("token");

      // 🔥 force refresh so UI update ho
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-[#2b2b2b] border-b border-[#3a3a3a] sticky top-0 z-[1000] h-[100px]">
      <div className="max-w-[1400px] mx-auto px-4">
        <nav className="flex items-center justify-between h-20">

          {/* LEFT */}
          <div className="flex items-center gap-6">
            <img
              src="/itra_blancs.png"
              alt="ITRA"
              className="h-12 object-contain"
            />

            <p className="text-white text-sm whitespace-nowrap">
              Official ITRA Partner
            </p>

            <img
              src="/runderwear-white-logo.png"
              alt="Partner"
              className="h-12 object-contain"
            />
          </div>

          {/* RIGHT */}
       {isLoggedIn && (
  <div className="flex items-center gap-4">

    <Link
      href="/dashboard"
      className="flex items-center gap-1 text-white text-sm px-3 py-1.5 rounded-md hover:bg-green-600 transition"
    >
      🟢 Home
    </Link>

    <Link
      href="/profile"
      className="flex items-center gap-1 text-white text-sm px-3 py-1.5 rounded-md hover:bg-green-600 transition"
    >
      👤 Profile
    </Link>

    <Link
      href="/api-docs"
      className="flex items-center gap-1 text-white text-sm px-3 py-1.5 rounded-md hover:bg-green-600 transition"
    >
      ⚙️ API Docs
    </Link>

    <Link
      href="/admin"
      className="flex items-center gap-1 bg-yellow-500 text-black text-sm px-3 py-1.5 rounded-md font-medium hover:bg-yellow-600 transition"
    >
      ⭐ Admin Panel
    </Link>

    <button
      onClick={handleLogout}
      className="bg-red-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-red-700 transition"
    >
      Logout
    </button>

  </div>
)}

        </nav>
      </div>
    </header>
  );
}