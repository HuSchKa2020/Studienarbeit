const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const pool = require("../db");

const saltRounds = 12;

router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      vorname,
      nachname,
      telefon,
      abteilungsid,
    } = req.body;
    const user = await pool.query(
      "SELECT email FROM anwender WHERE email = $1",
      [email]
    );
    if (user.rowCount === 0) {
      // Anwender existiert noch nicht
      bcrypt.hash(
        password + process.env.PASSWORD_PEPPER,
        saltRounds,
        async (err, hash) => {
          if (err) throw err;
          const newUser = await pool.query(
            "INSERT INTO anwender (vorname, nachname, email, telefon, password, abteilungsid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
            [vorname, nachname, email, telefon, hash, abteilungsid]
          );

          res.json({
            error: false,
            message: `Nutzer erfolgreich registriert`,
            user: newUser.rows[0],
          });
        }
      );
    } else {
      // Anwender existier schon
      res.json({
        error: true,
        message: `Nutzer mit der Email '${email}' existiert schon!`,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Login Route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user)
      res.send({
        error: false,
        success: false,
        message: "Email oder Passwort sind falsch",
      });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({
          error: false,
          success: true,
          message: "Erfolgreich Authentifiziert",
        });
      });
    }
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({
      error: false,
      success: true,
      message: "Erfolgreich ausgeloggt",
    });
  } else {
    res.send({
      error: true,
      success: false,
      message: "Kein Nutzer angemeldet der ausgeloggt werden kann!",
    });
  }
});

router.get("/", (req, res) => {
  if (req.user) {
    res.send({
      error: false,
      loggedIn: true,
      message: "Nutzer angemeldet!",
    });
  } else {
    res.send({
      error: false,
      loggedIn: false,
      message: "Kein Nutzer angemeldet!",
    });
  }
});

router.get("/berechtigungen", async (req, res) => {
  try {
    console.log(req.user);
    const berechtigungen = await pool.query(
      `SELECT b.berechtigungsid, beschreibung
      FROM anwenderrolle ar, rollenberechtigung rb, berechtigung b
      WHERE ar.anwenderid = $1 AND ar.rollenid = rb.rollenid AND rb.berechtigungsid = b.berechtigungsid`,
      [req.user.anwenderid]
    );

    // const berechtigungen = await pool.query(
    //   `SELECT *
    //   FROM anwenderrolle ar
    //   WHERE ar.anwenderid = $1`,
    //   [req.user.anwenderid]
    // );

    console.log(berechtigungen.rows);

    res.send({
      error: false,
      berechtigungen: [...berechtigungen.rows],
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
