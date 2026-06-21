// src/components/home/Hero.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const auth = useSelector((state) => state.auth);
  const user = auth?.user ?? null;

  const navigate = useNavigate();

  // Debug: check if Redux state has user
  console.log("Current user:", user);

  // "Get Started" button behavior
  const handleGetStarted = () => {
    if (user) {
      navigate("/app"); // logged in → go to dashboard
    } else {
      navigate("/login"); // not logged in → go to login
    }
  };

  return (
    <div className="relative min-h-screen pb-20 bg-white overflow-hidden">
      {/* Soft background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-300 rounded-full blur-[140px] opacity-30 animate-floatSlow" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-300 rounded-full blur-[140px] opacity-30 animate-floatSlower" />
      </div>

      {/* NAVBAR */}
      <nav className="flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            AI
          </div>
          <span className="text-lg font-semibold text-slate-800">ResumeBuilder</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-slate-700">
          <Link to="/" className="hover:text-purple-600">Home</Link>
          <Link to="/features" className="hover:text-purple-600">Features</Link>
          <Link to="/ats-guide" className="hover:text-purple-600">ATS Guide</Link>
          <Link to="/contact" className="hover:text-purple-600">Contact</Link>
        </div>

        {/* Single Login button in navbar */}
     <Link
  to={user ? "/app" : "/login"}
  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full px-6 h-10 flex items-center hover:opacity-90 transition"
>
  {user ? "Dashboard" : "Login"}
</Link>

      </nav>

      {/* HERO CONTENT */}
      <div className="flex flex-col items-center text-center px-4 md:px-16 lg:px-24 xl:px-40 mt-24">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1,2,3,4,5].map(i => (
              <img
                key={i}
                src={`https://randomuser.me/api/portraits/men/${70+i}.jpg`}
                className="w-10 h-10 rounded-full border-2 border-white"
                alt=""
              />
            ))}
          </div>
          <p className="text-sm text-slate-600">
            Trusted by <span className="font-semibold">10,000+</span> users
          </p>
        </div>

        <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl mt-6">
          Build job-winning resumes with{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            AI Resume Builder
          </span>
        </h1>

        <p className="max-w-xl text-base text-slate-600 my-7">
          Create ATS-friendly, professional resumes in minutes using AI.
        </p>

        {/* Single "Get Started" button */}
        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full px-10 h-12 flex items-center hover:opacity-90 transition"
        >
          Get Started
        </button>

        <p className="py-6 text-slate-600 mt-14">
          Trusted by professionals from leading companies
        </p>
      </div>
    </div>
  );
};

export default Hero;
