const { Router } = require("express");

const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.get("/", userController.getLogIn);

userRouter.get("/sign-up", userController.getSignUp);

module.exports = userRouter;
