const { Router } = require("express");
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

const fileRouter = Router({ mergeParams: true });

const fileController = require("../controllers/fileController");
const isAuth = require("../middlewares/isAuth");

fileRouter.post(
  "/drive/file-upload/:id",
  upload.array("file_upload", 10),
  fileController.postFileUpload
);

fileRouter.get("/drive/file/:id", isAuth.isAuth, fileController.getFileDetails);

fileRouter.post(
  "/drive/file/download/:id",
  isAuth.isAuth,
  fileController.postDownloadFile
);

fileRouter.post(
  "/drive/file/delete/:id",
  isAuth.isAuth,
  fileController.postDeleteFile
);

module.exports = fileRouter;
