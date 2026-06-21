import React from "react";
import html2pdf from "html2pdf.js";

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

  return (
    <div>

      {/* ✅ IMPORTANT: THIS ID MUST EXIST */}
      <div
        id="resume-area"
        style={{
          width: "210mm",
          background: "white",
          padding: "10mm",
          boxSizing: "border-box",
        }}
      >

        {/* HEADER */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "10px" }}>
          <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
            {data?.personal_info?.full_name || "Your Name"}
          </h1>

          <span style={{ color: accentColor }}>
            {data?.personal_info?.profession || "Your Profession"}
          </span>
        </div>

        {/* SUMMARY */}
        <div>
          <p style={{ fontSize: "12px", color: "#333" }}>
            {data?.professional_summary || "No summary available"}
          </p>
        </div>

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