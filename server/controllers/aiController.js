import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// ============================
// Enhance Professional Summary
// ============================
import axios from "axios";
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    const response = await axios.post("http://127.0.0.1:8000/generate", {
      prompt: `
You are an expert ATS resume writer.

Convert this into a professional resume summary:

${userContent}

Return ONLY final summary.
      `.trim()
    });

    console.log("🔥 PYTHON RESPONSE:", response.data);

    const enhanced = response.data.result;

    if (!enhanced || enhanced.trim().length < 5) {
      return res.status(500).json({
        message: "AI returned empty or invalid response"
      });
    }

    return res.json({
      enhancedContent: enhanced
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "AI enhancement failed"
    });
  }
};
// ============================
// Enhance Job Description
// ============================
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Content cannot be empty" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userContent },
      ],
    });

    res.status(200).json({
      enhancedContent: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to enhance job description" });
  }
};

// ============================
// Upload Resume
// ============================
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.user?._id;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing resume text" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: "You are an expert resume parser." },
        { role: "user", content: resumeText },
      ],
      response_format: { type: "json_object" },
    });

    const parsedData = JSON.parse(response.choices[0].message.content);
    const newResume = await Resume.create({ userId, title, ...parsedData });

    res.json({ resumeId: newResume._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
