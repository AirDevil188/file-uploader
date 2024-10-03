const { Router } = require("express");

const folderController = require("../controllers/folderController");

const folderRouter = Router();

folderRouter.post("/create-folder", folderController.postFolder);

module.exports = folderRouter;
