const express = require('express');
const router = express.Router();
const controller = require('../controllers/evaluationFormSupervisorController');

// Submit evaluation
router.post('/submit', controller.submitEvaluation);

// Get evaluations by userId/studentId
router.get('/', controller.getEvaluations);

module.exports = router;
