const express = require('express');
const router = express.Router();

const {
  loginUser,
  registerUser,
  refreshToken,
  logoutUser,
  requestPasswordReset,
  resetPassword
} = require('../controllers/authController');

// Login
router.post('/login', loginUser);

// Register
router.post('/register', registerUser);

// Refresh token
router.post('/refresh', refreshToken);

// Logout
router.post('/logout', logoutUser);

// Request password reset (send email with token)
router.post('/password-reset/request', requestPasswordReset);

// Reset password (with token)
router.post('/password-reset/reset', resetPassword);

module.exports = router;
