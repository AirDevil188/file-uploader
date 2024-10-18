const { Router } = require("express");

const folderController = require("../controllers/folderController");
const fileController = require("../controllers/fileController");

const isAuth = require("../middlewares/isAuth");
const isValid = require("../middlewares/validateSharedFolder");

const folderRouter = Router({ mergeParams: true });

folderRouter.post("/drive/:id", isAuth.isAuth, folderController.postFolder);

folderRouter.post(
  "/drive/update/:id",
  isAuth.isAuth,
  folderController.postUpdateFolder
);

folderRouter.post(
  "/drive/delete/:id",
  isAuth.isAuth,
  folderController.postDeleteFolder
);

folderRouter.get(
  "/drive/share/:expires/:id",
  isValid.isValid,
  folderController.getShareFolder
);

folderRouter.post(
  "/drive/share/:id",
  isAuth.isAuth,
  folderController.postShareFolder
);

module.exports = folderRouter;
