const express = require("express");
const Task = require("../models/taskModel");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/tasks", async (req, res) => {
  try {
    await req.user.populate("tasks").execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      createdBy: req.user._id,
    });
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      createdBy: req.user._id,
      _id: req.params.id,
    });
    if (!task) return res.status(404).send();

    Object.keys(req.body).forEach(
      (update) => (task[update] = req.body[update])
    );
    await task.save();
  } catch (e) {
    res.status(404).send();
  }
});

router.get("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({ createdBy: req.user, _id: req.body.id });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
