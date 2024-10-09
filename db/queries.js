const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function deserializeUser(id) {
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}

async function findUser(username) {
  const user = await prisma.users.findUnique({
    where: { username: username },
  });
  return user;
}

async function createUser(username, password) {
  await prisma.users.create({
    data: {
      username: username,
      password: password,
    },
  });
}

// if parent is not null assign parent param (req.params.name) to subFolderId - create subfolder
// if parent is null let prisma assign null to subfolderId - create folder
async function createFolder(name, id, parent, path, parentPath) {
  if (parent) {
    await prisma.folder.create({
      data: {
        name: name,
        userId: id,
        subfolderId: parent,
        path: path,
        parentPath: parentPath,
      },
    });
  } else {
    await prisma.folder.create({
      data: {
        name: name,
        userId: id,
        path: path,
        parentPath: "/",
      },
    });
  }
}

async function deleteFolder(id) {
  await prisma.folder.delete({
    where: { id: id },
  });
}

async function getPathFolder(id) {
  return await prisma.folder.findFirst({
    where: { path: id },
  });
}

// if req.params.name is null we are going to search for folders where parent is null
// if req.params.name is not null we are going to search folders where subFolder is not null to find a match
async function getFolders(id) {
  if (!id) {
    return await prisma.folder.findMany({
      where: { parent: id },
    });
  } else {
    return await prisma.folder.findMany({
      where: { subfolderId: id },
    });
  }
}

module.exports = {
  deserializeUser,
  findUser,
  createUser,
  createFolder,
  deleteFolder,
  getPathFolder,
  getFolders,
};
