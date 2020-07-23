const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const validator = require('../middleware/validator');

router.post('/signup', validator.userValidator, authController.signup);
router.post('/login', authController.login);
router.get('/status', authController.getUserStatus)
module.exports = router;