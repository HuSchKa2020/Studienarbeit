const express = require("express");
const app = express();
const router = express.Router();
const pool = require("../db");

// GET Fehler
router.get("/", async (req, res) => {
  try {
    const {
      titel = "",
      loesung = "",
      auswirkung = "",
      status = "",
      softwareid = "",
      date = "",
    } = req.query;

    const querydate = new Date(date);
    var fehler;
    if (date !== "") {
      if (softwareid !== "") {
        //softwareid und datum gesetzt
        fehler = await pool.query(
          "SELECT * FROM fehler f, software s WHERE titel LIKE $1 AND loesung LIKE $2 AND auswirkung LIKE $3 AND status LIKE $4 AND f.softwareid = $5 AND DATE(erstellt_am) = $6 AND f.softwareid = s.softwareid",
          [
            "%" + titel + "%",
            "%" + loesung + "%",
            "%" + auswirkung + "%",
            "%" + status + "%",
            softwareid,
            querydate.toLocaleDateString("en-US"),
          ]
        );
      } else {
        // datum gesetzt, softwareid nicht
        fehler = await pool.query(
          "SELECT * FROM fehler f, software s WHERE titel LIKE $1 AND loesung LIKE $2 AND auswirkung LIKE $3 AND status LIKE $4  AND DATE(erstellt_am) = $5 AND f.softwareid = s.softwareid",
          [
            "%" + titel + "%",
            "%" + loesung + "%",
            "%" + auswirkung + "%",
            "%" + status + "%",
            querydate.toLocaleDateString("en-US"),
          ]
        );
      }
    } else {
      if (softwareid !== "") {
        // softwareid gesetzt, datum nicht
        fehler = await pool.query(
          "SELECT * FROM fehler f, software s WHERE titel LIKE $1 AND loesung LIKE $2 AND auswirkung LIKE $3 AND status LIKE $4 AND f.softwareid = $5 AND f.softwareid = s.softwareid",
          [
            "%" + titel + "%",
            "%" + loesung + "%",
            "%" + auswirkung + "%",
            "%" + status + "%",
            softwareid,
          ]
        );
      } else {
        // softwareid und datum nicht gesetzt
        fehler = await pool.query(
          "SELECT * FROM fehler f, software s WHERE titel LIKE $1 AND loesung LIKE $2 AND auswirkung LIKE $3 AND status LIKE $4  AND f.softwareid = s.softwareid",
          [
            "%" + titel + "%",
            "%" + loesung + "%",
            "%" + auswirkung + "%",
            "%" + status + "%",
          ]
        );
      }
    }

    if (fehler.rowCount === 0) {
      res.json({
        error: true,
        message: `Noch kein Fehler vohanden`,
      });
    } else {
      res.json({
        error: false,
        message: `Fehler vorhanden`,
        fehler: fehler.rows,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

//create Fehler
router.post("/", async (req, res) => {
  try {
    const {
      titel,
      beschreibung,
      loesung,
      auswirkung,
      status,
      softwareid,
      anwenderid,
    } = req.body;
    if (
      titel === "" ||
      beschreibung === "" ||
      loesung === "" ||
      auswirkung === "" ||
      status === "" ||
      softwareid === "" ||
      anwenderid === ""
    ) {
      res.json({
        error: true,
        message: `Ungültige Eingabe. Der Fehler konnte nicht erstellt werden`,
      });
    } else {
      const newFehler = await pool.query(
        "INSERT INTO fehler (titel, beschreibung, loesung, auswirkung, status, softwareid, anwenderid) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          titel,
          beschreibung,
          loesung,
          auswirkung,
          status,
          softwareid,
          anwenderid,
        ]
      );

      if (newFehler.rowCount === 0) {
        res.json({
          error: true,
          message: `Der Eintrag konnte nicht erstellt werden`,
          fehler: newFehler.rows[0],
        });
      } else {
        //Eintrag konnte nicht erstellt werden
        res.json({
          error: false,
          message: `Der Eintrag wurde erfolgreich erstellt`,
        });
      }
    }
  } catch (err) {
    console.error(err.message);
  }
});

//get Fehler by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fehlerid = await pool.query(
      "SELECT * FROM fehler f, software s, anwender a WHERE fehlerid = $1 AND f.softwareid = s.softwareid AND f.anwenderid = a.anwenderid",
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

//update Fehler
router.put("/:fehlerid", async (req, res) => {
  try {
    const { fehlerid } = req.params;
    const {
      titel,
      beschreibung,
      loesung,
      auswirkung,
      status,
      softwareid,
      anwenderid,
    } = req.body;
    if(  
      titel === "" ||
      beschreibung === "" ||
      loesung === "" ||
      auswirkung === "" ||
      status === "" ||
      softwareid === "" ||
      anwenderid === ""
      ){

        res.json({
          error: true,
          message: `Ungültige Eingabe. Der Fehler konnte nicht erstellt werden`,
        });

      } else {
    const updateFehler = await pool.query(
      "UPDATE fehler SET titel = $2, beschreibung = $3, loesung = $4, auswirkung = $5, status = $6, softwareid = $7, anwenderid = $8 WHERE fehlerid = $1 RETURNING *",
      [
        fehlerid,
        titel,
        beschreibung,
        loesung,
        auswirkung,
        status,
        softwareid,
        anwenderid,
      ]
    );

    if (updateFehler.rowCount === 0) {
      res.json({
        error: true,
        message: `Der Eintrag konnte nicht geändert werden, da dieser nicht existiert.`,
      });
    } else {
      res.json({
        error: false,
        message: `Der Eintrag wurde erfolgreich geändert`,
        fehler: updateFehler.rows[0],
      });
    }
  }
  } catch (err) {
    console.log(err.message);
  }
});

// Delete Fehler
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
