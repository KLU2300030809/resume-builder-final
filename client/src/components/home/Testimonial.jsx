import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Software Engineer",
    comment: "The AI resume builder saved me hours! My resume looks professional and ATS-ready.",
    rating: 5,
  },
  {
    name: "Mark Stevens",
    role: "Product Manager",
    comment: "Super easy to use. The suggestions helped me highlight my achievements effectively.",
    rating: 5,
  },
  {
    name: "Sophia Lee",
    role: "UX Designer",
    comment: "I love the clean design and instant results. Highly recommend for job seekers!",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-20 bg-white">
      <div className="text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">What Our Users Say</h2>
        <p className="text-sm md:text-base text-slate-500 mt-2 max-w-xl mx-auto">
          Real feedback from professionals who built their resumes with ease.
        </p>
      </div>

      <div className="mt-12 max-w-6xl mx-auto grid gap-8 md:grid-cols-3 px-4">
        {testimonials.map((testi, i) => (
          <div
            key={i}
            className="group rounded-3xl p-8 bg-gradient-to-br from-purple-400 to-indigo-500 shadow-lg text-white transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center mb-4">
              {Array(testi.rating)
                .fill(0)
                .map((_, idx) => (
                  <Star key={idx} size={18} className="text-yellow-400 mr-1" />
                ))}
            </div>
            <p className="text-sm mb-4 opacity-90">{testi.comment}</p>
            <h4 className="font-semibold">{testi.name}</h4>
            <span className="text-xs opacity-80">{testi.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
