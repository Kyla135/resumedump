import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../lib/auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inline add-resume form state
  const [addingResume, setAddingResume] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [newSize, setNewSize] = useState(""); // optional size field

  // Redirect non-admins
  useEffect(() => {
    if (!user || user.role !== "admin") navigate("/");
  }, [user, navigate]);

  // Load resumes
  useEffect(() => {
    async function fetchResumes() {
      try {
        const res = await fetch("http://localhost:3000/api/resumes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setResumes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchResumes();
  }, []);

  // Add new resume submit
  const handleAddResumeSubmit = async () => {
    if (!newTitle) return alert("Add a title");

    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("template", newSize || "custom");
    if (newFile) formData.append("image", newFile);

    try {
      const res = await fetch("http://localhost:3000/api/resumes", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
      const newResume = await res.json();
      setResumes([newResume, ...resumes]);
      setAddingResume(false);
      setNewTitle("");
      setNewFile(null);
      setNewSize("");
    } catch (err) {
      console.error(err);
      alert("Failed to add resume");
    }
  };

  const handleEditResume = (id) => navigate(`/resumes/edit/${id}`);
  const handleDeleteResume = async (id) => {
    await fetch(`http://localhost:3000/api/resumes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setResumes(resumes.filter((r) => r._id !== id));
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <button
        onClick={() => setAddingResume(!addingResume)}
        className="mb-6 px-6 py-3 bg-[#bfa77a] text-[#F5F1E8] rounded-xl hover:bg-[#a78f5f] transition"
      >
        Add New Resume
      </button>

      {/* Inline Add Resume Rectangle */}
      {addingResume && (
        <div className="mb-6 p-4 border border-gray-300 rounded-lg flex flex-col gap-2 w-80 bg-white shadow relative">
          
          {/* Cancel Button */}
          <button
            onClick={() => {
              setAddingResume(false);
              setNewTitle("");
              setNewFile(null);
              setNewSize("");
            }}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
          >
            ×
          </button>

          <input
            type="text"
            placeholder="Resume Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewFile(e.target.files[0])}
            className="border px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Size (optional)"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={handleAddResumeSubmit}
            className="bg-[#bfa77a] text-[#F5F1E8] px-4 py-2 rounded hover:bg-[#a78f5f] transition"
          >
            Upload Resume
          </button>
        </div>
      )}

      {loading ? (
        <p>Loading resumes...</p>
      ) : resumes.length === 0 ? (
        <p>No resumes available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div key={resume._id} className="p-4 bg-white rounded-xl shadow flex flex-col gap-2">
              <h2 className="font-semibold">{resume.title}</h2>
              <p className="text-sm">ID: {resume._id}</p>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleEditResume(resume._id)}
                  className="px-4 py-2 bg-[#bfa77a] text-[#F5F1E8] rounded hover:bg-[#a78f5f]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteResume(resume._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
