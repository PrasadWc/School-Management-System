import adminannouncements from "../models/adminAnnouncements.js";

export const AddAdminAnnouncement = async (req, res) => {
  const { Audience, announcementCaption, announcementBody } = req.body;

  const newAdminAnnouncement = new adminannouncements({
    Audience,
    announcementCaption,
    announcementBody,
  });

  try {
    await newAdminAnnouncement.save();
    res.status(201).json({ message: "AdminAnnouncement saved successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAdminAnnouncements = async (req, res) => {
  try {
    const AdminAnnouncements = await adminannouncements.find();
    res.json(AdminAnnouncements);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
