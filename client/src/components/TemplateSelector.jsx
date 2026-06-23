import React, { useState } from "react";
import { Layout, Check, X } from "lucide-react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, traditional resume format with clear sections and professional typography.",
    },
    {
      id: "modern",
      name: "Modern",
      preview: "A sleek, modern layout with color highlights.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "ATS-friendly minimal resume with simple structure.",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Minimal design with profile image sidebar.",
    },
  ];

  return (
    <div className="relative">
      {/* Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 text-sm text-white/80
bg-white/5
border border-white/10
hover:bg-white/10
        transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} />
        <span className="max-sm:hidden">Template</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 z-[9999]
bg-[#0f0f1a] rounded-md border border-white/10
backdrop-blur-xl shadow-2xl p-3 space-y-3
max-h-80 overflow-y-auto">
          
          {/* Close Button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
            >
              <X size={16} />
            </button>
          </div>

          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;

            return (
              <div
                key={template.id}
                onClick={() => onChange(template.id)} // only change, do not close
                className={`relative p-3 border rounded-md cursor-pointer transition-all
                ${
                  isSelected
                    ? "border-violet-500/50 bg-violet-500/10"
                    : "border-gray-300 hover:border-gray-400 hover:bg-violet-500/10"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}

                <h4 className="font-medium text-white">
                  {template.name}
                </h4>

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

export default TemplateSelector;
