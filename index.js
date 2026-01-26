require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const app = express();
const PORT = process.env.PORT || 3000;
const dburl = process.env.MONGO_URI || 3000;
app.use(userRoute);
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//connect db

mongoose
  .connect(dburl)
  .then(() => {
    console.log(`mongo is ccccccc`);
  })
  .catch((error) => {
    console.log(`mongo is not ccccccc`);
    console.log(error);
    process.exit(1);
  });

//file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

app.post(
  "/upload-profile-picture",
  upload.single("image"),
  async (req, res) => {
    res.status(500).send("file is uploaded");
  },
);
//route error
app.use((req, res, next) => {
  res.status(404).json({ message: "route not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: "something broke" });
});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT : http://localhost:${PORT}`);
});
