const multer = require("multer");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const getIndex = asyncHandler(async (req, res, next) => {
  if (res.locals.currentUser) {
    res.render("index", {
      title: "CloudUp - Homepage",
    });
  } else {
    res.redirect("/log-in");
  }
});

module.exports = {
  getIndex,
};
