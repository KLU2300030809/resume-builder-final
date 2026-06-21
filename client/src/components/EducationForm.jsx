import React, { useState } from "react";
import { GraduationCap, Plus, Trash2, Sparkles } from "lucide-react";

const generateATSEducation = (degree, field, institution) => {
  return `• ${degree || "Degree"} in ${field || "Relevant Field"}
• Studied core subjects relevant to industry standards
• Completed academic projects and coursework aligned with professional skills
• Institution: ${institution || "Recognized Institution"}`;
};

const EducationForm = ({ data, onChange }) => {
  const [aiLoadingIndex, setAiLoadingIndex] = useState(null);

  const addEducation = () => {
    onChange([
      ...data,
      {
        institution: "",
        degree: "",
        field: "",
        graduation_date: "",
        gpa: "",
        highlights: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const enhanceAI = (index) => {
    setAiLoadingIndex(index);

    setTimeout(() => {
      const edu = data[index];
      updateEducation(
        index,
        "highlights",
        generateATSEducation(
          edu.degree,
          edu.field,
          edu.institution
        )
      );
      setAiLoadingIndex(null);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Education
          </h3>
          <p className="text-sm text-gray-500">
            Add your academic qualifications
          </p>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-2 text-sm
          bg-purple-100 text-purple-700 rounded-lg
          hover:bg-purple-200 transition"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-xl">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-600 font-medium">
            No education added yet
          </p>
          <p className="text-sm text-gray-400">
            Click “Add Education” to begin
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-5 rounded-xl border border-gray-200
              bg-white shadow-sm space-y-4"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">
                  Education #{index + 1}
                </h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={education.institution}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  placeholder="Institution Name"
                  className="input-style"
                />

                <input
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  placeholder="Degree (Bachelor's, Master's)"
                  className="input-style"
                />

                <input
                  value={education.field}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  placeholder="Field of Study"
                  className="input-style"
                />

                <input
                  type="month"
                  value={education.graduation_date}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "graduation_date",
                      e.target.value
                    )
                  }
                  className="input-style"
                />

                <input
                  value={education.gpa}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                  placeholder="GPA (optional)"
                  className="input-style md:col-span-2"
                />
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Academic Highlights (Optional)
                  </label>
                  <button
                    onClick={() => enhanceAI(index)}
                    className="flex items-center gap-1 px-2 py-1 text-xs
                    bg-purple-100 text-purple-700 rounded
                    hover:bg-purple-200 transition"
                  >
                    <Sparkles className="w-3 h-3" />
                    {aiLoadingIndex === index
                      ? "Enhancing..."
                      : "AI Enhance"}
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={education.highlights || ""}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "highlights",
                      e.target.value
                    )
                  }
                  placeholder="Key coursework, achievements, or honors"
                  className="w-full text-sm px-3 py-2 rounded-lg
                  border border-gray-300 resize-none
                  focus:ring-2 focus:ring-purple-500/30
                  focus:border-purple-500 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
