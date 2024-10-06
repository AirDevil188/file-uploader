const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const nameLengthErr = "must contain at least one character.";

const validateFolder = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Folder name ${nameLengthErr}`),
];

const postFolder = [
  validateFolder,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        title: "CludUp - Homepage",
      });
    }
    const { title } = req.body;
    const user = req.user;
    await db.createFolder(title, user.id, req.params.name);
    res.redirect(`/${req.params.name}`);
  }),
];

const getFolders = asyncHandler(async (req, res, next) => {
  const folder = await db.getFolders(req.params.name);
  const parent = req.params.name;

  return res.render("index", {
    title: `${req.params.name} Folder`,
    folders: folder,
    parent: parent,
  });
});

module.exports = {
  getFolders,
  postFolder,
};
