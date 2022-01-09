const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config({ path: "../.env" });
const { registerUser, loginUser, logoutUser } = require('../controllers/userControl');
const { emailValidator, emailValidationResult } = require('../middleware/emailValidator');

// User registration
router.post('/register', emailValidator, emailValidationResult, registerUser);

// User login
router.post("/login", loginUser);

// User logout
router.post("/logout", logoutUser);

module.exports = router;