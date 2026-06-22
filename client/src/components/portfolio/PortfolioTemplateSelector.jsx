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
        className="flex items-center gap-2 text-sm text-blue-600 bg-gradient-to-br
        from-blue-50 to-blue-100 ring-1 ring-blue-300 hover:ring-blue-400
        transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} />
        <span className="max-sm:hidden">Template</span>
      </button>

      {/* ---------------- DROPDOWN PANEL ---------------- */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 z-[9999] bg-white rounded-md border border-gray-200 shadow-lg p-3 space-y-3 max-h-80 overflow-y-auto">

          {/* CLOSE BUTTON (ONLY WAY TO CLOSE) */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 transition"
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
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                  }
                `}
              >
                {/* SELECTED CHECK ICON */}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}

                {/* TEMPLATE NAME */}
                <h4 className="font-medium text-gray-800">
                  {template.name}
                </h4>

                {/* TEMPLATE DESCRIPTION */}
                <p className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-500 italic">
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