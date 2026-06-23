import React from "react";
import { FileText, Globe, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-24 flex justify-center overflow-hidden bg-[#0b0b12] text-white">

      {/* Glow background (same system as banner/features) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-violet-600/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-1/3 w-[500px] h-[500px] bg-indigo-600/20 blur-[140px] rounded-full" />
      </div>

      {/* Glass Card */}
      <div className="max-w-4xl w-full mx-4 text-center rounded-3xl p-10 md:p-16
                      bg-white/5 backdrop-blur-xl border border-white/10
                      shadow-2xl shadow-black/40">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg">
            <Globe size={30} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Turn Your Resume into a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-500">
            Live Portfolio
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-5 text-white/60 text-sm md:text-base max-w-2xl mx-auto">
          Build resumes, store them in the cloud, and generate production-ready
          portfolio websites with a single click.
        </p>

        {/* Feature highlights (app-style, not pills) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
            <FileText size={18} className="text-violet-400" />
            <p className="mt-2 text-sm font-medium">Resume Builder</p>
            <p className="text-xs text-white/50 mt-1">Structured, ATS-ready resumes</p>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
            <Globe size={18} className="text-indigo-400" />
            <p className="mt-2 text-sm font-medium">Portfolio Generator</p>
            <p className="text-xs text-white/50 mt-1">Auto deploy from resume data</p>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
            <Zap size={18} className="text-emerald-400" />
            <p className="mt-2 text-sm font-medium">Instant Sharing</p>
            <p className="text-xs text-white/50 mt-1">Public links for recruiters</p>
          </div>

        </div>

        {/* CTA Button (app style) */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate("/app")}
            className="group flex items-center gap-2 px-8 py-3 rounded-full
                       bg-gradient-to-r from-violet-600 to-indigo-600
                       font-semibold shadow-lg hover:shadow-indigo-500/30
                       hover:scale-105 active:scale-95 transition"
          >
            Open Dashboard
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition"
            />
          </button>
        </div>

      </div>
    </section>
  );
};

export default CallToAction;