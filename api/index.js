const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

const bcryptsalt = bcrypt.genSaltSync(10);
const jwtsecret = "fafanigbb";

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("Thee real deall ma nigggaa");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      //logged in
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtsecret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, { sameSite: "none", secure: false })
            .json("Logged in");
        }
      );
    } else {
      res.status(422).json("wrong password");
    }
  } else {
    res.json("wrong email");
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptsalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http:://localhost:${port}`);
});
