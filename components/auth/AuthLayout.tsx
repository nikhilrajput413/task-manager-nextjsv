import Image from "next/image";
import {
  CheckCircle2,
  CalendarClock,
  FolderKanban,
} from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* LEFT SIDE */}

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 lg:flex flex-col justify-between p-16">

        {/* Background Blur */}

        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl"></div>

        {/* Logo */}

        <div className="relative z-10 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">

            <CheckCircle2
              className="text-white"
              size={30}
            />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              Daily Task Manager
            </h2>

            <p className="text-slate-600">
              Smart Productivity Dashboard
            </p>

          </div>

        </div>

        {/* Heading */}

        <div className="relative z-10">

          <h1 className="text-6xl font-extrabold leading-tight text-slate-900">

            Organize

            <br />

            Your Tasks.

            <br />

            <span className="text-blue-600">
              Boost Productivity.
            </span>

          </h1>

          <p className="mt-8 max-w-xl text-xl leading-9 text-slate-600">

            Plan your daily work, organize your
            categories, manage priorities and
            complete every task on time using
            one powerful dashboard.

          </p>

          {/* Features */}

          <div className="mt-12 grid gap-6">

            <div className="flex items-center gap-5 rounded-2xl bg-white shadow-lg p-5">

              <div className="rounded-xl bg-blue-100 p-3">

                <CheckCircle2
                  size={26}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h3 className="text-xl font-semibold text-slate-900">
                  Easy Task Management
                </h3>

                <p className="text-slate-600">
                  Create and organize tasks easily.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-5 rounded-2xl bg-white shadow-lg p-5">

              <div className="rounded-xl bg-blue-100 p-3">

                <CalendarClock
                  size={26}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h3 className="text-xl font-semibold text-slate-900">
                  Schedule & Due Dates
                </h3>

                <p className="text-slate-600">
                  Never miss an important deadline.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-5 rounded-2xl bg-white shadow-lg p-5">

              <div className="rounded-xl bg-blue-100 p-3">

                <FolderKanban
                  size={26}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h3 className="text-xl font-semibold text-slate-900">
                  Categories & Priorities
                </h3>

                <p className="text-slate-600">
                  Keep your work well organized.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Illustration

        <div className="relative z-10 mt-10 flex justify-center">

          <Image
            src="/images/login-illustration.png"
            alt="Task Manager"
            width={650}
            height={550}
            priority
            className="drop-shadow-2xl"
          />

        </div> */}

      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center justify-center bg-white px-8 py-12">

        {children}

      </div>

    </div>
  );
}