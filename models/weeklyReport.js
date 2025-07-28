const mongoose = require('mongoose');

const weeklyReport = new mongoose.Schema({
    userId: String,
    Student_Name: String,
    Stu_Surname: String,
    Student_ID: String,
    Stu_telephone: String,
    Stu_email: String,
    Company_Name: String,
    Current_sem: String,
    Week_no: String,
    Month_no: String,
    Total_hours: Number,
    Project_responsibility: String,
    Summary_tasks: String,
    Concepts_experiences: String,
    Problems_obstacles: String,
    Signature_JobSupervisor: String,
    Date_JobSupervisor: Date,
    Signature_Student: String,
    Date_Student: Date
});

module.exports = mongoose.model('WeeklyReport', weeklyReport);
