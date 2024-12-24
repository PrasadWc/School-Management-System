import express from "express";
import {
  AddClass,
  deleteClass,
  getallclasses,
  updateClass,
} from "../controllers/ClassController.js";

const router = express.Router();

router.post("/addClass", AddClass);
router.get("/getallclasses", getallclasses);
router.post("/updateClass/:id", updateClass);
router.delete("/deleteClass/:id", deleteClass);

export default router;
