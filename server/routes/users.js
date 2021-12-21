const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({path:'../.env'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  const user = {
    name: 'ACM Hack',
    email: 'hack@acmucsd.org'
  }
  res.status(200).json({ user });
  res.send("Got get request.");
});

// User registration
router.post('/register', async (req, res) => {
  try {
    const { email, username, name, password } = req.body;

    // Check if there is a duplicate username
    const existingUserUsername = await User.findOne({ username });
    if (existingUserUsername) {
      return res.status(400).json({
        success: false,
        error_message: 'An account with the username already exists.',
        user: existingUserUsername
      });
    }

    // Check if there is a duplicate email
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({
        success: false,
        error_message: 'An account with the email already exists.',
        user: existingUserEmail
      });
    }

    // Save new user to mongoDB
    const newUser = new User({
      email,
      username,
      name,
      password
    });

    const savedUser = await newUser.save();

    // Return with status 200
    return res.status(200).json({
      success: true,
      error_message: null,
      user: newUser
    });
  }
  catch (err) {
    res.status(500).json({
      success: false,
      error_message: 'An error has occurred.'
    });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    let existingUser =  await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        error_message: "User not found.",
        user: req.body
      });
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error_message: "Wrong password.",
        user: existingUser
      })
    }

    // create accessToken
    const userID = { id: existingUser._id };
    const accessToken = jwt.sign(userID, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });

    // Response user
    const resUser = {
      _id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
      name: existingUser.name
    }

    // Send response
    res.cookie("accessToken", accessToken, {
      httpOnly: true
    }).json({
      success: true,
      error_message: null,
      user: resUser
    });
  }
  catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
