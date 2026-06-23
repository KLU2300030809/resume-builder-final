import React from "react";
import { Award, Plus, Trash2 } from "lucide-react";

export default function Certification({
  certifications = [],
  setCertifications,
}) {
  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        id: Date.now(),
        name: "",
        issuer: "",
        year: "",
      },
    ]);
  };

  const updateCertification = (index, field, value) => {
    const updated = [...certifications];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setCertifications(updated);
  };

  const removeCertification = (index) => {
    setCertifications(
      certifications.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Award className="w-5 h-5 text-violet-400" />
            Certifications
          </h3>

          <p className="text-sm text-gray-500">
            Add professional certifications
          </p>
        </div>

        <button
          onClick={addCertification}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
        >
          <Plus size={16} />
          Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-10 border border-white/10 rounded-xl bg-white/5 text-white/50">
          No certifications added
        </div>
      ) : (
        certifications.map((cert, index) => (
          <div
            key={cert.id || index}
            className="border border-white/10 rounded-xl p-4 space-y-3 bg-white/5 backdrop-blur-md text-white"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-white/90">
                Certification #{index + 1}
              </h4>

              <button
                onClick={() => removeCertification(index)}
                className="text-red-400 hover:bg-red-500/10 rounded p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <input
              type="text"
              value={cert.name}
              placeholder="Certification Name"
              onChange={(e) =>
                updateCertification(index, "name", e.target.value)
              }
              className="w-full w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white
focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 outline-none"
            />

            <input
              type="text"
              value={cert.issuer}
              placeholder="Issuer"
              onChange={(e) =>
                updateCertification(index, "issuer", e.target.value)
              }
              className="w-full border rounded p-2"
            />

            <input
              type="text"
              value={cert.year}
              placeholder="Year"
              onChange={(e) =>
                updateCertification(index, "year", e.target.value)
              }
              className="w-full border rounded p-2"
            />
          </div>
        ))
      )}
    </div>
  );
}