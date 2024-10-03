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

async function createFolder(name, id) {
  await prisma.folder.create({
    data: {
      name: name,
      userId: id,
    },
  });
}

module.exports = {
  deserializeUser,
  findUser,
  createUser,
  createFolder,
};
