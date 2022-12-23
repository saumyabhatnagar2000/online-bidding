const express = require("express");
const { json } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const { User, Item, Bidding, Company, Bidder } = require("../models/userModel");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/users", auth, async (req, res) => {
  try {
    const data = await User.find({});
    res.send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/profile/update", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send("not found");

    Object.keys(req.body).forEach((item) => (user[item] = req.body[item]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/user/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("not found");

    Object.keys(req.body).forEach((item) => (user[item] = req.body[item]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/profile/delete", auth, async (req, res) => {
  //
  //close running bids
  // try {
  //   await req.user.remove();
  //   res.send(req.user);
  // } catch (e) {
  //   res.status(500).send(e);
  // }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findUserByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send("invalid credentials");
  }
});

router.post("/user/register", async (req, res) => {
  console.log(req.body);
  const { user } = req.body;
  const {
    ifscCode,
    accountNumber,
    name,
    companyname,
    trademark,
    website,
    file,
    username,
    number,
    pancardnum,
    gstnumber,
  } = req.body;
  const users = new User(user);
  const token = await users.generateAuthToken();
  await users.save();
  if (companyname) {
    await Company.create({
      user_id: Object(users._id),
      company_name: companyname,
      company_trademark: trademark,
      company_website: website,
      gst_number: gstnumber,
      pan_card_number: pancardnum,
    });
  } else if (username) {
    await Bidder.create({
      user_id: Object(user._id),
      contact_number: number,
      pan_card_number: pancardnum,
    });
  }
  res.send({ users, token });
});

router.get("/profile/me", auth, (req, res) => {
  res.send(req.user);
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(({ token }) => token != req.token);
    await req.user.save();
    res.json({ data: "logged out" });
  } catch (e) {
    res.status(404).json({ e: "someting went wrong" });
  }
});

router.post("/user/logout-all", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send(200);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/company", auth, async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const company = new Company(req.body);
    await company.save();
    res.send(company);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/bidder", auth, async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const bidder = new Bidder(req.body);
    await bidder.save();
    res.send(bidder);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/company", auth, async (req, res) => {
  try {
    const data = await Company.findOne({
      user_id: req.user._id,
    });
    if (data) return res.send(data);
    res.status(404).send("not found");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/bidder", auth, async (req, res) => {
  try {
    const data = await Bidder.findOne({
      user_id: req.user._id,
    });
    if (data) return res.send(data);
    res.status(404).send("not found");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/history", auth, async (req, res) => {
  try {
    items_bought = await Item.find({ sold_to: req.user._id }).sort({
      updatedAt: -1,
    });
    bid_history = await Bidding.find({ user_id: req.user._id }).sort({
      active: 1,
      createdAt: -1,
    });
    res.send({ items_bought: items_bought, bid_history: bid_history });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
