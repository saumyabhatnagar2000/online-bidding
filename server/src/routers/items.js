const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const { Item, Listing } = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
const streamfiber = require("streamifier");
const parse = require('csv-parse').parse
const fs = require('fs')
const os = require('os')
const csv_upload = multer({ dest: os.tmpdir() })

cloudinary.config({
  secure: true,
  api_secret: "IyDb1CjwZgQbz40298sb1qa2InU",
  cloud_name: "saumya1",
  api_key: "296199994848661",
});

const router = express.Router();
const upload = multer();
router.get("/items", auth, async (req, res) => {
  try {
    const data = await Item.find({ seller_id: req.user._id });
    res.send(data);
  } catch (e) {
    console.log(e);
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
    const item = await Item.findByIdAndRemove({ id: req.params.id });
    res.send(item);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/start_auction", auth, async (req, res) => {
  try {
    const data = req.body;
    const newList = new Listing({ ...data, active: true });
    await newList.save();
    const updated = await Item.findByIdAndUpdate(req.body.item_id, {
      listing_id: newList._id,
      status: "ongoing",
    });
    console.log(updated);

    res.json({ data: newList });
  } catch (e) {
    console.log(e);
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

router.post("/bulk-upload", csv_upload.single("file"), auth , (req, res) => {
  const file = req.file

  const data = fs.readFileSync(file.path)
  parse(data, (err, records) => {
    if (err) {
      console.error(err)
      return res.status(400).json({success: false, message: 'An error occurred'})
    }
    for(let i=1;i<records.length;i++){
      let data = {}
      for(let j=0;j<5;j++){
        data[records[0][j]] = records[i][j]
      }
      let specifications = {}
      for(let j=5;j<records[0].length;j++){
        if (records[i][j]){
          specifications[records[0][j]] = records[i][j];
        }
      }
      console.log(specifications)
      data["specifications"] = specifications
      data["seller_id"] = req.user._id
      console.log(data, "item data")
      const item = new Item(data);
      item.save();
  }

    return res.json({data: records})
  })

})




module.exports = router;
