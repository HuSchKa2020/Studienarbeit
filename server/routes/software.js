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

module.exports = router;