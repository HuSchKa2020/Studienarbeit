const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/register", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
