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
    res.status(201).json({
        message: "Post Created Successfully!",
        post: {
            _id: 101,
            title: title,
            content: content,
            creator: {
                name: "rdx"
            },
            createdAt: new Date()

        }
    })
}