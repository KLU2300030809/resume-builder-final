import React, { useState } from "react";
import { Palette, Check, X } from "lucide-react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Black", value: "#1F2937" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100
        ring-1 ring-purple-300 hover:ring-purple-400 transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-white border border-gray-200 rounded-md shadow-sm z-10">
          {/* Close button */}
          <div className="flex justify-end mb-3">
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 transition"
            >
              <X size={16} />
            </button>
          </div>

          {/* Colors grid */}
          <div className="grid grid-cols-4 gap-4">
            {colors.map((color) => (
              <div
                key={color.value}
                className="relative flex flex-col items-center cursor-pointer group"
                onClick={() => onChange(color.value)} // only change, do not close
              >
                <div
                  className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors"
                  style={{ backgroundColor: color.value }}
                />

                {/* Check icon if selected */}
                {selectedColor === color.value && (
                  <div className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                <p className="text-xs text-center mt-1 text-gray-600">
                  {color.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
