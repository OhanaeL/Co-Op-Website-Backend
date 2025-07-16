const ICTCE01 = require('../models/ICTCE01');
const cloudinary = require('../utils/cloudinary');

// Helper to upload file buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(fileBuffer);
  });
};

// CREATE ICTCE01 form with attachments
exports.createICTCE01 = async (req, res) => {
  try {
    const { userId, company, student, emergencyContact, family, relatives, education, trainings, objectives, activities } = req.body;

    const attachmentFiles = req.files || [];
    const uploadedAttachments = [];
    for (const file of attachmentFiles) {
      const result = await uploadToCloudinary(file.buffer);
      uploadedAttachments.push({ url: result.secure_url, publicId: result.public_id });
    }

    const newForm = new ICTCE01({
      userId,
      company: JSON.parse(company),
      student: JSON.parse(student),
      emergencyContact: JSON.parse(emergencyContact),
      family: JSON.parse(family),
      relatives: JSON.parse(relatives),
      education: JSON.parse(education),
      trainings: JSON.parse(trainings),
      objectives: JSON.parse(objectives),
      activities: JSON.parse(activities),
      attachments: uploadedAttachments
    });

    const user = await User.findById(userId);
    if (user && user.currentStep === 0) {
      user.currentStep = 1;
      await user.save();
    }

    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// READ all ICTCE01 forms
exports.getAllICTCE01 = async (req, res) => {
  try {
    const forms = await ICTCE01.find();

    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getICTCE01ById = async (req, res) => {
  try {
    let form = await ICTCE01.findById(req.params.id);
    if (!form) return res.status(404).json({ error: 'Not found' });
    res.json(form);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE ICTCE01 by id (support attachments upload)
exports.updateICTCE01 = async (req, res) => {
  try {
    const updates = req.body;

    const attachmentFiles = req.files || [];
    if (attachmentFiles.length > 0) {
      const uploadedAttachments = [];
      for (const file of attachmentFiles) {
        const result = await uploadToCloudinary(file.buffer);
        uploadedAttachments.push({ url: result.secure_url, publicId: result.public_id });
      }
      updates.attachments = uploadedAttachments;
    }

    ['company', 'student', 'emergencyContact', 'family', 'relatives', 'education', 'trainings', 'objectives', 'activities'].forEach(field => {
      if (updates[field]) {
        try {
          updates[field] = JSON.parse(updates[field]);
        } catch {}
      }
    });

    const updatedForm = await ICTCE01.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedForm) return res.status(404).json({ error: 'Not found' });

    res.json(updatedForm);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE ICTCE01 by id
exports.deleteICTCE01 = async (req, res) => {
  try {
    const deleted = await ICTCE01.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
