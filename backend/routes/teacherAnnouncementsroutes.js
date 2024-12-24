import express from "express";
import {
  AddteacherAnnouncement,
  getteacherAnnouncements,
} from "../controllers/teacherAnnouncementsController.js";

const router = express.Router();

router.post("/addteacherAnnouncement", AddteacherAnnouncement);
router.get("/allteacherAnnouncements", getteacherAnnouncements);

export default router;
