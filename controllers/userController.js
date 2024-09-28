const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const getLogIn = asyncHandler(async (req, res, next) => {
  res.render("log-in", {
    title: "Index",
  });
});

const getSignUp = asyncHandler(async (req, res, next) => {
  res.render("sign-up", {
    title: "Sign Up",
  });
});

module.exports = {
  getLogIn,
  getSignUp,
};
