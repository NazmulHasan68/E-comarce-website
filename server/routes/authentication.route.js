import express from "express";
import { forgetPassword, getallthestudent, getUserProfile, login, logout, passwordVerifyCode, register, resetPassword, updateProfile, verifyOtp } from "../controllers/authentication.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/get-all-student").get(getallthestudent)

router.route("/register").post(register);
router.route("/verify-otp").post(verifyOtp)
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated,logout);
router.route("/get-profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated, updateProfile);
router.route("/forget-password").post(forgetPassword)
router.route("/password-code-verification").post(passwordVerifyCode)
router.route("/reset-password").post(isAuthenticated,resetPassword)




export default router;