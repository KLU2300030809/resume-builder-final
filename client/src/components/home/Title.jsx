import React from "react";

const Title = ({ title, description }) => {
  return (
    <div className="text-center mt-10 text-slate-700 px-4">
      
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>

      <p className="max-w-2xl mx-auto mt-4 text-sm sm:text-base text-slate-500 leading-relaxed">
        {description}
      </p>

    </div>
  );
};

export default Title;