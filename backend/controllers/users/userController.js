import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import generateToken from "../../utils/generateToken.js";

// Description: Register a new user.
// Route: POST /api/v1/users
// Access: Public
const registerUser = asyncHandler(async (req,res) => {
  const { name, email, password } = req.body;

  const userExits = await User.findOne({ email });
  if(userExits) {
    res.status(400);
    throw new Error("User already exists")
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if(user) {
    generateToken(res, user._id);
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400);
    throw new Error("Invalid user data")
  }
})

// Description:  Log in the user.
// Route: POST /api/v1/users/auth
// Access: Public
const authUser = asyncHandler(async (req,res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if(user && (await user.matchPassword(password))) {
    generateToken(res,user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
})

// Description: Log Out the user.
// Route: POST /api/v1/users/logout
// Access: Public
const logoutUser = asyncHandler(async (req,res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: "User Logged out"});
})

// Description: Get the use profile.
// Route: GET /api/v1/users/profile
// Access: Private
const getUserProfile = asyncHandler(async (req,res) => {
  const { _id:id, name, email } = req.user;
  const user = { id, name, email }
  res.status(200).json(user);
})


// Description: Update the user.
// Route: POST /api/v1/users/profile
// Access: Private
const updateUserProfile = asyncHandler(async (req,res) => {
  const user = await User.findById({ _id: req.user._id })
  if(user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if(req.body.password) user.password = req.body.password;
    const { _id: id, name, email } = await user.save();
    console.log({id,name,email})
    res.status(200).json({
      id, name, email
    })
  } else {
    res.status(400);
    throw new Error("User not found")
  }
}) 

export { 
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
};