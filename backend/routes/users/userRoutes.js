import express from "express";
import { 
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
} from "../../controllers/users/userController.js";
import { protect } from "../../middleware/authMIddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile")
      .get(protect,getUserProfile)
      .put(protect,updateUserProfile);

export default router;
