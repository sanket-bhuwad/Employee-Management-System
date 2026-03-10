const express = require('express');
const { login, signup } = require('../controllers/authController');
const {
	normalizeLoginBody,
	validateLoginBody,
	normalizeSignupBody,
	validateSignupBody
} = require('../middleware/validators/authValidation');

const router = express.Router();

router.post('/login', normalizeLoginBody, validateLoginBody, login);
router.post('/signup', normalizeSignupBody, validateSignupBody, signup);

module.exports = router;
