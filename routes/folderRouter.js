const { Router } = require("express");

const folderController = require("../controllers/folderController");

const folderRouter = Router();

folderRouter.post("/:name", folderController.postFolder);

folderRouter.get("/:name", folderController.getFolders);

module.exports = folderRouter;
