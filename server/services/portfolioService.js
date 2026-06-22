export const mapResumeToPortfolio = (resume) => {
  return {
    hero: {
      name: resume.name,
      title: resume.title || "Developer",
      email: resume.email,
    },
    about: resume.summary,
    skills: resume.skills || [],
    projects: resume.projects || [],
    education: resume.education || [],
    experience: resume.experience || [],
    certifications: resume.certifications || [],
    socials: resume.socialLinks || [],
  };
};