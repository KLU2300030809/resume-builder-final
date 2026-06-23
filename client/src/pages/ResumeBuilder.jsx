import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderIcon,
  Sparkles,
  Share2Icon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
} from "lucide-react";
import Certification from "../components/Certification";
import Achievement from "../components/Achievement";
import ResumePreview from "../components/ResumePreview";
import PersonalInfoForm from "../components/PersonalInfoForm";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import ShareResumeButton from "../components/ShareResumeButton";
import api from "../configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
const [isPdfMode, setIsPdfMode] = useState(false);
  // ✅ FIX: single ref only
  const resumeRef = useRef(null);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {
      full_name: "",
      email: "",
      phone: "",
      location: "",
      profession: "",
      linkedin: "",
      github: "",
    },
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    certifications: [],   // ✅ ADD THIS
  achievements: [],     
    template: "classic",
    accent_color: "#3B82F6",
    public: true,
  });

  const personalFormRef = useRef();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

 const sections = [
  { id: "personal", name: "Personal Info", icon: User },
  { id: "summary", name: "Summary", icon: FileText },
  { id: "experience", name: "Experience", icon: Briefcase },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "projects", name: "Projects", icon: FolderIcon },
  { id: "skills", name: "Skills", icon: Sparkles },
  { id: "certifications", name: "Certifications", icon: FileText }, // ✅ ADD
  { id: "achievements", name: "Achievements", icon: Sparkles },   // ✅ ADD
];

  const activeSection = sections[activeSectionIndex];

  /* ---------------- LOAD RESUME ---------------- */
  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`/resumes/get/${resumeId}`);
      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
      }
    } catch (error) {
      toast.error("Failed to load resume");
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, []);

  /* ---------------- SAVE RESUME ---------------- */
  const saveResume = async () => {
   console.log(resumeData);
     try {
      const payload = {
        resumeId: resumeData._id,
        resumeData: {
          title: resumeData.title,
          personal_info: resumeData.personal_info,
          professional_summary: resumeData.professional_summary,
          experience: resumeData.experience,
          education: resumeData.education,
          project: resumeData.project,
          skills: resumeData.skills,
          certifications: resumeData.certifications,   // ✅ ADD
  achievements: resumeData.achievements,       // ✅ ADD
          template: resumeData.template,
          accent_color: resumeData.accent_color,
          public: resumeData.public,
        },
      };

const { data } = await api.post("/resumes/update", payload, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

// setResumeData(data.resume);
      return data;
    } catch (error) {
      console.error("SaveResume ERROR:", error.response?.data || error.message);
      throw error;
    }
  };

  const handleSaveClick = () => {
    toast.promise(saveResume(), {
      loading: "Saving...",
      success: "Saved successfully",
      error: "Save failed",
    });
  };

  /* ---------------- PUBLIC / PRIVATE ---------------- */
const changeResumeVisibility = async () => {
  try {
    const { data } = await api.post("/api/resumes/update", {
      resumeId: resumeData._id,
      resumeData: {
        public: !resumeData.public,
      },
    });

    setResumeData((prev) => ({
      ...prev,
      public: !prev.public,
    }));

    toast.success(data.message || "Updated");
  } catch (err) {
    toast.error("Failed to update visibility");
  }
};
  /* ---------------- SHARE ---------------- */
  const handleShare = () => {
    const resumeUrl = `${window.location.origin}/view/${resumeId}`;
    if (navigator.share) {
      navigator.share({
        title: "My Resume",
        text: "Check out my resume!",
        url: resumeUrl,
      });
    } else {
      window.open(resumeUrl, "_blank");
    }
  };

  /* ---------------- DOWNLOAD (FIXED) ---------------- */
const handleDownload = async () => {
  const element = resumeRef.current;
  if (!element) return;
document.body.classList.add("pdf-mode");
setIsPdfMode(true);
  const html2pdf = (await import("html2pdf.js")).default;

  // 1. enable PDF mode
  document.body.classList.add("pdf-mode");
  setIsPdfMode(true);

  // 2. wait for UI update
  await new Promise((r) => setTimeout(r, 300));

  // 3. generate PDF
  await html2pdf()
    .set({
      margin: 0,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
  scale: 2,
  useCORS: true,
  backgroundColor: "#ffffff",
},
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    })
    .from(element)
    .save();

  // 4. disable PDF mode
  
  setIsPdfMode(false);
  document.body.classList.remove("pdf-mode");
};
console.log("PREVIEW TEMPLATE:", resumeData.template);
console.log("PREVIEW COLOR:", resumeData.accent_color);
console.log("PREVIEW DATA:", resumeData);

  return (
    <>
      {/* HEADER */}
     <div className="min-h-screen bg-[#0b0b12] text-white">

  {/* HEADER - NOW INSIDE DARK BACKGROUND */}
  <div className="max-w-7xl mx-auto px-4 py-6">
    <Link
      to="/app"
      className="inline-flex gap-2 items-center text-white/60 hover:text-white transition"
    >
      <ArrowLeftIcon className="size-4" />
      Back to Dashboard
    </Link>
  </div>

  {/* MAIN CONTENT */}
  <div className="grid lg:grid-cols-12 gap-8"></div>    <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT FORM */}
          <div className="lg:col-span-5">
       <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-6 pt-4 text-white">
              {/* NAV */}
<div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2 text-white">
                <div className="flex gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((p) => ({ ...p, template }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((p) => ({ ...p, accent_color: color }))
                    }
                  />
                </div>

<h2 className="font-semibold text-white/80">{activeSection.name}</h2>

                <div className="flex gap-2">
                  {activeSectionIndex !== 0 && (
                    <button onClick={() => setActiveSectionIndex(i => i - 1)}>
                      <ChevronLeft />
                    </button>
                  )}
                  <button
                    onClick={() => setActiveSectionIndex(i => i + 1)}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>

              {/* SECTIONS */}
              {activeSection.id === "personal" && (
                <PersonalInfoForm
                  ref={personalFormRef}
                  data={resumeData.personal_info}
                  accentColor={resumeData.accent_color}
                  onChange={(fn) =>
                    setResumeData((p) => ({
                      ...p,
                      personal_info: fn(p.personal_info),
                    }))
                  }
                  removeBackground={removeBackground}
                  setRemoveBackground={setRemoveBackground}
                />
              )}

              {activeSection.id === "summary" && (
                <ProfessionalSummaryForm
                  data={resumeData.professional_summary}
                  onChange={(data) =>
                    setResumeData((p) => ({ ...p, professional_summary: data }))
                  }
                  setResumeData={setResumeData}
                />
              )}

              {activeSection.id === "experience" && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(data) =>
                    setResumeData((p) => ({ ...p, experience: data }))
                  }
                />
              )}

              {activeSection.id === "education" && (
                <EducationForm
                  data={resumeData.education}
                  onChange={(data) =>
                    setResumeData((p) => ({ ...p, education: data }))
                  }
                />
              )}

              {activeSection.id === "projects" && (
                <ProjectForm
                  data={resumeData.project}
                  onChange={(data) =>
                    setResumeData((p) => ({ ...p, project: data }))
                  }
                />
              )}

             {activeSection.id === "skills" && (
  <SkillsForm
    skills={resumeData.skills || []}
    projects={resumeData.project || []}
    experience={resumeData.experience || []}
    setSkills={(skills) =>
      setResumeData((prev) => ({
        ...prev,
        skills,
      }))
    }
  />
)}
{activeSection.id === "certifications" && (
  <Certification
    certifications={resumeData.certifications || []}
    setCertifications={(certifications) =>
      setResumeData((prev) => ({
        ...prev,
        certifications,
      }))
    }
  />
)}

{activeSection.id === "achievements" && (
<Achievement
  achievements={resumeData.achievements || []}
  setAchievements={(data) =>
    setResumeData((prev) => ({
      ...prev,
      achievements: data,
    }))
  }
/>
)}

              <div className="mt-6">
                <button
                  onClick={handleSaveClick}
                  className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-md px-6 py-2 text-sm hover:opacity-90 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="lg:col-span-7 relative flex flex-col gap-4">

            <div className="flex items-center gap-2 mb-4">
{resumeData.public && (
 <ShareResumeButton resumeId={resumeId} />
)}

          

           <button
  onClick={handleDownload}
  className="flex items-center gap-2 px-4 py-2 text-xs font-medium
  bg-gradient-to-r from-violet-600 to-indigo-600
  text-white rounded-lg
  shadow-md shadow-violet-500/20
  hover:shadow-violet-500/40 hover:scale-105
  transition-all duration-200"
>
  <DownloadIcon className="size-4" />
  Download
</button>
            </div>

            {/* IMPORTANT: WRAPPER FIX */}
         <div ref={resumeRef}>
  <ResumePreview
    data={resumeData}
    template={resumeData.template}
    accentColor={resumeData.accent_color}
    isPdfMode={isPdfMode}
  />

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeBuilder;