const express = require("express");
const auth = require("../middleware/auth");
const { Listing, Item } = require("../models/userModel");

const router = express.Router();

router.post("/create/listing", auth, async (req, res) => {
    try {
      for(let i=0; i<req.body.length; i++){
        const {start_date,end_date, listing_type, min_bid, max_bid, min_increment, itemId} = req.body[i] || {}
        if(start_date && end_date){
            const data = await Listing.create({
                start_date,
                end_date,
                listing_type,
                min_bid,
                max_bid,
                min_increment
            })
            data.save()
            const id = data._id
            await Item.updateOne({_id:Object(itemId)},{
                "$set":{
                    listing_id: id,
                    "status": "ongoing"
                }
            })
        }
        res.send("updated successfully");
      }
      res.send("Error updating all the records")
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });


module.exports = router;