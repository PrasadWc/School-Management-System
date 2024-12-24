import express from "express";
import {
  deleteStudent,
  getallstudents,
  getStudentById, // Import the new function
} from "../controllers/studentController.js";

const router = express.Router();

// Route to get all students
router.get("/getalldetails", getallstudents);

// Route to get a single student by ID
router.get("/getStudent/:id", getStudentById);

// Route to delete a student by ID
router.delete("/deleteStudent/:id", deleteStudent);

export default router;
