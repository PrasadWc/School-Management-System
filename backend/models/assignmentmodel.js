import mongoose from "mongoose";
import Classes from "./classmodel.js";

const assignmentSchema = new mongoose.Schema({
  assignmentCaption: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  assignmentBody: {
    type: String,
    required: true,
  },
  Class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes", // Reference to the Classes collection by name
    required: true,
  },
  postTime: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
    required: true,
  },
});

const Assignments = mongoose.model("Assignments", assignmentSchema);
export default Assignments;
