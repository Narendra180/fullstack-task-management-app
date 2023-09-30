import asyncHandler from "express-async-handler";

// Description: Gets all tasks from database.
// Route: GET /api/v1/tasks/
// Access: Private
const getAllTasks = asyncHandler(async (req,res) => {
  const tasks = req.user.tasks;
  res.status(200).json(tasks);
})

// Description: Gets the task with given id.
// Route: GET /api/v1/tasks/:id
// Access: Private
const getTask = asyncHandler(async (req,res) => {
  const taskId = req.params.id;
  const task = req.user.tasks.id(taskId);
  res.status(200).json(task)
})

// Description: Create the task.
// Route: POST /api/v1/tasks/
// Access: Private
const createTask = asyncHandler(async (req,res) => {
  const user = req.user;
  const { name, description } = req.body;
  user.tasks.push({ name, description});
  const newUser = await user.save();
  const createdTask = newUser.tasks[user.tasks.length-1];
  res.status(201).json(createdTask);
})

// Description: Updates the task with given id.
// Route: PATCH /api/v1/tasks/:id
// Access: Private
const updateTask = asyncHandler(async (req,res) => {
  const taskId = req.params.id;
  const dataTobeUpdated = req.body;
  const taskTobeUpdated = req.user.tasks.id(taskId);
  Object.keys(dataTobeUpdated).forEach(key => {
    if(key !== "_id") {
      taskTobeUpdated[key] = dataTobeUpdated[key]
    }
  })
  await req.user.save();
  // const updatedTask = await Task.findOneAndUpdate({_id: taskId}, dataTobeChanged, {new: true});
  // res.status(200).json(updatedTask);
  res.json(taskTobeUpdated)
})

// Description: Deletes the task with given id.
// Route: DELETE /api/v1/tasks/:id
// Access: Private
const deleteTask = asyncHandler(async (req,res) => {
  const taskId = req.params.id;
  const taskTobeDeleted = req.user.tasks.id(taskId);
  taskTobeDeleted.deleteOne();
  await req.user.save();
  res.json({
    success: true,
    deletedTask: taskTobeDeleted
  })
})

export {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}