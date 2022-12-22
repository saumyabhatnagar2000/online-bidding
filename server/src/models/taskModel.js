const mongoose = require("mongoose");
const { taskSchema } = require("../schemas/schema");

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
