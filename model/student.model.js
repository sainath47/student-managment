const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  schoolName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String ,// Assuming you'll store the URL/path of the photo
    default : "#"
  }
  ,
  assignments: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    default: []
  }
});

module.exports = mongoose.model('Student', studentSchema);
