import React, { useState } from "react";
import { Plus, Trash2, FolderIcon, Sparkles } from "lucide-react";

const generateATSProject = (name, type) => {
  return `• Designed and developed ${name || "a project"} ${
    type ? `(${type})` : ""
  } using modern technologies
• Implemented core features with focus on performance and usability
• Applied best practices in coding, testing, and version control
• Solved real-world problems through structured development approach`;
};

const ProjectForm = ({ data, onChange }) => {
  const [aiLoadingIndex, setAiLoadingIndex] = useState(null);

  const addProject = () => {
    onChange([
      ...data,
      {
        name: "",
        type: "",
        description: "",
      },
    ]);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const enhanceAI = (index) => {
    setAiLoadingIndex(index);

    setTimeout(() => {
      const project = data[index];
      updateProject(
        index,
        "description",
        generateATSProject(project.name, project.type)
      );
      setAiLoadingIndex(null);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Projects
          </h3>
          <p className="text-sm text-white/60">
            Showcase academic or personal projects
          </p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-2 text-sm
  bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="text-center py-12 border border-white/10 rounded-xl bg-white/5">
          <FolderIcon className="w-12 h-12 mx-auto mb-3 text-white/30" />
          <p className="text-white/70 font-medium">
            No projects added yet
          </p>
          <p className="text-sm text-white/40">
            Click “Add Project” to get started
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-5 rounded-xl border border-white/10
bg-white/5 backdrop-blur-md space-y-4"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-white/90">
                  Project #{index + 1}
                </h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={project.name}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  placeholder="Project Name"
                  className="input-style"
                />

                <input
                  value={project.type}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  placeholder="Project Type (Web App, ML, Mobile)"
                  className="input-style"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Project Description
                  </label>
                  <button
                    onClick={() => enhanceAI(index)}
                    className="flex items-center gap-1 px-2 py-1 text-xs
                    bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 transition"
                  >
                    <Sparkles className="w-3 h-3" />
                    {aiLoadingIndex === index
                      ? "Enhancing..."
                      : "AI Enhance"}
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={project.description}
                  onChange={(e) =>
                    updateProject(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Describe features, tech stack, and outcome"
                 className="w-full text-sm px-3 py-2 rounded-lg
bg-white/5 border border-white/10 text-white resize-none
focus:ring-2 focus:ring-violet-500/30
focus:border-violet-500 outline-none"                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
