const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const pool = require("./db");

port = 5000;

//middleware
app.use(
  cors({
    origin: process.env.CORS_URL,
    credentials: true,
  })
);
app.use(express.json());

//ToDo: genauer ueber express-session und cookie parser informieren
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUnitialized: true,
  })
);
app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// Import routes
app.use("/fehler", require("./routes/fehler"));
app.use("/user", require("./routes/user"));

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
