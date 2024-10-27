/* eslint-disable no-unused-vars */
import Student from "../model/studentModel.js";

export const create = async (req, res) => {
  try {
    if (await Student.findOne({ studentCode: req.body.studentCode })) {
      return res.status(400).json({ error: "Student Code already exists." });
    }
    const savedStudent = await new Student(req.body).save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const fetch = async (req, res) => {
  try {
    const students = await Student.find().lean();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const getByID = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student Not Found." });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id || req.query.id;
    const studentExist = await Student.findById(studentId);
    if (!studentExist) {
      return res.status(404).json({ message: "Student Not Found." });
    }

    await Student.findByIdAndDelete(studentId);
    res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const update = async (req, res) => {
  try {
    const studentExist = await Student.findById(req.params.id);
    if (!studentExist)
      return res.status(404).json({ message: "Student not found." });

    if (
      await Student.findOne({
        studentCode: req.body.studentCode,
        _id: { $ne: req.params.id },
      })
    ) {
      return res.status(400).json({ error: "Student code already exists." });
    }

    Object.assign(studentExist, req.body);
    await studentExist.save();
    res.status(200).json({ message: "Student updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};
