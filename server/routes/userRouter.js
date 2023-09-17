const express = require("express");
const router = express.Router();
const registerUser = require("../controller/registerUser");
const loginUser = require("../controller/loginUser");
const forgotPasswordUser = require("../controller/forgotPasswordUser");
const generateNewPassword = require("../controller/generateNewPassword");
const authenticateUser = require("../middlewares/authenticateUser");
const checkUserLogin = require("../controller/checkUserLogin");
const logoutUser = require("../controller/logoutUser");
const userContact = require("../controller/userContact");

// Register User:
router.post("/signup", registerUser);

// Login User:
router.post("/login", loginUser);

// send login status
router.get("/", authenticateUser, checkUserLogin);

//logout
router.get("/logout", logoutUser);

// forgot password {send verification link to email}
router.post("/forgot-password/:userId", forgotPasswordUser);

// generate new password
router.patch("/resetpassword/:token/:id", generateNewPassword);

// authenticate on download resume
router.get("/get-started/:tempName/preview", authenticateUser, checkUserLogin);

//user contact:
router.post("/contact", authenticateUser, userContact);

module.exports = router;
