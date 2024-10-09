const multer = require("multer");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getIndex = asyncHandler(async (req, res, next) => {
  const currentUrl = req.url;
  const folders = await db.getFolders(null);

  res.render("index", {
    title: "CloudUp - Homepage",
    folders: folders,
    currentUrl: currentUrl,
    currentFolder: "/",
  });

  res.redirect("/log-in");
});

module.exports = {
  getIndex,
};
