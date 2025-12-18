import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    // null = template, ObjectId = user resume
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    // Unique ONLY for templates
    title: {
      type: String,
      required: true,
    },

    template: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    sections: [
      {
        name: String,
        fields: Array,
      },
    ],
  },
  { timestamps: true }
);

// 🔒 Prevent duplicate templates (userId = null)
resumeSchema.index(
  { title: 1 },
  { unique: true, partialFilterExpression: { userId: null } }
);

export default mongoose.model("Resume", resumeSchema);
