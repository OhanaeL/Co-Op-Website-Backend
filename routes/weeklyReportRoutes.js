const express = require('express');
const router = express.Router();
const weeklyReportController = require('../controllers/weeklyReportController');

// POST or PUT (create or update) a form by userId
router.post('/', weeklyReportController.createOrUpdateForm);

// GET a form by userId
router.get('/user/:userId', weeklyReportController.getFormByUserId);

// GET a form by MongoDB _id
router.get('/:id', weeklyReportController.getFormById);

// DELETE a form by userId
router.delete('/user/:userId', weeklyReportController.deleteFormByUserId);

module.exports = router;
