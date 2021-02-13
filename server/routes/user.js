const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");

const saltRounds = 12;

router.post("/register", async (req, res) => {
  
});

module.exports = router;
