import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  teacherID: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },

  teacherEmail: {
    type: String,
    required: true,
  },
  teacherContactNo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
});

const Teachers = mongoose.model("Teachers", teacherSchema);
export default Teachers;
