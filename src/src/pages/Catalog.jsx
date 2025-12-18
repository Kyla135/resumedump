import { useState } from "react";

// Dummy resume templates
const templates = [
  { id: 1, name: "Modern Resume", category: "Modern", price: 0 },
  { id: 2, name: "Classic Resume", category: "Classic", price: 0 },
  { id: 3, name: "Creative Resume", category: "Creative", price: 0 },
  { id: 4, name: "Professional Resume", category: "Professional", price: 0 },
];

export default function Catalog() {
  const [activeCat, setActiveCat] = useState("");

  // Categories
  const categories = ["All", ...new Set(templates.map(t => t.category))];

  const filtered = activeCat && activeCat !== "All"
    ? templates.filter(t => t.category === activeCat)
    : templates;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Resume Templates</h1>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-3 py-1 rounded-full border ${
              activeCat === cat ? "bg-indigo-600 text-white border-indigo-600" : "hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(t => (
          <div
            key={t.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
          >
            <h3 className="text-lg font-semibold text-slate-900">{t.name}</h3>
            <p className="text-sm text-slate-600 mt-1">{t.category}</p>
            <button className="mt-3 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
              Select Template
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-slate-600">No templates found.</p>
        )}
      </div>
    </div>
  );
}
