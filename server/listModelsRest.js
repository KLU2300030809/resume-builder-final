import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

async function listModels() {
  try {
    const response = await axios.get(
      "https://generativelanguage.googleapis.com/v1/models",
      {
        headers: {
          "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Available models for your account:");
    console.log(response.data);
  } catch (err) {
    console.error("Error listing models:", err.response?.data || err.message);
  }
}

listModels();
