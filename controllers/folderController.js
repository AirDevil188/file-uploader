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

const postDeleteFolder = asyncHandler(async (req, res, next) => {
  const folder = await db.getFolder(req.params.id, res.locals.currentUser.id);
  await db.deleteFolder(req.params.id);
  if (!folder.parentId) {
    res.redirect("/");
  } else res.redirect(`/drive/${folder.parentId}`);
});

const postUpdateFolder = asyncHandler(async (req, res, next) => {
  const folder = await db.getFolder(req.params.id, res.locals.currentUser.id);
  const { title } = req.body;
  await db.updateFolder(req.params.id, title);
  if (!folder.parentId) {
    res.redirect("/");
  } else res.redirect(`/drive/${folder.parentId}`);
});

const getShareFolder = asyncHandler(async (req, res, next) => {
  const params = req.params.expires;
  const currentFolder = await db.getFolder(req.params.id);
  const isChild = await db.isChildOf(
    res.locals.sharedFolderId,
    currentFolder.id
  );
  const subFolders = await db.getFolders(req.params.id);
  const files = await db.getFiles(req.params.id);

  if (isChild) {
    return res.render("folder_share", {
      title: `Shared - ${currentFolder.name}`,
      currentFolder: currentFolder,
      folders: subFolders,
      files: files,
      expires: params,
    });
  } else res.redirect("/");
});

const postShareFolder = asyncHandler(async (req, res, next) => {
  const folder = await db.getFolder(req.params.id, res.locals.currentUser.id);
  const { share } = req.body;

  const interval = await db.getInterval(share);
  await db.shareFolder(folder.id, interval.expiresat);
});

module.exports = {
  postFolder,
  postDeleteFolder,
  postUpdateFolder,
  getShareFolder,
  postShareFolder,
};
