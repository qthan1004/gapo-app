const groups = require('../models/groups.model');

module.exports.getGroups = async (req, res) => {
    const group = await groups.find();
    res.json({ isSuccess: true, data: group })
}

module.exports.getGroupsById = async (req, res) => {
    const group = await groups.findById(req.params.id);
    console.log(groups)
    if (user) {
        return res.json({
            isSuccess: true,
            data: user,
        })
    }
    return res.json({
        isSuccess: false,
        message: 'Nhóm chưa tồn tại',
    })
}

module.exports.createGroup = async (req, res) => {
    const { name, memberID, decription } = req.body;
    console.log(name, memberID, decription)
    if (!name || !memberID) {
        return res.json({
            isSuccess: false,
            message: "Thiếu các trường yêu cầu"
        })
    }

    const group = await groups.findOne({ name })
    if (group) {
        return res.json({
            isSuccess: false,
            message: 'Tên nhóm đã được sử dụng'
        })
    }

    const newGroup = new groups({ ...req.body })
    newGroup.save(function (err, doc) {
        if (err) {
            return res.json({
                isSuccess: false,
                message: 'Lỗi database'
            })
        } else {
            return res.json({
                isSuccess: true,
                status: 'success',
                message: 'Nhóm được tạo thành công',
                data: doc
            })
        }
    })
}

module.exports.updateGroup = (req, res) => {
    groups.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
        if (err) {
            return res.json({
                isSuccess: false,
                message: 'Lỗi khi cập nhật thông tin với ID',
            })
        }
        return res.json({ isSuccess: true, data: doc });
    })
}

module.exports.deleteUser = (req, res) => {
    groups.findByIdAndRemove(req.params.id, function (err, response) {
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