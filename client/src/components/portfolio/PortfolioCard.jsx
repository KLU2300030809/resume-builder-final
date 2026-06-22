import React from "react";
import { Globe, Calendar, Palette } from "lucide-react";

const PortfolioCard = ({ resume, portfolioUrl, template, published }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-2xl shadow-lg space-y-3">

      <h2 className="text-lg font-bold">Portfolio Status</h2>

      <div className="flex items-center gap-2 text-sm">
        <Globe size={14} /> 
        {published ? "Published" : "Not Published"}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Palette size={14} /> Template: {template}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Calendar size={14} />
        Last Update: {resume?.updatedAt?.slice(0, 10)}
      </div>

      {portfolioUrl && (
        <div className="text-xs text-gray-400 break-all">
          {portfolioUrl}
        </div>
      )}
    </div>
  );
};

export default PortfolioCard;