import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Yasaswi",
    role: "Student",
    comment:
      "Very smooth experience. I built my resume and generated a portfolio in minutes.",
    rating: 5,
  },
  {
    name: "Srinivasa Rao",
    role: "Frontend Developer",
    comment:
      "Clean UI and fast workflow. Resume to portfolio feature works perfectly.",
    rating: 5,
  },
  {
    name: "Padmini",
    role: "Student",
    comment:
      "Simple and effective tool for creating professional resumes quickly.",
    rating: 4,
  },
  {
    name: "Sai Charan",
    role: "Frontend Developer",
    comment:
      "Best way to showcase projects. Sharing portfolio links is super easy.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#0b0b12] text-white">

      {/* Header */}
      <div className="text-center px-4 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold">
          What users say
        </h2>
        <p className="text-white/50 text-sm mt-3">
          Feedback from students and professionals using the platform.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-12 max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-4">

        {testimonials.map((testi, i) => (
          <div
            key={i}
            className="border border-white/5 bg-white/5 rounded-xl p-6 hover:bg-white/10 transition"
          >

            {/* Stars */}
            <div className="flex mb-3">
              {Array(testi.rating).fill(0).map((_, idx) => (
                <Star key={idx} size={14} className="text-yellow-400 mr-1" />
              ))}
            </div>

            {/* Comment */}
            <p className="text-sm text-white/60 mb-4">
              "{testi.comment}"
            </p>

            {/* Name */}
            <h4 className="font-medium text-white/90">{testi.name}</h4>
            <span className="text-xs text-white/40">{testi.role}</span>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;