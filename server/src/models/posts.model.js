const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        author: String,
        content: String,
        time: String,
        reaction: {
            like: Number,
            smile: Number,
            angry: Number,
            love: Number,
            suprise: Number
        },
        groupID: String,
        comment: [
            {
                author: String,
                content: String,
                postID: String
            }
        ]
    },
    {
        collection: "posts"
    })
module.exports = mongoose.model('post', postSchema)
