import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Github, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#0b0b12] text-white pt-20 pb-10 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-violet-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-1/3 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-12 border-b border-white/10">

          {/* Brand / Title */}
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <Globe className="text-violet-400" size={22} />
              <span className="text-lg font-semibold">
                Career Profile Platform
              </span>
            </div>

            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Create resumes, store them securely, and generate shareable portfolio websites
              with automated deployment.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">

            {/* Platform */}
            <div>
              <h2 className="text-white font-medium mb-4">Platform</h2>
              <ul className="space-y-2 text-white/60">
                <li><Link className="hover:text-white transition">Home</Link></li>
                <li><Link className="hover:text-white transition">Dashboard</Link></li>
                <li><Link className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link className="hover:text-white transition">Support</Link></li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-white font-medium mb-4">Features</h2>
              <ul className="space-y-2 text-white/60">
                <li>Resume Builder</li>
                <li>Portfolio Generator</li>
                <li>Cloud Storage</li>
                <li>Public Sharing</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-white font-medium mb-4">Contact</h2>

              <div className="space-y-2 text-white/60 text-sm">
                <p>📞 +91 9494300465</p>
                <p>📧 2300030809cseh1@gmail.com</p>
              </div>

              {/* Social */}
              <div className="flex items-center gap-4 mt-5 text-white/60">
                <a className="hover:text-white transition">
                  <Facebook size={20} />
                </a>
                <a className="hover:text-white transition">
                  <Instagram size={20} />
                </a>
                <a className="hover:text-white transition">
                  <Twitter size={20} />
                </a>
                <a className="hover:text-white transition">
                  <Github size={20} />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 text-center text-xs text-white/40">
          A unified system for building and sharing professional career profiles
        </div>

      </div>
    </footer>
  );
};

export default Footer;