const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const pool = require("../db");

const saltRounds = 12;

router.post("/register", async (req, res) => {
  try {
    const { email, password, vorname, nachname, telefon } = req.body;
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
            "INSERT INTO anwender (vorname, nachname, email, telefon, password) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
            [vorname, nachname, email, telefon, hash]
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

router.get("/", (req, res) => {
  res.send(req.user);
});

module.exports = router;
