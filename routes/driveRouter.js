const { Router } = require("express");

const driveController = require("../controllers/driveController");

const isAuth = require("../middlewares/isAuth");

const driveRouter = Router({ mergeParams: true });

driveRouter.get("/", isAuth.isAuth, driveController.createDriveFolder);

driveRouter.get("/drive/:id", isAuth.isAuth, driveController.getDrive);

module.exports = driveRouter;
