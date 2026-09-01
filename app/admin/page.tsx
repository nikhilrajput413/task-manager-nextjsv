"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  // 🔹 Fetch Users
  const fetchUsers = async () => {
    const res = await fetch("/api/admin/pending-users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Approve / Reject
  const handleAction = async (userId: number, action: string) => {
    setLoadingId(userId);
    setMessage("");

    try {
      const res = await fetch("/api/admin/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, action }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Error occurred");
        return;
      }

      // ✅ remove user from list instantly (no reload)
      setUsers((prev) => prev.filter((u) => u.id !== userId));

      setMessage(
        action === "approve"
          ? "User approved successfully ✅"
          : "User rejected ❌"
      );

    } catch (err) {
      setMessage("Server error ❌");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Pending Approval Requests
      </h1>

      {/* 🔥 Message */}
      {message && (
        <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
          {message}
        </div>
      )}

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Organization</th>
              <th className="p-3">Email</th>
              <th className="p-3">Country</th>
              <th className="p-3">Type</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">
                  {user.firstName} {user.lastName}
                </td>

                <td className="p-3">
                  {user.organizationName || "-"}
                </td>

                <td className="p-3">{user.email}</td>

                <td className="p-3">{user.country}</td>

                <td className="p-3">
                  {user.applicantCategory}
                </td>

                <td className="p-3 flex gap-2">
                  
                  {/* Approve */}
                  <button
                    disabled={loadingId === user.id}
                    onClick={() =>
                      handleAction(user.id, "approve")
                    }
                    className={`px-3 py-1 rounded text-white transition ${
                      loadingId === user.id
                        ? "bg-green-300"
                        : "bg-green-500 hover:bg-green-600 active:scale-95"
                    }`}
                  >
                    {loadingId === user.id
                      ? "Processing..."
                      : "Approve"}
                  </button>

                  {/* Reject */}
                  <button
                    disabled={loadingId === user.id}
                    onClick={() =>
                      handleAction(user.id, "reject")
                    }
                    className={`px-3 py-1 rounded text-white transition ${
                      loadingId === user.id
                        ? "bg-red-300"
                        : "bg-red-500 hover:bg-red-600 active:scale-95"
                    }`}
                  >
                    {loadingId === user.id
                      ? "Processing..."
                      : "Reject"}
                  </button>

                </td>
              </tr>
            ))}

            {/* Empty state */}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-6 text-gray-400"
                >
                  No pending users 🎉
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}