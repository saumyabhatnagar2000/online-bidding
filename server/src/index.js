const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const itemRouter = require("./routers/items");

const app = express();
const port = process.env.port || 3001;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);
app.use(itemRouter);

app.listen(port, () => {
  console.log(`Up and running on localhost://${port}`);
});
