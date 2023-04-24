const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const studentModel = require("../model/student.model.js");
const bcrypt = require('bcrypt');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



  const isvalidRequestBody = function (requestbody) {
    return Object.keys(requestbody).length > 0;
  }
  
  const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
  }
  

async function register(req, res) {

    let data = req.body;

  
    if (!isvalidRequestBody(data)) {
           return res.status(400).send({ status: false, message: "please enter required fields" });

    } else {
        const {   firstName,
            lastName,
            schoolName,
            email,
            mobile,
            password,
            photo } = data;

              // Check if required fields are present
  if (!firstName || !lastName || !email || !mobile || !password || !schoolName) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

// Regular expression for validating a mobile number
const mobileNumberPattern = /^[6-9]\d{9}$/;
  if (mobileNumberPattern.test(mobile)) {
    console.log("Valid mobile number");
  } else {
    console.log("Invalid mobile number");
  }

// Regular expression for validating an email address
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (emailPattern.test(email)) {
  console.log("Valid email address");
} else {
  console.log("Invalid email address");
}

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  // Validate first name
  if (!/^[A-Za-z]+$/.test(firstName)) {
    return res.status(400).json({ message: 'First name should contain only letters' });
  }

  // Validate last name
  if (!/^[A-Za-z]+$/.test(lastName)) {
    return res.status(400).json({ message: 'Last name should contain only letters' });
  }

        // Check if student with this email already exists
        const existingStudent = await studentModel.findOne({ email});
        if (existingStudent) {
          return res.status(400).json({ message: 'Student with this email already exists' });
        }
    
        // Check if student with this mobile number already exists
        const existingMobile = await studentModel.findOne({ mobile });
        if (existingMobile) {
          return res.status(400).json({ message: 'Student with this mobile number already exists' });
        }
    
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = {   firstName,
            lastName,
            schoolName,
            email,
            mobile,
            password:hashedPassword,
            photo }


            const savedStudent = await studentModel.create(newStudent)

        res.status(201).json({ message: 'Student registered successfully', student: savedStudent });
}
}

module.exports = { register };
