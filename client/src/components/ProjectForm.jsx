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
          <h3 className="text-lg font-semibold text-gray-900">
            Projects
          </h3>
          <p className="text-sm text-gray-500">
            Showcase academic or personal projects
          </p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-2 text-sm
          bg-purple-100 text-purple-700 rounded-lg
          hover:bg-purple-200 transition"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-xl">
          <FolderIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-600 font-medium">
            No projects added yet
          </p>
          <p className="text-sm text-gray-400">
            Click “Add Project” to get started
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-5 rounded-xl border border-gray-200
              bg-white shadow-sm space-y-4"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">
                  Project #{index + 1}
                </h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
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

export default ProjectForm;
