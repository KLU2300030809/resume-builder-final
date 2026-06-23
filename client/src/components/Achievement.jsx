import React from "react";
import { Trophy, Plus, Trash2 } from "lucide-react";

export default function Achievement({
  achievements = [],
  setAchievements,
}) {
  const addAchievement = () => {
      console.log("clicked");
    setAchievements([
      ...achievements,
      {
        id: Date.now(),
        text: "",
      },
    ]);
  };

  const updateAchievement = (index, value) => {
    const updated = [...achievements];

    updated[index] = {
      ...updated[index],
      text: value,
    };

    setAchievements(updated);
  };

  const removeAchievement = (index) => {
    setAchievements(
      achievements.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Achievements
          </h3>

          <p className="text-sm text-gray-500">
            Add awards and achievements
          </p>
        </div>

        <button
          onClick={addAchievement}
          className="flex items-center gap-2 px-3 py-2 text-sm
bg-gradient-to-r from-violet-600 to-indigo-600 text-white
          hover:bg-yellow-200"
        >
          <Plus size={16} />
          Add Achievement
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="text-center py-10 border border-white/10 rounded-xl bg-white/5 text-white/50">
          No achievements added
        </div>
      ) : (
        achievements.map((item, index) => (
          <div
            key={item.id}
            className="border border-white/10 rounded-xl p-4 bg-white/5 backdrop-blur-md text-white"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-white/90">
                Achievement #{index + 1}
              </h4>

              <button
                onClick={() =>
                  removeAchievement(index)
                }
                className="text-red-400 hover:bg-red-500/10 rounded p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <textarea
              rows={3}
              value={item.text}
              placeholder="Describe your achievement..."
              onChange={(e) =>
                updateAchievement(
                  index,
                  e.target.value
                )
              }
              className="w-full bg-white/5 border border-white/10 rounded p-2 text-white
focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 outline-none"
            />
          </div>
        ))
      )}
    </div>
  );
}