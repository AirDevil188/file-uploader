const { Router } = require("express");
const passport = require("passport");

const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.get("/log-in", userController.getLogIn);

userRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  })
);

userRouter.get("/sign-up", userController.getSignUp);

userRouter.post("/sign-up", userController.postSignUp);

module.exports = userRouter;
