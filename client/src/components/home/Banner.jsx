import React from "react";

const Banner = () => {
  return (
    <div className="w-full bg-[#0b0b12] border-b border-white/5">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between text-xs text-white/50">

        {/* Left - system info */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>All systems operational</span>
        </div>

        {/* Center - product behavior */}
        <div className="hidden md:block text-white/30">
          Resume → Portfolio generation enabled
        </div>

        {/* Right - product identity */}
        <div className="text-white/20">
          Resume2Portfolio
        </div>

      </div>
    </div>
  );
};

export default Banner;