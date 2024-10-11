const { Router } = require("express");

const folderController = require("../controllers/folderController");

const isAuth = require("../middlewares/isAuth");

const folderRouter = Router({ mergeParams: true });

folderRouter.post("/drive/:id", isAuth.isAuth, folderController.postFolder);

folderRouter.get("/drive/:id", isAuth.isAuth, folderController.getSubFolders);

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

module.exports = folderRouter;
