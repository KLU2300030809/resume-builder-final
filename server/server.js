import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

import portfolioRoutes from "./routes/portfolioRoutes.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import shareRouter from "./routes/shareRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

// CORS (FINAL FIX)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://resume-builder-final-eight.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Server is live..."));

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/share", shareRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


















// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./configs/db.js";

// import portfolioRoutes from "./routes/portfolioRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// import resumeRouter from "./routes/resumeRoutes.js";
// import shareRouter from "./routes/shareRoutes.js";

// const app = express();
// const PORT = process.env.PORT || 3000;

// connectDB()
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("DB Error:", err));
// // CORS
// <<<<<<< Updated upstream
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://resume-builder-final-eight.vercel.app"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }

//     return callback(null, true); // allow for now (safe mode)
//   },
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));
// =======
// >>>>>>> Stashed changes

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://resume-builder-final-eight.vercel.app"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }

//     return callback(null, true); // TEMP SAFE MODE (important for debugging)
//   },
//   credentials: true
// }));
// // BODY PARSER
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// console.log("🔥 SERVER RUNNING");

// // ROUTES
// app.get("/", (req, res) => res.send("Server is live..."));

// app.use("/api/users", userRouter);
// app.use("/api/resumes", resumeRouter);     // ✅ FIXED CONSISTENT ROUTE
// app.use("/api/portfolio", portfolioRoutes);
// app.use("/api/share", shareRouter);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
