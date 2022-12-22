const express = require("express");
const { json } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
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

router.get("/user/:id", auth, async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    if (data) return res.send(data);
    res.status(404).send("not found");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/:id", auth, async (req, res) => {
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

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/login", async (req, res) => {
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

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/me", auth, (req, res) => {
  res.send(req.user);
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(({ token }) => token != req.token);
    await req.user.save();
    res.json({ data: "logged out" });
  } catch (e) {
    res.status(404).json({ e: "someting went wrong" });
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send(200);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
