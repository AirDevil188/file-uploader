const { Router } = require("express");

const folderController = require("../controllers/folderController");

const folderRouter = Router({ mergeParams: true });

folderRouter.post("*/:name", folderController.postFolder);

folderRouter.get("*/:name", folderController.getSubFolders);

module.exports = folderRouter;
