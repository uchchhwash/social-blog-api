const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            title: "First Post",
            content: "This is the first post"
        }]
    })
}

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.body.imageUrl;
    const creator = req.body.creator;

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
        .catch(err => console.log(err));
}