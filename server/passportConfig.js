const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;
const pool = require("./db");

const pepper = "/z§E52s+l20/dc";

function initalize(passport) {
  authenticate = (email, password, done) => {
    pool.query(
      "SELECT email, password FROM anwender WHERE email = $1",
      [email],
      (err, results) => {
        if (err) throw err;
        if (results.rowCount > 0) {
          const user = results.rows[0];
          bcrypt.compare(password + pepper, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              // Passwort richtig
              return done(null, user);
            } else {
              // Passwort falsch
              return done(null, false);
            }
          });
        } else {
          // Email existiert nicht
          return done(null, false);
        }
      }
    );
  };

  passport.use(new localStrategy(authenticate));

  /**
   * ToDo: Cookies für den Nutzer, nochmal genauer mit beschaeftigen
   */
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    pool.query("SELECT * FROM users WHERE id = $1", [id], (err, results) => {
      if (err) throw err;
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initalize;
