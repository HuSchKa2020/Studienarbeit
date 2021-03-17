const express = require("express");
const app = express();
const router = express.Router();
const pool = require("../db");

// Get Anwender
router.get("/", async (req, res) => {
  try {
    const { nachname = "", email = "", telefon = "" } = req.query;
    const allFehler = await pool.query(
      "SELECT * FROM anwender a WHERE nachname LIKE $1 AND email LIKE $2 AND telefon LIKE $3;",
      ["%" + nachname + "%", "%" + email + "%", "%" + telefon + "%"]
    );

    if (allFehler.rowCount === 0) {
      res.json({
        error: true,
        message: `Keinen Anwender gefunden`,
      });
    } else {
      res.json({
        error: false,
        message: `Anwender gefunden`,
        fehler: allFehler.rows,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
