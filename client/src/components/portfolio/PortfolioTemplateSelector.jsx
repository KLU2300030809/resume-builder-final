import React, { useState } from "react";
import { Layout, Check, X } from "lucide-react";

/**
 * Portfolio Template Selector
 * EXACT same UI/UX pattern as Resume Template Selector
 */
const PortfolioTemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // ---------------- TEMPLATE DATA ----------------
  const templates = [
    {
      id: "developer-portfolio",
      name: "Developer Portfolio",
      preview:
        "Modern software engineer portfolio with hero section, skills, and projects showcase.",
    },
    {
      id: "modern-portfolio",
      name: "Modern Portfolio",
      preview:
        "Sleek modern layout with clean sections and professional UI design.",
    },
    {
      id: "minimal-portfolio",
      name: "Minimal Portfolio",
      preview:
        "Clean ATS-style portfolio focused on readability and simplicity.",
    },
    {
      id: "creative-portfolio",
      name: "Creative Portfolio",
      preview:
        "Bold and expressive layout designed for designers and creators.",
    },
  ];

  return (
    <div className="relative inline-block">
      {/* ---------------- TEMPLATE BUTTON ---------------- */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 text-sm text-white/80
bg-white/5
border border-white/10
hover:bg-violet-500/10
        transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} />
        <span className="max-sm:hidden">Template</span>
      </button>

      {/* ---------------- DROPDOWN PANEL ---------------- */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 z-[9999] bg-[#0f0f1a]
border border-white/10
backdrop-blur-xl
shadow-2xl">

          {/* CLOSE BUTTON (ONLY WAY TO CLOSE) */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/60 hover:text-white hover:bg-violet-500/10 transition"
            >
              <X size={16} />
            </button>
          </div>

          {/* ---------------- TEMPLATE LIST ---------------- */}
          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;

            return (
              <div
                key={template.id}
                onClick={() => onChange(template.id)}
                className={`relative p-3 border rounded-md cursor-pointer transition-all
                  ${
                    isSelected
                      ? "border-violet-500/50 bg-violet-500/10"
                      : "border-white/10 hover:border-violet-500/30 hover:bg-violet-500/10"
                  }
                `}
              >
                {/* SELECTED CHECK ICON */}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}

                {/* TEMPLATE NAME */}
                <h4 className="font-medium text-white">
                  {template.name}
                </h4>

                {/* TEMPLATE DESCRIPTION */}
                <p className="mt-2 p-2 bg-white/5 border border-white/10 rounded text-xs text-white/50 italic">
                  {template.preview}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PortfolioTemplateSelector;