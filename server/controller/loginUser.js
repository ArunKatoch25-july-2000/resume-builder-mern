const express = require("express");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "plz fill all the required fields..." });
    }
    const userEmail = await User.findOne({ email: email });
    if (userEmail) {
      const checkPass = await bcrypt.compare(password, userEmail.password);
      if (checkPass) {
        const token = jwt.sign({ UID: email }, process.env.SECRET_KEY);
        return res
          .cookie("uid", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
            SameSite: false,
          })
          .json({ success: "user login Successfully..." });
      } else {
        return res.status(400).json({ error: "failure" });
      }
    } else {
      return res.status(400).json({
        error:
          "Something went wrong, either you filled wrong email or password",
      });
    }
  } catch (err) {
    return res.status(400).json({ error: `${err}` });
  }
};

module.exports = loginUser;
