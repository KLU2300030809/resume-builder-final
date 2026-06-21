// src/components/home/CallToAction.jsx
import React from "react";
import { FileText, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/app"); // ✅ CORRECT PATH
  };

  return (
    <section className="flex flex-col items-center justify-center mx-auto px-4 sm:px-6 max-w-5xl w-full text-center rounded-2xl py-20 bg-white shadow-lg">
      {/* Gradient Icon */}
      <div className="mb-6">
        <div className="p-5 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 inline-flex items-center justify-center shadow-lg transform transition duration-500 hover:scale-110">
          <FileText size={32} className="text-white" />
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 max-w-2xl">
        Create Your Professional Resume Instantly
      </h1>
      <p className="text-sm md:text-base text-slate-500 mt-3 max-w-lg">
        Fill in your details and let our AI-powered builder craft a professional
        resume that stands out.
      </p>

      {/* Decorative Highlights */}
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-full font-medium shadow-md transform transition duration-300 hover:scale-105">
          <Zap size={20} /> AI Powered
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-medium shadow-md transform transition duration-300 hover:scale-105">
          <FileText size={20} /> ATS Friendly
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleGetStarted}
        className="mt-10 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:opacity-90 active:scale-95 transition"
      >
        Get Started
      </button>
    </section>
  );
};

export default CallToAction;
