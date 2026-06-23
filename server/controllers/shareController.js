import SharedResume from "../models/SharedResume.js";
import Resume from "../models/Resume.js";
import { nanoid } from "nanoid";

export const generateShareLink = async (req, res) => {
    try {

        const { resumeId } = req.params;

        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        let existing = await SharedResume.findOne({
            resumeId
        });

        if (existing) {
            return res.json({
                shareLink:
                `${process.env.CLIENT_URL}/share/${existing.shareId}`
            });
        }

        const shareId = nanoid(10);

        await SharedResume.create({
            resumeId,
            shareId
        });

        res.json({
            shareLink:
            `${process.env.CLIENT_URL}/share/${shareId}`
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
export const getSharedResume = async (req, res) => {
  try {
    console.log("GET SHARED RESUME HIT");

    const { shareId } = req.params;

    const shared = await SharedResume.findOne({ shareId });

    if (!shared) {
      return res.status(404).json({
        message: "Invalid Link",
      });
    }

    const resume = await Resume.findById(shared.resumeId);

    console.log("RESUME DATA:");
    console.log(JSON.stringify(resume, null, 2));

    res.json(resume);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};