import React from "react";
import { Sparkles } from "lucide-react";

const Loader = () => {
  return (
    <div className="min-h-screen bg-[#0b0b12] flex items-center justify-center">
      <div className="flex flex-col items-center">

        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-violet-600/20 blur-xl animate-pulse" />

          <div className="relative size-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center">
            <Sparkles className="size-8 text-violet-400 animate-pulse" />
          </div>
        </div>

        <div className="mt-6 size-10 border-[3px] border-white/10 border-t-violet-500 rounded-full animate-spin" />

        <h2 className="mt-6 text-white font-semibold text-lg">
          Resume2Portfolio
        </h2>

        <p className="mt-2 text-white/50 text-sm">
          Loading your workspace...
        </p>
      </div>
    </div>
  );
};

export default Loader;