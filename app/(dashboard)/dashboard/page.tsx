"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("30 days");

 useEffect(() => {
   console.log("PAGE LOADED ✅");
  fetchDashboard();
}, []);

async function fetchDashboard() {
 const res = await fetch("http://localhost:3000/api/dashboard");
  const result = await res.json();

  console.log("API DATA 👉", result); // 👈 IMPORTANT

  setData(result);
}

if (!data || !data.users) {
  return <p className="p-6">Loading...</p>;
}

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-500 mb-4">
        Monitor API performance and user activity
      </p>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {["Last 24 hours", "7 days", "30 days"].map((item) => (
          <button
            key={item}
            onClick={() => setActiveFilter(item)}
            className={`px-4 py-2 rounded-lg border ${
              activeFilter === item
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
       <Card title="Total Requests" value={data?.total || 0} />
<Card title="Success" value={data?.success || 0} />
<Card title="Errors" value={data?.errors || 0} />
<Card title="Active Users" value={data?.users?.length || 0} />
<Card title="Avg Latency" value={data?.avgLatency || "0ms"} />
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl shadow border mb-6">
        <div className="bg-green-600 text-white px-4 py-2 rounded-t-xl flex justify-between">
          <span>User Activity</span>
          <span>{data.users.length} users</span>
        </div>

        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
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
  {data.users && data.users.length > 0 ? (
    data.users.map((user: any) => (
      <tr
        key={user.id}
        onClick={() => setSelectedUser(user)}
        className="cursor-pointer hover:bg-gray-100"
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

      {/* API Details */}
      <div className="bg-white rounded-xl shadow border">
        <div className="bg-green-600 text-white px-4 py-2 rounded-t-xl">
          API Call Details
        </div>

        <div className="p-6 text-center text-gray-500">
          {!selectedUser ? (
            "No user selected"
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-black">
                {selectedUser.name}
              </h2>
              <p>Total Requests: {selectedUser.requests}</p>
              <p>Success: {selectedUser.success}</p>
              <p>Errors: {selectedUser.errors}</p>
              <p>Latency: {selectedUser.latency}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-bold mt-1">{value}</h2>
    </div>
  );
}