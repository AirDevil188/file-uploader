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
    const currentUrl = req.params.name
      ? `${req.url + `/` + title}`
      : req.url + title;
    console.log(req.url, "parent");
    await db.createFolder(title, user.id, req.params.name, currentUrl, req.url);
    res.redirect(currentUrl);
  }),
];

const getSubFolders = asyncHandler(async (req, res, next) => {
  const currentUrl = req.url;
  const subFolders = await db.getFolders(req.params.name);
  const currentFolder = await db.getPathFolder(currentUrl);

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
  res.redirect(folder.parentPath);
});

module.exports = {
  getSubFolders,
  postFolder,
  postDeleteFolder,
};
