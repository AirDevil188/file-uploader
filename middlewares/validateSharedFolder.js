const asyncHandler = require("express-async-handler");
const db = require("../db//queries");

const isValid = asyncHandler(async (req, res, next) => {
  const folder = await db.getSharedFolder(req.params.expires);

  if (!folder) {
    const errors = [{ msg: new Error("Shared folder was not found") }];
    return res.status(404).render("folder_share", {
      errors: errors,
    });
  }

  const currentDate = new Date();
  const expireDate = new Date(folder.expires);

  if (expireDate >= currentDate) {
    res.locals.sharedFolderId = folder.shareFolderId;
    next();
  } else {
    const errors = [{ msg: new Error("Link has expired") }];
    res.locals.errors = errors;
    return res.status(404).render("folder_share", {
      errors: res.locals.errors,
    });
  }
});

module.exports = {
  isValid,
};
