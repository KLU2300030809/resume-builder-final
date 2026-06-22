import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ShareResume() {
  const { shareId } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
     const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/share/${shareId}`
);
      setResume(res.data);
    };

    fetchResume();
  }, [shareId]);

  if (!resume) return <p>Loading...</p>;

  const info = resume.personal_info;

  return (
    <div style={styles.bg}>
      <div style={styles.page}>

        {/* HEADER */}
        <h1 style={styles.name}>{info.full_name}</h1>
        <p style={styles.sub}>{info.profession}</p>

        <p style={styles.contact}>
          {info.email} | {info.phone} | {info.location}
        </p>

        <div style={styles.line} />

        {/* SUMMARY */}
        <section style={styles.section}>
          <h2>Summary</h2>
          <p>{resume.professional_summary}</p>
        </section>

        {/* SKILLS */}
        <section style={styles.section}>
          <h2>Skills</h2>
          <p>{resume.skills.join(", ")}</p>
        </section>

        {/* EXPERIENCE */}
        <section style={styles.section}>
          <h2>Experience</h2>
          {resume.experience.map((exp) => (
            <div key={exp._id} style={styles.item}>
              <b>{exp.position}</b> @ {exp.company}
              <div>
                {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
              </div>
            </div>
          ))}
        </section>

        {/* EDUCATION */}
        <section style={styles.section}>
          <h2>Education</h2>
          {resume.education.map((edu) => (
            <div key={edu._id} style={styles.item}>
              <b>{edu.degree}</b> - {edu.field}
              <div>{edu.institution}</div>
              <div>{edu.graduation_date || "Ongoing"}</div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}

const styles = {
  bg: {
    background: "#f3f4f6",
    minHeight: "100vh",
    padding: "40px 10px",
  },
  page: {
    maxWidth: "800px",
    margin: "auto",
    background: "#fff",
    padding: "40px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  name: {
    fontSize: "28px",
    marginBottom: "5px",
  },
  sub: {
    color: "#555",
    marginTop: 0,
  },
  contact: {
    marginBottom: "10px",
  },
  line: {
    borderTop: "1px solid #ddd",
    margin: "20px 0",
  },
  section: {
    marginBottom: "25px",
  },
  item: {
    marginBottom: "12px",
  },
};

export default ShareResume;