const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    Post.find().then(post => {
            if (!post) {
                const error = new Error('No Post Available.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json(post);
        })
        .catch(err => {
            if (!err) {
                err.statusCode = 500;
            }
            next(err);
        });
}



exports.getPostByID = (req, res, next) => {
    const postId = req.params.postId;
    Post.findOne({ _id: postId }).then(post => {
            if (!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json(post);
        })
        .catch(err => {
            if (!err) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.createPost = (req, res, next) => {
    if (!req.file) {
        const error = new Error('No Image Provided!');
        error.statusCode = 422;
        throw error;
    }

    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.file.path;
    const creator = JSON.parse(req.body.creator);
    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: creator
    })
    post.save()
        .then(result => {
            res.status(201).json({
                message: 'Post Created Successfully',
                post: result
            })
        })
        .catch(err => {
            if (!err) {
                err.statusCode = 500;
            }
            next(err);
        });
}