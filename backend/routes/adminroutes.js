import express from "express";
import { addAdmin, signin } from "../controllers/adminAuth.js";

const router = express.Router();

router.post("/add", addAdmin);
router.post("/Adminsignin", signin);

export default router;
