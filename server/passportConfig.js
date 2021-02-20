const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;
const pool = require("./db");

function initalize(passport) {
  authenticate = (email, password, done) => {
    pool.query(
      "SELECT * FROM anwender WHERE email = $1",
      [email],
      (err, results) => {
        if (err) throw err;
        if (results.rowCount > 0) {
          const user = results.rows[0];
          bcrypt.compare(
            password + process.env.PASSWORD_PEPPER,
            user.password,
            (err, result) => {
              if (err) throw err;
              if (result === true) {
                // Passwort richtig
                return done(null, user);
              } else {
                // Passwort falsch
                return done(null, false);
              }
            }
          );
        } else {
          // Email existiert nicht
          return done(null, false);
        }
      }
    );
  };

  passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticate
    )
  );

  /**
   * ToDo: Cookies für den Nutzer, nochmal genauer mit beschaeftigen
   */
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => {
    pool.query(
      "SELECT * FROM anwender WHERE email = $1",
      [user.email],
      (err, results) => {
        if (err) throw err;
        return done(null, results.rows[0]);
      }
    );
  });
}

module.exports = initalize;
