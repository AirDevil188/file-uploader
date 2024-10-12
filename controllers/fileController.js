const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const db = require("../db/queries");
dotenv.config();

const validateFile = [
  body("file_upload").isEmpty().withMessage("Select at least one file"),
];

const postFileUpload = [
  validateFile,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const currentUrl = req.url;

    if (!errors.isEmpty()) {
      console.log("errors");
      const currentFolder = await db.getFolder(
        req.params.id,
        res.locals.currentUser.id
      );
      const folders = await db.getFolders(
        currentFolder.id,
        res.locals.currentUser
      );
      return res.status(400).render("index", {
        title: "CludUp - Homepage",
        errors: errors.array(),
        folders: folders,
        currentFolder: currentFolder,
        currentUrl: currentUrl,
      });
    }

    console.log(req.files);
  }),
];

module.exports = {
  postFileUpload,
};
