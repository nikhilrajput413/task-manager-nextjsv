"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilters() {
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
    router.refresh(); // 🔥 MUST
  }

  return (
    <div className="flex gap-4 mb-4">

      <input
        placeholder="Search categories..."
        defaultValue={params.get("search") || ""}
        onChange={(e) =>
          updateParam("search", e.target.value)
        }
        className="border p-2 rounded-lg w-72"
      />

    </div>
  );
}