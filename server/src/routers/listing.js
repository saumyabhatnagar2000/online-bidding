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
                min_increment,
                itemId
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
        return res.send();
      }
      return res.send("Error updating all the records")
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });

router.get('/listings', auth, async(req, res) =>{
    try{
        const lisings = await Listing.find({})
        if(lisings){
            return res.send(lisings)
        }
        return res.send("No data found")
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/listing/:id', auth, async(req, res) =>{
    try{
        const lising = await Listing.findById(req.params.id)
        if(lising){
            return res.send(lising)
        }
        return res.send("No data found")
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


module.exports = router;