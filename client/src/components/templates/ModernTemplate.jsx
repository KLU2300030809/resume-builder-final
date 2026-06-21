import React from "react";

const ModernTemplate = ({ data, accentColor = "#2563eb" }) => {
  const personal = data?.personal_info || {};

  const styles = {
    page: {
      width: "100%",
      minHeight: "297mm",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      backgroundColor: "#ffffff",
      color: "#1f2937",
      boxSizing: "border-box",
    },

    header: {
      backgroundColor: accentColor,
      color: "#ffffff",
      padding: "32px",
    },

    name: {
      fontSize: "34px",
      fontWeight: "700",
      marginBottom: "6px",
      letterSpacing: "0.5px",
    },

    profession: {
      fontSize: "16px",
      opacity: 0.95,
      marginBottom: "14px",
    },

    contactRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "14px",
      fontSize: "12px",
    },

    body: {
      padding: "28px",
    },

    section: {
      marginBottom: "24px",
    },

    sectionTitle: {
      fontSize: "15px",
      fontWeight: "700",
      color: accentColor,
      marginBottom: "12px",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      borderBottom: `2px solid ${accentColor}`,
      paddingBottom: "4px",
    },

    summaryCard: {
      backgroundColor: "#f8fafc",
      borderLeft: `4px solid ${accentColor}`,
      padding: "16px",
      borderRadius: "6px",
      fontSize: "13px",
      lineHeight: 1.7,
    },

    skillsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },

    skill: {
      backgroundColor: accentColor,
      color: "#ffffff",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: "600",
    },

    projectGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
    },

    projectCard: {
      border: "1px solid #e5e7eb",
      borderRadius: "10px",
      padding: "14px",
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
    },

    projectName: {
      fontSize: "14px",
      fontWeight: "700",
      color: accentColor,
      marginBottom: "4px",
    },

    projectType: {
      fontSize: "11px",
      color: "#6b7280",
      marginBottom: "8px",
    },

    projectDescription: {
      fontSize: "12px",
      lineHeight: 1.6,
      color: "#374151",
      whiteSpace: "pre-wrap",
    },

    experienceCard: {
      borderLeft: `4px solid ${accentColor}`,
      paddingLeft: "16px",
      marginBottom: "18px",
    },

    itemHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "10px",
    },

    itemTitle: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#111827",
    },

    itemSubtitle: {
      fontSize: "12px",
      color: "#6b7280",
      marginTop: "2px",
    },

    date: {
      fontSize: "11px",
      color: "#6b7280",
      whiteSpace: "nowrap",
    },

    description: {
      marginTop: "8px",
      fontSize: "12px",
      lineHeight: 1.6,
      color: "#374151",
      whiteSpace: "pre-wrap",
    },

    educationCard: {
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "14px",
      marginBottom: "12px",
      backgroundColor: "#fafafa",
    },

    degree: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#111827",
    },

    institution: {
      fontSize: "12px",
      color: "#6b7280",
      marginTop: "2px",
    },

    highlight: {
      marginTop: "8px",
      fontSize: "12px",
      lineHeight: 1.6,
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
          {personal?.profession || "Professional Title"}
        </div>

        <div style={styles.contactRow}>
          {personal?.email && <span>{personal.email}</span>}
          {personal?.phone && <span>{personal.phone}</span>}
          {personal?.location && <span>{personal.location}</span>}
          {personal?.linkedin && <span>{personal.linkedin}</span>}
          {personal?.github && <span>{personal.github}</span>}
        </div>
      </div>

      <div style={styles.body}>
        {/* SUMMARY */}
        {data?.professional_summary && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              Professional Summary
            </div>

            <div style={styles.summaryCard}>
              {data?.professional_summary}
            </div>
          </div>
        )}

        {/* SKILLS */}
        {data?.skills?.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              Technical Skills
            </div>

            <div style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <div key={index} style={styles.skill}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {data?.project?.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              Projects
            </div>

            <div style={styles.projectGrid}>
              {data.project.map((project, index) => (
                <div key={index} style={styles.projectCard}>
                  <div style={styles.projectName}>
                    {project?.name}
                  </div>

                  {project?.type && (
                    <div style={styles.projectType}>
                      {project.type}
                    </div>
                  )}

                  <div style={styles.projectDescription}>
                    {project?.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {data?.experience?.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              Experience
            </div>

            {data.experience.map((exp, index) => (
              <div key={index} style={styles.experienceCard}>
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

                <div style={styles.description}>
                  {exp?.description}
                </div>
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
              <div key={index} style={styles.educationCard}>
                <div style={styles.degree}>
                  {edu?.degree}
                  {edu?.field ? ` - ${edu.field}` : ""}
                </div>

                <div style={styles.institution}>
                  {edu?.institution}
                </div>

                <div style={styles.date}>
                  {edu?.graduation_date}
                </div>

                {edu?.gpa && (
                  <div style={styles.highlight}>
                    GPA: {edu.gpa}
                  </div>
                )}

                {edu?.highlights && (
                  <div style={styles.highlight}>
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

export default ModernTemplate;