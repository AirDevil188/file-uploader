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

const getDrive = asyncHandler(async (req, res, next) => {
  const currentUrl = req.url;
  const subFolders = await db.getFolders(
    req.params.id,
    res.locals.currentUser.id
  );
  const currentFolder = await db.getFolder(
    req.params.id,
    res.locals.currentUser.id
  );

  const files = await db.getFiles(req.params.id, res.locals.currentUser.id);

  if (!currentFolder) {
    const err = [{ msg: new Error("Folder not found") }];
    return res.status(404).render("index", {
      title: "Error - Folder Not Found",
      errors: err,
    });
  }

  return res.render("index", {
    title: `Folder - ${currentFolder.name}`,
    folders: subFolders,
    files: files,
    currentFolder: currentFolder,
    currentUrl: currentUrl,
    expires: null,
  });
});

module.exports = {
  getDrive,
  createDriveFolder,
};
