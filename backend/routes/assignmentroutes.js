import express from "express";
import {
  AddAssignment,
  getallAssignments,
} from "../controllers/assignmentController.js";

const router = express.Router();

router.post("/addAssignment", AddAssignment);
router.get("/allAssignments", getallAssignments);

export default router;
