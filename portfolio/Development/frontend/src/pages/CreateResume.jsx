import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

function CreateResume() {
  const resumeRef = useRef();
  const [photo, setPhoto] = useState(null);

  const [data, setData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    linkedin: "",
    location: "",
    summary: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
    certifications: "",
    strengths: "",
    languages: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const downloadPDF = () => {
    if (!photo) {
      alert("Please upload profile image first");
      return;
    }

    html2pdf().from(resumeRef.current).save("Raju_Resume.pdf");
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">

      {/* ================= FORM ================= */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-cyan-400">
          Create Modern Resume
        </h2>

        <input type="file" accept="image/*"
          onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))} />

        {Object.keys(data).map((key) => (
          <textarea
            key={key}
            name={key}
            placeholder={key.toUpperCase()}
            onChange={handleChange}
            className="input"
          />
        ))}

        <button
          onClick={downloadPDF}
          className="bg-cyan-500 px-6 py-2 rounded font-bold text-black"
        >
          Download Resume
        </button>
      </div>

      {/* ================= RESUME PREVIEW ================= */}
      <div ref={resumeRef} className="bg-white text-black p-6 rounded shadow-lg">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold uppercase">{data.name}</h1>
            <p className="text-blue-600 font-semibold">{data.role}</p>
            <p className="text-sm">{data.email} | {data.phone}</p>
            <p className="text-sm">{data.linkedin} | {data.location}</p>
          </div>

          {photo && (
            <img src={photo}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-400"
              alt="profile"
            />
          )}
        </div>

        <hr className="my-4" />

        {/* CONTENT GRID */}
        <div className="grid grid-cols-3 gap-6">

          {/* LEFT COLUMN */}
          <div className="col-span-2 space-y-4">
            <Section title="SUMMARY" content={data.summary} />
            <Section title="EDUCATION" content={data.education} />
            <Section title="EXPERIENCE" content={data.experience} />
            <Section title="PASSIONS" content={data.strengths} />
            <Section title="LANGUAGES" content={data.languages} />
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <TagSection title="SKILLS" content={data.skills} />
            <Section title="PROJECTS" content={data.projects} />
            <Section title="CERTIFICATION" content={data.certifications} />
            <Section title="STRENGTHS" content={data.strengths} />
          </div>

        </div>
      </div>
    </div>
  );
}

const Section = ({ title, content }) =>
  content && (
    <div>
      <h3 className="font-bold border-b pb-1">{title}</h3>
      <p className="text-sm whitespace-pre-line">{content}</p>
    </div>
  );

const TagSection = ({ title, content }) =>
  content && (
    <div>
      <h3 className="font-bold border-b pb-1">{title}</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {content.split(",").map((skill, i) => (
          <span key={i} className="px-2 py-1 bg-gray-200 rounded text-sm">
            {skill.trim()}
          </span>
        ))}
      </div>
    </div>
  );

export default CreateResume;
