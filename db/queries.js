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

async function createDriveFolder(userId) {
  try {
    await prisma.folder.create({
      data: {
        name: "drive",
        userId: userId,
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

async function getFolders(id, userId) {
  try {
    return await prisma.folder.findMany({
      where: { parentId: id, userId: userId },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getDriveFolder(userId) {
  try {
    return await prisma.folder.findFirst({
      where: { name: "drive", userId: userId },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getFolder(id, userId) {
  try {
    return await prisma.folder.findFirst({
      where: { id: id, userId: userId },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createFiles(name, size, url, type, folderId, userId) {
  try {
    return await prisma.file.createMany({
      data: [
        {
          name: name,
          size: size,
          url: url,
          type: type,
          folderId: folderId,
          userId: userId,
        },
      ],
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getFiles(folderId, userId) {
  try {
    return await prisma.file.findMany({
      where: {
        userId: userId,
        folderId: folderId,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getFile(fileId, userId) {
  try {
    return await prisma.file.findFirst({
      where: {
        id: fileId,
        userId: userId,
      },
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
  createDriveFolder,
  createFiles,
  deleteFolder,
  getDriveFolder,
  getFolder,
  deleteFolder,
  updateFolder,
  getFolders,
  getFiles,
  getFile,
};
