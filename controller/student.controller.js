
const dotenv = require("dotenv");
const studentModel = require("../model/student.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();

const {cloudinary} = require('./assignment.controller.js');

const isvalidRequestBody = function (requestbody) {
  return Object.keys(requestbody).length > 0;
};

const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

async function register(req, res) {
  try {
    let data = req.body;

    if (!isvalidRequestBody(data)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter required fields" });
    } else {
      const {
        firstName,
        lastName,
        schoolName,
        email,
        mobile,
        password,
        photoPath,
      } = data;

      // Check if required fields are present
      if (
        !firstName ||
        !lastName ||
        !email ||
        !mobile ||
        !password ||
        !schoolName
      ) {
        return res
          .status(400)
          .json({ message: "Please provide all required fields" });
      }

      // Regular expression for validating a mobile number
      const mobileNumberPattern = /^[6-9]\d{9}$/;
      if (mobileNumberPattern.test(mobile)) {
        // console.log("Valid mobile number");
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Invalid mobile number" });
      }

      // Regular expression for validating an email address
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailPattern.test(email)) {
        // console.log("Valid email address");
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Invalid email address" });
      }

      // Validate password length
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }

      // Validate first name
      if (!/^[A-Za-z]+$/.test(firstName)) {
        return res
          .status(400)
          .json({ message: "First name should contain only letters" });
      }

      // Validate last name
      if (!/^[A-Za-z]+$/.test(lastName)) {
        return res
          .status(400)
          .json({ message: "Last name should contain only letters" });
      }

      // Check if student with this email already exists
      const existingStudent = await studentModel.findOne({ email });
      if (existingStudent) {
        return res
          .status(400)
          .json({ message: "Student with this email already exists" });
      }

      // Check if student with this mobile number already exists
      const existingMobile = await studentModel.findOne({ mobile });
      if (existingMobile) {
        return res
          .status(400)
          .json({ message: "Student with this mobile number already exists" });
      }

      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const photo = await cloudinary.uploader.upload(photoPath)
      const newStudent = {
        firstName,
        lastName,
        schoolName,
        email,
        mobile,
        password: hashedPassword,
        photo:photo.url,
      };

      const savedStudent = await studentModel.create(newStudent);

      res
        .status(201)
        .json({
          message: "Student registered successfully",
          student: savedStudent,
        });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ status: false, message: e.message });
  }
}

//================================================ login user controller ====================================================================//

const login = async function (req, res) {
  try {
    const { mobile, password } = req.body;

    if (!mobile) {
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    }

    const mobileNumberPattern = /^[6-9]\d{9}$/;
    if (mobileNumberPattern.test(mobile)) {
      console.log("Valid mobile number");
    } else {
      return res
        .status(400)
        .send({ status: false, message: "Invalid mobile number" });
    }

    const checkedUser = await studentModel.findOne({ mobile });
    if (!checkedUser) {
      return res
        .status(404)
        .send({ status: false, message: "no user with this mobileNo." });
    }

    let userId = checkedUser._id;

    const match = await bcrypt.compare(password, checkedUser.password);
    if (!match) {
      return res.status(400).send({ status: false, message: "password wrong" });
    }

    const token = jwt.sign({ userId }, "sainath", { expiresIn: 60000 });

    const result = { userId, token };
    return res
      .status(200)
      .send({ status: true, message: "User login successfull", data: result });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { register, login };
//so for third case what i will doing is 
//upload the file & create a document in files collection which will be having all the studentId's & also
//& also updating the assignment key: array in student collection, with the help of update many
