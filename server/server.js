const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

port = 5000;

//middleware
app.use(cors());
app.use(express.json());

//Import routes
app.use("/fehler", require("./routes/fehler"));



app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
