const multer = require("multer");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getIndex = asyncHandler(async (req, res, next) => {
  const folders = await db.getFolders(null);
  const parent = req.params.name;

  if (res.locals.currentUser) {
    res.render("index", {
      title: "CloudUp - Homepage",
      folders: folders,
      parent: parent,
    });
  } else {
    res.redirect("/log-in");
  }
});

module.exports = {
  getIndex,
};
