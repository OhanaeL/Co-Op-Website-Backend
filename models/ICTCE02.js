const mongoose = require('mongoose');

const ictce02Schema = new mongoose.Schema({
    Job_no: String,
    Company_Name: String,
    Com_address: String,
    Com_country: String,
    Com_postalcode: String,
    Com_tel: String,
    Com_fax: String,
    Com_email: String,
    Com_businessType: String,
    Com_EmployeeNo: String,
    Manager_name: String,
    Manager_position: String,
    Manager_department: String,
    ContactPerson_name: String,
    ContactPerson_position: String,
    ContactPerson_department: String,
    ContactPerson_tel: String,
    ContactPerson_fax: String,
    ContactPerson_email: String,
    No_students: Number,
    Required_Position1: String,
    Job1_Description: String,
    Required_Position2: String,
    Job2_Description: String,
    Other_conditions: String,
    Program_Duration: String,
    Working_hours: String,
    Working_days: String,
    Benefits: String,
    Accommodation: String,
    Transport_provided: String,
    Other_benefits: String,
    Recruitment: String,
    Signature_name: String,
    Signature_position: String,
    Signature_Date: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentEmails: [String]
});

module.exports = mongoose.model('Ictce02', ictce02Schema);
