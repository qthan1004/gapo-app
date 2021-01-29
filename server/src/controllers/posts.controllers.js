const Posts = require('../models/posts.model')

module.exports.getPosts = (req, res) => {
    Posts.find({}, (err, result) => {
        return res.json({ posts: result })
    })
}

module.exports.postPost = (req, res) => {
    const { ...postInfo } = req.body
    const post = new Posts(postInfo)
    post.save((err, result) => {
        if (err) throw err
        else {
            return res.json({ status: 200 })
        }
    })
}

module.exports.postComment = (req, res) => {
    Posts.findById(req.params.id, function (err, doc) {
        if (err) {
            return res.json({
                isSuccess: false,
                message: 'Error in post comment with id',
            })
        }
        doc.comment.push({ author: req.body.author, content: req.body.content })
        doc.save((err, doc) => {
            if (err) {
                return res.json({
                    isSuccess: false,
                    message: 'Error database',
                })
            }
            return res.json({
                isSuccess: true,
                message: 'complete',
                data: doc
            })
        })
    })
}