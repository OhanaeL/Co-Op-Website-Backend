const mongoose = require('mongoose');

const jobSupervisorEvaluationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyId: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  supervisorFirstName: String,
  supervisorLastName: String,
  department: String,
  position: String,
  email: String,
  projectTitle: String,

  evaluation: {
    acknowledgement: { points: Number, comments: String },
    abstract: { points: Number, comments: String },
    tableOfContents: { points: Number, comments: String },
    objectives: { points: Number, comments: String },
    methodOfEducation: { points: Number, comments: String },
    results: { points: Number, comments: String },
    analysis: { points: Number, comments: String },
    conclusion: { points: Number, comments: String },
    generalComments: { points: Number, comments: String },
    idiomAndMeaning: { points: Number, comments: String },
    spelling: { points: Number, comments: String },
    pattern: { points: Number, comments: String },
    references: { points: Number, comments: String },
    appendix: { points: Number, comments: String }
  },

  otherComments: [String],

  evaluatorSignature: String,
  evaluatorName: String,
  evaluatorPosition: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JobSupervisorEvaluation', jobSupervisorEvaluationSchema);
