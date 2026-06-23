import React, { useEffect, useState, useCallback } from "react";
import api from "../configs/api";
import toast from "react-hot-toast";

import PortfolioPreview from "./PortfolioPreview";
import PortfolioTemplateSelector from "../components/portfolio/PortfolioTemplateSelector";
import ColorPicker from "../components/ColorPicker";

import { Sparkles, Link, Globe } from "lucide-react";

const PortfolioGenerator = () => {
  const [resumes, setResumes] = useState([]);
const [selectedResumeId, setSelectedResumeId] = useState("");
const [resume, setResume] = useState(null);
  const [showResumeList, setShowResumeList] = useState(false);
  const [loading, setLoading] = useState(false);

  const [template, setTemplate] = useState("developer-portfolio");
  const [accentColor, setAccentColor] = useState("#6366F1");

  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [published, setPublished] = useState(false);

  const [portfolioData, setPortfolioData] = useState(null);

  // FETCH RESUMES
  const fetchResumes = useCallback(async () => {
    try {
      const { data } = await api.get("/resumes/user");
      const resumeList = data.resumes || [];
      setResumes(resumeList);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load resumes");
    }
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);
useEffect(() => {
  console.log("API URL:", import.meta.env.VITE_API_URL);
}, []);
  // GENERATE PORTFOLIO
  const handleGenerate = async () => {
    if (!selectedResumeId) {
      toast.error("Please select a resume");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/portfolio/generate", {
        resumeId: selectedResumeId,
        template,
        accentColor,
      });

      setPortfolioUrl(data.url);
      setPublished(true);

setPortfolioData({
  hero: {
    name: resume?.personal_info?.full_name || "",
    profession: resume?.personal_info?.profession || ""
  },
  about: resume?.professional_summary || "",
  skills: resume?.skills || [],
  projects: resume?.project || [],
  experience: resume?.experience || [],
  education: resume?.education || [],
  certifications: resume?.certifications || [],
  contact: resume?.personal_info || {}
});
      toast.success("Portfolio generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Portfolio generation failed");
    } finally {
      setLoading(false);
    }
  };

  // COPY LINK
  const copyLink = () => {
    navigator.clipboard.writeText(portfolioUrl);
    toast.success("Portfolio URL copied!");
  };

  return (
<div className="min-h-screen bg-[#0b0b12] text-white p-6">

      <div className="grid grid-cols-12 gap-6">

        {/* ================= LEFT PANEL ================= */}
        <div className="col-span-4 bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-2xl h-fit">

          <h1 className="text-xl font-bold mb-5 flex items-center gap-2">
          <Sparkles className="text-violet-400" />
            Portfolio Builder
          </h1>

          {/* RESUME SELECT */}
          <div className="mb-5 relative">
            <label className="text-sm font-medium text-white/80 mb-2 block">
              Select Resume
            </label>

            <button
              onClick={() => setShowResumeList(!showResumeList)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-left text-white hover:bg-white/10"
            >
              {selectedResumeId
                ? resumes.find(r => r._id === selectedResumeId)?.title
                : "Choose Resume"}
            </button>

            {showResumeList && (
              <div className="absolute z-50 mt-2 w-full bg-[#0f0f1a] border border-white/10 rounded-lg shadow-2xl backdrop-blur-xl max-h-60 overflow-y-auto">
                {resumes.map((resume) => (
                  <div
                    key={resume._id}
                    onClick={() => {
                      const selected = resumes.find(r => r._id === resume._id);

                      setSelectedResumeId(resume._id);
                      setResume(selected);
                      setShowResumeList(false);

                      // LIVE PREVIEW DATA
                      setPortfolioData({
                        hero: {
                          name: selected?.personal_info?.full_name || "",
                          profession: selected?.personal_info?.profession || ""
                        },
                        about: selected?.professional_summary || "",
                        skills: selected?.skills || [],
projects: selected?.project || [],
                        experience: selected?.experience || [],
                        education: selected?.education || [],
                        certifications: selected?.certifications || [],
                        contact: selected?.personal_info || {}
                      });
                    }}
className="px-4 py-2 text-white/80 hover:bg-violet-500/10 cursor-pointer"
                  >
                    {resume.title || "Untitled Resume"}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TEMPLATE */}
          <div className="mb-5">
            <label className="text-sm font-medium mb-2 block">
              Template
            </label>

            <PortfolioTemplateSelector
              selectedTemplate={template}
              onChange={setTemplate}
            />
          </div>

          {/* ACCENT COLOR */}
          <div className="mb-5">
            <label className="text-sm font-medium mb-2 block">
              Accent Color
            </label>

            <ColorPicker
              selectedColor={accentColor}
              onChange={setAccentColor}
            />
          </div>

          {/* BUTTONS */}
          <button
            onClick={handleGenerate}
            disabled={loading}
className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-2 rounded-lg hover:opacity-90 transition"  >
            {loading ? "Generating..." : "Generate Portfolio"}
          </button>

          {published && (
            <div className="flex gap-2 mt-4">
              <button onClick={copyLink} className="text-sm bg-white/5 border border-white/10 text-white/80 px-3 py-2 rounded-lg hover:bg-white/10">
                Copy Link
              </button>

              <a
                href={portfolioUrl}
                target="_blank"
className="text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-3 py-2 rounded-lg"
              >
                Visit
              </a>
            </div>
          )}

        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="col-span-8 bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-2xl min-h-[80vh]">

          {portfolioData ? (
            <PortfolioPreview
              resume={portfolioData}
              template={template}
              accentColor={accentColor}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-white/40">
              Select a resume to preview portfolio
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default PortfolioGenerator;
