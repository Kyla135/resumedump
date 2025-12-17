import Resume from "../models/Resume.js";

export const createResume = async (req, res) => {
    try {
        const resume = await Resume.create({
            userId: req.user.id,
            template: req.body.template,
            sections: req.body.sections || []
        });

        res.json(resume);
    } catch (err) {
        res.status(500).json({ err });
    }
};

export const getMyResumes = async (req, res) => {
    const resumes = await Resume.find({ userId: req.user.id });
    res.json(resumes);
};

export const updateResume = async (req, res) => {
    const updated = await Resume.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updated);
};

export const deleteResume = async (req, res) => {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};