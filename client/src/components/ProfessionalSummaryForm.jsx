import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  console.log("SUMMARY DATA:", data);

  const { token } = useSelector((state) => state.auth);
  
 
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Write a brief summary highlighting your skills, experience, and
            goals.
          </p>
        </div>

 
      </div>

      {/* Textarea */}
      <textarea
        value={data || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={7}
        placeholder="Write a short professional summary..."
        className="w-full p-4 text-sm rounded-xl
        border border-gray-200
        focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20
        outline-none resize-none transition-all"
      />

      {/* Tip */}
      <p className="text-xs text-gray-500 text-center max-w-lg mx-auto">
        Tip: Keep it concise (3–4 sentences). Highlight impact, skills, and
        role.
      </p>
    </div>
  );
};

export default ProfessionalSummaryForm;
