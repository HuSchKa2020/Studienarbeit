const express = require("express");
const app = express();
const router = express.Router();
const pool = require("../db");

//get all Software
router.get("/", async (req,res) =>{
  try{
    const{
      hersteller = "",
      softwarename = "",
    } = req.query;

    const allSoftware = await pool.query(
      "SELECT * FROM software WHERE hersteller LIKE $1 AND softwarename LIKE $2",
      [
        "%" + hersteller + "%",
        "%" + softwarename + "%",
      ]
    );

    if(allSoftware.rowCount === 0) {
      res.json({
        error: true,
        message: `Es ist keine Software mit derartigem Namen oder Hersteller vorhanden`,
      });
    }else{
      res.json({
        error: false,
        message: `Software vorhanden`,
        software: allSoftware.rows,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});


//get Software by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const softwareid = await pool.query(
      "SELECT * FROM software WHERE softwareid = $1",
      [id]
    );

   
    if (softwareid.rowCount === 0) {
      res.json({
        error: true,
        message: `Die Software [` + id + `] existert noch nicht.`,
      });
    } else {
      res.json({
        error: false,
        message: `Die Software wurde gefunden`,
        software: softwareid.rows[0],
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

//create Software
router.post("/", async (req,res) =>{
  try {
    const{
      hersteller,
      softwarename,
    } = req.body;
    if(hersteller === "" || softwarename === "" ) {
    res.json({
      error: true,
      message: "ungültige Eingabe, die neue Software konnte nicht aufgenommen werden",
    });
  }else {
    const newSoftware = await pool.query(
      "INSERT INTO software (hersteller, softwarename) VALUES($1, $2) RETURNING *;",
    [
      hersteller,
      softwarename,
    ]
    );

    if (newSoftware.rowCount === 0) {
      res.json({
        error:true,
        message: "Eintrag konnte nicht erstellt werden",
        
      });
    } else {
      res.json({
        error: false,
        message: "Der Eintrag wurde erfolgreich erstellt",
        software: newSoftware.rows[0],
      });
    }
  }
  } catch (err) {
    console.log(err.message);
  }
});

//update Software
router.put("/:softwareid", async (req,res) =>{
  try{
    const { softwareid } = req.params;
    const {
      hersteller,
      softwarename,
    } = req.body;

    const updateSoftware = await pool.query(
      "UPDATE software SET hersteller = $2, softwarename = $3 WHERE softwareid = $1 Returning *;",
      [
        softwareid,
        hersteller,
        softwarename,
      ]
    );

    if(updateSoftware.rowCount === 0) {
      res.json({
        error: true,
        message: "der Eintrag konnte nicht erstellt werden, da dieser nicht existiert",
      });
    }else{
      res.json({
        error: false,
        message: "Der Eintrag wurde erfolgreich geändert",
        software: updateSoftware.rows[0],
      });
    }
  }catch (err) {
    console.log(err.message);
  }
});

//Delete Software
router.delete("/:id", async (req,res) => {
  try{
    const { id } = req.params;
    const deleteSoftware = await pool.query (
      "DELETE FROM software WHERE softwareid = $1;",
      [id]
    );
    res.status(200);

    if (deleteSoftware.rowCount > 0) {
      res.json ({
        error: false, message: `Fehler: ${id} gelöscht!`
      })
    }else {
      res.json({
        error: true,
        message: `Fehler: ${id} existiert noch nicht` 
      });
    }
  }catch (err) {
    console.log(err.message);
  }
});
module.exports = router;