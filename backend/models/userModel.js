import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { taskSchema } from "./taskModel.js";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: [7, "Required atleast 7 charcters"],
    maxLength: [15, "Maximum characters are 15"]
  },
  tasks: {
   type: [taskSchema],
   select: false
  }
}, {
  timeStamps: true
});

userSchema.pre('save', async function(next) {
  if(!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); 
  }
})

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;
