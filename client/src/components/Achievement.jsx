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
            <Trophy className="w-5 h-5 text-yellow-600" />
            Achievements
          </h3>

          <p className="text-sm text-gray-500">
            Add awards and achievements
          </p>
        </div>

        <button
          onClick={addAchievement}
          className="flex items-center gap-2 px-3 py-2 text-sm
          bg-yellow-100 text-yellow-700 rounded-lg
          hover:bg-yellow-200"
        >
          <Plus size={16} />
          Add Achievement
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="text-center py-10 border rounded-xl">
          No achievements added
        </div>
      ) : (
        achievements.map((item, index) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 bg-white"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">
                Achievement #{index + 1}
              </h4>

              <button
                onClick={() =>
                  removeAchievement(index)
                }
                className="text-red-500"
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
              className="w-full border rounded p-2"
            />
          </div>
        ))
      )}
    </div>
  );
}