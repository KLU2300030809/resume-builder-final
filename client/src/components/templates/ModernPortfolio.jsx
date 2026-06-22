export default function ModernPortfolio({ resume }) {
  return (
    <div>
      <section>
        <h1>{resume.name}</h1>
        <p>{resume.summary}</p>
      </section>

      <section>
        <h2>Skills</h2>
        <ul>
          {resume.skills.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Projects</h2>
        {resume.projects.map((p, i) => (
          <div key={i}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}