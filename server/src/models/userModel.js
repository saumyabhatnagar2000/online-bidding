const mongoose = require("mongoose");
const {
  userSchema,
  itemSchema,
  biddingSchema,
  ListingSchema,
  itemSchema,
} = require("../schemas/schema");

const User = mongoose.model("User", userSchema);
const Item = mongoose.model("Item", itemSchema);
const Listing = mongoose.model("Listing", ListingSchema);
const Bidding = mongoose.model("Bidding", biddingSchema);

module.exports = { User, Item, Listing, Bidding };
