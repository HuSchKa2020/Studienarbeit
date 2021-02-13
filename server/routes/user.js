const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");

const saltRounds = 12;
const pepper = "/z§E52s+l20/dc";

router.post("/register", async (req, res) => {
  try {
    const { email, password, vorname, nachname, telefon } = req.body;
    console.log({ email, password, vorname, nachname, telefon });
    const user = await pool.query(
      "SELECT email FROM anwender WHERE email = $1",
      [email]
    );
    console.log(user);
    if (true || user.rowCount === 0) {
      // Anwender existiert noch nicht
      bcrypt.hash(password + pepper, saltRounds, async (err, hash) => {
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
      });
    } else {
      // Anwender existier schon
      res.json({
        error: true,
        message: `Nutzer mit der ${email} existiert schon!`,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
