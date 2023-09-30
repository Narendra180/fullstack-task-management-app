import asyncHandler from "express-async-handler";

// Description: Register a new user.
// Route: /api/v1/users
// Method: POST
const registerUser = asyncHandler(async (req,res) => {
  return res.status(200).send("Register User");
})

// Description:  Log in the user.
// Route: /api/v1/users/auth
// Method: POST
const authUser = asyncHandler(async (req,res) => {
  return res.status(200).json({message: "Auth User"})
})

// Description: Log Out the user.
// Route: /api/v1/users/logout
// Method: POST
const logoutUser = asyncHandler(async (req,res) => {
  return res.status(200).send("logout user");
})

// Description: Get the use profile.
// Route: /api/v1/users/profile
// Method: GET
const getUserProfile = asyncHandler(async (req,res) => {
  return res.status(200).send("Get User Profile");
})


// Description: Register a new user.
// Route: /api/v1/users/profile
// Method: POST
const updateUserProfile = asyncHandler(async (req,res) => {
  return res.status(200).send("Update User Profile")
})

export { 
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
};