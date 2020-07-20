const express = require('express');
const router = express.Router();

const feedController = require('../controllers/feed');

const validator = require('../middleware/validator');
const isAuth = require('../middleware/is-auth');
const { multerHandler } = require('../utils/multer');

router.get('/posts', isAuth, feedController.getPosts);
router.get('/post/:postId', isAuth, feedController.getPostByID);
router.post('/post', isAuth, validator.postValidator, multerHandler, feedController.createPost);
router.put('/post/:postId', isAuth, feedController.updatePost);
router.delete('/post/:postId', isAuth, feedController.deletePost);
module.exports = router;