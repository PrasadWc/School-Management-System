import Assignments from "../models/assignmentmodel.js";

export const AddAssignment = async (req, res) => {
  const { assignmentCaption, Subject, assignmentBody, Class } = req.body;

  const newAssignment = new Assignments({
    assignmentCaption,
    Subject,
    assignmentBody,
    Class,
  });

  try {
    await newAssignment.save();
    res.status(201).json({ message: "Assignment saved successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getallAssignments = async (req, res) => {
  try {
    const allAssignments = await Assignments.find();
    res.json(allAssignments);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
