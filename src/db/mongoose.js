const mongoose = require("mongoose");

// const connnectionURL = "mongodb://127.0.0.1:27017";
const connnectionURL =
  "mongodb+srv://cg-hackathon:saumya20000@cluster0.bpdxxbh.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose.connect(`${connnectionURL}`, {}, () => {
  console.log("connected");
});
