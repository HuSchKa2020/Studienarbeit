const express = require("express");
const app = express();
const router = express.Router();
const pool = require("../db");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFehler = await pool.query(
      "DELETE FROM fehler WHERE fehlerid = $1;",
      [id]
    );
    res.status(200);

    if (deleteFehler.rowCount > 0) {
      res.json({ error: false, message: `Fehler: ${id} gelöscht!` });
    } else {
      res.json({ error: true, message: `Fehler: ${id} existiert nicht!` });
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
