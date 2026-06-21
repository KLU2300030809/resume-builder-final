import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const models = await genAI.listModels();
    console.log("Available models for your API key:");
    console.log(models);
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();
