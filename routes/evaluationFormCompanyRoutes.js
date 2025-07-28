const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationFormCompanyController');

// Submit evaluation
router.post('/submit', evaluationController.submitEvaluation);

// Get by userId or studentId
router.get('/', evaluationController.getEvaluations);

// Get by batch
router.post('/batch', evaluationController.getEvaluationsBatch);

module.exports = router;