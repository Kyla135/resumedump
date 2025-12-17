// routes/resumeRoutes.js
import express from "express";
import multer from "multer";
import Resume from "../models/Resume.js"; // make sure this import exists
import {
  createResume,
  getMyResumes,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder where files will be saved
  },
  filename: function (req, file, cb) {
    // Save file with original name + timestamp
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// PUBLIC: get all resumes/templates for landing page
router.get("/templates", async (req, res) => {
  try {
    // Fetch everything for the landing page
    const allResumes = await Resume.find({}).sort({ createdAt: -1 });
    res.json(allResumes);
  } catch (err) {
    console.error("Failed to fetch resumes:", err);
    res.status(500).json({ message: err.message });
  }
});


// ROUTES REQUIRING AUTH
router.post("/", auth, upload.single("image"), createResume);
router.get("/", auth, getMyResumes);
router.put("/:id", auth, updateResume);
router.delete("/:id", auth, deleteResume);

export default router;
