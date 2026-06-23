import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FileText } from "lucide-react";

const Hero = () => {
  const auth = useSelector((state) => state.auth);
  const user = auth?.user ?? null;

  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/app");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative min-h-screen pb-20 bg-[#0b0b12] text-white overflow-hidden">

      {/* Background (match banner glow style) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px]" />
      </div>

      {/* NAVBAR */}
      <nav className="flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm border-b border-white/5 backdrop-blur-xl">

        <Link to="/" className="flex items-center gap-2">

          {/* Resume Icon instead of RF */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
            <FileText className="text-white" size={18} />
          </div>

          {/* PROJECT NAME (change only this text if needed) */}
          <span className="text-lg font-semibold text-white/90">
            Resume2Portfolio
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-white/60">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/features" className="hover:text-white transition">Features</Link>
          <Link to="/ats-guide" className="hover:text-white transition">ATS Guide</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
        </div>

        <Link
          to={user ? "/app" : "/login"}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-10 h-12 flex items-center hover:opacity-90 transition shadow-lg"
        >
          {user ? "Dashboard" : "Login"}
        </Link>
      </nav>

      {/* HERO CONTENT */}
      <div className="flex flex-col items-center text-center px-4 md:px-16 lg:px-24 xl:px-40 mt-24">

        {/* Social Proof (kept same, but adapted to dark UI) */}
        <div className="flex items-center gap-4">

          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`https://randomuser.me/api/portraits/men/${70 + i}.jpg`}
                className="w-10 h-10 rounded-full border-2 border-[#0b0b12]"
                alt=""
              />
            ))}
          </div>

          <p className="text-sm text-white/60">
            Trusted by <span className="font-semibold text-white">10,000+</span> users
          </p>
        </div>

        {/* MAIN HEADING */}
        <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl mt-6 leading-tight">
          Build Resumes. Generate Portfolios.{" "}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Share Instantly
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="max-w-2xl text-base text-white/60 my-7">
          Create ATS-friendly resumes, store them securely in the cloud, and
          automatically generate professional portfolio websites with a single click.
        </p>

        {/* CTA */}
        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-10 h-12 flex items-center hover:opacity-90 transition shadow-lg"
        >
          {user ? "Get Started" : "Start Building Free"}
        </button>

        {/* Footer line */}
        <p className="py-6 text-white/40 mt-14 text-sm">
          No credit card required • Instant portfolio generation • Secure cloud storage
        </p>
      </div>
    </div>
  );
};

export default Hero;