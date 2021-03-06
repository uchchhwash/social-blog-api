const { clearImage } = require('../utils/multer');
const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = async(req, res, next) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = 5;
        const totalItems = await Post.find()
            .countDocuments();
        const posts = await Post.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage);

        res.status(200).json({ posts, totalItems });
    } catch (error) {
        if (!err) {
            err.statusCode = 500;
        }
        next(err);
    }
}



exports.getPostByID = async(req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findOne({ _id: postId })
        if (!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(post);
    } catch (error) {
        if (!err) {
            err.statusCode = 500;
        }
        next(err);
    }
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
    let creator;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: req.userId
    })
    post.save()
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            creator = user;
            user.posts.push(post);
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'Post Created Successfully',
                post: post,
                creator: { _id: creator._id, name: creator.name }
            })
        })
        .catch(err => {
            if (!err) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updatePost = (req, res, next) => {
    if (!req.file) {
        const error = new Error('No Image Provided!');
        error.statusCode = 422;
        throw error;
    }

    let updatedPost;
    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.file.path;
    const creator = req.userId;

    Post.findOne({ _id: postId }).then(post => {
            if (!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            if (post.creator.toString() !== req.userId) {
                const error = new Error('Not Authorised!');
                error.statusCode = 403;
                throw error;
            }
            if (imageUrl !== post.imageUrl) {
                clearImage(post.imageUrl);
            }
            post.title = title;
            post.content = content;
            post.imageUrl = imageUrl;
            post.creator = creator;
            updatedPost = post;
            return post.save();
        })
        .then(result => res.status(200).json({ message: "Post Updated", updatedPost }))
        .catch(err => {
            if (!err) {
                err.statusCode = 500;
            }
            next(err);
        });
}


exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;

    Post.findOne({ _id: postId }).then(post => {
            if (!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            if (post.creator.toString() !== req.userId) {
                const error = new Error('Not Authorised!');
                error.statusCode = 403;
                throw error;
            }
            clearImage(post.imageUrl);
            return Post.findByIdAndRemove(postId);
        })
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            user.posts.pull(postId);
            return user.save();
        })
        .then(result => res.status(200).json({ message: "Post Deleted", postId }))
        .catch(err => {
            if (!err) {
                err.statusCode = 500;
            }
            next(err);
        });
}