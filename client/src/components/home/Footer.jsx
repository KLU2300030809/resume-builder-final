import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white w-full px-6 md:px-16 lg:px-36 py-16 font-poppins">
      {/* Top Section: Logo & Links */}
      <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-purple-500 pb-10">
        
        {/* Logo and description */}
        <div className="flex flex-col md:max-w-md gap-4">
          <Link to="/" className="flex items-center gap-2">
            
            <span className="text-lg font-semibold text-white">ResumeBuilder</span>
          </Link>

          <p className="text-sm text-white/80 mt-2">
            Build professional resumes quickly and effortlessly with our Resume Builder. Fill in your details and download a polished resume ready to impress.
          </p>

          {/* App buttons */}
          <div className="flex items-center gap-2 mt-4">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
              alt="google play"
              className="h-10 w-auto border border-white rounded"
            />
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
              alt="app store"
              className="h-10 w-auto border border-white rounded"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col md:flex-row justify-between gap-10 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5 text-white">Company</h2>
            <ul className="text-sm space-y-2 text-white/80">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About us</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy policy</Link></li>
              <li><Link to="/ats-guide" className="hover:text-white transition">ATS Guide</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-5 text-white">Get in touch</h2>
            <div className="text-sm space-y-2 text-white/80">
              <p>+9494300465</p>
              <p>2300030809cseh1@gmail.com</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-4 text-indigo-300">
              <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                <Github size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="pt-6 text-center text-sm text-white/80">
        Copyright © {new Date().getFullYear()} <Link to="/" className="hover:text-white transition">ResumeBuilder</Link>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
