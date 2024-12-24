import mongoose from "mongoose";
import Students from "../models/studentmodel.js";
import Classes from "../models/classmodel.js";
import Teachers from "../models/teachersmodel.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const {
    studentName,
    studentIndexNo,
    className,
    parentName,
    parentEmail,
    password,
  } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the corresponding class by name
    const classObj = await Classes.findOne({ className }).session(session);
    if (!classObj) {
      throw new Error(`Class with name ${className} not found`);
    }

    const newStudent = new Students({
      studentName,
      studentIndexNo,
      parentName,
      parentEmail,
      password,
    });

    const savedStudent = await newStudent.save({ session });
    classObj.students.push(savedStudent._id);
    await classObj.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Student Added Successfully!" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const signin = async (req, res) => {
  const { studentIndexNo, password } = req.body;

  try {
    // Find the student by studentIndexNo
    const validStudent = await Students.findOne({ studentIndexNo });
    if (!validStudent) {
      return res.status(404).json({ message: "Student Not Found" });
    }

    // Check if the password is correct
    if (validStudent.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Find the class that contains the student's object ID
    const studentClass = await Classes.findOne({ students: validStudent._id })
      .populate({
        path: "classTeacher", // Populate the classTeacher field with details from the Teachers collection
        select: "teacherName teacherEmail teacherContactNo", // Select specific fields to return
      })
      .exec();

    if (!studentClass) {
      return res
        .status(404)
        .json({ message: "Class not found for this student" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: validStudent._id }, process.env.JWT_SECRET);

    // Prepare the student data without the password
    const studentWithoutPassword = {
      ...validStudent.toObject(),
      password: undefined,
    };

    // Add class and teacher details to the response
    const response = {
      student: studentWithoutPassword,
      className: studentClass.className,
      classTeacher: studentClass.classTeacher,
      teacherContactNo: studentClass.teacherContactNo, // Add the populated classTeacher details
    };

    // Send the response with the token and student, class, and teacher details
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
