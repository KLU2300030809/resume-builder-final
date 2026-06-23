import React from "react";
import {
  Zap,
  FileText,
  ShieldCheck,
  Globe,
  Share2,
  Database,
} from "lucide-react";

const Features = () => {
  const featureCards = [
    {
      icon: <FileText size={22} />,
      title: "Resume Builder",
      desc: "Create and edit structured resumes with live preview.",
    },
    {
      icon: <Database size={22} />,
      title: "Resume Storage",
      desc: "All resumes are saved and synced to your account.",
    },
    {
      icon: <Globe size={22} />,
      title: "Portfolio Generator",
      desc: "Auto-generate a portfolio from resume data instantly.",
    },
    {
      icon: <Share2 size={22} />,
      title: "Public Sharing",
      desc: "Generate a public URL to share your portfolio.",
    },
    {
      icon: <Zap size={22} />,
      title: "Fast Workflow",
      desc: "Minimal steps from resume creation to deployment.",
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Secure System",
      desc: "User data is protected and stored securely.",
    },
  ];

  return (
    <section id="features" className="relative py-24 bg-[#0b0b12] text-white">

      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-purple-600/20 blur-[140px] rounded-full" />
      </div>

      {/* Header */}
      <div className="text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold">
          App Features
        </h2>

        <p className="mt-3 text-white/60 text-sm md:text-base max-w-xl mx-auto">
          Everything you need to build resumes and generate portfolios in one system.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="mt-14 px-4">
        <div className="max-w-5xl mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {featureCards.map((card, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl border border-white/10
                         bg-white/5 backdrop-blur-md
                         hover:bg-white/10 hover:border-white/20
                         transition duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="flex items-center gap-3">
                <div className="text-indigo-400 group-hover:text-indigo-300">
                  {card.icon}
                </div>

                <h3 className="text-base font-semibold">
                  {card.title}
                </h3>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Features;