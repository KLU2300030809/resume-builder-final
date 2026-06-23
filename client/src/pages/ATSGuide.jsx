import React from "react";
import { CheckCircle, Lightbulb, ClipboardList, FileText, Info, Award } from "lucide-react";

const ATSGuide = () => {
  const faqs = [
    {
      question: "What is an ATS?",
      answer:
        "Applicant Tracking System is software used by companies to scan and filter resumes before recruiters see them.",
      icon: <Lightbulb className="w-5 h-5 text-white/60" />,
    },
    {
      question: "Why ATS friendly resume matters?",
      answer:
        "Most companies use ATS systems. Poor formatting or missing keywords can reject your resume automatically.",
      icon: <CheckCircle className="w-5 h-5 text-white/60" />,
    },
    {
      question: "Best file format?",
      answer: "Use PDF or DOCX. Avoid images like JPG or PNG.",
      icon: <FileText className="w-5 h-5 text-white/60" />,
    },
    {
      question: "Resume length?",
      answer: "1 page for freshers, 1–2 pages for experienced professionals.",
      icon: <Info className="w-5 h-5 text-white/60" />,
    },
    {
      question: "How to show achievements?",
      answer:
        "Use numbers, percentages, and measurable outcomes in bullet points.",
      icon: <Award className="w-5 h-5 text-white/60" />,
    },
  ];

  const steps = [
    "Use simple fonts like Arial, Calibri",
    "Avoid tables, images, and complex layouts",
    "Add job-specific keywords",
    "Use standard headings (Experience, Education, Skills)",
    "Export as PDF or DOCX",
  ];

  const tips = [
    "Tailor resume for each job",
    "Use bullet points for clarity",
    "Add measurable results",
    "Keep it concise (1–2 pages)",
    "Avoid fancy templates",
  ];

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white px-4 md:px-16 lg:px-24 xl:px-40 py-16">

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold">
          ATS Resume Guide
        </h1>
        <p className="text-white/50 mt-4 text-sm md:text-base">
          Learn how to create resumes that pass ATS filters and reach recruiters.
        </p>
      </div>

      {/* FAQ */}
      <div className="mt-14 space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-white/5 bg-white/5 rounded-xl p-5 hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-3">
              {faq.icon}
              <h2 className="text-white/90 font-medium">{faq.question}</h2>
            </div>
            <p className="text-white/50 text-sm mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* GRID SECTIONS */}
      <div className="grid md:grid-cols-2 gap-6 mt-14 max-w-5xl mx-auto">

        {/* Steps */}
        <div className="border border-white/5 bg-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4 text-white/80">
            <ClipboardList className="w-5 h-5" />
            <h2 className="font-medium">Steps</h2>
          </div>

          <ul className="space-y-2 text-white/50 text-sm">
            {steps.map((step, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-white/30">•</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        {/* Tips */}
        <div className="border border-white/5 bg-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4 text-white/80">
            <CheckCircle className="w-5 h-5" />
            <h2 className="font-medium">Tips</h2>
          </div>

          <ul className="space-y-2 text-white/50 text-sm">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-white/30">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default ATSGuide;