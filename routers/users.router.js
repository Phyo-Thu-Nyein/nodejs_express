const express = require('express');
const userCtrl = require('../controllers/users.ctrl'); //user ctrl

const usersRouter = express.Router();

usersRouter.route("/").get(userCtrl.getAllUsers)

// usersRouter.route("/login").post(userCtrl.getAllUsers)


module.exports = usersRouter;