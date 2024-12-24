import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentsroutes.js";
import studentauthroute from "./routes/studentauthroute.js";
import teacherroutes from "./routes/teacherroutes.js";
import Classroutes from "./routes/Classroutes.js";
import adminroutes from "./routes/adminroutes.js";
import assignmentroutes from "./routes/assignmentroutes.js";
import adminAnnouncementsroutes from "./routes/adminAnnouncementsroutes.js";
import teacherAnnouncementsroutes from "./routes/teacherAnnouncementsroutes.js";
import parentauthroute from "./routes/parentauthroute.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.listen(3050, () => {
  console.log("server listening on port 3050");
});

app.use("/students", studentRoutes);
app.use("/studentauth", studentauthroute);
app.use("/teachers", teacherroutes);
app.use("/classes", Classroutes);
app.use("/admins", adminroutes);
app.use("/assignments", assignmentroutes);
app.use("/adminannouncements", adminAnnouncementsroutes);
app.use("/teacherannouncements", teacherAnnouncementsroutes);
app.use("/parentauth", parentauthroute);
