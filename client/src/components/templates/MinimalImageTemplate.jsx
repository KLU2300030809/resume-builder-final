import React from "react";

const MinimalImageTemplate = ({
  data,
  accentColor = "#4f46e5",
}) => {
  const personal = data?.personal_info || {};

  const styles = {
    page: {
      width: "100%",
      minHeight: "297mm",
      display: "flex",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      backgroundColor: "#ffffff",
      color: "#111827",
    },

    /* SIDEBAR */

    sidebar: {
      width: "28%",
      backgroundColor: accentColor,
      color: "#ffffff",
      padding: "30px 20px",
      boxSizing: "border-box",
    },

    name: {
      fontSize: "24px",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "6px",
      lineHeight: "1.2",
    },

    profession: {
      fontSize: "13px",
      textAlign: "center",
      opacity: 0.95,
      marginBottom: "25px",
    },

    sidebarSection: {
      marginBottom: "24px",
    },

    sidebarTitle: {
      fontSize: "12px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "10px",
      borderBottom: "1px solid rgba(255,255,255,0.3)",
      paddingBottom: "4px",
    },

    contactItem: {
      fontSize: "11px",
      marginBottom: "8px",
      wordBreak: "break-word",
      lineHeight: "1.5",
    },

    skillTag: {
      display: "block",
      backgroundColor: "rgba(255,255,255,0.15)",
      border: "1px solid rgba(255,255,255,0.2)",
      padding: "6px 10px",
      borderRadius: "6px",
      fontSize: "11px",
      marginBottom: "8px",
    },

    /* CONTENT */

    content: {
      width: "72%",
      padding: "30px",
      boxSizing: "border-box",
    },

    section: {
      marginBottom: "24px",
    },

    sectionTitle: {
      fontSize: "15px",
      fontWeight: "700",
      color: accentColor,
      marginBottom: "10px",
      textTransform: "uppercase",
      borderBottom: `2px solid ${accentColor}`,
      paddingBottom: "4px",
      letterSpacing: "0.5px",
    },

    summary: {
      fontSize: "12px",
      color: "#374151",
      lineHeight: "1.7",
      whiteSpace: "pre-wrap",
    },

    card: {
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "12px",
      marginBottom: "12px",
      backgroundColor: "#fafafa",
    },

    itemHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "10px",
    },

    itemTitle: {
      fontSize: "13px",
      fontWeight: "700",
      color: "#111827",
    },

    itemSubtitle: {
      fontSize: "11px",
      color: "#6b7280",
      marginTop: "2px",
    },

    date: {
      fontSize: "10px",
      color: "#6b7280",
      whiteSpace: "nowrap",
    },

    description: {
      marginTop: "8px",
      fontSize: "11px",
      color: "#374151",
      lineHeight: "1.6",
      whiteSpace: "pre-wrap",
    },
  };

  return (
    <div style={styles.page}>
      {/* LEFT SIDEBAR */}

      <div style={styles.sidebar}>
        <div style={styles.name}>
          {personal?.full_name || "Your Name"}
        </div>

        <div style={styles.profession}>
          {personal?.profession || "Professional"}
        </div>

        {/* CONTACT */}

        <div style={styles.sidebarSection}>
          <div style={styles.sidebarTitle}>
            Contact
          </div>

          {personal?.email && (
            <div style={styles.contactItem}>
              {personal.email}
            </div>
          )}

          {personal?.phone && (
            <div style={styles.contactItem}>
              {personal.phone}
            </div>
          )}

          {personal?.location && (
            <div style={styles.contactItem}>
              {personal.location}
            </div>
          )}

          {personal?.linkedin && (
            <div style={styles.contactItem}>
              {personal.linkedin}
            </div>
          )}

          {personal?.github && (
            <div style={styles.contactItem}>
              {personal.github}
            </div>
          )}
        </div>

        {/* SKILLS */}

        {data?.skills?.length > 0 && (
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarTitle}>
              Skills
            </div>

            {data.skills.map((skill, index) => (
              <div
                key={index}
                style={styles.skillTag}
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT CONTENT */}

      <div style={styles.content}>
        {/* SUMMARY */}

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

        {/* PROJECTS */}

        {data?.project?.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              Projects
            </div>

            {data.project.map((project, index) => (
              <div
                key={index}
                style={styles.card}
              >
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

        {/* EXPERIENCE */}

        {data?.experience?.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              Experience
            </div>

            {data.experience.map((exp, index) => (
              <div
                key={index}
                style={styles.card}
              >
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
                    {exp.description}
                  </div>
                )}
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
              <div
                key={index}
                style={styles.card}
              >
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
    </div>
  );
};

export default MinimalImageTemplate;