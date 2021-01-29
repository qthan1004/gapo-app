const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        author: String,
        content: String,
        time: String,
        reaction: {
            like: Number,
            haha: Number,
            cry: Number,
            love: Number
        },
        comment: [
            {
                author: String,
                content: String
            }
        ]
    },
    {
        collection: "posts"
    })
module.exports = mongoose.model('post', postSchema)
