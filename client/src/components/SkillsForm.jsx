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
        <h2 className="text-xl font-semibold text-white">
          Skills
        </h2>

      <button
  type="button"
  disabled={loading}
  onClick={enhanceSkills}
  className="flex items-center gap-2 text-sm font-medium
  px-3 py-1.5 rounded-full
bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 transition
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
          className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 text-white
placeholder:text-white/40
focus:ring-2 focus:ring-violet-500/30
focus:border-violet-500 outline-none"
        />

         <button
          onClick={addSkill}
          className="flex items-center gap-2 px-3 py-2 text-sm
        bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {(skills || []).length === 0 ? (
          <p className="text-white/50">
            No skills added yet.
          </p>
        ) : (
          (skills || []).map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-violet-200"
            >
              <span>{skill}</span>

              <button
                type="button"
                onClick={() =>
                  removeSkill(skill)
                }
                className="font-bold text-red-400 hover:text-red-300"
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