import Portfolio from "../models/Portfolio.js";
import Resume from "../models/Resume.js";
import { v4 as uuidv4 } from "uuid";

/**
 * GENERATE PORTFOLIO FROM RESUME
 */

export const generatePortfolio = async (req, res) => {
  try {
    console.log("🔥 USER ID:", req.userId);

    const userId = req.userId;
    const { resumeId, template, accentColor } = req.body;

    // 1. FETCH RESUME
    const resume = await Resume.findOne({
      _id: resumeId,
      userId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    console.log("🔥 RESUME FOUND:", resume);

    // 2. NORMALIZE DATA (VERY IMPORTANT)
    const personal = resume.personal_info || resume.personalInfo || {};

    // 3. BUILD PORTFOLIO DATA
    const portfolioData = {
      hero: {
        name: personal.full_name || personal.name || "User",
        profession: personal.profession || "",
      },

      about: resume.professional_summary || resume.summary || "",

      projects: resume.projects || resume.project || [],

      skills: resume.skills || [],

      education: resume.education || [],

      experience: resume.experience || [],

      certifications: resume.certifications || [],

      contact: {
        email: personal.email || "",
        phone: personal.phone || "",
        location: personal.location || "",
        linkedin: personal.linkedin || "",
        github: personal.github || "",
        website: personal.website || "",
      },
    };

    // 4. SAFE SLUG
    const slugBase =
      personal.full_name ||
      personal.name ||
      "user";

    const slug = `${slugBase}-${Date.now()}`
      .toLowerCase()
      .replace(/\s+/g, "-");

    // 5. SAVE
    const portfolio = await Portfolio.create({
      userId,
      resumeId: resume._id,
      template: template || "modern",
      accentColor: accentColor || "#6366F1",
      slug,
      portfolioData,
    });

    // 6. RESPONSE
    return res.json({
      success: true,
      message: "Portfolio generated successfully",
      portfolio,
url: `http://localhost:5173/portfolio/${slug}`
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};