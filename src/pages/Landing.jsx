import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing({ isLoggedIn }) {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates, setTemplates] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

useEffect(() => {
  async function fetchTemplates() {
    try {
      const res = await fetch("http://localhost:3000/api/resumes/templates"); // public route
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      const mappedTemplates = data.map((t) => ({
        id: t._id,
        img: `http://localhost:3000/${t.image}`,
        name: t.title,
      }));
      setTemplates(mappedTemplates);
    } catch (err) {
      console.error("Failed to fetch templates:", err);
    }
  }

  fetchTemplates();
}, []);

  // Create resume in MongoDB when user clicks a template
  const handleCreateResume = async (templateId) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    try {
      const res = await fetch("http://localhost:3000/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          template: template.name,
          title: template.name,
          sections: [],
        }),
      });

      const data = await res.json();
      console.log("Resume created:", data);

      // Redirect to builder
      navigate("/resume-builder-template1"); // or decide based on templateId if needed

      setSelectedTemplate(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCustomize = (id) => {
    handleCreateResume(id);
  };

  return (
    <div
      className="min-h-screen p-10 flex flex-col items-center"
      style={{
        background: "linear-gradient(135deg, #ffffff, #fefcfb, #f3f1ee)",
        backgroundSize: "200% 200%",
        animation: "shine 15s ease-in-out infinite",
      }}
    >
      {/* HEADER */}
      <div className="text-center mb-16 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Find Your Perfect Resume Template
        </h1>
        <p className="text-lg text-gray-600">
          Select a professionally designed template to start building your resume.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Step 1 of 3 · Choose a resume template
        </p>
      </div>

      {/* TEMPLATE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template)}
            className="relative bg-[#fdfcf9] rounded-xl shadow transition cursor-pointer p-3
                       hover:shadow-xl hover:scale-105"
            style={{
              width: "12rem",
              height: "20rem",
              border: "2px solid #c9b48f",
            }}
          >
            <img
              src={template.img}
              alt={template.name}
              className="w-full h-[14rem] object-contain rounded-md mb-2"
            />
            <p className="text-sm font-medium text-gray-700 text-center">{template.name}</p>
          </div>
        ))}
      </div>

      {/* PREVIEW MODAL */}
      {selectedTemplate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedTemplate(null)}
        >
          <div
            className="relative bg-[#fefcfb] rounded-xl shadow-xl p-6 max-w-4xl w-full flex gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedTemplate(null)}
              className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center
                         rounded-full bg-white shadow-lg border border-gray-200
                         text-gray-700 text-xl font-bold
                         hover:bg-gray-100 transition"
            >
              ×
            </button>

            {/* PREVIEW IMAGE */}
            <div className="w-1/2 flex justify-center items-center">
              <img
                src={selectedTemplate.img}
                alt={selectedTemplate.name}
                className="max-h-[450px] object-contain rounded-lg shadow-md"
              />
            </div>

            {/* INFO + CTA */}
            <div className="w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedTemplate.name}
                </h2>
                <p className="text-sm text-gray-600">8.5 × 11 inches · ATS-friendly</p>
              </div>

              {!currentUser?.isAdmin && (
                <button
                  onClick={() => handleCustomize(selectedTemplate.id)}
                  className="w-full px-6 py-3 rounded-xl bg-[#bfa77a] text-[#F5F1E8]
                             font-semibold hover:bg-[#a78f5f] transition"
                >
                  Create Resume
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes shine {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
}
