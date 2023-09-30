import express from "express";
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from "../../controllers/tasks/tasksController.js";
import { protect } from "../../middleware/authMIddleware.js";

const router = express.Router();
router.use(protect);

router.route("/")
      .get(getAllTasks)
      .post(createTask);

router.route("/tasks/:id")
      .get(getTask)
      .patch(updateTask)
      .delete(deleteTask)

export default router;