const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const Task = require("../models/taskModel");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  number: {
    type: String,
    validate(value) {
      if (value.length != 10) throw new Error("Number is not valid");
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {},
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "createdBy",
});

userSchema.static("findUserByCredentials", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("user not found");
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw new Error("incorrect password");
  return user;
});

userSchema.method("generateAuthToken", async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() }, "cg-hackathon", {
    expiresIn: "6 hours",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    //will run when user is created or updated
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// userSchema.pre("remove", async (next) => {
//   const user = this;
//   Task.deleteMany({ createdBy: user._id });
//   next();
// });

module.exports = {
  userSchema,
  taskSchema,
};
