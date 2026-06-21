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
        className="flex items-center gap-2 text-sm text-blue-600 bg-gradient-to-br
        from-blue-50 to-blue-100 ring-1 ring-blue-300 hover:ring-blue-400
        transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} />
        <span className="max-sm:hidden">Template</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 z-[9999] bg-white rounded-md border border-gray-200 shadow-lg p-3 space-y-3 max-h-80 overflow-y-auto">
          
          {/* Close Button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 transition"
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
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}

                <h4 className="font-medium text-gray-800">
                  {template.name}
                </h4>

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

export default TemplateSelector;
