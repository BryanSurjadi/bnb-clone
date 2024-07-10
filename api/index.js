const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const Place = require("./models/Place");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const downloadImage = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

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
app.use("/uploads", express.static(__dirname + "/uploads"));
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

app.post("/accomodations", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    photos,
    desc,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtsecret, {}, async (err, user) => {
    if (err) throw err;
    try {
      const placeDoc = await Place.create({
        owner: user.id,
        title,
        address,
        photos,
        desc,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.json(placeDoc);
    } catch (e) {
      res.status(422).json({
        message: "Something went wrong",
      });
    }
  });
});

app.put("/accomodations/:id", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    photos,
    desc,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtsecret, {}, async (err, user) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (user.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos,
        desc,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json(placeDoc);
    } else {
      res.status(403).json({ message: "You do not own this place" });
    }
  });
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await downloadImage.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 50), async (req, res) => {
  try {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace(`uploads\\`, ""));
    }
    res.json({ files: uploadedFiles }); // Respond with modified file paths or filenames
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
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

app.get("/accomodations", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtsecret, {}, async (err, user) => {
    const { id } = user;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/accomodations/:id", async (req, res) => {
  const { id } = req.params;

  // res.json(await Place.findById(id));
  try {
    const accomodations = await Place.findById(id);
    if (!accomodations) {
      res.json("Not found");
    }
    res.json(accomodations);
  } catch (e) {
    res.json("Not found");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.listen(port, () => {
  console.log(`Example app listening on http:://localhost:${port}`);
});
