export default function Minimal({ resume }) {
  return (
    <div className="min-h-screen bg-white text-black p-10 max-w-4xl mx-auto">

      <header className="border-b pb-6">
        <h1 className="text-4xl font-bold">
          {resume.personalInfo.name}
        </h1>
        <p className="text-gray-600">
          {resume.personalInfo.title}
        </p>
      </header>

      <section className="mt-6">
        <h2 className="font-semibold text-xl">Summary</h2>
        <p className="text-gray-700 mt-2">{resume.summary}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold text-xl">Skills</h2>
        <p className="mt-2 text-gray-700">
          {resume.skills.join(" • ")}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold text-xl">Experience</h2>

        {resume.experience?.map((e, i) => (
          <div key={i} className="mt-4">
            <h3 className="font-medium">{e.role}</h3>
            <p className="text-gray-600">{e.company}</p>
            <p className="text-sm text-gray-500">{e.duration}</p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="font-semibold text-xl">Education</h2>

        {resume.education?.map((ed, i) => (
          <div key={i} className="mt-2">
            <p>
              {ed.degree} - {ed.institution}
            </p>
          </div>
        ))}
      </section>

    </div>
  );
}