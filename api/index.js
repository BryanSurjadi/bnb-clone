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
            .cookie("token", token, {
              httponly: true,
              sameSite: "lax",
              secure: false,
            })
            .json({ success: true, user: userDoc });
        }
      );
    } else {
      res.status(422).json({ success: false, message: "wrong password" });
    }
  } else {
    res.status(422).json({ success: false, message: "wrong email" });
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

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtsecret, {}, async (err, user) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(user.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
  // console.log(req.cookies.token)
});

app.listen(port, () => {
  console.log(`Example app listening on http:://localhost:${port}`);
});
