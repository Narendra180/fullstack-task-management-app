import Task from "../../models/taskModel.js";
import asyncHandler from "express-async-handler";

// Description: Gets all tasks from database.
// Route: GET /api/v1/tasks/
// Access: Private
const getAllTasks = asyncHandler(async (req,res) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
})

// Description: Gets the task with given id.
// Route: GET /api/v1/tasks/:id
// Access: Private
const getTask = asyncHandler(async (req,res) => {
  const taskId = req.params.id;
  const task = await Task.findOne({_id: taskId})
  res.status(200).json(task)
})

// Description: Create the task.
// Route: POST /api/v1/tasks/
// Access: Private
const createTask = asyncHandler(async (req,res) => {
  const { name, description } = req.body;
  const newTask = await Task.create({
    name, description
  });
  res.status(201).json(newTask);
})

// Description: Updates the task with given id.
// Route: PATCH /api/v1/tasks/:id
// Access: Private
const updateTask = asyncHandler(async (req,res) => {
  const taskId = req.params.id;
  const dataTobeChanged = req.body;
  const updatedTask = await Task.findOneAndUpdate({_id: taskId}, dataTobeChanged, {new: true});
  res.status(200).json(updatedTask);
})

// Description: Deletes the task with given id.
// Route: DELETE /api/v1/tasks/:id
// Access: Private
const deleteTask = asyncHandler(async (req,res) => {
  const taskId = req.params.id;
  const deletedTask = await Task.findOneAndDelete({_id: taskId})
  res.json({
    success: true,
    deletedTask
  })
})

export {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}