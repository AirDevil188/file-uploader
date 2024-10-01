const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "./uploads" }); // change to cloud based storage

const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.getIndex);

indexRouter.post("/", upload.array("file_upload"), (req, res, next) => {});

module.exports = indexRouter;
