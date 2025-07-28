const mongoose = require('mongoose');

const finalReport = new mongoose.Schema({
    userId: { type: String, required: true },
    companyId: { type: String, required: true },

    Student_Name: String,
    Stu_Surname: String,
    Student_ID: String,
    Stu_telephone: String,
    Stu_email: String,
    Company_Name: String,
    Current_sem: String,
    Final_ReportTitle: String,

    Upload_FinalReport: String,

    Signature_Student: String,
    Date_Student: Date,

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FinalReport', finalReport);
