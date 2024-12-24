import Students from "../models/studentmodel.js";

// Get all students
export const getallstudents = async (req, res) => {
  try {
    const allstudents = await Students.find();
    res.json(allstudents);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get a single student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Students.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Delete a student
export const deleteStudent = async (req, res) => {
  try {
    await Students.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Delete Success" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
