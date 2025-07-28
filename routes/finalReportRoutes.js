const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const finalReportController = require('../controllers/finalReportController');

// Upload final report (file or link)
router.post('/upload', upload.single('file'), finalReportController.uploadFinalReport);

// Get reports by userId/companyId
router.get('/', finalReportController.getReports);

// Batch get reports by arrays of userIds or companyIds
router.post('/batch', finalReportController.getReportsBatch);

module.exports = router;
