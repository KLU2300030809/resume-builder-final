import React from "react";

const ClassicTemplate = ({ data, accentColor = "#000000" }) => {
  const personal = data?.personal_info || {};

  const styles = {
    page: {
      width: "100%",
      minHeight: "297mm",
      padding: "32px",
      boxSizing: "border-box",
      fontFamily: "Arial, Helvetica, sans-serif",
      color: "#111827",
      backgroundColor: "#ffffff",
      lineHeight: 1.5,
      fontSize: "12px",
    },

    header: {
      textAlign: "center",
      paddingBottom: "16px",
      borderBottom: "2px solid #e5e7eb",
      marginBottom: "20px",
    },

    name: {
      fontSize: "30px",
      fontWeight: "700",
      color: "#111827",
      marginBottom: "6px",
      letterSpacing: "0.5px",
    },

    profession: {
      fontSize: "16px",
      color: "#4b5563",
      marginBottom: "8px",
    },

    contactRow: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "12px",
      fontSize: "12px",
      color: "#4b5563",
    },

    section: {
      marginBottom: "20px",
    },

    sectionTitle: {
      fontSize: "15px",
      fontWeight: "700",
      color: accentColor,
      borderBottom: `2px solid ${accentColor}`,
      paddingBottom: "4px",
      marginBottom: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },

    summary: {
      fontSize: "12px",
      color: "#374151",
      textAlign: "justify",
    },

    item: {
      marginBottom: "14px",
    },

    itemHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "12px",
    },

    itemTitle: {
      fontWeight: "700",
      fontSize: "13px",
      color: "#111827",
    },

    itemSubtitle: {
      color: "#4b5563",
      fontSize: "12px",
      marginTop: "2px",
    },

    date: {
      fontSize: "11px",
      color: "#6b7280",
      whiteSpace: "nowrap",
    },

    description: {
      marginTop: "6px",
      whiteSpace: "pre-wrap",
      color: "#374151",
    },

    skills: {
      color: "#374151",
      lineHeight: "1.8",
    },

    divider: {
      borderTop: "1px solid #f3f4f6",
      marginTop: "10px",
    },
  };

  console.log("CLASSIC TEMPLATE DATA:", data);
  console.log("CERTIFICATIONS:", data?.certifications);
  console.log("ACHIEVEMENTS:", data?.achievements);

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.name}>
          {personal?.full_name || "Your Name"}
        </div>

        <div style={styles.profession}>
          {personal?.profession || "Professional Title"}
        </div>

        <div style={styles.contactRow}>
          {personal?.email && <span>{personal.email}</span>}
          {personal?.phone && <span>{personal.phone}</span>}
          {personal?.location && <span>{personal.location}</span>}
        </div>

        <div style={styles.contactRow}>
          {personal?.linkedin && <span>{personal.linkedin}</span>}
          {personal?.github && <span>{personal.github}</span>}
        </div>
      </div>

      {/* PROFESSIONAL SUMMARY */}
      {data?.professional_summary && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Professional Summary
          </div>

          <div style={styles.summary}>
            {data.professional_summary}
          </div>
        </div>
      )}

      {/* EXPERIENCE */}
      {data?.experience?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Professional Experience
          </div>

          {data.experience.map((exp, index) => (
            <div key={index} style={styles.item}>
              <div style={styles.itemHeader}>
                <div>
                  <div style={styles.itemTitle}>
                    {exp?.position || ""}
                  </div>

                  <div style={styles.itemSubtitle}>
                    {exp?.company || ""}
                  </div>
                </div>

                <div style={styles.date}>
                  {exp?.start_date || ""}
                  {" - "}
                  {exp?.is_current
                    ? "Present"
                    : exp?.end_date || ""}
                </div>
              </div>

              {exp?.description && (
                <div style={styles.description}>
                  {exp.description}
                </div>
              )}

              <div style={styles.divider} />
            </div>
          ))}
        </div>
      )}

      {/* EDUCATION */}
      {data?.education?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Education
          </div>

          {data.education.map((edu, index) => (
            <div key={index} style={styles.item}>
              <div style={styles.itemHeader}>
                <div>
                  <div style={styles.itemTitle}>
                    {edu?.degree || ""}
                    {edu?.field ? ` - ${edu.field}` : ""}
                  </div>

                  <div style={styles.itemSubtitle}>
                    {edu?.institution || ""}
                  </div>
                </div>

                <div style={styles.date}>
                  {edu?.graduation_date || ""}
                </div>
              </div>

              {edu?.gpa && (
                <div style={styles.description}>
                  GPA: {edu.gpa}
                </div>
              )}

              {edu?.highlights && (
                <div style={styles.description}>
                  {edu.highlights}
                </div>
              )}

              <div style={styles.divider} />
            </div>
          ))}
        </div>
      )}

      {/* PROJECTS */}
      {data?.project?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Projects
          </div>

          {data.project.map((project, index) => (
            <div key={index} style={styles.item}>
              <div style={styles.itemTitle}>
                {project?.name || ""}
              </div>

              {project?.type && (
                <div style={styles.itemSubtitle}>
                  {project.type}
                </div>
              )}

              {project?.description && (
                <div style={styles.description}>
                  {project.description}
                </div>
              )}

              <div style={styles.divider} />
            </div>
          ))}
        </div>
      )}

      {/* SKILLS */}
      {data?.skills?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Skills
          </div>

          <div style={styles.skills}>
            {Array.isArray(data.skills)
              ? data.skills.join(", ")
              : data.skills}
          </div>
        </div>
      )}

      {/* CERTIFICATIONS */}
      {data?.certifications?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Certifications
          </div>

          {data.certifications.map((cert, index) => (
            <div key={index} style={styles.item}>
              <div style={styles.itemTitle}>
                {cert?.name}
              </div>

              <div style={styles.itemSubtitle}>
                {cert?.issuer}
                {cert?.year && ` • ${cert.year}`}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ACHIEVEMENTS */}
   {/* ACHIEVEMENTS */}
{data?.achievements?.length > 0 && (
  <div style={styles.section}>
    <div style={styles.sectionTitle}>
      Achievements
    </div>

    {data.achievements.map((achievement, index) => (
      <div key={achievement.id || index} style={styles.item}>
        <div style={styles.description}>
          • {achievement?.text || ""}
        </div>
      </div>
    ))}
  </div>
)}
    </div>
  );
};

export default ClassicTemplate;