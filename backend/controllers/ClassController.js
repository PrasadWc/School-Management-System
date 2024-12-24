import Classes from "../models/classmodel.js";

export const AddClass = async (req, res) => {
  const { className, classTeacher, students } = req.body;

  const newClass = new Classes({
    className,
    classTeacher,
    students,
  });

  try {
    await newClass.save();
    res.status(201).json({ message: "Class saved successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get all classes
export const getallclasses = async (req, res) => {
  try {
    const allclasses = await Classes.find().populate({
      path: "classTeacher",
      select: "teacherName",
    });
    res.json(allclasses);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//update a class
export const updateClass = async (req, res) => {
  try {
    const updatedClass = await Classes.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          className: req.body.className,
          classTeacher: req.body.classTeacher,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// delete a class

export const deleteClass = async (req, res) => {
  try {
    await Classes.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Delete Success" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
