const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { Timestamp } = require("mongodb");

// const Task = require("../models/taskModel");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  role: {
    type: String,
    required: true,
    immutable: true,
  },
  active: {
    type: Boolean,
  },
  current_bids: [
    {
      current_bid: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: "",
      },
    },
  ],
  intrested_categories: {
    type: String,
    trim: true,
  },

  // number: {
  //   type: String,
  //   validate(value) {
  //     if (value.length != 10) throw new Error("Number is not valid");
  //   },
  // },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {},
  },
  wallet: {
    type: Number,
    required: true,
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

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
      required: true,
    },
    images: [
      {
        image: {
          type: String,
        },
      },
    ],
    description: {
      type: String,
    },
    status: {
      type: String,
      // convert to enum
    },
    specifications: {
      type: Object,
    },
    listing_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
    sold_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sold_at: {
      type: Date,
    },
  },
  { timestamps: true }
);

const ListingSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  end_date: {
    type: Date,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  listing_type: {
    type: String,
    required: true,
  },
  min_bid: {
    type: Number,
    required: true,
  },
  max_bid: {
    type: Number,
    required: false,
  },
  min_increment: {
    type: Number,
    required: true,
  },
});

const biddingSchema = new mongoose.Schema(
  {
    listing_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bid_amount: {
      type: Number,
      required: true,
    },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

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
  itemSchema,
  biddingSchema,
  ListingSchema,
};
