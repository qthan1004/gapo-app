const mongoose = require('mongoose')
const { Schema } = mongoose;

const groupSchema = new Schema(
    {
        name: String,
        decription: String,
        memberID: Array,
        postID: Array
    },
    {
        collection: "groups"
    });

module.exports = mongoose.model('group', groupSchema)
