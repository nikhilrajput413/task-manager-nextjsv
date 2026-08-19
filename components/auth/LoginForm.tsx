"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.message);
      setLoading(false);
      return;
    }

    //  SAVE LOGIN STATE
    localStorage.setItem("token", "loggedin");
      localStorage.setItem("userId", result.user.id);

  window.location.href = "/dashboard";
    router.refresh();
  } catch (err) {
    console.error(err);
    setError("Something went wrong.");
  }

  setLoading(false);
}

 return (
  <div className="w-full max-w-md">

<div className="bg-white rounded-2xl shadow-xl p-8">

      {/* Logo */}

      <div className="flex justify-center">

        <div className="h-20 w-20 rounded-2xl bg-blue-100 flex items-center justify-center">

          <CheckCircle2
            size={40}
            className="text-blue-600"
          />

        </div>

      </div>

      {/* Heading */}

      <div className="mt-6 text-center">

        <h1 className="text-4xl font-bold text-gray-800">
          Welcome Back
        </h1>

        <p className="mt-3 text-gray-500">
          Sign in to continue managing your daily tasks.
        </p>

      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-6"
      >

        {/* Email */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email Address
          </label>

          <div className="relative">

            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Password
          </label>

          <div className="relative">

            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-12 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>

        {/* Remember */}

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2 text-sm text-gray-600">

            <input
              type="checkbox"
              checked={remember}
              onChange={(e) =>
                setRemember(e.target.checked)
              }
              className="h-4 w-4 accent-blue-600"
            />

            Remember Me

          </label>

          <Link
            href="#"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Forgot Password?
          </Link>

        </div>

        {/* Error */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl disabled:opacity-50"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </form>

      {/* Footer */}

      <div className="mt-8 border-t pt-6 text-center text-sm text-gray-600">

        Don't have an account?

        <Link
          href="/register"
          className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
        >
          Create Account
        </Link>

      </div>

    </div>

  </div>
);
}