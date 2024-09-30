const { Router } = require("express");
const passport = require("passport");

const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.get("/", userController.getLogIn);

userRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  })
);

userRouter.get("/sign-up", userController.getSignUp);

userRouter.post("/sign-up", userController.postSignUp);

module.exports = userRouter;
