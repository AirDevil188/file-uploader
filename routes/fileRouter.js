const { Router } = require("express");
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

const fileRouter = Router({ mergeParams: true });

const fileController = require("../controllers/fileController");

fileRouter.post(
  "/drive/file-upload/:id",
  upload.array("file_upload", 10),
  fileController.postFileUpload
);

fileRouter.get("/drive/file/:id", fileController.getFileDetails);

module.exports = fileRouter;
