const asyncHandler = require("express-async-handler");

const isAuth = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/log-in");
  }
});

module.exports = {
  isAuth,
};
