import mongoose, { mongo } from "mongoose";

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
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
