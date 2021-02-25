const Users = require('../models/users.model')

const getUserByEmail = (email, callBack) => {
    Users.find({ email }, (err, result) => {
        if (err) throw err
        return callBack(result)
    })
}


module.exports.checkUser = (req, res) => {
    const { email, password } = req.body
    getUserByEmail(email, (result) => {
        result = result[0]
        if (result) {
            if (result.password === password && result.email === email) {
                return res.json({
                    status: 'success',
                    id: result._id
                })
            } else {
                return res.json({
                    status: 'fail',
                    message: 'Mật khẩu hoặc tài khoản không đúng.'
                })
            }
        }
    })
}