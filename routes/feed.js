const express = require('express');
const router = express.Router();

const feedController = require('../controllers/feed');

const validator = require('../middleware/validator');


router.get('/posts', feedController.getPosts);
router.get('/post/:postId', feedController.getPostByID);
router.post('/post', validator.postValidator, feedController.createPost);

module.exports = router;