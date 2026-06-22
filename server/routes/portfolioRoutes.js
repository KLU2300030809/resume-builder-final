import express from "express";
import Portfolio from "../models/Portfolio.js";
import Resume from "../models/Resume.js";

const router = express.Router();

router.get("/:slug", async (req, res) => {
  try {
    console.log("🔥 SLUG HIT:", req.params.slug);

    const portfolio = await Portfolio.findOne({
      slug: req.params.slug,
    });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // get resume
    const resume = await Resume.findById(portfolio.resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // 🔥 BUILD PORTFOLIO DATA HERE
    const portfolioData = {
      hero: {
        name: resume.personal_info?.full_name,
        profession: resume.personal_info?.profession,
      },
      about: resume.professional_summary,
      skills: resume.skills || [],
      projects: resume.project || [],
      experience: resume.experience || [],
      education: resume.education || [],
      certifications: resume.certifications || [],
      contact: resume.personal_info || {},
    };

    res.json({ portfolioData });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;