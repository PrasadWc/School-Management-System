import teacherannouncements from "../models/teacherAnnouncements.js";

export const AddteacherAnnouncement = async (req, res) => {
  const { announcementCaption, announcementBody } = req.body;

  const newteacherAnnouncement = new teacherannouncements({
    announcementCaption,
    announcementBody,
  });

  try {
    await newteacherAnnouncement.save();
    res.status(201).json({ message: "teacherAnnouncement saved successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getteacherAnnouncements = async (req, res) => {
  try {
    const teacherAnnouncements = await teacherannouncements.find();
    res.json(teacherAnnouncements);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
