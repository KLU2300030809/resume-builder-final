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
            <Award className="w-5 h-5 text-purple-600" />
            Certifications
          </h3>

          <p className="text-sm text-gray-500">
            Add professional certifications
          </p>
        </div>

        <button
          onClick={addCertification}
          className="flex items-center gap-2 px-3 py-2 text-sm
          bg-purple-100 text-purple-700 rounded-lg
          hover:bg-purple-200"
        >
          <Plus size={16} />
          Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-10 border rounded-xl">
          No certifications added
        </div>
      ) : (
        certifications.map((cert, index) => (
          <div
            key={cert.id}
            className="border rounded-xl p-4 space-y-3 bg-white"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium">
                Certification #{index + 1}
              </h4>

              <button
                onClick={() =>
                  removeCertification(index)
                }
                className="text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <input
              type="text"
              value={cert.name}
              placeholder="Certification Name"
              onChange={(e) =>
                updateCertification(
                  index,
                  "name",
                  e.target.value
                )
              }
              className="w-full border rounded p-2"
            />

            <input
              type="text"
              value={cert.issuer}
              placeholder="Issuer"
              onChange={(e) =>
                updateCertification(
                  index,
                  "issuer",
                  e.target.value
                )
              }
              className="w-full border rounded p-2"
            />

            <input
              type="text"
              value={cert.year}
              placeholder="Year"
              onChange={(e) =>
                updateCertification(
                  index,
                  "year",
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