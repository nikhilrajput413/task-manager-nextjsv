"use client";

import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("7 days");
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    const res = await fetch("/api/dashboard", { cache: "no-store" });
    const result = await res.json();
    setData(result);
  }

  if (!data || !data.users) {
    return <p className="p-6">Loading...</p>;
  }

  //  Unique organizations
  const organizations: string[] = [
    ...new Set(
      data.users.map((u: any) => u.organizationName || "Unknown")
    ),
  ] as string[];

  //  Filtering logic
  let filteredUsers = data.users;

  if (selectedUserId) {
    filteredUsers = filteredUsers.filter(
      (u: any) => u.id === selectedUserId
    );
  }

  if (selectedOrg) {
    filteredUsers = filteredUsers.filter(
      (u: any) =>
        (u.organizationName || "Unknown") === selectedOrg
    );
  }

  return (
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

        {/* FILTERS */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

          {/* LEFT */}
          <div className="flex gap-2">

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

            <button
              onClick={fetchDashboard}
              className="p-2 border rounded-md bg-white hover:bg-gray-50 transition hover:rotate-180 duration-300"
            >
              <RefreshCcw size={16} />
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex gap-2">

            {/* ORGANIZATION */}
            <select
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="">All Organizations</option>
              {organizations.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>

            {/* USER */}
            <select
              value={selectedUserId || ""}
              onChange={(e) =>
                setSelectedUserId(
                  e.target.value ? Number(e.target.value) : null
                )
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
          <Card title="Active Users" value={filteredUsers.length} color="text-purple-600" />
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

          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-center">Total</th>
                <th className="p-3 text-center">Success</th>
                <th className="p-3 text-center">Errors</th>
                <th className="p-3 text-center">Latency</th>
                <th className="p-3 text-center">Last Active</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user: any) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="text-center">{user.requests}</td>
                    <td className="text-center text-green-600 font-medium">
                      {user.success}
                    </td>
                    <td className="text-center text-red-500 font-medium">
                      {user.errors}
                    </td>
                    <td className="text-center">{user.latency} ms</td>
                    <td className="text-center text-xs text-gray-500">
                      {new Date(user.lastActive).toLocaleString()}
                    </td>
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

        {/* LOG TABLE */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-green-600 text-white px-4 py-3 text-sm font-semibold">
            API Logs Details
          </div>

          {!selectedUser ? (
            <div className="p-6 text-center text-gray-400">
              Select a user to view API logs
            </div>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 text-left">Endpoint</th>
                  <th className="p-3 text-center">Method</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Latency</th>
                  <th className="p-3 text-center">Time</th>
                </tr>
              </thead>

              <tbody>
                {selectedUser.logs?.length > 0 ? (
                  selectedUser.logs.map((log: any) => (
                    <tr key={log.id} className="border-t">
                      <td className="p-3">{log.endpoint}</td>
                      <td className="text-center">{log.method}</td>
                      <td
                        className={`text-center font-semibold ${
                          log.status < 400
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {log.status}
                      </td>
                      <td className="text-center">{log.latency} ms</td>
                      <td className="text-center text-xs text-gray-500">
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
  );
}

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