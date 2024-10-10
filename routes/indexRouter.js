const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "./uploads" }); // change to cloud based storage

const indexController = require("../controllers/indexController");
const folderController = require("../controllers/folderController");
const isAuth = require("../middlewares/isAuth");

const indexRouter = Router({ mergeParams: true });

indexRouter.get("/", isAuth.isAuth, indexController.getIndex);

indexRouter.post("/", isAuth.isAuth, folderController.postFolder);

indexRouter.post(
  "/delete/:id",
  isAuth.isAuth,
  folderController.postDeleteFolder
);

indexRouter.post(
  "/file-upload",
  upload.array("file_upload"),
  (req, res, next) => {}
);

module.exports = indexRouter;
