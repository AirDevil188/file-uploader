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

  return res.render("file-details", {
    title: "File Details",
    file: file,
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
    req.files.forEach(async (file) => {
      const files = await cloudinary.uploader.upload(file.path);
      await db.createFiles(
        file.originalname,
        file.size,
        files.url,
        files.resource_type,
        currentFolder.id,
        res.locals.currentUser.id,
        files.public_id
      );
      console.log(files);
    });
  }),
];

const postDownloadFile = asyncHandler(async (req, res, next) => {
  const file = await db.getFile(req.params.id, res.locals.currentUser.id);

  const url = await cloudinary.url(file.publicId, { flags: "attachment" });

  res.redirect(url);
});

const postDeleteFile = asyncHandler(async (req, res, next) => {
  const file = await db.getFile(req.params.id, res.locals.currentUser.id);

  await db.deleteFile(file.id, res.locals.currentUser.id);
  res.redirect(`/drive/${file.folderId}`);
});

module.exports = {
  getFileDetails,
  postFileUpload,
  postDownloadFile,
  postDeleteFile,
};
