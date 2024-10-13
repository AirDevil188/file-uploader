const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const userNameErr = "must contain at least 1 character.";
const passwordErr = "must contain at least 8 characters.";

const validateNewUser = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Username ${userNameErr}`),
  body("password").isLength({ min: 8 }).withMessage(`Password ${passwordErr}`),
  body("confirm_password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords don't match."),
];

const getLogIn = asyncHandler(async (req, res, next) => {
  return res.render("log-in", {
    title: "CloudUp - Log In",
  });
});

const getSignUp = asyncHandler(async (req, res, next) => {
  if (res.locals.currentUser) {
    res.redirect("/");
  } else {
    res.render("sign-up", {
      title: "Sign Up",
    });
  }
});

const postSignUp = [
  validateNewUser,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        title: "Sign Up",
        errors: errors.array(),
      });
    }
    const { username, password } = req.body;

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      await db.createUser(username, hashedPassword);
      res.redirect("/");
    });
  }),
];

module.exports = {
  getSignUp,
  getLogIn,
  postSignUp,
};
