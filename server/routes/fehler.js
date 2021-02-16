const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const allFehler = await pool.query("SELECT * FROM fehler");

    if (allFehler.rowCount === 0) {
      res.json({
        error: true,
        message: `Noch kein Fehler vohanden`,
      });
    } else {
      res.json({
        error: false,
        message: `Fehler vorhanden`,
        fehler: allFehler.rows,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
