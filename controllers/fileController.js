const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const db = require("../db/queries");
dotenv.config();

cloudinary.config().cloud_name;

const validateFile = [
  body("file_upload").isEmpty().withMessage("Select at least one file"),
];

const getFileDetails = asyncHandler(async (req, res, next) => {
  const file = await db.getFile(req.params.id, res.locals.currentUser.id);

  if (!file) {
    const errors = [{ msg: new Error("Folder not found") }];
    return res.status(404).render("file_details", {
      title: "Error File Not Found",
      errors: errors,
    });
  }

  return res.render("file_details", {
    title: `File - ${file.name}`,
    file: file,
    expires: req.params.expires,
  });
});

const postFileUpload = [
  validateFile,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const currentUrl = req.url;
    const currentFolder = await db.getFolder(
      req.params.id,
      res.locals.currentUser.id
    );

    if (!errors.isEmpty()) {
      const folders = await db.getFolders(
        currentFolder.id,
        res.locals.currentUser
      );
      const files = await db.getFiles(req.params.id, res.locals.currentUser.id);
      return res.status(400).render("index", {
        title: "CludUp - Homepage",
        errors: errors.array(),
        folders: folders,
        files: files,
        currentFolder: currentFolder,
        currentUrl: currentUrl,
      });
    }
    await Promise.all(
      req.files.map(async (file) => {
        const files = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
        });
        db.createFiles(
          file.originalname,
          file.size,
          files.url,
          files.resource_type,
          currentFolder.id,
          res.locals.currentUser.id,
          files.public_id
        );
      })
    );
    res.redirect(`/drive/${currentFolder.id}`);
  }),
];

const postDownloadFile = asyncHandler(async (req, res, next) => {
  const file = await db.getFile(req.params.id);

  const url = await cloudinary.url(file.publicId, {
    flags: "attachment",
    resource_type: file.type,
  });

  res.redirect(url);
});

const postDeleteFile = asyncHandler(async (req, res, next) => {
  const file = await db.getFile(req.params.id, res.locals.currentUser.id);

  await db.deleteFile(file.id, res.locals.currentUser.id);
  res.redirect(`/drive/${file.folderId}`);
});

const getFileSharedDetails = asyncHandler(async (req, res, next) => {
  const isFileOf = await db.isFileOf(req.params.expires, req.params.id);
  if (!isFileOf) {
    const errors = [{ msg: new Error("Shared file not found") }];
    return res.status(404).render("file-details", {
      title: "Error - File Not Found",
      errors: errors,
    });
  }
  const file = await db.getFile(req.params.id);

  res.render("file_details", {
    title: `Shared - ${file.name}`,
    file: file,
    expires: req.params.expires,
  });
});

module.exports = {
  getFileDetails,
  getFileSharedDetails,
  postFileUpload,
  postDownloadFile,
  postDeleteFile,
};
