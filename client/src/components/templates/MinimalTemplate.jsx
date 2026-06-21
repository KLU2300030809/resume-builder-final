import React from "react";

const MinimalTemplate = ({ data, accentColor = "#000000" }) => {
  const personal = data?.personal_info || {};

  const styles = {
    page: {
      width: "100%",
      minHeight: "297mm",
      padding: "24px",
      boxSizing: "border-box",
      fontFamily: "Arial, Helvetica, sans-serif",
      color: "#111827",
      backgroundColor: "#ffffff",
      fontSize: "11px",
      lineHeight: 1.4,
    },

    header: {
      marginBottom: "18px",
      borderBottom: "1px solid #d1d5db",
      paddingBottom: "10px",
    },

    name: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "4px",
      color: "#000",
    },

    profession: {
      fontSize: "13px",
      color: "#4b5563",
      marginBottom: "6px",
    },

    contact: {
      fontSize: "11px",
      color: "#4b5563",
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },

    section: {
      marginBottom: "16px",
    },

    sectionTitle: {
      fontSize: "12px",
      fontWeight: "700",
      textTransform: "uppercase",
      marginBottom: "8px",
      color: "#000",
      borderBottom: "1px solid #d1d5db",
      paddingBottom: "3px",
      letterSpacing: "0.5px",
    },

    item: {
      marginBottom: "10px",
    },

    itemHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "10px",
    },

    itemTitle: {
      fontWeight: "700",
      fontSize: "12px",
      color: "#000",
    },

    itemSubtitle: {
      fontSize: "11px",
      color: "#4b5563",
      marginTop: "2px",
    },

    date: {
      fontSize: "10px",
      color: "#6b7280",
      whiteSpace: "nowrap",
    },

    description: {
      marginTop: "4px",
      fontSize: "11px",
      color: "#374151",
      whiteSpace: "pre-wrap",
    },

    skillsList: {
      fontSize: "11px",
      color: "#374151",
      lineHeight: 1.8,
    },

    summary: {
      fontSize: "11px",
      color: "#374151",
      whiteSpace: "pre-wrap",
    },
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}

      <div style={styles.header}>
        <div style={styles.name}>
          {personal?.full_name || "Your Name"}
        </div>

        <div style={styles.profession}>
          {personal?.profession || "Professional"}
        </div>

        <div style={styles.contact}>
          {personal?.email && <span>{personal.email}</span>}
          {personal?.phone && <span>{personal.phone}</span>}
          {personal?.location && <span>{personal.location}</span>}
          {personal?.linkedin && <span>{personal.linkedin}</span>}
          {personal?.github && <span>{personal.github}</span>}
        </div>
      </div>

      {/* SUMMARY */}

      {data?.professional_summary && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Professional Summary
          </div>

          <div style={styles.summary}>
            {data?.professional_summary}
          </div>
        </div>
      )}

      {/* EXPERIENCE FIRST */}

      {data?.experience?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Experience
          </div>

          {data.experience.map((exp, index) => (
            <div key={index} style={styles.item}>
              <div style={styles.itemHeader}>
                <div>
                  <div style={styles.itemTitle}>
                    {exp?.position}
                  </div>

                  <div style={styles.itemSubtitle}>
                    {exp?.company}
                  </div>
                </div>

                <div style={styles.date}>
                  {exp?.start_date} -{" "}
                  {exp?.is_current
                    ? "Present"
                    : exp?.end_date}
                </div>
              </div>

              {exp?.description && (
                <div style={styles.description}>
                  {exp?.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SKILLS SECOND */}

      {data?.skills?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Skills
          </div>

          <div style={styles.skillsList}>
            {data.skills.map((skill, index) => (
              <div key={index}>• {skill}</div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECTS THIRD */}

      {data?.project?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Projects
          </div>

          {data.project.map((project, index) => (
            <div key={index} style={styles.item}>
              <div style={styles.itemTitle}>
                {project?.name}
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
            </div>
          ))}
        </div>
      )}

      {/* EDUCATION FOURTH */}

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
                    {edu?.degree}
                    {edu?.field
                      ? ` - ${edu.field}`
                      : ""}
                  </div>

                  <div style={styles.itemSubtitle}>
                    {edu?.institution}
                  </div>
                </div>

                <div style={styles.date}>
                  {edu?.graduation_date}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;