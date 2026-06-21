import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";

const ResumePreview = ({
  data,
  template,
  accentColor,
  isPdfMode = false,
}) => {

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;

      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;

      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;

      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full flex justify-center bg-gray-100 print:bg-white">

      {/* 🔥 PDF SAFE CONTAINER */}
      <div
        id="resume-preview"
        className={`
          bg-white
          w-[210mm]
          min-h-[297mm]
          shadow-lg
          print:shadow-none
          print:border-none
          ${isPdfMode ? "shadow-none" : ""}
        `}
        style={{
          padding: isPdfMode ? "0" : "0",
        }}
      >
        {renderTemplate()}
      </div>

      {/* PRINT / PDF STYLES */}
      <style>
        {`
          @page {
            size: A4;
            margin: 0;
          }

          @media print {
            html, body {
              background: white !important;
              margin: 0;
              padding: 0;
            }

            #resume-preview {
              width: 100%;
              min-height: 100%;
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}
      </style>

    </div>
  );
};

export default ResumePreview;