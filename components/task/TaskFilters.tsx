"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TaskFilters({ categories = [] }: any) {
  const router = useRouter();
  const params = useSearchParams();

  function updateParam(key: string, value: string) {
    const newParams = new URLSearchParams(params.toString());

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    router.push(`?${newParams.toString()}`);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-3 mb-4">

      {/* SEARCH */}
      <input
        placeholder="Search..."
        defaultValue={params.get("search") || ""}
        onChange={(e) =>
          updateParam("search", e.target.value)
        }
        className="border p-2 rounded-lg"
      />

      {/* CATEGORY */}
      <select
        defaultValue={params.get("categoryid") || ""}
        onChange={(e) =>
          updateParam("categoryid", e.target.value)
        }
        className="border p-2 rounded-lg"
      >
        <option value="">All Categories</option>

       {categories?.map((cat: any) => (
  <option key={cat.id} value={cat.id}>
    {cat.name}
  </option>
))}

      </select>

      {/* STATUS */}
      <select
        defaultValue={params.get("status") || ""}
        onChange={(e) =>
          updateParam("status", e.target.value)
        }
        className="border p-2 rounded-lg"
      >
        <option value="">All Status</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      {/* PRIORITY */}
      <select
        defaultValue={params.get("priority") || ""}
        onChange={(e) =>
          updateParam("priority", e.target.value)
        }
        className="border p-2 rounded-lg"
      >
        <option value="">All Priority</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      {/* 🔥 DATE FROM */}
      <input
        type="date"
        defaultValue={params.get("from") || ""}
        onChange={(e) =>
          updateParam("from", e.target.value)
        }
        className="border p-2 rounded-lg"
      />

      {/* 🔥 DATE TO */}
      <input
        type="date"
        defaultValue={params.get("to") || ""}
        onChange={(e) =>
          updateParam("to", e.target.value)
        }
        className="border p-2 rounded-lg"
      />

    </div>
  );
}