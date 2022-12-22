const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const { Item } = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
const streamfiber = require("streamifier");

cloudinary.config({
  secure: true,
  api_secret: "IyDb1CjwZgQbz40298sb1qa2InU",
  cloud_name: "saumya1",
  api_key: "296199994848661",
});

const router = express.Router();
const upload = multer();

router.get("/items", async (req, res) => {
  try {
    const data = await Item.find({});
    res.send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/item", upload.array("photos", 15), auth, async (req, res) => {
  try {
    const imageArray = [];

    for (const file of req.files) {
      const url = await streamUpload(file);
      imageArray.push({ image: url.url });
    }

    const data = { ...req.body, seller_id: req.user._id, images: imageArray };
    const item = new Item(data);
    item.save();
    res.send(item);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/item/:id", auth, async (req, res) => {
  try {
    const item = Item.findByIdAndRemove({ id: req.params.id });
    res.send(item);
  } catch (e) {
    res.status(400).send(e);
  }
});

const streamUpload = async (req) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamfiber.createReadStream(req.buffer).pipe(stream);
  });
};

module.exports = router;
