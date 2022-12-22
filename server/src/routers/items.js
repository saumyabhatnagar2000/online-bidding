const express = require("express");

const auth = require("../middleware/auth");
const { Item } = require("../models/userModel");
const router = express.Router();

router.get("/items", auth, async (req, res) => {
  try {
    const data = await Item.find({});
    res.send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/item", auth, async (req, res) => {
  try {
    console.log(req.user);
    res.send();
  } catch (e) {}
});

module.exports = router;
