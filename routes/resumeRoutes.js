import express from "express";
import {
  createResume,
  getMyResumes,
  updateResume,
  deleteResume
} from "../controllers/resumeController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createResume);
router.get("/", auth, getMyResumes);
router.put("/:id", auth, updateResume);
router.delete("/:id", auth, deleteResume);

export default router;