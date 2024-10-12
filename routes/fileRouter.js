const { Router } = require("express");
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

const fileRouter = Router();

const fileController = require("../controllers/fileController");

fileRouter.post(
  "/drive/file-upload/:id",
  upload.array("file_upload"),
  fileController.postFileUpload
);

module.exports = fileRouter;
