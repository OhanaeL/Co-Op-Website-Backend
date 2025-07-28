const JobSupervisorEvaluation = require('../models/evaluationFormSupervisor');

exports.submitEvaluation = async (req, res) => {
  try {
    const evaluation = new JobSupervisorEvaluation(req.body);
    await evaluation.save();
    res.status(201).json({ message: 'Evaluation submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit evaluation' });
  }
};

exports.getEvaluations = async (req, res) => {
  try {
    const { userId, studentId } = req.query;
    const filter = {};
    if (userId) filter.userId = userId;
    if (studentId) filter.studentId = studentId;

    const evaluations = await JobSupervisorEvaluation.find(filter);
    res.status(200).json(evaluations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch evaluations' });
  }
};
