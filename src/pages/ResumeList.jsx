import { Link } from "react-router-dom";
import { getResumes } from "../lib/api";

export default function ResumeList() {
  const resumes = getResumes();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">My Resumes</h2>
      <Link to="/resumes/edit/new" className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">Create New Resume</Link>
      <div className="space-y-2 mt-4">
        {resumes.length === 0 ? <p className="text-slate-500">No resumes yet.</p> : resumes.map(r => (
          <div key={r.id} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
            <span>{r.name || "Untitled Resume"}</span>
            <Link to={`/resumes/edit/${r.id}`} className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
