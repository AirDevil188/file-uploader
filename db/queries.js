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
    console.log("with parent");
    await prisma.folder.create({
      data: {
        name: name,
        userId: id,
        subfolderId: parent,
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

async function getParent(id) {
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
  getParent,
};
