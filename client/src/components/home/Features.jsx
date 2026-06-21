import React from "react";
import { Zap, FileText, Brain, ShieldCheck } from "lucide-react";

const Features = () => {
  const featureCards = [
    {
      icon: <Brain size={26} />,
      title: "AI Content Suggestions",
      desc: "Generate strong bullet points and summaries tailored to your job role.",
      gradient: "from-purple-400 to-purple-600 text-white",
    },
    {
      icon: <FileText size={26} />,
      title: "ATS-Optimized Templates",
      desc: "Professionally designed templates that pass applicant tracking systems.",
      gradient: "from-indigo-400 to-indigo-600 text-white",
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "Secure & Private",
      desc: "Your resume data is encrypted and never shared without permission.",
      gradient: "from-emerald-400 to-emerald-600 text-white",
    },
    {
      icon: <Zap size={26} />,
      title: "Fast & Easy Builder",
      desc: "Build a complete resume in minutes with guided steps and previews.",
      gradient: "from-orange-400 to-orange-500 text-white",
    },
  ];

  return (
    <section id="features" className="relative pt-20 pb-20 bg-white">
      {/* Header */}
      <div className="flex flex-col items-center text-center px-4">
        <div className="flex items-center gap-2 text-sm text-purple-700 bg-purple-100/30 border border-purple-200 rounded-full px-6 py-1.5 mb-4">
          <Zap size={14} />
          <span>Simple Process</span>
        </div>

        <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-slate-900">
          Powerful Resume Features
        </h2>

        <p className="text-sm md:text-base text-slate-500 mt-2 max-w-xl">
          Everything you need to create ATS-friendly, professional resumes with
          AI assistance — faster and smarter.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-12 px-4">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((card, i) => (
            <div
              key={i}
              className={`group rounded-3xl p-8 text-center bg-gradient-to-br ${card.gradient} shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl`}
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 text-white text-2xl shadow-inner transition">
                {card.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
              <p className="text-sm opacity-90">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
