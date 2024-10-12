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

module.exports = {
  createDriveFolder,
};
