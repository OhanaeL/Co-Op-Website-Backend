const mongoose = require('mongoose');

const consentForm = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the user who uploaded
    required: true,
    ref: 'User',
  },
  studentId: {
    type: String,  // Or ObjectId if you have a Student collection
    required: true,
  },
  file: {
    filename: {
      type: String,
      required: true,
    },
    fileUrl: {        // URL or path to the stored file (e.g., cloud storage link)
      type: String,
      required: true,
    },
    fileType: {
      type: String,   // e.g., 'application/pdf', 'image/png'
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = mongoose.model('ConsentForm', consentForm);
