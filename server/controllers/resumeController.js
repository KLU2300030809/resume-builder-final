import Resume from "../models/Resume.js";

import mongoose from "mongoose"; // Needed for Types.ObjectId

// ---------------- CREATE RESUME ----------------
// ---------------- CREATE RESUME ----------------
export const createResume = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(401).json({ message: "User not authenticated" });

   let resumeData = {};

if (req.body.resumeData) {
  if (typeof req.body.resumeData === "string") {
    resumeData = JSON.parse(req.body.resumeData);
  } else {
    resumeData = req.body.resumeData;
  }
}
 const resume = new Resume({
  userId: req.userId,
  title: resumeData.title?.trim() || "Untitled Resume",
  personal_info: resumeData.personal_info || {},
  professional_summary: resumeData.professional_summary || "",
  experience: Array.isArray(resumeData.experience) ? resumeData.experience : [],
  education: Array.isArray(resumeData.education) ? resumeData.education : [],
  project: Array.isArray(resumeData.project) ? resumeData.project : [],
  skills: Array.isArray(resumeData.skills) ? resumeData.skills : [],
  template: resumeData.template || "classic",
  accent_color: resumeData.accent_color || "#3B82F6",
  public: typeof resumeData.public === "boolean" ? resumeData.public : true,
});

// HANDLE FILE UPLOAD

    await resume.save();

    return res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    console.error("createResume ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


// ---------------- UPDATE RESUME ----------------
// ---------------- UPDATE RESUME ----------------
// ---------------- UPDATE RESUME ----------------

// ---------------- UPDATE RESUME ----------------
export const updateResume = async (req, res) => {
  try {
    console.log("🔥 updateResume called");

    console.log("req.file:", req.file);

    const resumeId = req.body.resumeId;
    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID missing" });
    }

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Parse resumeData
   let resumeData = {};

if (req.body.resumeData) {
  if (typeof req.body.resumeData === "string") {
    resumeData = JSON.parse(req.body.resumeData);
  } else {
    resumeData = req.body.resumeData;
  }
}

    // ---------------- Personal Info ----------------
   if (resumeData.personal_info) {
  resume.personal_info = {
    ...resume.personal_info,
    ...resumeData.personal_info,
  };
}

    // ---------------- File Upload ----------------
 

    // ---------------- Other Fields ----------------
    resume.title = resumeData.title ?? resume.title;
    resume.public = resumeData.public ?? resume.public;
    resume.template = resumeData.template ?? resume.template;
    resume.accent_color = resumeData.accent_color ?? resume.accent_color;
    resume.professional_summary =
      resumeData.professional_summary ?? resume.professional_summary;

    // ---------------- ARRAYS (FIX) ----------------
    if (Array.isArray(resumeData.experience)) {
      resume.experience.splice(0, resume.experience.length, ...resumeData.experience.map(exp => ({
        _id: exp._id ? new mongoose.Types.ObjectId(exp._id) : new mongoose.Types.ObjectId(),
        company: exp.company || "",
        position: exp.position || "",
        start_date: exp.start_date || "",
        end_date: exp.end_date || "",
        description: exp.description || "",
        is_current: !!exp.is_current
      })));
      resume.markModified("experience");
    }

    if (Array.isArray(resumeData.education)) {
      resume.education.splice(0, resume.education.length, ...resumeData.education.map(edu => ({
        _id: edu._id ? new mongoose.Types.ObjectId(edu._id) : new mongoose.Types.ObjectId(),
        institution: edu.institution || "",
        degree: edu.degree || "",
        field: edu.field || "",
        graduation_date: edu.graduation_date || "",
        gpa: edu.gpa || ""
      })));
      resume.markModified("education");
    }

    if (Array.isArray(resumeData.project)) {
      resume.project.splice(0, resume.project.length, ...resumeData.project.map(proj => ({
        _id: proj._id ? new mongoose.Types.ObjectId(proj._id) : new mongoose.Types.ObjectId(),
        name: proj.name || "",
        type: proj.type || "",
        description: proj.description || ""
      })));
      resume.markModified("project");
    }

    if (Array.isArray(resumeData.skills)) {
      resume.skills.splice(0, resume.skills.length, ...resumeData.skills.map(skill => skill || ""));
      resume.markModified("skills");
    }
if (Array.isArray(resumeData.certifications)) {
  resume.certifications = resumeData.certifications.map(cert => ({
    name: cert.name || "",
    issuer: cert.issuer || "",
    year: cert.year || ""
  }));

  resume.markModified("certifications");
}

if (Array.isArray(resumeData.achievements)) {
  resume.achievements = resumeData.achievements.map(item => ({
    title: item.text || item.title || "",
    description: item.description || ""
  }));

  resume.markModified("achievements");
}
    await resume.save();


    console.log("✅ Resume updated successfully");

    return res.json({
      success: true,
      message: "Saved successfully",
      resume,
    });
  } catch (error) {
    console.error("❌ updateResume ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ---------------- GET ALL USER RESUMES ----------------
// GET ALL USER RESUMES
export const getAllUserResumes = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const resumes = await Resume.find({ userId: req.userId });

  return res.status(200).json({
  success: true,
  resumes,
});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// ---------------- GET RESUME BY ID ----------------
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    if (resume.userId.toString() !== req.userId)
      return res.status(403).json({ message: "Not authorized" });
    return res.json({ success: true, resume });
  } catch (error) {
    console.error("getResumeById ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ---------------- GET PUBLIC RESUME ----------------
export const getPublicResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    return res.json({ success: true, resume });
  } catch (error) {
    console.error("getPublicResumeById ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ---------------- DELETE RESUME ----------------
export const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    if (resume.userId.toString() !== req.userId)
      return res.status(403).json({ message: "Not authorized" });

    await resume.deleteOne();
    return res.json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    console.error("deleteResume ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};
export const updateCertifications = async (req, res) => {
  try {
    const { resumeId, certifications } = req.body;

    const resume = await Resume.findByIdAndUpdate(
      resumeId,
      { certifications },
      { new: true }
    );

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateAchievements = async (req, res) => {
  try {
    const { resumeId, achievements } = req.body;

    const resume = await Resume.findByIdAndUpdate(
      resumeId,
      { achievements },
      { new: true }
    );

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getLatestResume = async (req, res) => {
  try {
    const userId = req.userId;

    const resume = await Resume.findOne({ userId }).sort({
      createdAt: -1,
    });

    if (!resume) {
      return res.status(404).json({
        message: "No resume found. Please create a resume first.",
      });
    }

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};