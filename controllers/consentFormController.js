const ConsentForm = require('../models/consentForm');
const cloudinary = require('../utils/cloudinary');
const streamifier = require('streamifier');

exports.uploadConsentForm = async (req, res) => {
  try {
    const { userId, studentId, link } = req.body;

    if (!userId || !studentId) {
      return res.status(400).json({ error: 'userId and studentId are required.' });
    }

    const consentData = {
      userId,
      studentId,
    };

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
      consentData.uploadUrl = result.secure_url;
    } else if (link) {
      consentData.uploadUrl = link;
    } else {
      return res.status(400).json({ error: 'Either a file or link must be provided.' });
    }

    const consent = new ConsentForm(consentData);
    await consent.save();
    return res.status(200).json(consent);
  } catch (err) {
    console.error('Upload failed:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.getConsentForms = async (req, res) => {
  const { userId, studentId } = req.query;

  try {
    const query = {};
    if (userId) query.userId = userId;
    if (studentId) query.studentId = studentId;

    const forms = await ConsentForm.find(query);
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch consent forms.' });
  }
};

exports.getConsentFormsBatch = async (req, res) => {
  try {
    const { userIds, studentIds } = req.body;

    if ((!userIds || userIds.length === 0) && (!studentIds || studentIds.length === 0)) {
      return res.status(400).json({ error: 'Provide at least userIds or studentIds arrays.' });
    }

    const query = {};
    if (userIds && userIds.length > 0) {
      query.userId = { $in: userIds };
    }
    if (studentIds && studentIds.length > 0) {
      query.studentId = { $in: studentIds };
    }

    const forms = await ConsentForm.find(query);
    res.status(200).json(forms);
  } catch (err) {
    console.error('Batch fetch error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
