const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const ictce01Controller = require('../controllers/ICTCE01Controller');
const User = require('../models/User');
const ICTCE01 = require('../models/ICTCE01');

router.post('/', upload.array('attachments', 10), ictce01Controller.createICTCE01);
router.get('/', ictce01Controller.getAllICTCE01);
router.get('/:id', ictce01Controller.getICTCE01ById);
router.put('/:id', upload.array('attachments', 10), ictce01Controller.updateICTCE01);
router.delete('/:id', ictce01Controller.deleteICTCE01);

router.get('/company-emails-filtered', async (req, res) => {
  try {
    const companyEmails = await ICTCE01.distinct('company.email');

    const usersWithEmails = await User.find(
      { email: { $in: companyEmails } },
      { email: 1, _id: 0 }
    );

    const userEmails = usersWithEmails.map(u => u.email);
    const filteredEmails = companyEmails.filter(email => !userEmails.includes(email));

    res.json(filteredEmails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
