import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    template: { type: String, required: true },
    title: { type: String, default: "My Resume" },
    sections: [
        {
            name: String,
            fields: Array
        }
    ]
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);