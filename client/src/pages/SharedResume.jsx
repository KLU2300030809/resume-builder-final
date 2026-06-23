import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Share2 } from "lucide-react";
import ResumePreview from "../components/ResumePreview";
function ShareResume() {
  console.log("ShareResume loaded");
  const { shareId } = useParams();
  const [resume, setResume] = useState(null);

useEffect(() => {

  const fetchResume = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/share/${shareId}`
    );

    console.log("API URL:", import.meta.env.VITE_API_URL);
console.log("FULL RESPONSE:", res.data);
console.log("TEMPLATE:", res.data.template);
console.log("ACCENT:", res.data.accent_color);
    setResume(res.data);
  };

  fetchResume();
}, [shareId]);
if (!resume) return <p>Loading...</p>;
console.log("TEMPLATE:", resume.template);
console.log("COLOR:", resume.accentColor);
console.log("RESUME:", resume);
return (
  <div className="min-h-screen bg-[#0b0b12] py-10">
    <div className="flex justify-end max-w-6xl mx-auto mb-4 px-4">
      <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Link copied!");
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg
        bg-violet-600 hover:bg-violet-700 text-white"
      >
        <Share2 className="size-4" />
        Share
      </button>
    </div>

    <ResumePreview
  data={resume}
  template={resume.template}
  accentColor={resume.accent_color}
/>
  </div>
);
}
export default ShareResume;