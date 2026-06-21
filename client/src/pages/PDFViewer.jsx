import React from "react";
import { useParams } from "react-router-dom";

const PDFViewer = ({ resumes }) => {
  const { resumeId } = useParams();
  const resume = resumes.find((r) => r.id === parseInt(resumeId));

  if (!resume || !resume.file) return <p className="p-10">No PDF found</p>;

  return (
    <iframe
      src={URL.createObjectURL(resume.file)}
      title={resume.title}
      className="w-full h-screen"
    />
  );
};

export default PDFViewer;
