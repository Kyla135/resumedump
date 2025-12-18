import mongoose from "mongoose";
import Resume from "./models/Resume.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const templates = [
  { title: "Classic Two-Column Header Resume", image: "/uploads/template1.png", template: "Classic Two-Column Header Resume", userId: null },
  { title: "Modern Sidebar Resume", image: "/uploads/template2.png", template: "Modern Sidebar Resume", userId: null },
  { title: "Visual Skills Bar Resume", image: "/uploads/template3.png", template: "Visual Skills Bar Resume", userId: null },
  { title: "Personal Brand & Philosophy Resume", image: "/uploads/template4.png", template: "Personal Brand & Philosophy Resume", userId: null },
  { title: "Minimalist Competency-Focused Resume", image: "/uploads/template5.png", template: "Minimalist Competency-Focused Resume", userId: null },
  { title: "Minimalist Structured Professional Resume", image: "/uploads/template6.png", template: "Minimalist Structured Professional Resume", userId: null },
  { title: "Visual Skills & Experience Focused Resume", image: "/uploads/template7.png", template: "Visual Skills & Experience Focused Resume", userId: null },
  { title: "Asymmetrical Creative Sidebar Resume", image: "/uploads/template8.png", template: "Asymmetrical Creative Sidebar Resume", userId: null },
  { title: "Color-Coded Service Skills Resume", image: "/uploads/template9.png", template: "Color-Coded Service Skills Resume", userId: null },
];

async function seedTemplates() {
  try {
    // 🔴 Clear old templates safely
    await Resume.deleteMany({ userId: null });

    // 🔴 Insert fresh templates
    await Resume.insertMany(templates);

    console.log("Templates seeded successfully!");

    // 🔴 Close DB connection cleanly
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the seed
seedTemplates();
