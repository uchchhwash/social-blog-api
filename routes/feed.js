const express = require('express');
const router = express.Router();

const feedController = require('../controllers/feed');

const validator = require('../middleware/validator');
const isAuth = require('../middleware/is-auth');
const { multerHandler } = require('../utils/multer');

router.get('/posts', isAuth, feedController.getPosts);
router.get('/post/:postId', feedController.getPostByID);
router.post('/post', validator.postValidator, multerHandler, feedController.createPost);
router.put('/post/:postId', feedController.updatePost);
router.delete('/post/:postId', feedController.deletePost);
module.exports = router;