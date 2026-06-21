import mongoose from "mongoose";

const sharedResumeSchema = new mongoose.Schema(
{
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    shareId: {
        type: String,
        unique: true,
        required: true
    }
},
{
    timestamps: true
}
);

export default mongoose.model(
    "SharedResume",
    sharedResumeSchema
);