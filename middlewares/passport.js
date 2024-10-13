const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const strategy = new LocalStrategy({ passReqToCallback: true }, async function (
  req,
  username,
  password,
  done
) {
  try {
    const user = await db.findUser(username);

    if (!user) {
      return done(null, false, req.flash("error", "Incorrect username!"));
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return done(null, false, req.flash("error", "Incorrect password!"));
    }
    return done(null, user);
  } catch (err) {
    console.log(err);
    return done(err);
  }
});
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.deserializeUser(id);

    return done(null, user);
  } catch (err) {}
});
