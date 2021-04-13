const express = require("express");
const app = express();
const router = express.Router();
const pool = require("../db");

// Get Anwender
router.get("/", async (req, res) => {
  try {
    const { nachname = "", email = "", telefon = "" } = req.query;
    const alleAnwender = await pool.query(
      "SELECT * FROM anwender a WHERE nachname LIKE $1 AND email LIKE $2 AND telefon LIKE $3;",
      ["%" + nachname + "%", "%" + email + "%", "%" + telefon + "%"]
    );

    if (alleAnwender.rowCount === 0) {
      res.json({
        error: true,
        message: `Keinen Anwender gefunden`,
        anwender: alleAnwender.rows,
      });
    } else {
      res.json({
        error: false,
        message: `Anwender gefunden`,
        anwender: alleAnwender.rows,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
