const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ path: "../.env" });

exports.registerUser = async (req, res) => {
  try {
    const { email, username, name, password } = req.body;
    
    const validEmail = await emailValidationResult

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

    // jwt to login
    // create accessToken
    const userID = { id: savedUser._id };
    const accessToken = jwt.sign(userID, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });
    
    // Response user
    const resUser = {
      _id: savedUser._id,
      email: savedUser.email,
      username: savedUser.username,
      name: savedUser.name
    }
    
    // Send response
    res.cookie('accessToken', accessToken, {
      httpOnly: true
    }).json({
      success: true,
      error_message: null,
      user: resUser
    });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      error_message: 'An error has occurred.',
      user: null
    });
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    let existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        error_message: "User not found.",
        user: req.body,
      });
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error_message: "Wrong password.",
        user: existingUser,
      });
    }

    // create accessToken
    const userID = { id: existingUser._id };
    const accessToken = jwt.sign(userID, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "60m",
    });

    // Response user
    const resUser = {
      _id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
      name: existingUser.name,
    };

    // Send response
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
      })
      .json({
        success: true,
        error_message: null,
        user: resUser,
        accessToken: accessToken,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error_message: "An error has occurred.",
      user: null,
    });
  }
}

exports.logoutUser = async (req, res) => {
  try {
    // Send empty accessToken
    res
      .clearCookie('accessToken')
      .json({
        success: true,
        error_message: null,
        user: null,
      });
  } catch (err) {
    res.status(500).send();
  }
}