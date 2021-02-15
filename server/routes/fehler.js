const express = require("express");
const router = express.Router();
const pool = require("../db");      

router.get("/", (req, res) => {
  res.send("Hello World");
});

//create Fail 
router.post("/", async (req,res) => {   
  try{
    const{ titel, beschreibung, lösung, auswirkung, status, softwareid, anwenderid } = req.body;
    const newFehler = await pool.query("INSERT INTO fehler (titel, beschreibung, lösung, auswirkung, status, softwareid, anwenderid) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [titel,beschreibung, lösung, auswirkung, status, softwareid, anwenderid ]); 

    res.json ({
      message:`Der Eintrag wurde erfolgreich erstellt`,
      fehler: newFehler.rows[0]
    });

  }catch (err) {
    console.error(err.message);
    
  }
})

//update Fail
router.put("/:fehlerid", async(req, res) => {
  try{
    const { fehlerid } = req.params;
    const { titel, beschreibung, lösung, auswirkung, status, softwareid, anwenderid } = req.body;
    const updateFehler = await pool.query("UPDATE fehler SET titel = $2, beschreibung = $3, lösung = $4, auswirkung = $5, status = $6, softwareid = $7, anwenderid = $8 WHERE fehlerid = $1",
    [fehlerid, titel, beschreibung, lösung, auswirkung, status, softwareid, anwenderid]);          

    res.json("Der Eintrag wurde erfolgreich verändert");

  }catch (err) {
    console.log(err.message);
  }
})

module.exports = router;
