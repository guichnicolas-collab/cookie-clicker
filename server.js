const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI);

const AccountSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  session: String,
  cookies: { type: Number, default: 0 },
  upgrades: { type: Number, default: 0 },
});

const Account = mongoose.model("cookieaccounts", AccountSchema);

app.get("/", (req, res) => {
  res.send("Main");
});

app.post("/getCookies", async (req, res) => {
  let account = await Account.findOne({ _id: req.body.accountId });
  res.json({
    cookies: account.cookies,
    cost: account.upgrades * 2 + 20,
    rate: account.upgrades + 1,
  });
});

app.post("/getUpgrades", async (req, res) => {
  let account = await Account.findOne({ _id: req.body.accountId });
  res.json({ upgrades: account.upgrades });
});

app.post("/signup", async (req, res) => {
  if (
    req.body.username != "" ||
    req.body.password != "" ||
    req.body.email != ""
  ) {
    let account = await Account.find({ username: req.body.username });
    if (account.length > 0) {
      res.json({ success: false, message: "Username already taken!" });
    } else {
      const salt = await bcrypt.genSalt(10);
      let acc = new Account({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, salt),
        email: req.body.email,
      });
      acc.save();
      res.json({ success: true });
    }
  } else {
    res.json({ success: false, message: "Please fill out all fields!" });
  }
});

app.post("/login", async (req, res) => {
  let acc = await Account.find({ username: req.body.username });
  if (acc.length > 0 && bcrypt.compare(req.body.password, acc[0].password)) {
    res.json({ accountData: acc[0], success: true });
  } else {
    res.json({ success: false });
  }
});

app.post("/session", async (req, res) => {
  let acc = await Account.find({ _id: req.body.accountId });
  if (acc.length > 0) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post("/click", async (req, res) => {
  let account = await Account.findOne({ _id: req.body.accountId });
  account.cookies += account.upgrades + 1;
  await account.save();
  res.json({ cookies: account.cookies });
});

app.post("/buyUpgrade", async (req, res) => {
  let account = await Account.findOne({ _id: req.body.accountId });
  let cost = account.upgrades * 2 + 20;
  if (account.cookies >= cost) {
    account.cookies -= cost;
    account.upgrades += 1;
    cost = account.upgrades * 2 + 20;
    await account.save();
  }
  res.json({
    cookies: account.cookies,
    upgrades: account.upgrades,
    cost: cost,
    rate: account.upgrades + 1,
  });
});

app.get("/getLeaderboard", async (req, res) => {
  let topAccounts = await Account.find().sort({ upgrades: -1 }).limit(10);
  res.json({ topAccounts: topAccounts });
});

app.listen(3001);
