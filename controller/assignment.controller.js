const studentModel = require('../model/student.model')
const assignmentModel = require('../model/assignment.model')
const mongoose = require('mongoose');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


async function createAssignment(req, res) {
    try {
      const data = req.body;
  
      if (!data.title || !data.description  || !data.filetype || !data.filepath  || !data.students || !Array.isArray(data.students) || data.students.length === 0) {
        return res.status(400).json({ message: "Please provide all required fields" });
      }
  
      // Check if students exist and are valid
      const studentIds = data.students.map((studentId) => new mongoose.Types.ObjectId(studentId));
      const students = await studentModel.find({ _id: { $in: studentIds } });
      if (students.length !== data.students.length) {
        return res.status(400).json({ message: "Invalid student ids" });
      }

console.log(data.filepath);

  const filepath = await cloudinary.uploader.upload(data.filepath)

// console.log(filepath,"filepath");



      // Create assignment object
      const newAssignment = {
        title: data.title,
        description: data.description,
        filepath: filepath ? filepath.url : null,
        filetype: data.filetype,
        filename: data.filename,
        students: studentIds
      };
  
      const savedAssignment = await assignmentModel.create(newAssignment);
  
      // Update students with the new assignment id
      const updatedStudents = await studentModel.updateMany({ _id: { $in: studentIds } }, { $push: { assignments: savedAssignment._id } });
  
      res.status(201).json({
        message: "Assignment created successfully",
        assignment: savedAssignment
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ status: false, message: e.message });
    }
  }
  //so now iam able to use the feature of updating students & assignment , now i have to put path by ;uploding the file

  module.exports = {createAssignment}