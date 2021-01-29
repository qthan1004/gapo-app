//IMPORT SCHEMA
const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email: String,
        password: String,
        firstname: String,
        lastname: String,
        birthday: String,
        gender: String
    },
    {
        collection: "Users"
    });

module.exports = mongoose.model('User', userSchema)

