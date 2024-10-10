const { Router } = require("express");

const folderController = require("../controllers/folderController");

const isAuth = require("../middlewares/isAuth");

const folderRouter = Router({ mergeParams: true });

folderRouter.post("/:id", isAuth.isAuth, folderController.postFolder);

folderRouter.get("/:id", isAuth.isAuth, folderController.getSubFolders);

folderRouter.post(
  "/delete/:id",
  isAuth.isAuth,
  folderController.postDeleteFolder
);

module.exports = folderRouter;
