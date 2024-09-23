const express = require("express");
const path = require("node:path");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).send(err);
});

app.listen(port, () => console.log(`App is listening on the ${port}`));
