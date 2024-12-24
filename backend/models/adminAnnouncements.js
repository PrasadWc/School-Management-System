import mongoose from "mongoose";

const adminannouncementSchema = new mongoose.Schema({
  Audience: {
    type: String,
    required: true,
  },

  announcementCaption: {
    type: String,
    required: true,
  },

  announcementBody: {
    type: String,
    required: true,
  },
});

const adminannouncements = mongoose.model(
  "adminannouncements",
  adminannouncementSchema
);
export default adminannouncements;
