
const { v4: uuidv4 } = require('uuid');

const users = require('../models/users.model');

module.exports.getUsers = async (req, res) => {
    const user = await users.find();
    res.json({ isSuccess: true, data: user })
}

module.exports.getUserById = async (req, res) => {
    const user = await users.findById(req.params.id);
    console.log(user)
    if (user) {
        return res.json({
            isSuccess: true,
            data: user,
        })
    }
    return res.json({
        isSuccess: false,
        message: 'User does not exist yet',
    })
}

module.exports.createUser = async (req, res) => {
    const { email, password, firstname, lastname, birthday, gender } = req.body;
    if (!email || !password || !firstname || !lastname || !birthday || !gender) {
        return res.json({
            isSuccess: false,
            message: "Missing require fields"
        })
    }

    const user = await users.findOne({ email })
    if (user) {
        return res.json({
            isSuccess: false,
            message: 'Email was registered'
        })
    }

    const newUser = new users({ ...req.body })
    newUser.save(function (err, doc) {
        if (err) {
            return res.json({
                isSuccess: false,
                message: 'Database error'
            })
        } else {
            return res.json({
                isSuccess: true,
                status: 'success',
                message: 'User is create',
                data: doc
            })
        }
    })
}

module.exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
        if (err) {
            return res.json({
                isSuccess: false,
                message: 'Error in updating person with id',
            })
        }
        return res.json({ isSuccess: true, data: doc });
    })
}

module.exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, function (err, response) {
        if (err) {
            return res.json({
                isSuccess: false,
                message: `Error in deleting record id ${req.params.id}`,
            })
        }
        return res.json({
            isSuccess: true,
            message: `Person with id ${req.params.id} removed`
        });
    })
}