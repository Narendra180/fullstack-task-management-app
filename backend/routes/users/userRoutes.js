import express from "express";
import { 
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
} from "../../controllers/users/userController.js";


const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/profile", getUserProfile);
router.post("/profile", updateUserProfile);

export default router;
