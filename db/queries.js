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

async function createFolder(name, id, parent) {
  if (parent) {
    await prisma.folder.create({
      data: {
        name: name,
        userId: id,
        parentId: parent,
      },
    });
  } else {
    await prisma.folder.create({
      data: {
        name: name,
        userId: id,
      },
    });
  }
}

async function deleteFolder(id) {
  await prisma.folder.delete({
    where: { id: id },
  });
}

async function getFolders(id) {
  if (!id) {
    return await prisma.folder.findMany({
      where: { parent: id },
    });
  } else {
    return await prisma.folder.findMany({
      where: { parentId: id },
    });
  }
}

async function getFolder(id) {
  return await prisma.folder.findFirst({
    where: { id: id },
  });
}

async function deleteFolder(id) {
  return await prisma.folder.delete({
    where: {
      id: id,
    },
  });
}

module.exports = {
  deserializeUser,
  findUser,
  createUser,
  createFolder,
  deleteFolder,
  getFolder,
  deleteFolder,
  getFolders,
};
