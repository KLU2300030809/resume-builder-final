export default function Creative({ resume }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 text-white">

      <section className="text-center py-28">
        <h1 className="text-6xl font-extrabold">
          {resume.personalInfo.name}
        </h1>
        <p className="text-xl mt-3">
          {resume.personalInfo.title}
        </p>
      </section>

      <div className="max-w-3xl mx-auto bg-white text-black p-8 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold">About Me</h2>
        <p className="mt-3">{resume.summary}</p>
      </div>

      <section className="mt-10 text-center">
        <h2 className="text-2xl font-bold">Skills</h2>

        <div className="flex flex-wrap justify-center gap-3 mt-5">
          {resume.skills.map((s, i) => (
            <span
              key={i}
              className="bg-white text-black px-3 py-1 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}