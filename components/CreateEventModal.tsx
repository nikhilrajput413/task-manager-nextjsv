"use client";

import { useState } from "react";

export default function CreateEventModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    Name: "",
    Alias: "",
    Year: "",
    Country: "",
    Region: "",
    City: "",
    PostalCode: "",
    DescriptionEnglish: "",
    DescriptionNativeLang: "",
    Email: "",
    Website: "",
    Facebook: "",
    Twitter: "",
    Instagram: "",
    tiktok: "",
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const formData = new FormData();

      // ✅ TEXT FIELDS (MATCH MODEL EXACTLY)
      formData.append("Name", form.Name);
      formData.append("Alias", form.Alias);
      formData.append("Year", form.Year);
      formData.append("Country", form.Country);
      formData.append("Region", form.Region);
      formData.append("City", form.City);
      formData.append("PostalCode", form.PostalCode);
      formData.append("DescriptionEnglish", form.DescriptionEnglish);
      formData.append("DescriptionNativeLang", form.DescriptionNativeLang);
      formData.append("Email", form.Email);
      formData.append("Website", form.Website);
      formData.append("Facebook", form.Facebook);
      formData.append("Twitter", form.Twitter);
      formData.append("Instagram", form.Instagram);
      formData.append("tiktok", form.tiktok);

      // ✅ FILES
      if (logo) formData.append("EventLogo", logo);
      if (cover) formData.append("EventCover", cover);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/OrganizersAccountManagement/CreateEvent`,
        {
          method: "POST",
          body: formData, // ❌ NO headers
        }
      );

      // ✅ FIX: avoid JSON parse crash
      const text = await res.text();

      if (!res.ok) {
        console.error("API ERROR:", text);
        throw new Error(text || "API failed");
      }

      console.log("SUCCESS:", text);

      alert("✅ Event Created Successfully");

      // RESET
      setForm({
        Name: "",
        Alias: "",
        Year: "",
        Country: "",
        Region: "",
        City: "",
        PostalCode: "",
        DescriptionEnglish: "",
        DescriptionNativeLang: "",
        Email: "",
        Website: "",
        Facebook: "",
        Twitter: "",
        Instagram: "",
        tiktok: "",
      });

      setLogo(null);
      setCover(null);

      onClose();
    } catch (err: any) {
      console.error("ERROR:", err);
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded shadow relative overflow-y-auto max-h-[90vh]">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Create Event</h2>

        <div className="space-y-3">

          <input name="Name" value={form.Name} placeholder="Name" onChange={handleChange} className="input w-full" />

          <input name="Alias" value={form.Alias} placeholder="Alias" onChange={handleChange} className="input w-full" />

          <input name="Year" value={form.Year} placeholder="Year" onChange={handleChange} className="input w-full" />

          <div className="grid grid-cols-3 gap-2">
            <input name="Country" value={form.Country} placeholder="Country" onChange={handleChange} className="input" />

            <select name="Region" value={form.Region} onChange={handleChange} className="input">
              <option value="">Select Region</option>
              <option value="0">Europe</option>
              <option value="1">Asia</option>
            </select>

            <input name="City" value={form.City} placeholder="City" onChange={handleChange} className="input" />
          </div>

          <input name="PostalCode" value={form.PostalCode} placeholder="Postal Code" onChange={handleChange} className="input w-full" />

          <textarea name="DescriptionEnglish" value={form.DescriptionEnglish} placeholder="Description English" onChange={handleChange} className="input w-full" />

          <textarea name="DescriptionNativeLang" value={form.DescriptionNativeLang} placeholder="Description Native" onChange={handleChange} className="input w-full" />

          <input name="Email" value={form.Email} placeholder="Email" onChange={handleChange} className="input w-full" />

          <input name="Website" value={form.Website} placeholder="Website" onChange={handleChange} className="input w-full" />

          <input name="Facebook" value={form.Facebook} placeholder="Facebook" onChange={handleChange} className="input w-full" />

          <input name="Twitter" value={form.Twitter} placeholder="Twitter" onChange={handleChange} className="input w-full" />

          <input name="Instagram" value={form.Instagram} placeholder="Instagram" onChange={handleChange} className="input w-full" />

          <input name="tiktok" value={form.tiktok} placeholder="TikTok" onChange={handleChange} className="input w-full" />

          {/* FILES */}
          <div>
            <label>Logo</label>
            <input type="file" onChange={(e) => setLogo(e.target.files?.[0] || null)} />
          </div>

          <div>
            <label>Cover</label>
            <input type="file" onChange={(e) => setCover(e.target.files?.[0] || null)} />
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="border px-4 py-2 rounded">
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}