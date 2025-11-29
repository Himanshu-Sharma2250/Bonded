import express from "express";
import { forgotPassword, loginUser, logoutUser, profile, registerUser, resetPassword, verifyUser } from "../controller/index.controller.js";
import { auth } from "../middleware/index.middleware.js";

const authRouter = express.Router();

router.post("/register", registerUser);
router.post("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.get("/profile", auth, profile);
router.get("/logout", auth, logoutUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

export default authRouter;