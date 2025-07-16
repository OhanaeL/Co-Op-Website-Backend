const express = require('express');
const router = express.Router();

const {
	getUserById,
	getCurrentUser,
	updateUserById,
	deleteUserById,
	getMultipleUsersByIds,
	getUsersWithStep1AndForms,
	connectStudentAndCompany
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

// Get user by ID (public or protected)
router.get('/:userId', authMiddleware, getUserById);

// Get current logged-in user
router.get('/me', authMiddleware, getCurrentUser);

// Update user by ID
router.put('/:userId', authMiddleware, updateUserById);

// Delete user by ID
router.delete('/:userId', authMiddleware, deleteUserById);

// Get multiple users by IDs
router.post('/batch', authMiddleware, getMultipleUsersByIds);


router.get('/check-user-email/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const exists = await User.exists({ email: email });
    res.json({ exists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/step1-with-forms', getUsersWithStep1AndForms);

router.post('/ajarn/connect', connectStudentAndCompany);

module.exports = router;
