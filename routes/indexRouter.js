const { Router } = require("express");

const indexController = require("../controllers/indexController");
const folderController = require("../controllers/folderController");
const isAuth = require("../middlewares/isAuth");

const indexRouter = Router({ mergeParams: true });

indexRouter.get("/", isAuth.isAuth, indexController.createDriveFolder);

indexRouter.get("/drive/:id", isAuth.isAuth, indexController.getIndex);

indexRouter.post("/drive/:id", isAuth.isAuth, folderController.postFolder);

module.exports = indexRouter;
