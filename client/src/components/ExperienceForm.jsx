import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";

const generateATSDescription = (role, company) => {
  return `• Worked as ${role || "a professional"} at ${company || "the organization"}, contributing to core business objectives
• Developed and maintained key features to improve performance and reliability
• Collaborated with cross-functional teams to deliver scalable solutions
• Identified and resolved issues, enhancing overall system efficiency
• Followed best practices, documentation standards, and agile workflows`;
};

const ExperienceForm = ({ data, onChange }) => {
  const [aiLoadingIndex, setAiLoadingIndex] = useState(null);

  const addExperience = () => {
    onChange([
      ...data,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
        is_current: false,
      },
    ]);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const enhanceAI = (index) => {
    setAiLoadingIndex(index);

    setTimeout(() => {
      const exp = data[index];
      const enhanced = generateATSDescription(
        exp.position,
        exp.company
      );

      updateExperience(index, "description", enhanced);
      setAiLoadingIndex(null);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Professional Experience
          </h3>
          <p className="text-sm text-white/60">
            Add your work experience in reverse chronological order
          </p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-2 text-sm
   bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>


      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-12 border border-white/10 rounded-xl bg-white/5">
          <Briefcase className="w-12 h-12 mx-auto text-white/30 mb-3" />
          <p className="text-white/70 font-medium">
            No experience added yet
          </p>
          <p className="text-sm text-white/40">
            Click “Add Experience” to begin
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-5 rounded-xl border border-white/10
bg-white/5 backdrop-blur-md space-y-4"
            >

              {/* Card Header */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-white/90">
                  Experience #{index + 1}
                </h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  placeholder="Company Name"
                  className="input-style"
                />

                <input
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  placeholder="Job Title"
                  className="input-style"
                />

                <input
                  type="month"
                  value={experience.start_date}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="input-style"
                />

                <input
                  type="month"
                  value={experience.end_date}
                  disabled={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  className="input-style disabled:bg-white/5 disabled:text-white/40"
                />
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={experience.is_current}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "is_current",
                      e.target.checked
                    )
                  }
                />
                Currently working here
              </label>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-white/70 font-medium text-white/70">
                    Job Description
                  </label>
                  <button
                    onClick={() => enhanceAI(index)}
                    className="flex items-center gap-1 px-2 py-1 text-xs
                bg-white/5 text-white/70 border border-white/10 hover:bg-white/10   transition"
                  >
                    <Sparkles className="w-3 h-3" />
                    {aiLoadingIndex === index
                      ? "Enhancing..."
                      : "Enhance with AI"}
                  </button>
                </div>

                <textarea
                  rows={5}
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Describe responsibilities and achievements"
className="w-full text-sm px-3 py-2 rounded-lg
bg-white/5 border border-white/10 text-white resize-none
focus:ring-2 focus:ring-violet-500/30
focus:border-violet-500 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
