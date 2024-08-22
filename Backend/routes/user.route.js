const { Router } = require('express');
const {addUser,verifyUser,validateUser } = require("../controllers/user.controller");
const UserRouter = Router()

UserRouter.route("/signup").post(addUser)
UserRouter.route("/").post(verifyUser)
UserRouter.route("/auth").post(validateUser)

module.exports = UserRouter;