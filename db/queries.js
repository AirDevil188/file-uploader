const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function deserializeUser(id) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function findUser(username) {
  try {
    const user = await prisma.users.findUnique({
      where: { username: username },
    });
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createUser(username, password) {
  try {
    await prisma.users.create({
      data: {
        username: username,
        password: password,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createFolder(name, id, parent) {
  try {
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
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteFolder(id) {
  try {
    await prisma.folder.delete({
      where: { id: id },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function updateFolder(id, name) {
  try {
    await prisma.folder.update({
      where: { id: id },
      data: {
        name: name,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getFolders(id) {
  try {
    if (!id) {
      return await prisma.folder.findMany({
        where: { parent: id },
      });
    } else {
      return await prisma.folder.findMany({
        where: { parentId: id },
      });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getFolder(id) {
  try {
    return await prisma.folder.findFirst({
      where: { id: id },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  deserializeUser,
  findUser,
  createUser,
  createFolder,
  deleteFolder,
  getFolder,
  deleteFolder,
  updateFolder,
  getFolders,
};
