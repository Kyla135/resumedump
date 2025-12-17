import Resume from "../models/Resume.js";

// CREATE
export const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      userId: req.user.id,
      template: req.body.template,
      sections: req.body.sections || [],
      title: req.body.title || "My Resume",
       image: req.file ? req.file.path : null,
    });

    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ (user's resumes)
export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ (all resumes for admin)
export const getAllResumes = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const resumes = await Resume.find()
      .populate("userId", "fullName email") // get user info
      .sort({ createdAt: -1 });

    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    // If there's a new file uploaded, update image path
    if (req.file) {
      resume.image = `/uploads/${req.file.filename}`;
    }

    Object.assign(resume, req.body);
    const updated = await resume.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteResume = async (req, res) => {
  try {
    const deleted = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Resume not found" });

    res.json({ message: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
