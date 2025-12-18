import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullNamename, email, password: hash, role: role || "user" });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
