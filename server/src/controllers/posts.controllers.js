const Post = require('../models/posts.model')

module.exports.getPosts = async (req, res) => {
    const posts = await Post.find();
    res.json({ isSuccess: true, posts })
}

module.exports.postPost = (req, res) => {
    const { author, content } = req.body

    if (!author || !content) {
        return res.json({
            isSuccess: false,
            message: 'Thiếu thông tin được yêu cầu',
        });
    }

    const newPost = new Post({
        ...req.body,
        reaction: {
            like: 0,
            smile: 0,
            angry: 0,
            love: 0,
            suprise: 0
        },
        groupID: '',
        comments: []
    })

    newPost.save(function (err, doc) {
        if (err) {
            return res.json({
                isSuccess: false,
                message: 'Database error',
            })
        } else {
            return res.json({
                isSuccess: true,
                message: 'Bài viết đã được tạo',
                newPost: doc,
            })
        }
    });
}

module.exports.updatePost = (req, res) => {
    if (!req.params.id) {
        return res.json({
            isSuccess: false, message: 'Thiếu thông tin yêu cầu'
        });
    }
    console.log('req.body', req.body)

    Post.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
        if (err) {
            return res.json({
                isSuccess: false,
                message: 'Error in updating person with id',
            })
        }
        return res.json({ isSuccess: true, updatedPost: req.body });
    })
}