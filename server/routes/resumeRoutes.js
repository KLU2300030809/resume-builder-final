import express from "express";
import protect from "../middlewares/authMiddleware.js";

import {
  createResume,
  updateResume,
  getAllUserResumes,
  getResumeById,
  getPublicResumeById,
  deleteResume,
  updateCertifications,
  updateAchievements,
  getLatestResume
} from "../controllers/resumeController.js";

const resumeRouter = express.Router();

console.log("resumeRoutes loaded");

// CREATE
resumeRouter.post("/create", protect, createResume);

// UPDATE
resumeRouter.post("/update", protect, (req, res, next) => {
  console.log("UPDATE ROUTE HIT");
  next();
}, updateResume);

// GET ALL USER RESUMES ✅
resumeRouter.get("/user", protect, getAllUserResumes);

// GET BY ID
resumeRouter.get("/get/:resumeId", protect, getResumeById);

// PUBLIC
resumeRouter.get("/public/:resumeId", getPublicResumeById);

// DELETE
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);

// EXTRA
resumeRouter.put("/certifications", protect, updateCertifications);
resumeRouter.put("/achievements", protect, updateAchievements);
resumeRouter.get("/latest", protect, getLatestResume);
export default resumeRouter;