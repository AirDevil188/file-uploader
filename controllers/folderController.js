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
      res.redirect(`/${req.params.id}`);
    } else res.redirect("/");
  }),
];

const getSubFolders = asyncHandler(async (req, res, next) => {
  const currentUrl = req.url;
  const subFolders = await db.getFolders(req.params.id);
  const currentFolder = await db.getFolder(req.params.id);

  return res.render("index", {
    title: `${req.params.name} Folder`,
    folders: subFolders,
    currentUrl: currentUrl,
    currentFolder: currentFolder,
  });
});

const postDeleteFolder = asyncHandler(async (req, res, next) => {
  const folder = await db.getFolder(req.params.id);
  await db.deleteFolder(req.params.id);
  if (req.params.id) {
    res.redirect("/");
  } else res.redirect("/");
  res.redirect(`/${folder.parentId}`);
});

module.exports = {
  getSubFolders,
  postFolder,
  postDeleteFolder,
};
