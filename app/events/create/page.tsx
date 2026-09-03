"use client";

import { useState } from "react";

export default function CreateEventPage() {
  const [form, setForm] = useState({
    name: "",
    alias: "",
    year: "",
    country: "",
    region: "",
    city: "",
    website: "",
    email: "",
    descriptionEn: "",
    descriptionFr: "",
    facebook: "",
    twitter: "",
    instagram: "",
    tikTok: "",
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const formData = new FormData();

      // TEXT FIELDS
      formData.append("Name", form.name);
      formData.append("Alias", form.alias);
      formData.append("Year", form.year);
      formData.append("Country", form.country);
      formData.append("Region", form.region);
      formData.append("City", form.city);
      formData.append("Website", form.website);
      formData.append("Email", form.email);
      formData.append("DescriptionEn", form.descriptionEn);
      formData.append("DescriptionFr", form.descriptionFr);
      formData.append("Facebook", form.facebook);
      formData.append("Twitter", form.twitter);
      formData.append("Instagram", form.instagram);
      formData.append("TikTok", form.tikTok);

      // FILES
      if (logo) formData.append("Logo", logo);
      if (cover) formData.append("Cover", cover);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/OrganizersAccountManagement/CreateEvent`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "API failed");
      }

      const data = await res.json();
      console.log(data);

      alert("✅ Event Created Successfully");

      // RESET FORM
      setForm({
        name: "",
        alias: "",
        year: "",
        country: "",
        region: "",
        city: "",
        website: "",
        email: "",
        descriptionEn: "",
        descriptionFr: "",
        facebook: "",
        twitter: "",
        instagram: "",
        tikTok: "",
      });

      setLogo(null);
      setCover(null);

    } catch (err: any) {
      console.error("ERROR:", err);
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create Event</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault(); // 🔥 IMPORTANT
          handleSubmit();
        }}
        className="space-y-4"
      >
        <input name="name" value={form.name} placeholder="Event Name" onChange={handleChange} className="input w-full" required />

        <input name="alias" value={form.alias} placeholder="Alias" onChange={handleChange} className="input w-full" />

        <input name="year" value={form.year} placeholder="Year" onChange={handleChange} className="input w-full" />

        <div className="grid grid-cols-3 gap-2">
          <input name="country" value={form.country} placeholder="Country" onChange={handleChange} className="input" />
          <input name="region" value={form.region} placeholder="Region" onChange={handleChange} className="input" />
          <input name="city" value={form.city} placeholder="City" onChange={handleChange} className="input" />
        </div>

        <input name="website" value={form.website} placeholder="Website" onChange={handleChange} className="input w-full" />
        <input name="email" value={form.email} placeholder="Email" onChange={handleChange} className="input w-full" />

        <textarea name="descriptionEn" value={form.descriptionEn} placeholder="Description EN" onChange={handleChange} className="input w-full" />

        <textarea name="descriptionFr" value={form.descriptionFr} placeholder="Description FR" onChange={handleChange} className="input w-full" />

        <input name="facebook" value={form.facebook} placeholder="Facebook" onChange={handleChange} className="input w-full" />
        <input name="twitter" value={form.twitter} placeholder="Twitter" onChange={handleChange} className="input w-full" />
        <input name="instagram" value={form.instagram} placeholder="Instagram" onChange={handleChange} className="input w-full" />
        <input name="tikTok" value={form.tikTok} placeholder="TikTok" onChange={handleChange} className="input w-full" />

        {/* FILE UPLOAD */}
        <div>
          <label>Logo:</label>
          <input type="file" onChange={(e) => setLogo(e.target.files?.[0] || null)} />
        </div>

        <div>
          <label>Cover:</label>
          <input type="file" onChange={(e) => setCover(e.target.files?.[0] || null)} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}