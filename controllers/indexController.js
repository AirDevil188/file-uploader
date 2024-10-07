const multer = require("multer");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getIndex = asyncHandler(async (req, res, next) => {
  const currentUrl = req.url;
  const folders = await db.getFolders(null);

  if (res.locals.currentUser) {
    res.render("index", {
      title: "CloudUp - Homepage",
      folders: folders,
      currentUrl: currentUrl,
      currentFolder: "/",
    });
  } else {
    res.redirect("/log-in");
  }
});

module.exports = {
  getIndex,
};
