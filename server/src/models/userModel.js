const mongoose = require("mongoose");
const { userSchema } = require("../schemas/schema");

const User = mongoose.model("User", userSchema);

module.exports = User;
