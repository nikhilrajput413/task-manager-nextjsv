"use client";

import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("7 days");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    const res = await fetch("/api/dashboard", {
      cache: "no-store",
    });
    const result = await res.json();
    setData(result);
  }

  {["Last 24 hours", "7 days", "30 days"].map((item) => (
  <button
    key={item}
    onClick={() => setActiveFilter(item)}
    className={`px-4 py-2 rounded-md text-sm border transition ${
      activeFilter === item
        ? "bg-green-600 text-white border-green-600"
        : "bg-white text-gray-700 hover:bg-gray-50"
    }`}
  >
    {item}
  </button>
))}

if (!data || !data.users) {
  return <p className="p-6">Loading...</p>;
}

const filteredUsers = selectedUserId
  ? data.users.filter((u: any) => u.id === selectedUserId)
  : data.users;

  if (!data) return <p className="p-6">Loading...</p>;

  return (

    <>
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Monitor API performance and user activity
          </p>
        </div>

           {/* Filters */}
<div className="flex flex-wrap items-center justify-between gap-4 mb-6">

  {/* LEFT SIDE */}
  <div className="flex gap-2">

    {["Last 24 hours", "7 days", "30 days"].map((item) => (
      <button
        key={item}
        className={`px-4 py-2 rounded-md text-sm border transition ${
          item === "7 days"
            ? "bg-green-600 text-white border-green-600"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        {item}
      </button>
    ))}

    {/* Refresh Button */}
<button
  onClick={fetchDashboard}
  className="p-2 border rounded-md bg-white hover:bg-gray-50 transition hover:rotate-180 duration-300"
>
  <RefreshCcw size={16} />
</button>

  </div>

  {/* RIGHT SIDE */}
<div className="flex gap-2">
  {/* Organization (optional future) */}
  <select className="border rounded-md px-3 py-2 text-sm bg-white">
    <option>Select Organization</option>
  </select>

  {/* USER FILTER */}
  <select
    value={selectedUserId || ""}
    onChange={(e) =>
      setSelectedUserId(e.target.value ? Number(e.target.value) : null)
    }
    className="border rounded-md px-3 py-2 text-sm bg-white"
  >
    <option value="">All Users</option>

    {data.users.map((user: any) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))}
  </select>
</div>

</div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
          <Card title="Total Requests" value={data.total} color="text-blue-600" />
          <Card title="Success" value={data.success} color="text-green-600" />
          <Card title="Errors" value={data.errors} color="text-red-500" />
          <Card title="Active Users" value={data.users.length} color="text-purple-600" />
          <Card title="Avg Latency" value={data.avgLatency} color="text-yellow-600" />
        </div>

        {/* USER TABLE */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="bg-green-600 text-white px-4 py-3 text-sm font-semibold flex justify-between">
            <span>User Activity</span>
           <span className="text-xs bg-white text-green-600 px-2 py-0.5 rounded">
  {filteredUsers.length} users
</span>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b text-gray-600">
              <tr>
                <th className="p-3 text-left">User</th>
                <th>Total</th>
                <th>Success</th>
                <th>Errors</th>
                <th>Latency</th>
                <th>Last Active</th>
              </tr>
            </thead>

           <tbody>
  {filteredUsers.length > 0 ? (
    filteredUsers.map((user: any) => (
      <tr
        key={user.id}
        onClick={() => setSelectedUser(user)}
        className="hover:bg-gray-50 cursor-pointer"
      >
        <td className="p-3">{user.name}</td>
        <td>{user.requests}</td>
        <td className="text-green-600">{user.success}</td>
        <td className="text-red-500">{user.errors}</td>
        <td>{user.latency}</td>
        <td>{user.lastActive}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6} className="text-center p-6 text-gray-400">
        No users found
      </td>
    </tr>
  )}
</tbody>
          </table>
        </div>

        {/* 🔥 API LOGS TABLE */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-green-600 text-white px-4 py-3 text-sm font-semibold">
            API Logs Details
          </div>

          {!selectedUser ? (
            <div className="p-6 text-center text-gray-400">
              Select a user to view API logs
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b text-gray-600">
                <tr>
                  <th className="p-3 text-left">Endpoint</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Latency</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                {selectedUser.logs && selectedUser.logs.length > 0 ? (
                  selectedUser.logs.map((log: any) => (
                    <tr key={log.id} className="border-b">
                      <td className="p-3">{log.endpoint}</td>
                      <td>{log.method}</td>
                      <td
                        className={
                          log.status < 400
                            ? "text-green-600 font-semibold"
                            : "text-red-500 font-semibold"
                        }
                      >
                        {log.status}
                      </td>
                      <td>{log.latency} ms</td>
                      <td className="text-xs text-gray-500">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-6 text-gray-400">
                      No logs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
    </>
  );
}

/* CARD */
function Card({ title, value, color }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow border hover:shadow-md transition">
      <p className="text-xs text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold mt-1 ${color}`}>
        {value}
      </h2>
    </div>
  );
}