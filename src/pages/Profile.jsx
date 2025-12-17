import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "", picture: "" });
  const [editing, setEditing] = useState(false);
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [downloadedTemplates, setDownloadedTemplates] = useState(["Template 1", "Template 5"]);

  // Function to load user info and saved drafts
  const loadData = () => {
    const name = localStorage.getItem("userName") || "Kristina Alamil";
    const email = localStorage.getItem("userEmail") || "user@example.com";
    const picture = localStorage.getItem("userPicture") || "";
    setUser({ name, email, picture });

    const drafts = JSON.parse(localStorage.getItem("savedDrafts")) || [];
    setSavedDrafts(drafts);
  };

  // Load on mount
  useEffect(() => {
    loadData();
  }, []);

  // Reload drafts when the page becomes visible (for SPA navigation)
  useEffect(() => {
    const handleFocus = () => {
      loadData();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser(prev => ({ ...prev, picture: reader.result }));
        localStorage.setItem("userPicture", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userEmail", user.email);
    setEditing(false);
  };

  // Open draft for editing in Resume Builder Template 1
  const handleEditDraft = (draft) => {
    localStorage.setItem("resumeTemplate1", JSON.stringify(draft.data));
    navigate("/resume-builder-template1");
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background: "linear-gradient(135deg, #ffffff, #fefcfb, #f3f1ee)",
        backgroundSize: "200% 200%",
        animation: "shine 15s ease-in-out infinite",
      }}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        My Profile
      </h1>

      {/* User Info Section */}
      <section className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col items-center">
        <div className="mb-4">
          {user.picture ? (
            <img
              src={user.picture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
        <p className="text-gray-600 mb-2">{user.email}</p>

        {editing ? (
          <div className="w-full flex flex-col items-center space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="mb-2"
            />
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Name"
              value={user.name}
              onChange={e =>
                setUser(prev => ({ ...prev, name: e.target.value }))
              }
            />
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              placeholder="Email"
              value={user.email}
              onChange={e =>
                setUser(prev => ({ ...prev, email: e.target.value }))
              }
            />
            <button
              onClick={handleSave}
              className="bg-[#bfa77a] text-[#f5f1e6] px-4 py-2 rounded-lg hover:bg-[#a78f5f] transition-colors"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-[#e6dcc6] text-[#3b2f1f] px-4 py-2 rounded-lg hover:bg-[#d6c9aa] transition-colors mt-2"
          >
            Edit Info
          </button>
        )}
      </section>

      {/* Saved Drafts Section */}
      <section className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Saved Drafts</h2>
        {savedDrafts.length > 0 ? (
          <ul className="space-y-2">
            {savedDrafts.map((draft, i) => (
              <li
                key={draft.id || i}
                className="bg-gray-200 rounded p-3 flex justify-between items-center"
              >
                {draft.template}: {draft.data.name} - {draft.data.jobTitle}
                <button
                  onClick={() => handleEditDraft(draft)}
                  className="bg-[#bfa77a] text-[#f5f1e6] px-3 py-1 rounded hover:bg-[#a78f5f] transition-colors"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No saved drafts yet.</p>
        )}
      </section>

      {/* Downloaded Templates Section */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Downloaded Templates</h2>
        {downloadedTemplates.length > 0 ? (
          <ul className="space-y-2">
            {downloadedTemplates.map((template, i) => (
              <li
                key={i}
                className="bg-gray-200 rounded p-3 flex justify-between items-center"
              >
                {template}
                <button
                  className="bg-[#bfa77a] text-[#f5f1e6] px-3 py-1 rounded hover:bg-[#a78f5f] transition-colors"
                >
                  Download Again
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No downloaded templates yet.</p>
        )}
      </section>

      <style>{`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
