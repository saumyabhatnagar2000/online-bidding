const express = require("express");
const auth = require("../middleware/auth");
const { Listing, Item, Bidding } = require("../models/userModel");

const router = express.Router();

router.get("/auctions", async (req, res) => {
  try {
    let finalData = [];
    var listings = await Item.find().populate("listing_id");
    ll = listings.filter((ele) => {
      if (ele.listing_id) {
        return ele;
      }
    });
    return res.send(ll);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/auctions/:id", async (req, res) => {
  try {
    var listings = await Item.findById(req.params.id).populate("listing_id");
    if (listings) {
      console.log(listings);
      return res.send(listings);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/create/bidding", async (req, res) => {
  try {
    const { listing_id, user_id, bid_amount, active } = req.body || {};
    const data = await Bidding.create({
      listing_id,
      user_id: Object(user_id),
      bid_amount,
      active,
    });
    data.save();
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.get("/bidding/:id", async (req, res) => {
  console.log(req.params.id, "listing_id");
  let listing_id = req.params.id
  try {
    const data = await Bidding.find({ listing_id: listing_id}).sort({createdAt: -1})
      .populate("user_id")
      .populate({
        model: "Listing",
        path: "listing_id",
        populate: {
          path: "itemId",
          model: "Item",
        },
      });
    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// router.get("/auction/status", async(req, res)=>{
//     try{

//     }
// })

module.exports = router;
