import express from "express";
import Portfolio from "../models/Portfolio.js";
import Resume from "../models/Resume.js";

const router = express.Router();

console.log("portfolioRoutes loaded");
// TEST
router.get("/test", (req, res) => {
  res.json({ success: true });
});

// ===============================
// CREATE PORTFOLIO
// ===============================
router.post("/generate", async (req, res) => {
     console.log("POST /generate hit");
  console.log("BODY:", req.body);
  try {
    const { resumeId, template, accentColor } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const portfolioData = {
      hero: {
        name: resume?.personal_info?.full_name || "Unknown",
        profession: resume?.personal_info?.profession || "",
      },
      about: resume?.professional_summary || "",
      skills: resume?.skills || [],
      projects: resume?.project || [],
      experience: resume?.experience || [],
      education: resume?.education || [],
      certifications: resume?.certifications || [],
      contact: resume?.personal_info || {},
    };
console.log("CLIENT_URL =", process.env.CLIENT_URL);
    const portfolio = await Portfolio.create({
      userId: resume?.userId,   // MUST exist in Resume schema
      resumeId: resume._id,
      template,
      accentColor,
      portfolioData,
    slug: `${(resume?.personal_info?.full_name || "user")
  .toLowerCase()
  .replace(/\s+/g, "-")}-${Date.now()}`
    });

   return res.json({
  url: `${process.env.CLIENT_URL}/portfolio/${portfolio.slug}`,
  slug: portfolio.slug
});

  } catch (err) {
    console.log("🔥 ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
});
// ===============================
// GET PORTFOLIO BY SLUG
// ===============================
router.get("/:slug", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ slug: req.params.slug });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const resume = await Resume.findById(portfolio.resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const portfolioData = {
      hero: {
        name: resume.personal_info?.full_name || "",
        profession: resume.personal_info?.profession || "",
      },
      about: resume.professional_summary || "",
      skills: resume.skills || [],
      projects: resume.project || [],
      experience: resume.experience || [],
      education: resume.education || [],
      certifications: resume.certifications || [],
      contact: resume.personal_info || {},
    };

    res.json({ portfolioData });

  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;