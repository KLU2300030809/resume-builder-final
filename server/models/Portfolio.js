import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "Resume", required: true },

    template: { type: String, default: "modern" },
    accentColor: { type: String, default: "#6366F1" },

    slug: { type: String, required: true, unique: true },

    portfolioData: { type: Object, required: true },

    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);