export default function Dark({ resume }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <section className="text-center py-24 bg-black">
        <h1 className="text-5xl font-bold">
          {resume.personalInfo.name}
        </h1>
        <p className="text-gray-400 mt-3">
          {resume.personalInfo.title}
        </p>
      </section>

      <section className="max-w-4xl mx-auto p-10">
        <h2 className="text-xl font-bold">About</h2>
        <p className="text-gray-400 mt-3">{resume.summary}</p>
      </section>

      <section className="p-10 bg-gray-900">
        <h2 className="text-xl font-bold text-center">Skills</h2>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {resume.skills.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-800 rounded-full text-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="p-10">
        <h2 className="text-xl font-bold">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {resume.projects?.map((p, i) => (
            <div
              key={i}
              className="bg-gray-900 p-5 rounded-xl border border-gray-800"
            >
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-gray-400 mt-2">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}