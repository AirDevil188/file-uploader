const { Router } = require("express");

const folderController = require("../controllers/folderController");

const folderRouter = Router({ mergeParams: true });

folderRouter.post("*/:name", folderController.postFolder);

folderRouter.get("*/:name", folderController.getSubFolders);

folderRouter.post("/delete/:id", folderController.postDeleteFolder);

module.exports = folderRouter;
