const express = require('express');
const userCtrl = require('../controllers/users.ctrl'); //user ctrl

const usersRouter = express.Router();

usersRouter
    .route("/")
    .get(userCtrl.getAllUsers)

usersRouter
    .route("/login")
    .post(userCtrl.login)

usersRouter
    .route("/register")
    .post(userCtrl.register)

usersRouter
    .route("/:id")
    .get(userCtrl.getUserByID)
    .patch(userCtrl.updateUserByID)
    .delete(userCtrl.deleteUserByID);

module.exports = usersRouter;