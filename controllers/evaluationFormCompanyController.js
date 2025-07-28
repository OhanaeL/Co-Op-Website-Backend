const CooperativeEvaluation = require('../models/evaluationFormCompany');

exports.submitEvaluation = async (req, res) => {
  try {
    const {
      userId,
      studentId,
      student,
      evaluator,
      scores,
      comments,
      summary,
      signature,
    } = req.body;

    if (!userId || !studentId || !scores) {
      return res.status(400).json({ error: 'userId, studentId, and scores are required.' });
    }

    const totalScore = Object.values(scores).reduce((sum, val) => sum + Number(val || 0), 0);

    const evaluation = new CooperativeEvaluation({
      userId,
      studentId,
      student,
      evaluator,
      scores,
      comments,
      summary: {
        ...summary,
        totalScore,
      },
      signature,
    });

    await evaluation.save();
    res.status(200).json(evaluation);
  } catch (err) {
    console.error('Evaluation submission error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.getEvaluations = async (req, res) => {
  try {
    const { userId, studentId } = req.query;
    const query = {};
    if (userId) query.userId = userId;
    if (studentId) query.studentId = studentId;

    const results = await CooperativeEvaluation.find(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch evaluations.' });
  }
};

exports.getEvaluationsBatch = async (req, res) => {
  try {
    const { userIds, studentIds } = req.body;
    const query = {};
    if (userIds && userIds.length > 0) query.userId = { $in: userIds };
    if (studentIds && studentIds.length > 0) query.studentId = { $in: studentIds };

    const results = await CooperativeEvaluation.find(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch evaluations.' });
  }
};
