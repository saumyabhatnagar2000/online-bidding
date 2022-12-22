const axios = require('axios');
const express = require("express");
const { Listing, Item } = require("../models/userModel");

const router = express.Router();



router.post("/send/mail", (req, res) => {
    const data = JSON.stringify({
        "from_data": {
          "name": "AuctKart Support",
          "email": "notification@auctkart.com"
        },
        "subject": req.body.subject,
        "to_emails": [
          {
            "email": req.body.email
          }
        ],
        "email_body": req.body.body,
        "source": "AuctKart",
        "module": "auction"
      });
      
      const config = {
        method: 'post',
        url: 'https://api.staging.credgenics.com/communication/public/mail',
        headers: { 
          'authenticationtoken': '6dd16d91-2a9b-4380-99d4-dacfafdb5cda', 
          'referer': 'aman', 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send("Mail Sent")
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).send("Mail Sent Failed")
      });
  });


module.exports = router;