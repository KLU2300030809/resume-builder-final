import React from "react";
import html2pdf from "html2pdf.js";
import ResumePreview from "../components/ResumePreview";
const Preview = ({ data, accentColor }) => {

  const handleDownload = async () => {
    const element = document.getElementById("resume-area");

    if (!element) {
      console.error("resume-area not found");
      return;
    }

    const html2pdfLib = (await import("html2pdf.js")).default;

    const opt = {
      margin: 0,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdfLib().set(opt).from(element).save();
  };
console.log("PREVIEW TEMPLATE:", template);
console.log("PREVIEW COLOR:", accentColor);
console.log("PREVIEW DATA:", data);
  return (
    <div>

      {/* ✅ IMPORTANT: THIS ID MUST EXIST */}
    <div id="resume-area">
  <ResumePreview
    data={data}
    template={template}
    accentColor={accentColor}
    isPdfMode={true}
  />
</div>

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={handleDownload}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          background: "#2563eb",
          color: "white",
          borderRadius: "6px",
        }}
      >
        Download PDF
      </button>

    </div>
  );
};

export default Preview;