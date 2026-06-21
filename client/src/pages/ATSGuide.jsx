import React from "react";
import { CheckCircle, Lightbulb, ClipboardList, FileText, Info, Award } from "lucide-react";

const ATSGuide = () => {
  const steps = [
    "Use simple fonts (Arial, Calibri, Times New Roman)",
    "Avoid tables, graphics, and images",
    "Use job-specific keywords from the posting",
    "Keep headings clear and standard (Experience, Education, Skills)",
    "Save as PDF or DOCX with proper naming",
  ];

  const tips = [
    "Tailor your resume for each job application",
    "Use bullet points for responsibilities and achievements",
    "Include measurable achievements (numbers, percentages)",
    "Keep resume concise (1-2 pages)",
    "Avoid fancy templates that break ATS formatting",
  ];

  const faqs = [
    {
      question: "What is an ATS?",
      answer:
        "ATS (Applicant Tracking System) is software used by companies to scan, filter, and rank resumes before a human sees them.",
      icon: <Lightbulb className="w-12 h-12 text-purple-600 flex-shrink-0" />,
    },
    {
      question: "Why should I make my resume ATS friendly?",
      answer:
        "Over 90% of companies use ATS, and incorrect formatting or missing keywords can result in your resume being rejected automatically.",
      icon: <CheckCircle className="w-12 h-12 text-green-500 flex-shrink-0" />,
    },
    {
      question: "Which file format is best?",
      answer: "PDF or DOCX are preferred. Avoid image formats like JPG or PNG.",
      icon: <FileText className="w-12 h-12 text-indigo-600 flex-shrink-0" />,
    },
    {
      question: "How long should my resume be?",
      answer: "Keep it concise: 1 page for juniors, 1-2 pages for experienced professionals.",
      icon: <Info className="w-12 h-12 text-yellow-500 flex-shrink-0" />,
    },
    {
      question: "How do I include achievements?",
      answer: "Use bullet points with numbers, percentages, or specific outcomes to show measurable results.",
      icon: <Award className="w-12 h-12 text-pink-500 flex-shrink-0" />,
    },
  ];

  return (
    <div className="relative overflow-hidden py-20 px-6 bg-gradient-to-b from-purple-50 via-white to-indigo-50">
      {/* Floating background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20 animate-floatSlow -z-10"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-indigo-300 rounded-full blur-3xl opacity-20 animate-floatSlower -z-10"></div>

      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-5xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          ATS Friendly Resume Guide
        </h1>

        <p className="text-gray-700 text-center text-lg md:text-xl">
          Learn how to create resumes that pass Applicant Tracking Systems and reach recruiters effectively.
        </p>

        {/* FAQ Sections */}
        <div className="space-y-10">
          {faqs.map((faq, idx) => (
            <section
              key={idx}
              className="flex flex-col md:flex-row items-start md:items-center bg-white shadow-lg rounded-xl p-6 md:p-8 gap-6 hover:shadow-xl transition"
            >
              {faq.icon}
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-purple-700">{faq.question}</h2>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </section>
          ))}
        </div>

        {/* Steps Section */}
        <section className="bg-white shadow-lg rounded-xl p-6 md:p-8 hover:shadow-xl transition">
          <div className="flex items-center mb-4 gap-4">
            <ClipboardList className="w-12 h-12 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-indigo-700">Steps to Create ATS Friendly Resume</h2>
          </div>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2">
            {steps.map((step, idx) => (
              <li key={idx} className="hover:text-indigo-600 transition">{step}</li>
            ))}
          </ol>
        </section>

        {/* Tips Section */}
        <section className="bg-white shadow-lg rounded-xl p-6 md:p-8 hover:shadow-xl transition">
          <div className="flex items-center mb-4 gap-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <h2 className="text-2xl font-semibold text-green-700">Tips for the Best Resume</h2>
          </div>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            {tips.map((tip, idx) => (
              <li key={idx} className="hover:text-green-600 transition">{tip}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ATSGuide;
