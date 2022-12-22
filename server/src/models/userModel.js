const mongoose = require("mongoose");
const {
  userSchema,
  itemSchema,
  biddingSchema,
  listingSchema,
  companySchema,
  bidderSchema
} = require("../schemas/schema");

const User = mongoose.model("User", userSchema);
const Item = mongoose.model("Item", itemSchema);
const Listing = mongoose.model("Listing", listingSchema);
const Bidding = mongoose.model("Bidding", biddingSchema);
const Bidder = mongoose.model("Bidder", bidderSchema);
const Company = mongoose.model("Company", companySchema);

module.exports = { User, Item, Listing, Bidding, Bidder, Company };
