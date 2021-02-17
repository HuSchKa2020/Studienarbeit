const express = require("express");
const app = express();
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

//create Fail
router.post("/", async (req, res) => {
  try {
    const {
      titel,
      beschreibung,
      lösung,
      auswirkung,
      status,
      softwareid,
      anwenderid,
    } = req.body;
    const newFehler = await pool.query(
      "INSERT INTO fehler (titel, beschreibung, lösung, auswirkung, status, softwareid, anwenderid) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [titel, beschreibung, lösung, auswirkung, status, softwareid, anwenderid]
    );

    if (newFehler.rowCount === 0) {
      res.json({
        error: false,
        message: `Der Eintrag konnte nicht erstellt werden`,
        fehler: newFehler.rows[0],
      });
    } else {
      //Eintrag konnte nicht erstellt werden
      res.json({
        error: true,
        message: `Der Eintrag wurde erfolgreich erstellt`,
      });
    }
  } catch (err) {
    console.error(err.message);
  }
});

//get Fail ---

//get Fail by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fehlerid = await pool.query(
      "SELECT * FROM fehler WHERE fehlerid = $1",
      [id]
    );

    if (fehlerid.rowCount === 0) {
      res.json({
        error: true,
        message: `Der Fehler [` + id + `] existert noch nicht.`,
      });
    } else {
      res.json({
        error: false,
        message: `Der Fehler wurde gefunden`,
        fehler: fehlerid.rows[0],
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

//update Fail
router.put("/:fehlerid", async (req, res) => {
  try {
    const { fehlerid } = req.params;
    const {
      titel,
      beschreibung,
      lösung,
      auswirkung,
      status,
      softwareid,
      anwenderid,
    } = req.body;
    const updateFehler = await pool.query(
      "UPDATE fehler SET titel = $2, beschreibung = $3, lösung = $4, auswirkung = $5, status = $6, softwareid = $7, anwenderid = $8 WHERE fehlerid = $1 RETURNING *",
      [
        fehlerid,
        titel,
        beschreibung,
        lösung,
        auswirkung,
        status,
        softwareid,
        anwenderid,
      ]
    );

    if (updateFehler.rowCount === 0) {
      res.json({
        error: false,
        message: `Der Eintrag konnte nicht geändert werden, da dieser nicht existiert.`,
      });
    } else {
      res.json({
        error: true,
        message: `Der Eintrag wurde erfolgreich geändert`,
        fehler: updateFehler.rows[0],
      });
    }
  } catch (err) {
    console.log(err.message);
  }
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
