import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Template previews
import template1 from "../assets/templates/template1.png";
import template2 from "../assets/templates/template2.png";
import template3 from "../assets/templates/template3.png";
import template4 from "../assets/templates/template4.png";
import template5 from "../assets/templates/template5.png";
import template6 from "../assets/templates/template6.png";
import template7 from "../assets/templates/template7.png";
import template8 from "../assets/templates/template8.png";
import template9 from "../assets/templates/template9.png";

export default function Landing({ isLoggedIn }) {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const templates = [
    { id: 1, img: template1, name: "Classic Two-Column Header Resume" },
    { id: 2, img: template2, name: "Modern Sidebar Resume" },
    { id: 3, img: template3, name: "Visual Skills Bar Resume" },
    { id: 4, img: template4, name: "Personal Brand & Philosophy Resume" },
    { id: 5, img: template5, name: "Minimalist Competency-Focused Resume" },
    { id: 6, img: template6, name: "Minimalist Structured Professional Resume" },
    { id: 7, img: template7, name: "Visual Skills & Experience Focused Resume" },
    { id: 8, img: template8, name: "Asymmetrical Creative Sidebar Resume" },
    { id: 9, img: template9, name: "Color-Coded Service Skills Resume" },
  ];

  const handleCustomize = (id) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (currentUser?.isAdmin) {
      alert("Admin cannot customize user templates!");
    } else {
      if (id === 1) {
        navigate("/resume-builder-template1");
      } else {
        navigate("/resume-builder-template2");
      }
    }
    setSelectedTemplate(null);
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
            {template.id === 1 && (
              <span className="absolute top-2 left-2 bg-[#bfa77a] text-white text-xs px-2 py-1 rounded-md">
                Recommended
              </span>
            )}

            <img
              src={template.img}
              alt={template.name}
              className="w-full h-[14rem] object-contain rounded-md mb-2"
            />

            <p className="text-sm font-medium text-gray-700 text-center">
              {template.name}
            </p>
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
                <p className="text-sm text-gray-600">
                  8.5 × 11 inches · ATS-friendly
                </p>
              </div>

              {!currentUser?.isAdmin && (
                <button
                  onClick={() => handleCustomize(selectedTemplate.id)}
                  className="w-full px-6 py-3 rounded-xl bg-[#bfa77a] text-[#F5F1E8]
                             font-semibold hover:bg-[#a78f5f] transition"
                >
                  Customize Template
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
