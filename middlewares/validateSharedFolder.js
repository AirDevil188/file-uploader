const asyncHandler = require("express-async-handler");
const db = require("../db//queries");

const isValid = asyncHandler(async (req, res, next) => {
  const folder = await db.getSharedFolder(req.params.expires);
  console.log(folder, "shared");
  if (folder.expires) {
    const currentDate = new Date();
    const expireDate = new Date(folder.expires);

    if (expireDate >= currentDate) {
      res.locals.sharedFolderId = folder.shareFolderId;
      next();
    } else {
      res.redirect("/");
    }
  } else res.redirect("/");
});

module.exports = {
  isValid,
};
