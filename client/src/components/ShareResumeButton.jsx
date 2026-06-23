import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import api from "../configs/api";

function ShareResumeButton({ resumeId }) {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLink = async () => {
    try {
      console.log("Share clicked");
      console.log("Resume ID:", resumeId);

      const { data } = await api.post(
        `/share/generate/${resumeId}`
      );

      console.log("Response:", data);

      setLink(data.shareLink);
    } catch (err) {
      console.error("Share Error:", err.response?.data || err.message);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-2">

      <button
        onClick={generateLink}
      className="
flex items-center gap-2 px-4 py-2 text-xs font-medium
bg-gradient-to-r from-violet-600 to-indigo-600
text-white rounded-lg
shadow-md shadow-violet-500/20
hover:shadow-violet-500/40 hover:scale-105
transition-all duration-200
"
      >
        <Share2 size={16} />
        Share Resume
      </button>

      {link && (
        <>
          <input
            value={link}
            readOnly
            className="
              w-80
              px-3 py-2
              border
              rounded-lg
              text-sm
            "
          />

          <button
            onClick={copyLink}
            className="
              p-2
              rounded-lg
              bg-green-100
              text-green-700
              hover:bg-green-200
            "
          >
            {copied ? (
              <Check size={16} />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </>
      )}
    </div>
  );
}

export default ShareResumeButton;