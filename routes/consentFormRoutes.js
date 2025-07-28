const express = require('express');
const router = express.Router();
const upload = require('../utils/upload'); // Reuse the same Multer config
const consentFormController = require('../controllers/consentFormController');

// Upload consent form (file or link)
router.post('/upload', upload.single('file'), consentFormController.uploadConsentForm);

// Get consent forms by userId or studentId
router.get('/', consentFormController.getConsentForms);

// Batch get consent forms by arrays of userIds or studentIds
router.post('/batch', consentFormController.getConsentFormsBatch);

module.exports = router;
