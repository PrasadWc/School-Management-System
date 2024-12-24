import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentIndexNo: {
    type: String,
    required: true,
    unique: true,
  },
  parentName: {
    type: String,
    required: true,
  },
  parentEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Students = mongoose.model("Students", studentSchema);
export default Students;
