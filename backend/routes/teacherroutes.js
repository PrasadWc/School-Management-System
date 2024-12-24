import express from "express";
import {
  addTeacher,
  deleteTeacher,
  getallteachers,
  signin,
} from "../controllers/TeacherController.js";

const router = express.Router();

router.post("/add", addTeacher);
router.get("/getallteachers", getallteachers);
router.delete("/deleteTeacher/:id", deleteTeacher);
router.post("/signin", signin);

export default router;
