const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  filetype: { type: String, enum: ['PDF', 'Word', 'PPT', 'Image'] },
  students: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    default: []
  }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
