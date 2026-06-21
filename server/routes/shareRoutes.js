import express from "express";
import {
    generateShareLink,
    getSharedResume
} from "../controllers/shareController.js";

const router = express.Router();

router.post("/generate/:resumeId", generateShareLink);
router.get("/:shareId", getSharedResume);

export default router;