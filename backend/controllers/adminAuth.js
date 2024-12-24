import Admins from "../models/adminmodel.js";
import jwt from "jsonwebtoken";

export const addAdmin = async (req, res) => {
  const { adminName, adminEmail, password } = req.body;
  const newAdmin = new Admins({
    adminName,
    adminEmail,

    password,
  });

  try {
    await newAdmin.save();
    res.status(201).json({ message: "Admin Added successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const signin = async (req, res) => {
  const { adminEmail, password } = req.body;

  try {
    const validuser = await Admins.findOne({ adminEmail });
    if (!validuser) return res.status(404).json({ message: "User Not Found" });
    if (validuser.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
    const userWithoutPassword = {
      ...validuser.toObject(),
      password: undefined,
    };
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(userWithoutPassword);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
