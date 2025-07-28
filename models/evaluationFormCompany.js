const mongoose = require('mongoose');

const CooperativeEvaluationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    student: {
        firstName: String,
        lastName: String,
        program: {
        type: String,
        default: 'Information Communication Technology Program, Rangsit University International College',
        },
    },
    evaluator: {
        organizationName: String,
        firstName: String,
        lastName: String,
        division: String,
        position: String,
        email: String,
    },
    scores: {
        quantityOfWork: Number,
        qualityOfWork: Number,
        academicAbility: Number,
        abilityToLearn: Number,
        practicalAbility: Number,
        judgment: Number,
        managementAndPlanning: Number,
        communicationSkills: Number,
        foreignLanguageAndCulture: Number,
        jobSuitability: Number,
        responsibility: Number,
        interestInWorking: Number,
        initiative: Number,
        responseToSupervision: Number,
        personality: Number,
        interpersonalSkills: Number,
        discipline: Number,
        ethics: Number,
    },
    comments: {
        strengths: String,
        suggestions: String,
        other: String,
    },
    summary: {
        studentHelpful: {
        type: String,
        enum: ['Yes', 'No'],
        },
        futureOffer: {
        type: String,
        enum: ['Yes', 'No', 'Not Sure'],
        },
        totalScore: Number,
    },
    signature: {
        evaluatorName: String,
        position: String,
    },
    dateEvaluated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('CooperativeEvaluationCompany', CooperativeEvaluationSchema);
