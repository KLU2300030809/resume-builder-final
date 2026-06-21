console.log("resumeRoutes loaded");

import protect from "../middlewares/authMiddleware.js";

import {
  createResume,
  updateResume,
  getAllUserResumes,
  getResumeById,
  getPublicResumeById,
  deleteResume,
} from "../controllers/resumeController.js";
import express from "express";
import {
  updateCertifications,
  updateAchievements
} from "../controllers/resumeController.js";
const resumeRouter = express.Router();
resumeRouter.post("/create", protect, createResume);
resumeRouter.post("/update", protect, (req, res, next) => {
  console.log("UPDATE ROUTE HIT");
  next();
}, updateResume);

// routes/resumeRoutes.js


resumeRouter.get("/user", protect, getAllUserResumes);
resumeRouter.get("/get/:resumeId", protect, getResumeById);
resumeRouter.get("/public/:resumeId", getPublicResumeById);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);
resumeRouter.put("/certifications", updateCertifications);
resumeRouter.put("/achievements", updateAchievements);

export default resumeRouter;
