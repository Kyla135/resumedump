import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResumeBuilderTemplate2() {
  const resumeRef = useRef();
  const [showDownload, setShowDownload] = useState(false);

  const [data, setData] = useState({
    name: "Alexandra D. Cruz",
    title: "Information Technology Specialist",
    email: "alexandra.cruz@email.com",
    phone: "+63 912 345 6789",
    address: "Manila, Philippines",
    summary:
      "Highly motivated IT specialist with strong academic foundation and hands-on experience in frontend development, system analysis, and web-based applications.",
    education: [
      "Bachelor of Science in Information Technology — University of the Philippines (2019–2023)"
    ],
    experience: [
      "Web Developer Intern — DigitalEdge Solutions (2023)\nDeveloped responsive web interfaces and collaborated with designers and backend developers.",
      "IT Support Assistant — Campus Tech Office (2022)\nProvided technical support and assisted in system maintenance."
    ],
    skills: [
      "HTML, CSS, JavaScript",
      "React.js",
      "Tailwind CSS",
      "Git & GitHub"
    ],
    languages: ["English", "Filipino"],
    interests: ["Technology Trends", "UI/UX Design", "Academic Research"],
    references: [
      "Dr. Maria Santos — IT Professor\nmaria.santos@university.edu"
    ],
    picture: ""
  });

  const updateField = (field, value, index = null) => {
    setData(prev => {
      if (index !== null) {
        const updated = [...prev[field]];
        updated[index] = value;
        return { ...prev, [field]: updated };
      }
      return { ...prev, [field]: value };
    });
  };

  const handlePhotoClick = () => {
    document.getElementById("photo2").click();
  };

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setData({ ...data, picture: reader.result });
    reader.readAsDataURL(file);
  };

  const saveDraft = () => {
    const drafts = JSON.parse(localStorage.getItem("savedDrafts")) || [];
    drafts.push({
      id: Date.now(),
      template: "Template 2",
      data
    });
    localStorage.setItem("savedDrafts", JSON.stringify(drafts));
    alert("Draft saved! Check your profile.");
  };

  const download = async type => {
    setShowDownload(false);
    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true
    });
    const img = canvas.toDataURL("image/png");

    if (type === "png") {
      const a = document.createElement("a");
      a.href = img;
      a.download = "resume_template2.png";
      a.click();
    } else {
      const pdf = new jsPDF("p", "in", "letter");
      const w = 8.5;
      const h = (canvas.height * w) / canvas.width;
      pdf.addImage(img, "PNG", 0, 0, w, h);
      pdf.save("resume_template2.pdf");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 overflow-x-hidden">
      {/* ACTION BUTTONS */}
      <div className="fixed top-6 right-6 flex gap-2 z-50">
        <button onClick={saveDraft} className="bg-green-700 text-white px-4 py-2 text-sm rounded">
          Save Draft
        </button>
        <button onClick={() => setShowDownload(true)} className="bg-blue-700 text-white px-4 py-2 text-sm rounded">
          Download
        </button>
      </div>

      {/* DOWNLOAD MODAL */}
      {showDownload && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl space-y-4">
            <h2 className="font-semibold text-lg">Download as</h2>
            <div className="flex gap-4">
              <button onClick={() => download("png")} className="bg-blue-600 text-white px-4 py-2 rounded">
                PNG
              </button>
              <button onClick={() => download("pdf")} className="bg-green-600 text-white px-4 py-2 rounded">
                PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESUME */}
      <div
        ref={resumeRef}
        className="bg-white w-[8.5in] min-h-[11in] p-10 shadow-xl"
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div
              onClick={handlePhotoClick}
              className="w-28 h-28 rounded-full bg-gray-300 overflow-hidden cursor-pointer"
            >
              {data.picture ? (
                <img src={data.picture} className="w-full h-full object-cover" />
              ) : null}
              <input
                id="photo2"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
          </div>

          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={e => updateField("name", e.target.innerText)}
            className="text-2xl font-bold"
          >
            {data.name}
          </h1>

          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={e => updateField("title", e.target.innerText)}
            className="text-sm"
          >
            {data.title}
          </p>

          <p className="text-sm mt-2">
            {data.email} | {data.phone} | {data.address}
          </p>
        </div>

        {/* SECTIONS */}
        {[
          ["PROFILE SUMMARY", "summary"],
          ["EDUCATION", "education"],
          ["WORK EXPERIENCE", "experience"],
          ["SKILLS", "skills"],
          ["LANGUAGES", "languages"],
          ["INTERESTS", "interests"],
          ["REFERENCES", "references"]
        ].map(([title, field]) => (
          <div key={field} className="mb-4">
            <h2 className="font-semibold text-sm border-b border-black mb-2">
              {title}
            </h2>

            {Array.isArray(data[field]) ? (
              data[field].map((item, i) => (
                <p
                  key={i}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e => updateField(field, e.target.innerText, i)}
                  className="text-sm mb-1 whitespace-pre-line"
                >
                  {item}
                </p>
              ))
            ) : (
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={e => updateField(field, e.target.innerText)}
                className="text-sm"
              >
                {data[field]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
