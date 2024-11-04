const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/UserController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getProfile);

module.exports = router;