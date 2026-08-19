"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    const res = await fetch(`/api/user?id=${userId}`);
    const data = await res.json();
    setUser(data);
  }

  async function handleUpdate() {
    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(user),
    });

    const data = await res.json();
    alert("Profile Updated ✅");
    setUser(data);
  }

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-xl shadow">

        {/* TOP GREEN HEADER */}
        <div className="bg-green-500 h-20 rounded-t-xl flex items-center justify-center relative">
          <div className="absolute top-10 bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-4 border-white">
            {user.firstName?.charAt(0)}
            {user.lastName?.charAt(0)}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 pt-10 text-center">
          <h2 className="text-lg font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            {user.email}
          </p>

          <div className="grid grid-cols-2 gap-3 text-left">

            <input
              value={user.firstName || ""}
              onChange={(e) =>
                setUser({ ...user, firstName: e.target.value })
              }
              className="border p-2 rounded"
              placeholder="First Name"
            />

            <input
              value={user.lastName || ""}
              onChange={(e) =>
                setUser({ ...user, lastName: e.target.value })
              }
              className="border p-2 rounded"
              placeholder="Last Name"
            />

            <input
              value={user.email || ""}
              disabled
              className="border p-2 rounded col-span-2 bg-gray-100"
            />

            <input
              value={user.applicantCategory || ""}
              onChange={(e) =>
                setUser({ ...user, applicantCategory: e.target.value })
              }
              className="border p-2 rounded"
              placeholder="Category"
            />

            <input
              value={user.organizationName || ""}
              onChange={(e) =>
                setUser({ ...user, organizationName: e.target.value })
              }
              className="border p-2 rounded"
              placeholder="Organization"
            />

            <input
              value={user.country || ""}
              onChange={(e) =>
                setUser({ ...user, country: e.target.value })
              }
              className="border p-2 rounded"
              placeholder="Country"
            />

            <input
              value={user.language || ""}
              onChange={(e) =>
                setUser({ ...user, language: e.target.value })
              }
              className="border p-2 rounded"
              placeholder="Language"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleUpdate}
            className="mt-5 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}