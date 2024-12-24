import Teachers from "../models/teachersmodel.js";
import jwt from "jsonwebtoken";
import Classes from "../models/classmodel.js";

export const addTeacher = async (req, res) => {
  const { teacherID, teacherName, teacherEmail, teacherContactNo, password } =
    req.body;
  const newTeacher = new Teachers({
    teacherID,
    teacherName,
    teacherEmail,
    teacherContactNo,
    password,
  });

  try {
    await newTeacher.save();
    res.status(201).json({ message: "Teacher Added successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getallteachers = async (req, res) => {
  try {
    const allteachers = await Teachers.find();
    res.json(allteachers);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//delete a teacher
export const deleteTeacher = async (req, res) => {
  try {
    await Teachers.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Delete Success" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const signin = async (req, res) => {
  const { teacherID, password } = req.body;

  try {
    // Find the teacher by teacherID
    const validTeacher = await Teachers.findOne({ teacherID });
    if (!validTeacher) {
      return res.status(404).json({ message: "Teacher Not Found" });
    }

    // Check if the password is correct
    if (validTeacher.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Find the class that the teacher is assigned to
    const teacherClass = await Classes.findOne({
      classTeacher: validTeacher._id,
    })
      .populate({
        path: "classTeacher", // Populate the classTeacher field with details from the Teachers collection
        select: "teacherName teacherEmail teacherContactNo", // Select specific fields to return
      })
      .exec();

    if (!teacherClass) {
      return res
        .status(404)
        .json({ message: "Class not found for this teacher" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: validTeacher._id }, process.env.JWT_SECRET);

    // Prepare the teacher data without the password
    const teacherWithoutPassword = {
      ...validTeacher.toObject(),
      password: undefined,
    };

    // Prepare class details
    const classDetails = {
      className: teacherClass.className,
      classId: teacherClass._id,
      studentsCount: teacherClass.students.length,
    };

    // Prepare the response
    const response = {
      teacher: teacherWithoutPassword,
      classDetails,
    };

    // Store the class details in localStorage (this should be done on the client-side)
    // localStorage.setItem('classDetails', JSON.stringify(classDetails));

    // Send the response with the token and teacher and class details
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
