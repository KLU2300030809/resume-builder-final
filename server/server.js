import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import shareRouter from "./routes/shareRoutes.js";

console.log("🔥 REAL SERVER FILE RUNNING");

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // allow token
}));


app.get("/", (req, res) => res.send("Server is live..."));

app.use("/api/users", userRouter);
console.log("🔥 mounting /api/resumes");
app.use("/api/resumes", resumeRouter); 
// 🔥 THIS LINE FIXES EVERYTHING
console.log("🔥 mounting /api/ai");

app.use("/api/share", shareRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

