const mongoose = require('mongoose');

const relativeSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    occupation: String,
    position: String,
    address: String
}, { _id: false });

const trainingSchema = new mongoose.Schema({
    yearsFrom: Number,
    yearsTo: Number,
    organizationAndAddress: String,
    positionJobTitle: String,
    jobDescription: String,
    topic: String
}, { _id: false });

const activitySchema = new mongoose.Schema({
    year: Number,
    position: String
}, { _id: false });

const educationSchema = new mongoose.Schema({
    level: {
        type: String,
        enum: ['primary', 'secondary', 'highschool', 'vocational', 'university']
    },
    schoolName: String,
    yearAttended: Number,
    yearGraduated: Number,
    certificate: String,
    major: String
}, { _id: false });

const ICTCE01Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Company
    company: {
        email: String,
        name: String,
        position: String,
        periodStart: Date,
        periodEnd: Date
    },

    // Student personal data
    student: {
        name: String,
        surname: String,
        title: String,
        studentID: String,
        recentGPA: Number,
        totalGPA: Number,
        passportNo: String,
        passportIssue: {
            place: String,
            date: Date,
            expiry: Date
        },
        ethnicity: String,
        nationality: String,
        dob: Date,
        placeOfBirth: String,
        age: Number,
        gender: String,
        heightCm: Number,
        weightKg: Number,
        medicalConditions: String,
        addressDuringIntern: String,
        tel: String,
        fax: String,
        email: String,
        permanentAddress: String,
        perTel: String,
        perFax: String,
        perEmail: String
    },

    // Emergency Contact
    emergencyContact: {
        fullName: String,
        relationship: String,
        occupation: String,
        placeWork: String,
        address: String,
        tel: String,
        fax: String,
        email: String
    },

    // Family
    family: {
        father: {
            name: String,
            age: Number,
            occupation: String
        },
        mother: {
            name: String,
            age: Number,
            occupation: String
        },
        address: String,
        tel: String,
        fax: String,
        email: String
    },

    // Relatives
    relatives: [relativeSchema],

    // Education background
    education: [educationSchema],

    // Previous trainings
    trainings: [trainingSchema],

    // Career objectives
    objectives: [String],

    // Student activities
    activities: [activitySchema],

    attachments: [],
}, { timestamps: true });

module.exports = mongoose.model('ICTCE01', ICTCE01Schema);
