import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const newTask = await Task.create({ userId, title, description });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error });
  }
};

