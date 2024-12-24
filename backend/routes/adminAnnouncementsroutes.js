import express from "express";
import {
  AddAdminAnnouncement,
  getAdminAnnouncements,
} from "../controllers/adminAnnouncementsController.js";

const router = express.Router();

router.post("/addAdminAnnouncement", AddAdminAnnouncement);
router.get("/allAdminAnnouncements", getAdminAnnouncements);

export default router;
