const FinalReport = require('../models/finalReport');
const cloudinary = require('../utils/cloudinary');
const streamifier = require('streamifier');

exports.uploadFinalReport = async (req, res) => {
    try {
        const {
            userId,
            companyId,
            link,
            Student_Name,
            Stu_Surname,
            Student_ID,
            Stu_telephone,
            Stu_email,
            Company_Name,
            Current_sem,
            Final_ReportTitle,
            Signature_Student,
            Date_Student
        } = req.body;

        if (!userId || !companyId) {
            return res.status(400).json({ error: 'userId and companyId are required.' });
        }

        const reportData = {
            userId,
            companyId,
            Student_Name,
            Stu_Surname,
            Student_ID,
            Stu_telephone,
            Stu_email,
            Company_Name,
            Current_sem,
            Final_ReportTitle,
            Signature_Student,
            Date_Student
        };

        // If a file is uploaded, upload it to Cloudinary
        if (req.file) {
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: 'auto' },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result);
                        }
                    );
                    streamifier.createReadStream(buffer).pipe(stream);
                });
            };

            const result = await streamUpload(req.file.buffer);
            reportData.Upload_FinalReport = result.secure_url;

            const report = new FinalReport(reportData);
            await report.save();
            return res.status(200).json(report);
        } else if (link) {
            reportData.Upload_FinalReport = link;

            const report = new FinalReport(reportData);
            await report.save();
            return res.status(200).json(report);
        } else {
            return res.status(400).json({ error: 'Either a file or link must be provided.' });
        }
    } catch (err) {
        console.error('Upload failed:', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


// Optionally: get report by userId or companyId
exports.getReports = async (req, res) => {
    const { userId, companyId } = req.query;

    try {
        const query = {};
        if (userId) query.userId = userId;
        if (companyId) query.companyId = companyId;

        const reports = await FinalReport.find(query);
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reports.' });
    }
};

exports.getReportsBatch = async (req, res) => {
  try {
    const { userIds, companyIds } = req.body;

    if ((!userIds || userIds.length === 0) && (!companyIds || companyIds.length === 0)) {
      return res.status(400).json({ error: 'Provide at least userIds or companyIds arrays.' });
    }

    const query = {};

    if (userIds && userIds.length > 0) {
      query.userId = { $in: userIds };
    }
    if (companyIds && companyIds.length > 0) {
      query.companyId = { $in: companyIds };
    }

    const reports = await FinalReport.find(query);
    res.status(200).json(reports);
  } catch (err) {
    console.error('Batch fetch error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};