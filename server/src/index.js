const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const itemRouter = require("./routers/items");
const listRouter = require("./routers/listing");
const auctionRouter = require("./routers/auctions");
const mailRouter = require("./routers/mail");

const cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.port || 3001;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);
app.use(itemRouter);
app.use(listRouter);
app.use(auctionRouter);
app.use(mailRouter);

app.listen(port, () => {
  console.log(`Up and running on localhost://${port}`);
});
