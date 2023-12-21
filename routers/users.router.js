const express = require('express');
const userCtrl = require('./controllers/users.ctrl'); //user ctrl

const usersRouter = express.Router();

usersRouter.route("/").get(userCtrl)

usersRouter.route("/login").post(userCtrl.)


module.exports = usersRouter;