const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const validator = require('../middleware/validator');
const isAuth = require('../middleware/is-auth');
router.post('/signup', validator.userValidator, authController.signup);
router.post('/login', authController.login);
router.get('/status', isAuth, authController.getUserStatus);
router.patch('/status', isAuth, authController.updateUserStatus);
module.exports = router;