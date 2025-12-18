import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResumeBuilderTemplate1() {
  const resumeRef = useRef();
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const [data, setData] = useState({
    name: "Kristina Alamil",
    title: "Frontend Developer",
    picture: "",
    email: "kristina@example.com",
    phone: "0917-123-4567",
    linkedin: "linkedin.com/in/kristinaalamil",
    portfolio: "kristina.dev",
    skills: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
    languages: ["English", "Filipino"],
    interests: ["Web Development", "UI/UX Design", "Open Source"],
    summary:
      "Creative frontend developer with 2 years of experience building responsive and user-friendly web applications.",
    experience: [
      {
        role: "Frontend Developer",
        company: "Tech Solutions Inc.",
        period: "2023 – Present",
        details:
          "Developed and maintained UI components using React and Tailwind CSS.",
      },
      {
        role: "Intern Developer",
        company: "Innovatech Labs",
        period: "2022 – 2023",
        details:
          "Assisted in responsive web page design and internal tools development.",
      },
    ],
    education: [
      { degree: "BSc Computer Science", school: "University of Manila", period: "2019 – 2023" },
    ],
    references: [
      {
        name: "Prof. John Doe",
        role: "CS Professor",
        contact: "john.doe@university.com",
      },
      {
        name: "Ms. Jane Smith",
        role: "Team Lead at Tech Solutions",
        contact: "jane.smith@techsolutions.com",
      },
    ],
  });

  // Handle picture upload when clicking the avatar
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setData((prev) => ({ ...prev, picture: reader.result }));
    reader.readAsDataURL(file);
  };

  // Editable text on click
  const handleTextChange = (field, value, index = null, subfield = null) => {
    if (index !== null) {
      setData((prev) => {
        const copy = [...prev[field]];
        if (subfield) copy[index][subfield] = value;
        else copy[index] = value;
        return { ...prev, [field]: copy };
      });
    } else {
      setData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Save draft
  const handleSaveDraft = () => {
    const savedDrafts = JSON.parse(localStorage.getItem("savedDrafts")) || [];
    savedDrafts.push({ id: Date.now(), template: "Template 1", data });
    localStorage.setItem("savedDrafts", JSON.stringify(savedDrafts));
    alert("Draft Saved! It will appear in your profile.");
  };

  // Download
  const handleDownload = async (type) => {
    setShowDownloadOptions(false);
    if (!resumeRef.current) return;

    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });
    const imgData = canvas.toDataURL("image/png");

    if (type === "png") {
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "resume.png";
      link.click();
    } else if (type === "pdf") {
      const pdfWidth = 8.5;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const pdf = new jsPDF({ orientation: "portrait", unit: "in", format: [pdfWidth, pdfHeight] });
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-start p-6 relative">
      {/* Buttons */}
      <div className="absolute top-6 right-6 flex gap-2 z-50">
        <button
          onClick={handleSaveDraft}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 text-sm transition"
        >
          Save Draft
        </button>
        <button
          onClick={() => setShowDownloadOptions(true)}
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 text-sm transition"
        >
          Download
        </button>
      </div>

      {/* Download modal */}
      {showDownloadOptions && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-4">
            <h2 className="text-lg font-semibold">Download As</h2>
            <div className="flex gap-4">
              <button onClick={() => handleDownload("png")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                PNG
              </button>
              <button onClick={() => handleDownload("pdf")} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                PDF
              </button>
            </div>
            <button onClick={() => setShowDownloadOptions(false)} className="mt-2 text-sm underline text-gray-700">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Resume */}
      <div
        ref={resumeRef}
        className="bg-white shadow-2xl w-[8.5in] flex flex-col overflow-hidden"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {/* Header */}
        <div className="bg-gray-200 flex flex-col items-center p-4">
          <div
            className="w-36 h-36 mb-2 cursor-pointer"
            onClick={() => document.getElementById("pictureInput").click()}
          >
            {data.picture ? (
              <img src={data.picture} alt="Profile" className="w-full h-full object-cover rounded-full border-2 border-gray-400" />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-400 flex items-center justify-center text-black text-sm border-2 border-gray-400">
                Click to add photo
              </div>
            )}
            <input type="file" accept="image/*" id="pictureInput" onChange={handlePictureChange} className="hidden" />
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            className="text-3xl font-bold text-center mb-1"
            onBlur={(e) => handleTextChange("name", e.target.innerText)}
          >
            {data.name}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            className="text-lg text-gray-800 text-center"
            onBlur={(e) => handleTextChange("title", e.target.innerText)}
          >
            {data.title}
          </div>
        </div>

        {/* Columns */}
        <div className="flex flex-1 min-h-[12in]">
          {/* Left */}
          <div className="w-1/3 bg-blue-900 text-white p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg border-b border-white pb-1 mb-2">Contact Info</h3>
                {["email","phone","linkedin","portfolio"].map((field,i)=>(
                  <div key={i}
                    contentEditable
                    suppressContentEditableWarning
                    className="text-sm mb-1"
                    onBlur={(e)=>handleTextChange(field,e.target.innerText)}
                  >
                    {data[field]}
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-lg border-b border-white pb-1 mb-2">Skills</h3>
                {data.skills.map((s,i)=>(
                  <div key={i}
                    contentEditable
                    suppressContentEditableWarning
                    className="text-sm mb-1"
                    onBlur={(e)=>handleTextChange("skills",e.target.innerText,i)}
                  >
                    {s}
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-lg border-b border-white pb-1 mb-2">Languages</h3>
                {data.languages.map((l,i)=>(
                  <div key={i}
                    contentEditable
                    suppressContentEditableWarning
                    className="text-sm mb-1"
                    onBlur={(e)=>handleTextChange("languages",e.target.innerText,i)}
                  >
                    {l}
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-lg border-b border-white pb-1 mb-2">Interests</h3>
                {data.interests.map((i2,i)=>(
                  <div key={i}
                    contentEditable
                    suppressContentEditableWarning
                    className="text-sm mb-1"
                    onBlur={(e)=>handleTextChange("interests",e.target.innerText,i)}
                  >
                    {i2}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 bg-white text-black p-6 flex flex-col justify-between">
            <div className="space-y-4">
              {[
                { title: "About Me", field: "summary" },
                { title: "Work Experience", field: "experience" },
                { title: "Education", field: "education" },
                { title: "References", field: "references" },
              ].map((section, idx)=>{
                return (
                  <div key={idx}>
                    <h3 className="font-semibold text-lg border-b border-gray-400 pb-1 mb-2">{section.title}</h3>
                    {Array.isArray(data[section.field])
                      ? data[section.field].map((item,i)=>{
                          return typeof item === "string" ? (
                            <div key={i}
                              contentEditable
                              suppressContentEditableWarning
                              className="text-sm mb-1"
                              onBlur={(e)=>handleTextChange(section.field,e.target.innerText,i)}
                            >
                              {item}
                            </div>
                          ) : (
                            <div key={i} className="mb-2">
                              {Object.keys(item).map((sub,k)=>(
                                <div key={k}
                                  contentEditable
                                  suppressContentEditableWarning
                                  className="text-sm mb-1"
                                  onBlur={(e)=>handleTextChange(section.field,e.target.innerText,i,sub)}
                                >
                                  {item[sub]}
                                </div>
                              ))}
                            </div>
                          );
                        })
                      : (
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          className="text-sm mb-1"
                          onBlur={(e)=>handleTextChange(section.field,e.target.innerText)}
                        >
                          {data[section.field]}
                        </div>
                      )
                    }
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
