import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // removed `required: true`
    template: { type: String, required: true },
    title: { type: String, default: "My Resume" },
    image: { type: String }, // <-- added field for uploaded photo
    sections: [
        {
            name: String,
            fields: Array
        }
    ]
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
