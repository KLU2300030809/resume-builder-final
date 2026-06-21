import { useState } from "react";
import skillsDictionary from "../data/skillsDictionary.json";
import { Plus, Trash2, FolderIcon, Sparkles } from "lucide-react";
export default function SkillsForm({
  skills = [],
  setSkills,
  projects = [],
  experience = []
}) {
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const enhanceSkills = () => {
    setLoading(true);

    try {
      const combinedText = `
        ${(skills || []).join(" ")}

        ${(projects || [])
          .map(
            (project) =>
              `${project?.title || ""} ${
                project?.description || ""
              }`
          )
          .join(" ")}

        ${(experience || [])
          .map(
            (exp) =>
              `${exp?.company || ""} ${
                exp?.role || ""
              } ${exp?.description || ""}`
          )
          .join(" ")}
      `.toLowerCase();

      const detectedSkills = new Set();

      Object.entries(skillsDictionary).forEach(
        ([keyword, skill]) => {
          if (combinedText.includes(keyword.toLowerCase())) {
            detectedSkills.add(skill);
          }
        }
      );

      const mergedSkills = [
        ...new Set([
          ...(skills || []),
          ...Array.from(detectedSkills)
        ])
      ].sort();

      if (setSkills) {
        setSkills(mergedSkills);
      }
    } catch (error) {
      console.error("Skill enhancement error:", error);
    }

    setLoading(false);
  };

  const addSkill = () => {
    const skill = newSkill.trim();

    if (!skill) return;

    const updatedSkills = [
      ...new Set([...(skills || []), skill])
    ];

    if (setSkills) {
      setSkills(updatedSkills);
    }

    setNewSkill("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = (skills || []).filter(
      (skill) => skill !== skillToRemove
    );

    if (setSkills) {
      setSkills(updatedSkills);
    }
  };

  return (
    <div className="space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Skills
        </h2>

      <button
  type="button"
  disabled={loading}
  onClick={enhanceSkills}
  className="flex items-center gap-2 text-sm font-medium
  px-3 py-1.5 rounded-full
  bg-purple-50 text-purple-600
  hover:bg-purple-100 transition
  disabled:opacity-50"
>
  {loading ? (
    <Loader2 className="size-4 animate-spin" />
  ) : (
    <Sparkles className="size-4" />
  )}

  {loading ? "Analyzing..." : "AI Enhance"}
</button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) =>
            setNewSkill(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Add a skill..."
          className="flex-1 border rounded p-2"
        />

         <button
          onClick={addSkill}
          className="flex items-center gap-2 px-3 py-2 text-sm
          bg-purple-100 text-purple-700 rounded-lg
          hover:bg-purple-200 transition"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {(skills || []).length === 0 ? (
          <p className="text-gray-500">
            No skills added yet.
          </p>
        ) : (
          (skills || []).map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full"
            >
              <span>{skill}</span>

              <button
                type="button"
                onClick={() =>
                  removeSkill(skill)
                }
                className="font-bold text-red-500"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}