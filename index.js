const express = require("express");
const path = require("node:path");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

const driveRouter = require("./routes/driveRouter");
const userRouter = require("./routes/userRouter");
const folderRouter = require("./routes/folderRouter");
const fileRouter = require("./routes/fileRouter");

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(
  session({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // one day
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

require("./middlewares/passport");
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", driveRouter);
app.use("/", fileRouter);
app.use("/", userRouter);
app.use("/", folderRouter);

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).send(err);
});

app.listen(port, () => console.log(`App is listening on the ${port}`));
