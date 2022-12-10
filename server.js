const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URI);

const particiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [1, "Enter your name"],
  },
  email: {
    type: String,
    required: [1, "Enter your email"],
  },
  phone: {
    type: String,
    required: [1, "Enter your phone no."],
  },
  usn: {
    type: String,
    required: [1, "Enter your usn"],
  },
});

const user = mongoose.model("user", particiSchema);

app.post("/registerteam", function (req, res) {
  if (req.body.name && req.body.email && req.body.usn && req.body.phone) {
    const gp = new user({
      name: req.body.name,
      email: req.body.email,
      usn: req.body.usn,
      phone: req.body.phone,
    });
    gp.save((err) => {
      if (err) {
        console.log(err);
      } else res.sendStatus(200);
    });
  } else {
    res.status(401).json({ message: "Please fill all details" });
  }
});

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.listen(PORT, () => {
  console.log("Server is up and running on the port " + PORT);
});
