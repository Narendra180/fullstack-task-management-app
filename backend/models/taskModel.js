import mongoose, { mongo } from "mongoose";

export const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timeStamps: true
});


const Task = mongoose.model("Task", taskSchema);

export default Task;
