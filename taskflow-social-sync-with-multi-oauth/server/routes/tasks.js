
const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// GET tasks for current user
router.get('/', async (req, res) => {
  const { sort = 'dueDate', order = 'asc' } = req.query;
  const tasks = await Task.find({ 
    $or: [{ owner: req.user.id }, { sharedWith: req.user.id }]
  }).sort({ [sort]: order === 'asc' ? 1 : -1 });
  res.json(tasks);
});

// CREATE
router.post('/', async (req, res) => {
  const newTask = new Task({ ...req.body, owner: req.user.id });
  const saved = await newTask.save();

  req.app.get('io').emit('task_created', saved);
  res.status(201).json(saved);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  req.app.get('io').emit('task_updated', updated);
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  req.app.get('io').emit('task_deleted', req.params.id);
  res.sendStatus(204);
});

module.exports = router;
