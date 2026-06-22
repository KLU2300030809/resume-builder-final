import React, { useEffect, useState, useCallback } from "react";
import api from "../configs/api";
import toast from "react-hot-toast";

import PortfolioPreview from "./PortfolioPreview";
import PortfolioTemplateSelector from "../components/portfolio/PortfolioTemplateSelector";
import ColorPicker from "../components/ColorPicker";

import { Sparkles, Link, Globe } from "lucide-react";

const PortfolioGenerator = () => {
  const [resumes, setResumes] = useState([]);
  const [selecteudResumeId, setSelectedResumeId] = useState("");
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
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="grid grid-cols-12 gap-6">

        {/* ================= LEFT PANEL ================= */}
        <div className="col-span-4 bg-white p-5 rounded-xl shadow h-fit">

          <h1 className="text-xl font-bold mb-5 flex items-center gap-2">
            <Sparkles />
            Portfolio Builder
          </h1>

          {/* RESUME SELECT */}
          <div className="mb-5 relative">
            <label className="text-sm font-medium mb-2 block">
              Select Resume
            </label>

            <button
              onClick={() => setShowResumeList(!showResumeList)}
              className="w-full border rounded-lg px-3 py-2 text-left bg-gray-50"
            >
              {selectedResumeId
                ? resumes.find(r => r._id === selectedResumeId)?.title
                : "Choose Resume"}
            </button>

            {showResumeList && (
              <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow max-h-60 overflow-y-auto">
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
                    className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
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
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Generating..." : "Generate Portfolio"}
          </button>

          {published && (
            <div className="flex gap-2 mt-4">
              <button onClick={copyLink} className="text-sm border px-2 py-1 rounded">
                Copy Link
              </button>

              <a
                href={portfolioUrl}
                target="_blank"
                className="text-sm bg-green-600 text-white px-2 py-1 rounded"
              >
                Visit
              </a>
            </div>
          )}

        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="col-span-8 bg-white p-5 rounded-xl shadow min-h-[80vh]">

          {portfolioData ? (
            <PortfolioPreview
              resume={portfolioData}
              template={template}
              accentColor={accentColor}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a resume to preview portfolio
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default PortfolioGenerator;