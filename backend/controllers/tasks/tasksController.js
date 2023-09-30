
// Description: Gets all tasks from database.
// Route: GET /api/v1/tasks/
// Access: Private
const getAllTasks = (req,res) => {
  res.send("GEt all")
}

// Description: Gets the task with given id.
// Route: GET /api/v1/tasks/:id
// Access: Private
const getTask = (req,res) => {
  res.send("get single task")
}

// Description: Create the task.
// Route: POST /api/v1/tasks/
// Access: Private
const createTask = (req,res) => {
  res.send("create task")
}

// Description: Updates the task with given id.
// Route: PATCH /api/v1/tasks/:id
// Access: Private
const updateTask = (req,res) => {
  res.send("update task")
}

// Description: Deletes the task with given id.
// Route: DELETE /api/v1/tasks/:id
// Access: Private
const deleteTask = (req,res) => {
  res.send("delete task")
}

export {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}