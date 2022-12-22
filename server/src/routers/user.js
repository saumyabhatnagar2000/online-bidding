const express = require("express");
const { json } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { Company } = require("../models/userModel");
const { Bidder } = require("../models/userModel");
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
  console.log(req.body.user)
  const { user } = req.body;
  const users = new User(user);
  const token = await users.generateAuthToken();
  await users.save();
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
    req.body.user_id = req.user._id
    const company = new Company(req.body);
    await company.save();
    res.send(company)
    
  } catch (e) {
    res.status(400).send(e);
  }

})

router.post("/bidder", auth, async (req, res) => {
  try {
    req.body.user_id = req.user._id
    const bidder = new Bidder(req.body);
    await bidder.save();
    res.send(bidder)
    
  } catch (e) {
    res.status(400).send(e);
  }

})

router.get("/company", auth, async (req, res) => {
  try {
    const data = await Company.findOne({
      user_id:req.user._id
    });
    if (data) return res.send(data);
    res.status(404).send("not found");
  } catch (e) {
    res.status(500).send(e);
  }

})

router.get("/bidder", auth, async (req, res) => {
  try {
    const data = await Bidder.findOne({
      user_id:req.user._id
    });
    if (data) return res.send(data);
    res.status(404).send("not found");
  } catch (e) {
    res.status(500).send(e);
  }

})


module.exports = router;
