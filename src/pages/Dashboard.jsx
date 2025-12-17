import { useState, useEffect } from "react";
import { getUserFromToken } from "../lib/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user = getUserFromToken();
  const navigate = useNavigate();

  // Load resumes from localStorage
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const allResumes = JSON.parse(localStorage.getItem("resumes")) || [];
    setResumes(allResumes);
  }, []);

  // Add a new resume
  const handleAddResume = () => {
    navigate("/resume-builder-template1"); // or a page to create new resume
  };

  // Edit a resume
  const handleEditResume = (id) => {
    navigate(`/resumes/edit/${id}`); // you can implement the edit route
  };

  return (
    <div
      className="min-h-screen p-10"
      style={{
        background: "linear-gradient(135deg, #ffffff, #fef1dc, #bfa77a)",
        backgroundSize: "200% 200%",
        animation: "shine 15s ease-in-out infinite",
      }}
    >
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <p className="text-lg mb-4 text-gray-700">Welcome, {user?.fullName || user?.email}!</p>

      <button
        onClick={handleAddResume}
        className="mb-6 px-6 py-3 rounded-xl bg-[#bfa77a] text-[#F5F1E8] font-semibold hover:bg-[#a78f5f] transition"
      >
        Add New Resume
      </button>

      {resumes.length === 0 ? (
        <p className="text-gray-600">No resumes available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {resumes.map((resume, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <h2 className="text-lg font-semibold text-gray-800">{resume.title || "Untitled Resume"}</h2>
              <p className="text-sm text-gray-600 mb-2">{resume.userEmail}</p>
              <button
                onClick={() => handleEditResume(index)}
                className="mt-auto px-4 py-2 bg-[#bfa77a] text-[#F5F1E8] rounded-lg font-medium hover:bg-[#a78f5f] transition"
              >
                Edit Resume
              </button>
            </div>
          ))}
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
