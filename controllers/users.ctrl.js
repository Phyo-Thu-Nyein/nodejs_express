const fs = require('fs');
const User = require('../models/users.model');
const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));


exports.getAllUsers = async (req, res) => {
    try {
        const dbUsers = await User.find();
        res.status(200).json({
            message: "success",
            results: dbUsers.length,
            data: dbUsers,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: "smth went wrong",
        });
    }
}

exports.register = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json({
            status: "success",
            message: "New user registered successfully",
            data: newUser,
        });
    } catch (error) {
        res.status(200).json({
            status: "fail",
            message: "something went wrong",
            error: error.message,
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const oneUser = await User.findOne({email: email}).lean();
        if (!oneUser) {
            return res.status(401).json({
                status: "fail",
                message: "user not found"
            });
        }
        if (oneUser.password !== password) {
            return res.status(401).json({
                status: "fail",
                message: "password incorrect",
                // pswfrombody: password,
                // pswfromdb: oneUser.password,
            });
        }
        res.status(200)
        res.json({
            status: "success",
            message: "You are now logged in!"
        });
    } catch (err) {
        res.status(401).json({
            status: "fail",
            message: "smth wrong",
            error: err.message
        });
    }
}

exports.getUserByID = async (req, res) => {
    try {
        const oneUser = await User.findById(req.params.id);
        res.status(200).json({
            message: "success",
            data: oneUser,
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
}

exports.updateUserByID = async (req, res) => {
    const oneUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    try {
        res.status(200).json({
            message: 'success',
            data: {
                oneUser, // Return the Updated Tour
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
}

exports.deleteUserByID = async (req, res) => {
    try {
        const oneUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'successfully deleted',
            data: oneUser,
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}

// exports.login = (req, res) => {
//     const { email, password } = req.body;
//     const user = users.find((el) => el.email === email);

//     if (!user) {
//         return res.status(200).json({
//             status: "fail",
//             message: "user not found"
//         });
//     }
//     if (user.password != password) {
//         return res.status(200).json({
//             status: "fail",
//             message: "password incorrect"
//         });
//     }
//     res.status(200)
//     res.json({
//         status: "Success",
//         message: "You are now logged in!"
//     });
// }