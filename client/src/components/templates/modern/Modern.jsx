export default function Modern({ resume }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-20">
        <h1 className="text-5xl font-bold">
          {resume.personalInfo.name}
        </h1>

        <p className="mt-2 text-xl">
          {resume.personalInfo.title}
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a
            href={`mailto:${resume.personalInfo.email}`}
            className="px-4 py-2 bg-white text-black rounded-lg"
          >
            Contact
          </a>

          <a
            href={resume.personalInfo.github}
            className="px-4 py-2 border border-white rounded-lg"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-4xl mx-auto p-10">
        <h2 className="text-2xl font-bold">About</h2>
        <p className="mt-3 text-gray-600">{resume.summary}</p>
      </section>

      {/* SKILLS */}
      <section className="bg-gray-100 p-10">
        <h2 className="text-2xl font-bold text-center">Skills</h2>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {resume.skills.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-600 text-white rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="p-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {resume.projects.map((p, i) => (
            <div
              key={i}
              className="border rounded-xl p-5 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-gray-600 mt-2">{p.description}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {p.technologies?.map((t, j) => (
                  <span
                    key={j}
                    className="text-sm bg-gray-200 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-4">
                <a href={p.github} className="text-blue-600">
                  GitHub
                </a>
                <a href={p.liveLink} className="text-green-600">
                  Live
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center p-6">
        © {new Date().getFullYear()} {resume.personalInfo.name}
      </footer>
    </div>
  );
}