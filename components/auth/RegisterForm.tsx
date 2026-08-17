"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";

import {
  registerSchema,
  RegisterFormData,
} from "@/lib/validations/register";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(
    data: RegisterFormData
  ) {
    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        alert(result.message);
        setLoading(false);
        return;
      }

      alert("Registration Successful!");

      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
<div className="w-[600px]">

      <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-2xl">

        {/* Icon */}

        <div className="flex justify-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100">

            <UserPlus
              size={40}
              className="text-blue-600"
            />

          </div>

        </div>

        {/* Heading */}

        <div className="mt-6 text-center">

          <h1 className="text-4xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="mt-3 text-gray-500">
            Register to start managing
            your daily tasks.
          </p>

        </div>

    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">

  {/* First + Last Name */}
<input
  {...register("firstName")}
  placeholder="First name *"
  className="w-1/2 rounded-lg border p-3 bg-gray-50"
/>

<input
  {...register("lastName")}
  placeholder="Last name *"
  className="w-1/2 rounded-lg border p-3 bg-gray-50"
/>

  {/* Email */}
  <input
    {...register("email")}
    placeholder="Email address *"
    className="w-full rounded-lg border p-3 bg-gray-50"
  />

  {/* Password */}
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      {...register("password")}
      placeholder="Password *"
      className="w-full rounded-lg border p-3 bg-gray-50 pr-10"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>

  {/* Applicant Category + Organization */}
  <div className="flex gap-4">
   <select
  {...register("applicantCategory")}
  className="w-1/2 rounded-lg border p-3 bg-gray-50"
>
  <option value="">Applicant category *</option>
  <option value="Individual">Individual</option>
  <option value="Company">Company</option>
</select>

   <input
  {...register("organizationName")}
  placeholder="Organization name"
  className="w-1/2 rounded-lg border p-3 bg-gray-50"
/>
  </div>

  {/* Website */}
<input
  {...register("website")}
  placeholder="Website (optional)"
  className="w-full rounded-lg border p-3 bg-gray-50"
/>

  {/* Country + Language */}
  <div className="flex gap-4">
   <select
  {...register("country")}
  className="w-1/2 rounded-lg border p-3 bg-gray-50"
>
  <option value="">Country *</option>
  <option value="India">India</option>
  <option value="USA">USA</option>
</select>

   <select
  {...register("language")}
  className="w-1/2 rounded-lg border p-3 bg-gray-50"
>
  <option value="">Language *</option>
  <option value="English">English</option>
  <option value="Hindi">Hindi</option>
</select>
  </div>

  {/* Terms */}
  <div className="text-sm space-y-2">
    <label className="flex gap-2">
      <input type="checkbox" />
      <span>
        I agree to Terms of Service
      </span>
    </label>

    <label className="flex gap-2">
      <input type="checkbox" />
      <span>
        I agree to Data Processing
      </span>
    </label>
  </div>

  {/* Button */}
  <button
    type="submit"
    disabled={loading}
    className="w-full rounded-lg bg-green-700 py-3 text-white font-semibold hover:bg-green-800"
  >
    {loading ? "Creating..." : "Next"}
  </button>

</form>

        {/* Footer */}

        <div className="mt-8 border-t pt-6 text-center text-sm text-gray-600">

          Already have an account?

          <Link
            href="/login"
            className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}