import React, { useEffect, useState } from "react";

const features = [
  "AI Resume Scoring",
  "ATS Compatibility Check",
  "Smart Keyword Optimization",
  "Role-Based Resume Tailoring",
];

const Banner = () => {
  const [text, setText] = useState("");
  const [featureIndex, setFeatureIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = features[featureIndex];

    if (charIndex < current.length) {
      const timeout = setTimeout(() => {
        setText(current.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 70);

      return () => clearTimeout(timeout);
    }

    const hold = setTimeout(() => {
      setCharIndex(0);
      setText("");
      setFeatureIndex((prev) => (prev + 1) % features.length);
    }, 1600);

    return () => clearTimeout(hold);
  }, [charIndex, featureIndex]);

  return (
    <div className="w-full px-4 md:px-14 py-2.5 bg-gradient-to-r from-violet-600 to-purple-500 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">

        {/* Tagline */}
        <p className="font-medium text-xs md:text-sm text-center md:text-left">
          Build smart resumes faster with AI assistance
        </p>

        {/* Feature Indicator */}
        <div className="flex items-center gap-2 text-xs bg-white/15 px-3 py-1 rounded-full backdrop-blur">

          {/* AI status dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
          </span>

          <span className="font-medium tracking-wide">
            {text || features[featureIndex]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
