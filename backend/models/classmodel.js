import mongoose from "mongoose";
import Teachers from "./teachersmodel.js";
import Students from "./studentmodel.js";

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Teachers,
    required: true,
    unique: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Students,
    },
  ],
});

const Classes = mongoose.model("Classes", classSchema);
export default Classes;
