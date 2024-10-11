const multer = require("multer");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const createDriveFolder = asyncHandler(async (req, res, next) => {
  const driveFolder = await db.getDriveFolder("drive");
  if (!driveFolder) {
    await db.createDriveFolder(res.locals.currentUser.id);
    const driveFolder = await db.getDriveFolder("drive");
    res.redirect(`drive/${driveFolder.id}`);
  }
  res.redirect(`drive/${driveFolder.id}`);
});

const getIndex = asyncHandler(async (req, res, next) => {
  const driveFolder = await db.getFolder(req.params.id);
  const currentUrl = req.url;
  const folders = await db.getFolders(driveFolder.id);
  console.log(req.params.id);

  res.render("index", {
    title: "CloudUp - Homepage",
    folders: folders,
    currentUrl: currentUrl,
    currentFolder: driveFolder,
  });
});

module.exports = {
  getIndex,
  createDriveFolder,
};
