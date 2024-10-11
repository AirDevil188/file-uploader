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
        errors: errors.array(),
      });
    }

    const { title } = req.body;
    const user = req.user;
    await db.createFolder(title, user.id, req.params.id);
    if (req.params.id) {
      res.redirect(`/drive/${req.params.id}`);
    } else res.redirect("/");
  }),
];

const getSubFolders = asyncHandler(async (req, res, next) => {
  const subFolders = await db.getFolders(req.params.id);
  const currentFolder = await db.getFolder(req.params.id);

  return res.render("index", {
    title: `${req.params.name} Folder`,
    folders: subFolders,
    currentFolder: currentFolder,
  });
});

const postDeleteFolder = asyncHandler(async (req, res, next) => {
  const folder = await db.getFolder(req.params.id);
  await db.deleteFolder(req.params.id);
  if (!folder.parentId) {
    res.redirect("/");
  } else res.redirect(`/drive/${folder.parentId}`);
});

const postUpdateFolder = asyncHandler(async (req, res, next) => {
  const folder = await db.getFolder(req.params.id);
  const { title } = req.body;
  await db.updateFolder(req.params.id, title);
  if (!folder.parentId) {
    res.redirect("/");
  } else res.redirect(`/drive/${folder.parentId}`);
});

module.exports = {
  getSubFolders,
  postFolder,
  postDeleteFolder,
  postUpdateFolder,
};
