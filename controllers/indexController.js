const multer = require("multer");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const createDriveFolder = asyncHandler(async (req, res, next) => {
  const driveFolder = await db.getDriveFolder(res.locals.currentUser.id);
  if (!driveFolder) {
    await db.createDriveFolder(res.locals.currentUser.id);
    const driveFolder = await db.getDriveFolder(res.locals.currentUser.id);
    res.redirect(`drive/${driveFolder.id}`);
  }
  res.redirect(`drive/${driveFolder.id}`);
});

const getIndex = asyncHandler(async (req, res, next) => {
  const currentFolder = await db.getFolder(
    req.params.id,
    res.locals.currentUser.id
  );
  const currentUrl = req.url;

  if (!currentFolder) {
    return res.status(404).render("404");
  }

  const folders = await db.getFolders(
    currentFolder.id,
    res.locals.currentUser.id
  );

  res.render("index", {
    title: "CloudUp - Homepage",
    folders: folders,
    currentUrl: currentUrl,
    currentFolder: currentFolder,
  });
});

module.exports = {
  getIndex,
  createDriveFolder,
};
