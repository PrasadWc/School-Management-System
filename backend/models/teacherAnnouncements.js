import mongoose from "mongoose";

const teacherannouncementSchema = new mongoose.Schema({
  announcementCaption: {
    type: String,
    required: true,
  },

  announcementBody: {
    type: String,
    required: true,
  },
});

const teacherannouncements = mongoose.model(
  "teacherannouncements",
  teacherannouncementSchema
);
export default teacherannouncements;
